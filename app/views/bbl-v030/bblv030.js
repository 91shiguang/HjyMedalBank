/**
 * 支出标签主画面
 */
class BBLV030View {
  /**
   * 画面元素的初始化
   */
  onInit() {
    // 初始化画面的内容
    this.initPageItems();
    // 限制输入支出数量的数字类型为0以上的整数
    CommonUtils.limitMedalCountInput('expenseCount');
    // 支出说明的字数限制
    CommonUtils.limitDetailTextarea('expenseTipDetail');
    // 勋章余额提示
    this.refresh();
  }

  /**
   * 画面刷新
   */
  async refresh(number) {
    let effectiveCount = number;
    // 参数不存在的场合
    if (CommonUtils.isNumberEmpty(number)) {
      // 从数据库中取得现有所有的勋章
      const medalLit = await DataBase.getMedalInfFromDB();
      // 获取可以使用的勋章
      effectiveCount = medalLit.filter(item => item.saveStateCd === mdlCd.code_01).length;
    }
    // 勋章余额提示
    document.getElementById('effective_count').innerText = '（当前活期余额: ' + effectiveCount + '枚）';
  }

  /**
   * 点击确认支出按钮
   */
  async clickExpenseButton() {
    // 弹出验证密码画面
    const btnType = await PageUtil.openDialogPage(PageId.bblv250);
    // 点击关闭按钮的场合
    if (!btnType || btnType === BtnType.CLOSE) {
      return;
    }
    // 从数据库中取得现有所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    // 获取可以使用的勋章
    const effectiveLit = medalLit.filter(item => item.saveStateCd === mdlCd.code_01);
    // 支出数量
    const expenseCount = Number(CommonUtils.getInputElementValue('expenseCount'));
    // 可支配的勋章数量不足的场合
    if (effectiveLit.length < expenseCount) {
      CommonUtils.playAudio('popup_audio');
      await Message.showInformation(Message.BBL0012I);
      return;
    }
    // 从数据库中取得所有的账单
    const billLit = await DataBase.getBillInfFromDB();
    // 创建支出的账单
    const newBill = new BillModel();

    // 循环支出的数量
    for (let i = 0; i < expenseCount; i++) {
      // 把勋章的状态更新为【已支出勋章】
      effectiveLit[i].saveStateCd = mdlCd.code_03;
      newBill.expenseMedalIdLit.push(effectiveLit[i].medalId);
    }

    // 支出类型
    const expenseTypeCd = CommonUtils.getRadioCheckedValue('expenseType');
    // 支出说明
    const expenseTipDetail = CommonUtils.getInputElementValue('expenseTipDetail');
    // 支出的经办人
    const expensePchCd = CommonUtils.getRadioCheckedValue('expensePch');
    // 创建新的账单ID
    newBill.billId = CommonUtils.createNewBillId(billLit);
    // 账单详细说明
    newBill.billTipDetail = expenseTipDetail;
    // 账单时间
    newBill.billTime = CommonUtils.getBillTime();
    // 账单的勋章数量
    newBill.billCount = expenseCount;
    // 账单经办人
    newBill.billPchCd = expensePchCd;
    // 账单事件区分
    newBill.billActionCd = billActionCd.code_05;
    // 支出账单说明区分
    newBill.billTipCd = expenseTypeCd;
    billLit.push(newBill);

    // 更新数据库的勋章
    await DataBase.saveMedalInfToDB(medalLit);
    // 更新数据库的账单
    await DataBase.saveBillInfToDB(billLit);
    // 支出类型是日常消费的场合
    if (expenseTypeCd === epsTyCd.code_01) {
      // 播放日常消费成功音效
      CommonUtils.playAudio('expense_success_audio');
      // 日常消费支出成功的提示内容
      await Message.showInformation(Message.BBL0009I);

      // 提现的场合
    } else if (expenseTypeCd === epsTyCd.code_02) {
      // 播放提现成功音效
      CommonUtils.playAudio('expense_success_audio');
      // 提现成功的提示内容
      await Message.showInformation(Message.BBL0010I);

      // 罚扣的场合
    } else {
      CommonUtils.playAudio('sad_audio');
      // 罚扣成功的提示内容
      await Message.showInformation(Message.BBL0011I);
    }
    // 初始化画面的内容
    this.initPageItems();
    // 更新勋章余额提示
    this.refresh(effectiveLit - expenseCount);
  }

  /**
   * 初始化画面的内容
   */
  initPageItems() {
    // 支出经办人：妈妈
    CommonUtils.clickRadio('expensePch', 'expensePch_01');
    // 支出类型：日常消费
    CommonUtils.clickRadio('expenseType', 'expenseType_01');
    // 支出数量：1
    document.getElementById('expenseCount').value = 1;
    // 详细说明
    document.getElementById('expenseTipDetail').value = Constant.blank;
  }
}