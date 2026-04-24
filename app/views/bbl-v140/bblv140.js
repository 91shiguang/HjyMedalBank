/**
 * 常规存储画面
 */
class BBLV140View {
  /** 定期转活期，选择的定期账单ID */
  selFixedBillId;

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
      && CommonUtils.isNumberEmpty(item.borrowId)
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
      // 隐藏存期选项
      $('#fixed_term').addClass('d-none');
      // 显示定期转活期选项
      $('#medalSource_label_03').removeClass('d-none');

      // 新增的场合
      if (value === mdlSrcCd.code_01) {
        // 显示可输入勋章的输入框
        $('#save_count').removeClass('d-none');
        // 隐藏定期勋章数量的输入框
        $('#fixed_to_free_count').addClass('d-none');

        // 定期转活期的场合
      } else {
        // 从数据库中取得现有所有的勋章
        const medalLit = await DataBase.getMedalInfFromDB();
        // 获取定期勋章批次一览
        const fixedLit = Object.values(
          medalLit.reduce((acc, item) => {
            // 定期编号
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
          // 弹出不存在定期款项的提示框
          await Message.showInformation(Message.BBL0006E);
          this.clickMedalSrcRadio(saveTpCd.code_01);
          return;
        }
        // 弹出定期转活期、定期批次选择对话框画面
        const result = await PageUtil.openDialogPage(PageId.bblv150, PageId.bblv140);
        // 点击取消的场合
        if (result.btnType === BtnType.CLOSE) {
          return;
        }
        // 选择的定期账单Id
        this.selFixedBillId = result.selFixedBillId;
        // 隐藏可输入勋章的输入框
        $('#save_count').addClass('d-none');
        // 显示定期勋章数量的输入框
        $('#fixed_to_free_count').removeClass('d-none');
        // 自动显示选择的定期勋章的数量
        document.getElementById('fixedToFreeCount').value = result.billCount;
      }

      // 定期的场合
    } else {
      $('#save_count').removeClass('d-none');
      // 显示活期转定期选项
      $('#medalSource_label_02').removeClass('d-none');
      // 显示存期选项
      $('#fixed_term').removeClass('d-none');
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
      // 显示定期勋章数量的输入框
      $('#mdl_src_tip').addClass('d-none');
    }
  }

  /**
   * 点击确认存储按钮
   */
  async clickSaveButton() {
    // 新增活期的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_01
      && CommonUtils.getRadioCheckedValue('medalSource') === mdlSrcCd.code_01) {
      // 保存新增活期的勋章
      await this.addNewFreeMedalToDb();
      return;
    }

    // 定期转活期的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_01
      && CommonUtils.getRadioCheckedValue('medalSource') === mdlSrcCd.code_03) {
      // 保存定期转活期的勋章
      await this.saveFreeMedalByFixed();
      return;
    }

    // 新增定期的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_02
      && CommonUtils.getRadioCheckedValue('medalSource') === mdlSrcCd.code_01) {
      // 保存新增定期的勋章
      await this.addNewFixedMedalToDb();
      return;
    }

    // 活期转定期的场合
    if (CommonUtils.getRadioCheckedValue('saveType') === saveTpCd.code_02
      && CommonUtils.getRadioCheckedValue('medalSource') === mdlSrcCd.code_02) {
      // 保存活期转定期的勋章
      await this.saveFixedMedalByFree();
      return;
    }
  }

  /**
   * 保存新增活期的勋章
   */
  async addNewFreeMedalToDb() {
    // 弹出验证密码画面
    const btnType = await PageUtil.openDialogPage(PageId.bblv250);
    // 点击关闭按钮的场合
    if (!btnType || btnType === BtnType.CLOSE) {
      return;
    }
    // 从数据库中取得现有所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    // 创建新的勋章ID
    const newMedalId = CommonUtils.createNewMedalId(medalLit);

    // 存储数量
    const saveCount = Number(CommonUtils.getInputElementValue('saveCount'));
    // 循环存储的数量
    for (let i = 0; i < saveCount; i++) {
      // 新建勋章
      const newMedal = new MedalModel();
      // 新的勋章ID
      newMedal.medalId = newMedalId + i;
      // 勋章状态
      newMedal.saveStateCd = mdlCd.code_01;
      medalLit.push(newMedal);
    }

    // 从数据库中取得所有的账单
    const billLit = await DataBase.getBillInfFromDB();
    // 创建活期、新增的账单
    const newBill = new BillModel();
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
    // 刷新画面
    this.refresh(medalLit);
    // 重置画面内容
    this.initPageItems();
  }

  /**
   * 保存定期转活期的勋章
   */
  async saveFreeMedalByFixed() {
    // 弹出验证密码画面
    const btnType = await PageUtil.openDialogPage(PageId.bblv250);
    // 点击关闭按钮的场合
    if (!btnType || btnType === BtnType.CLOSE) {
      return;
    }
    // 从数据库中取得现有所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    // 从数据库中取得所有的账单
    const billLit = await DataBase.getBillInfFromDB();
    // 选择的定期账单
    const fiexdBillSel = billLit.find(bill => bill.billId === this.selFixedBillId);
    // 转活期的勋章
    const fiexdMedals = medalLit.filter(medal => fiexdBillSel.fixedId === medal.fixedId);
    fiexdMedals.forEach(medal => {
      // 清空勋章定期存款相关的信息
      // 勋章状态
      medal.saveStateCd = mdlCd.code_01;
      // 定存开始时间
      medal.fixedStartTime = undefined;
      // 定存计划结束时间
      medal.fixedEndTime = undefined;
      // 存单编号
      medal.fixedId = undefined;
    });

    // 创建定期转活期的账单
    const newBill = new BillModel();
    // 创建新的账单ID
    newBill.billId = CommonUtils.createNewBillId(billLit);
    // 账单时间
    newBill.billTime = CommonUtils.getBillTime();
    // 账单的勋章数量
    newBill.billCount = fiexdMedals.length;
    // 账单经办人
    newBill.billPchCd = CommonUtils.getRadioCheckedValue('savePch');
    // 账单事件区分
    newBill.billActionCd = billActionCd.code_04;
    // 关联账单ID数组
    newBill.assBillIdLit = [this.selFixedBillId];
    billLit.push(newBill);

    // 更新选择的定期账单信息
    // 关联账单ID数组
    fiexdBillSel.assBillIdLit = [newBill.billId];

    // 更新数据库的勋章
    await DataBase.saveMedalInfToDB(medalLit);
    // 更新数据库的账单
    await DataBase.saveBillInfToDB(billLit);
    // 定期转活期成功的提示内容
    await Message.showInformation(Message.BBL0008I);
    // 刷新画面
    this.refresh(medalLit);
    // 重置画面内容
    this.initPageItems();
  }

  /**
   * 保存新增定期的勋章
   */
  async addNewFixedMedalToDb() {
    // 弹出验证密码画面
    const btnType = await PageUtil.openDialogPage(PageId.bblv250);
    // 点击关闭按钮的场合
    if (!btnType || btnType === BtnType.CLOSE) {
      return;
    }
    // 从数据库中取得现有所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    // 从数据库中取得所有的账单
    const billLit = await DataBase.getBillInfFromDB();
    // 创建新的勋章ID
    const newMedalId = CommonUtils.createNewMedalId(medalLit);
    // 创建新的存单编号
    const newFixedlId = this.createNewFixedlId(billLit);
    // 当前时间
    const currentTime = CommonUtils.getBillTime();
    // 定存计划结束时间
    const fixedEndTime = this.calculateFixedEndTime(currentTime);

    // 存储数量
    const saveCount = Number(CommonUtils.getInputElementValue('saveCount'));
    // 循环存储的数量
    for (let i = 0; i < saveCount; i++) {
      // 新建勋章
      const newMedal = new MedalModel();
      // 新的勋章ID
      newMedal.medalId = newMedalId + i;
      // 勋章状态
      newMedal.saveStateCd = mdlCd.code_02;
      // 定存开始时间 
      newMedal.fixedStartTime = CommonUtils.transToDtilDate(currentTime);
      // 定存计划结束时间
      newMedal.fixedEndTime = fixedEndTime;
      // 存单编号
      newMedal.fixedId = newFixedlId;
      medalLit.push(newMedal);
    }

    // 创建新增定期的账单
    const newBill = new BillModel();
    // 创建新的账单ID
    newBill.billId = CommonUtils.createNewBillId(billLit);
    // 收入账单说明区分
    newBill.billTipCd = CommonUtils.getRadioCheckedValue('mdlSrcTip');
    // 账单详细说明
    newBill.billTipDetail = CommonUtils.getInputElementValue('mdlSrcTipDetail');
    // 账单时间
    newBill.billTime = currentTime;
    // 账单的勋章数量
    newBill.billCount = saveCount;
    // 账单经办人
    newBill.billPchCd = CommonUtils.getRadioCheckedValue('savePch');
    // 账单事件区分
    newBill.billActionCd = billActionCd.code_02;
    // 存单编号
    newBill.fixedId = newFixedlId;
    // 定存存期
    newBill.termCd = CommonUtils.getRadioCheckedValue('term');
    // 定存计划结束时间
    newBill.fixedEndTime = fixedEndTime;
    billLit.push(newBill);

    // 更新数据库的勋章
    await DataBase.saveMedalInfToDB(medalLit);
    // 更新数据库的账单
    await DataBase.saveBillInfToDB(billLit);
    // 播放新增存储音效
    CommonUtils.playAudio('save_success_audio');
    // 弹出新增定期成功的提示框
    await Message.showInformation(Message.BBL0004I);
    // 刷新画面
    this.refresh(medalLit);
    // 重置画面内容
    this.initPageItems();
  }

  /**
   * 保存活期转定期的勋章
   */
  async saveFixedMedalByFree() {
    // 从数据库中取得现有所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    // 存储数量
    const saveCount = Number(CommonUtils.getInputElementValue('saveCount'));
    // 获取完全属于自己的活期勋章
    const ownMedals = medalLit.filter(item =>
      // 活期勋章
      item.saveStateCd === mdlCd.code_01
      // 不是借贷的勋章
      && CommonUtils.isNumberEmpty(item.borrowId)
    );
    // 完全属于自己的勋章数量不足的场合
    if (ownMedals.length < saveCount) {
      await Message.showInformation(Message.BBL0014I);
      return;
    }
    // 弹出验证密码画面
    const btnType = await PageUtil.openDialogPage(PageId.bblv250);
    // 点击关闭按钮的场合
    if (!btnType || btnType === BtnType.CLOSE) {
      return;
    }
    // 从数据库中取得所有的账单
    const billLit = await DataBase.getBillInfFromDB();
    // 创建新的存单编号
    const newFixedlId = this.createNewFixedlId(billLit);
    // 当前时间
    const currentTime = CommonUtils.getBillTime();
    // 定存计划结束时间
    const fixedEndTime = this.calculateFixedEndTime(currentTime);

    // 循环存储的数量
    for (let i = 0; i < saveCount; i++) {
      // 取得活期勋章
      const medal = ownMedals[i];
      // 勋章状态
      medal.saveStateCd = mdlCd.code_02;
      // 定存开始时间 
      medal.fixedStartTime = CommonUtils.transToDtilDate(currentTime);
      // 定存计划结束时间
      medal.fixedEndTime = fixedEndTime;
      // 存单编号
      medal.fixedId = newFixedlId;
    }

    // 创建活期转定期的账单
    const newBill = new BillModel();
    // 创建新的账单ID
    newBill.billId = CommonUtils.createNewBillId(billLit);
    // 账单时间
    newBill.billTime = currentTime;
    // 账单的勋章数量
    newBill.billCount = saveCount;
    // 账单经办人
    newBill.billPchCd = CommonUtils.getRadioCheckedValue('savePch');
    // 账单事件区分
    newBill.billActionCd = billActionCd.code_03;
    // 存单编号
    newBill.fixedId = newFixedlId;
    // 定存存期
    newBill.termCd = CommonUtils.getRadioCheckedValue('term');
    // 定存计划结束时间
    newBill.fixedEndTime = fixedEndTime;
    billLit.push(newBill);

    // 更新数据库的勋章
    await DataBase.saveMedalInfToDB(medalLit);
    // 更新数据库的账单
    await DataBase.saveBillInfToDB(billLit);
    // 弹出活期转定期成功的提示框
    await Message.showInformation(Message.BBL0005I);
    // 刷新画面
    this.refresh(medalLit);
    // 重置画面内容
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
    // 隐藏存期选项
    $('#fixed_term').addClass('d-none');
    // 勋章来源：新增
    CommonUtils.clickRadio('medalSource', 'medalSource_01');
    this.clickMedalSrcRadio(saveTpCd.code_01);
    // 存储数量：1
    document.getElementById('saveCount').value = 1;
    // 定期存期
    CommonUtils.clickRadio('term', 'term_01');
    // 勋章来源说明：学习奖励
    CommonUtils.clickRadio('mdlSrcTip', 'mdlSrcTip_01');
    // 勋章来源详细说明
    document.getElementById('mdlSrcTipDetail').value = Constant.blank;
    $('#confirm_img').attr('src', 'assets/images/活期存款.png');
  }

  /**
   * 计算定期存款的结束时间
   */
  calculateFixedEndTime(currentTime) {
    // 获取存期
    const term = CommonUtils.getRadioCheckedValue('term');
    // 结束时间
    const endDate = new Date(currentTime);
    // 3个月
    if (term === termCd.code_01) {
      endDate.setMonth(endDate.getMonth() + 3);

      // 半年期
    } else if (term === termCd.code_02) {
      endDate.setMonth(endDate.getMonth() + 6);

      // 1年期
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const pad = (n) => String(n).padStart(2, "0");

    return (endDate.getFullYear() + "年" + pad(endDate.getMonth() + 1) + "月" + pad(endDate.getDate()) + "日");
  }

  /**
   * 创建新的定期存款编号
   */
  createNewFixedlId(billLit) {
    // 获取定存记录
    const fixedBills = billLit.filter(bill => !CommonUtils.isNumberEmpty(bill.fixedId));
    // 如果没有定存记录
    if (fixedBills.length === 0) {
      return 1;
    } else {
      return Math.max(...fixedBills.map(item => item.fixedId)) + 1;
    }
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