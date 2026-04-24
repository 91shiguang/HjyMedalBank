/**
 * 定期转活期, 选择的定期详细对话框画面
 */
class BBLV130View {
  /** 识别ID */
  recognitionId;

  /** 账单信息 */
  billInf;

  /**
   * 画面元素的初始化
   */
  async onInit(params) {
    // 获取设置信息
    const settingInf = await DataBase.getSettingInfFromDB();
    // 识别ID
    this.recognitionId = params.recognitionId;
    // 账单信息
    this.billInf = params.input;
    // 账单事件
    document.getElementById('bblv130_bill_action').innerText = CodeManager.billActionCd[this.billInf.billActionCd];
    // 活期转定期的场合
    if (this.billInf.billActionCd === billActionCd.code_03) {
      // 循环图标
      $('#bblv130_unit_img').removeClass('d-none');
    } else {
      // +
      $('#bblv130_unit').removeClass('d-none');
    }
    // 勋章数量
    document.getElementById('bblv130_amount').innerText = this.billInf.billCount;
    // 账单简易说明
    d3.select('#bblv130_bill_tip').text(CommonUtils.getBillSimpleTip(this.billInf.billActionCd, this.billInf.billTipCd));
    // 定期存额
    document.getElementById('bblv130_sub_amount_value').innerText = this.billInf.billCount;
    // 开始时间
    document.getElementById('bblv130_fixed_start_value').innerText = CommonUtils.transToDtilDate(this.billInf.billTime);
    // 存期
    document.getElementById('bblv130_fixed_term_value').innerText = CodeManager.termCd[this.billInf.termCd];
    // 剩余时长
    document.getElementById('bblv130_fixed_remain_value').innerText = CommonUtils.calculateFixedRemainTime(this.billInf.fixedEndTime) + '天';
    // 预计收益
    document.getElementById('bblv130_fixed_new_value').innerText = CommonUtils.calculateFixedIncome(this.billInf, settingInf);
    // 存单编号
    document.getElementById('bblv130_fixed_id_value').innerText = Constant.fixedPrefix + this.billInf.fixedId;
    // 经办人
    document.getElementById('bblv130_pch_value').innerText = CodeManager.pchCd[this.billInf.billPchCd];
    // 经办时间
    document.getElementById('bblv130_time_value').innerText = this.billInf.billTime;
    // 详细说明
    if (this.billInf.billTipDetail) {
      this.showAndSetBillItem('bblv130_bill_detail', this.billInf.billTipDetail);
    }
  }

  /**
   * 点击关闭按钮
   */
  close() {
    CommonUtils.playAudio('click_audio');
    PageUtil.emitDialog(this.recognitionId, BtnType.CLOSE);
  }

  /**
   * 点击确定按钮
   */
  confirm() {
    CommonUtils.playAudio('click_audio');
    PageUtil.emitDialog(this.recognitionId, BtnType.CONFIRM);
  }

  /**
   * 显示并设置本账单的项目
   */
  showAndSetBillItem(itemId, text) {
    $('#' + itemId).removeClass('d-none');
    document.getElementById(itemId + '_value').innerText = text;
  }
}