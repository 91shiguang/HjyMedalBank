/**
 * 存储标签主画面
 */
class BBLV020View {
  /**
   * 画面元素的初始化
   */
  onInit() {
    // 存储经办人：妈妈
    CommonUtils.clickRadio('savePch', 'savePch_01');
    // 存储时间：现在时间
    document.getElementById('saveTime').value = CommonUtils.getDateEx(new Date());
    // 存储类型：活期
    CommonUtils.clickRadio('saveType', 'saveType_01');
    // 勋章来源：新增
    CommonUtils.clickRadio('medalSource', 'medalSource_01');
    // 存储数量：1
    document.getElementById('saveCount').value = 1;
    // 限制输入存储数量的数字类型为0以上的整数
    CommonUtils.limitMedalCountInput('saveCount');
    // 勋章来源说明：学习奖励
    CommonUtils.clickRadio('mdlSrcTip', 'mdlSrcTip_01');
    // 勋章来源详细说明的字数限制
    CommonUtils.limitDetailTextarea('mdlSrcTipDetail');
    // 当前非借用的活期勋章
    this.refresh();
  }

  /**
   * 画面刷新
   */
  async refresh(medalLit) {
    let list = medalLit;
    // 不存在参数的场合
    if (!list) {
      // 从数据库中取得现有所有的勋章
      list = await DataBase.getMedalInfFromDB();
    }
    // 获取完全属于自己的活期勋章
    const ownCount = list.filter(item =>
      // 活期勋章
      item.saveStateCd === mdlCd.code_01
      // 不是借用的勋章
      && !item.borrowTime
    ).length;
    // 当前非借用的活期勋章
    document.getElementById('own_count').innerText = '（当前非借用的活期余额：' + ownCount + '枚）';
  }

  /**
   * 存储类型选择
   */
  clickSaveTypeRadio(value, event) {
    if (CommonUtils.getRadioCheckedValue('saveType') === value) {
      return;
    }
    CommonUtils.clickRadio('saveType', 'saveType_' + value, event);
    this.clickMedalSrcRadio(saveTpCd.code_01);
  }

  /** 
   * 点击勋章来源的单选框
   */
  async clickMedalSrcRadio(value, event) {
    CommonUtils.clickRadio('medalSource', 'medalSource_' + value, event);
    // 存储类型是活期的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_01) {
      // 隐藏活期转定期选项
      $('#medalSource_label_02').addClass('d-none');
      // 显示定期转活期选项
      $('#medalSource_label_03').removeClass('d-none');

      // 新增的场合
      if (value === mdlSrcCd.code_01) {
        $('#save_count').removeClass('d-none');
        $('#fixed_to_free_count').addClass('d-none');

        // 定期转活期的场合
      } else {
        // 从数据库中取得现有所有的勋章
        const medalLit = await DataBase.getMedalInfFromDB();
        // 获取定期勋章批次一览
        const fixedLit = Object.values(
          medalLit.reduce((acc, item) => {
            // 定期批次ID
            let key = item.fixedId;

            if (!acc[key]) {
              acc[key] = [];
            }

            acc[key].push(item);
            return acc;
          }, {})
        ).filter(items => !CommonUtils.isNumberEmpty(items[0].fixedId));
        // 不存在定期存款的场合
        if (fixedLit.length === 0) {
          CommonUtils.playAudio('popup_audio');
          alert(Message.BBL0006E.message);
          this.clickMedalSrcRadio(saveTpCd.code_01);
          return;
        }
        $('#save_count').addClass('d-none');
        $('#fixed_to_free_count').removeClass('d-none');
      }

      // 定期的场合
    } else {
      $('#save_count').removeClass('d-none');
      // 显示活期转定期选项
      $('#medalSource_label_02').removeClass('d-none');
      // 隐藏定期转活期选项
      $('#medalSource_label_03').addClass('d-none');
      $('#fixed_to_free_count').addClass('d-none');
    }
    // 新增的场合
    if (value === mdlSrcCd.code_01) {
      // 显示勋章来源说明
      $('#mdl_src_tip').removeClass('d-none');
      $('#mdl_src_tip').addClass('d-flex');

      // 转存的场合
    } else {
      // 隐藏勋章来源说明
      $('#mdl_src_tip').removeClass('d-flex');
      $('#mdl_src_tip').addClass('d-none');
    }
  }

  /**
   * 点击确认存储按钮
   */
  async clickSaveButton() {
    // 活期、新增的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_01
      && CommonUtils.getRadioCheckedValue('medalSource') === mdlSrcCd.code_01) {
      // 保存活期、新增的勋章
      this.addNewFreeMedalToDb();
      return;
    }

    // 活期、定期转活期的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_01
      && CommonUtils.getRadioCheckedValue('medalSource') === mdlSrcCd.code_02) {
      // 保存活期、定期转活期的勋章

      return;
    }

    // 定期、新增的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_02
      && CommonUtils.getRadioCheckedValue('medalSource') === mdlSrcCd.code_01) {
      // 保存定期、新增的勋章

      return;
    }

    // 定期、活期转定期的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_02
      && CommonUtils.getRadioCheckedValue('medalSource') === mdlSrcCd.code_03) {
      // 保存定期、活期转定期的勋章

      return;
    }



  }

  /**
   * 保存活期、新增的勋章
   */
  async addNewFreeMedalToDb() {
    // 从数据库中取得现有所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    // 从数据库中取得所有的账单
    const billLit = await DataBase.getMedalInfFromDB();
    // 创建新的勋章ID
    const newMedalId = CommonUtils.createNewMedalId(medalLit);
    // 创建活期、新增的账单
    const newBill = new BillModel();

    // 存储数量
    const saveCount = CommonUtils.getInputElementValue('saveCount');
    // 循环存储的数量
    for (let i = 0; i < saveCount; i++) {
      // 新建勋章
      const newMedal = new MedalModel();
      // 新的勋章ID
      newMedal.medalId = newMedalId + i;
      // 账单关联的勋章ID数组
      newBill.billMedalIdLit.push(newMedal.medalId);
      // 存储的经办人
      newMedal.savePchCd = CommonUtils.getRadioCheckedValue('savePch');
      // 勋章状态
      newMedal.saveStateCd = mdlCd.code_01;
      // 存储时间
      newMedal.saveTime = CommonUtils.getInputElementValue('saveTime');
      // 勋章来源
      newMedal.medalSrcCd = CommonUtils.getRadioCheckedValue('medalSource');
      // 来源说明
      newMedal.medalSrcTipCd = CommonUtils.getRadioCheckedValue('mdlSrcTip');
      // 详细说明
      newMedal.medalSrcTipDetail = CommonUtils.getInputElementValue('mdlSrcTipDetail');
      // 回退情报(不可回退)
      newMedal.backInf = null;
      medalLit.push(newMedal);
    }

    // 创建新的账单ID
    newBill.billId = CommonUtils.createNewBillId(billLit);
    // 账单说明
    newBill.billTipCd = CommonUtils.getRadioCheckedValue('mdlSrcTip');
    // 账单详细说明
    newBill.billTipDetail = CommonUtils.getInputElementValue('mdlSrcTipDetail');
    // 账单时间
    newBill.billTime = CommonUtils.getBillTime();
    // 账单的勋章数量
    newBill.billCount = saveCount;
    // 账单经办人
    newBill.billPchCd = CommonUtils.getRadioCheckedValue('savePch');
    // 账单事件区分
    newBill.billActionCd = billActionCd.code_01;
    billLit.push(newBill);

    // 更新数据库的勋章
    await DataBase.saveMedalInfToDB(medalLit);
    // 更新数据库的账单
    await DataBase.saveBillInfToDB(billLit);
    // 播放新增存储音效
    CommonUtils.playAudio('save_success_audio');
    alert(Message.BBL0004I.message);
    this.refresh(medalLit);
  }
}