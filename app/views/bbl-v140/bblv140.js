/**
 * 常规存储画面
 */
class BBLV140View {
  /**
   * 画面元素的初始化
   */
  onInit() {
    // 初始化画面内容
    this.initPageItems();
    // 限制输入存储数量的数字类型为0以上的整数
    CommonUtils.limitMedalCountInput('saveCount');
    // 勋章来源详细说明的字数限制
    CommonUtils.limitDetailTextarea('mdlSrcTipDetail');
    // 当前非借贷的活期勋章
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
      // 不是借贷的勋章
      && !item.borrowTime
    ).length;
    // 当前非借贷的活期勋章
    document.getElementById('own_count').innerText = '当前非借贷的活期余额: ' + CommonUtils.addComma(ownCount) + '枚';
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
    // 活期的场合
    if (value === saveTpCd.code_01) {
      $('#confirm_img').attr('src', 'assets/images/活期存款.png');
    } else {
      $('#confirm_img').attr('src', 'assets/images/定期存款.png');
    }
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
          // 弹出未注册的提示框
          await Message.showInformation(Message.BBL0006E);
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
    // 弹出验证密码画面
    const btnType = await PageUtil.openDialogPage(PageId.bblv250);
    // 点击关闭按钮的场合
    if (!btnType || btnType === BtnType.CLOSE) {
      return;
    }
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
    const billLit = await DataBase.getBillInfFromDB();
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
      // 勋章状态
      newMedal.saveStateCd = mdlCd.code_01;
      // 回退情报(不可回退)
      newMedal.backInf = null;
      medalLit.push(newMedal);
    }

    // 创建新的账单ID
    newBill.billId = CommonUtils.createNewBillId(billLit);
    // 收入账单说明区分
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
    // 弹出新增存储成功的提示框
    await Message.showInformation(Message.BBL0004I);
    // 刷新画面、重置画面内容
    this.refresh(medalLit);
    this.initPageItems();
  }

  /**
   * 初始化画面的内容
   */
  initPageItems() {
    // 存储经办人：妈妈
    CommonUtils.clickRadio('savePch', 'savePch_01');
    // 存储类型：活期
    CommonUtils.clickRadio('saveType', 'saveType_01');
    // 勋章来源：新增
    CommonUtils.clickRadio('medalSource', 'medalSource_01');
    // 存储数量：1
    document.getElementById('saveCount').value = 1;
    // 勋章来源说明：学习奖励
    CommonUtils.clickRadio('mdlSrcTip', 'mdlSrcTip_01');
    // 勋章来源详细说明
    document.getElementById('mdlSrcTipDetail').value = Constant.blank;
    $('#confirm_img').attr('src', 'assets/images/活期存款.png');
  }
}

/**
 * 存储类型区分
 */
const saveTpCd = {
  /** 活期勋章 */
  code_01: '01',
  /** 定期勋章 */
  code_02: '02',
}

/**
 * 勋章来源区分
 */
const mdlSrcCd = {
  /** 新增 */
  code_01: '01',
  /** 活期转定期 */
  code_02: '02',
  /** 定期转活期 */
  code_03: '03',
}