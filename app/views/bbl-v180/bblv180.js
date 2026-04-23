/**
 * 订单取消理由对话框画面
 */
class BBLV180View {
  /** 识别ID */
  recognitionId;

  /**
   * 画面元素的初始化
   */
  async onInit(params) {
    // 识别ID
    this.recognitionId = params.recognitionId;
    // 账单ID
    this.billId = params.input;
    // 取消理由的字数限制
    CommonUtils.limitDetailTextarea('bblv180_cancel_reason');
    // 经办人：妈妈
    CommonUtils.clickRadio('bblv180SavePch', 'bblv180_savePch_01');
  }

  /**
   * 点击关闭按钮
   */
  close() {
    PageUtil.emitDialog(this.recognitionId, BtnType.CLOSE);
  }

  /**
   * 点击确定按钮
   */
  async confirm() {
    // 获取取消理由
    const billTipDetail = CommonUtils.getInputElementValue('bblv180_cancel_reason').trim();
    document.getElementById('bblv180_reason_error').innerText = Constant.blank;

    if (!billTipDetail) {
      document.getElementById('bblv180_reason_error').innerText = '请输入30文字以内的取消理由';
      document.getElementById('bblv180_cancel_reason').focus();
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
    // 被取消的账单信息
    const billInf = billLit.find(bill => bill.billId === this.billId);

    // 从数据库中取得所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    // 获取被取消的账单关联的勋章
    const expenseMedalLit = medalLit.filter(medal => !(billInf.expenseMedalIdLit.indexOf(medal.medalId) < 0));
    // 更新勋章状态
    expenseMedalLit.forEach(medal => {
      // 把勋章的状态更新为【活期勋章】
      medal.saveStateCd = mdlCd.code_01;
    });

    // 创建取消事件的账单
    const newBill = new BillModel();
    // 创建新的账单ID
    newBill.billId = CommonUtils.createNewBillId(billLit);
    // 账单时间
    newBill.billTime = CommonUtils.getBillTime();
    // 账单的勋章数量
    newBill.billCount = billInf.billCount;
    // 账单经办人
    newBill.billPchCd = CommonUtils.getRadioCheckedValue('bblv180SavePch');
    // 账单事件区分
    newBill.billActionCd = billActionCd.code_10;
    // 关联账单ID数组
    newBill.assBillIdLit = [billInf.billId];
    // 取消理由
    newBill.billTipDetail = CommonUtils.getInputElementValue('bblv180_cancel_reason');
    billLit.push(newBill);

    // 更新被取消的账单信息
    // 关联账单ID数组
    billInf.assBillIdLit = [newBill.billId];
    // 关联的勋章ID数组
    billInf.expenseMedalIdLit = [];

    // 更新数据库的勋章
    await DataBase.saveMedalInfToDB(medalLit);
    // 更新数据库的账单
    await DataBase.saveBillInfToDB(billLit);
    // 关闭画面
    PageUtil.emitDialog(this.recognitionId, BtnType.CONFIRM);
  }
}