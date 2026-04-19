/**
 * 账单详细信息对话框画面
 */
class BBLV120View {
  /** 识别ID */
  recognitionId;

  /** 账单信息 */
  billInf;

  /**
   * 画面元素的初始化
   */
  onInit(params) {
    // 识别ID
    this.recognitionId = params.recognitionId;
    // 账单信息
    this.billInf = params.input;
    // 头部图标
    d3.select('#bblv120_bill_top_img').attr('src', CommonUtils.getBillIcon(this.billInf.billActionCd));
    // 账单事件
    document.getElementById('bblv120_bill_action').innerText = CodeManager.billActionCd[this.billInf.billActionCd];
    // 活期转定期或者定期转活期的场合
    if (this.billInf.billActionCd === billActionCd.code_03 || this.billInf.billActionCd === billActionCd.code_04) {
      // 循环图标
      $('#bblv120_unit_img').removeClass('d-none');
      d3.select('#bblv120_unit_img').attr('src', 'assets/images/循环.png');
    } else {
      // +或-
        $('#bblv120_unit').removeClass('d-none');
        document.getElementById('bblv120_unit').innerText = CommonUtils.getExpensePro(this.billInf.billActionCd);  
    }
    // 勋章数量
    document.getElementById('bblv120_amount').innerText = this.billInf.billCount;
    // 账单简易说明
    d3.select('#bblv120_bill_tip').text(CommonUtils.getBillSimpleTip(this.billInf.billActionCd, this.billInf.billTipCd))
      .classed('error-text', this.billInf.billActionCd === billActionCd.code_05 && this.billInf.billTipCd === epsTyCd.code_03)
    // 账单金额
    document.getElementById('bblv120_sub_amount_value').innerText = this.billInf.billCount;
    // 经办人
    document.getElementById('bblv120_pch_value').innerText = CodeManager.pchCd[this.billInf.billPchCd];
    // 经办时间
    document.getElementById('bblv120_time_value').innerText = this.billInf.billTime;
    // 详细说明
    document.getElementById('bblv120_detail_value').innerText = this.billInf.billTipDetail ? this.billInf.billTipDetail : '无';
    // 账单编号
    document.getElementById('bblv120_bill_id').innerText = Constant.billPrefix + this.billInf.billId;
    // 根据账单事件设置更多详情 
    this.setMorePageInfByBillActionCd();
  }

  /**
   * 点击关闭按钮
   */
  close() {
    PageUtil.emitDialog(this.recognitionId, BtnType.CLOSE);
  }

  /**
   * 点击取消订单的按钮
   */
  billCancel() {

  }

  /**
   * 根据账单事件设置更多详情
   */
  setMorePageInfByBillActionCd() {
    // 关联账单
    const assBills = [];
    // 存在关联账单的场合
    if (this.billInf.assBillIdLit && this.billInf.assBillIdLit.length > 0) {
      // 获取所有的账单
      const billLit = await DataBase.getBillInfFromDB();
      this.billInf.assBillIdLit.forEach(assBillId => {
        const assBill = billLit.find(bill => bill.billId === assBillId);
        assBills.push(assBill);  
      });
    }
    switch (this.billInf.billActionCd) {
      // 新增勋章-活期存储
      case billActionCd.code_01:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '新增活期';
  
      // 新增勋章-定期存储
      case billActionCd.code_02:
      // 活期转定期
      case billActionCd.code_03:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '定期存额';
        // 存期
        this.showAndSetBillItem('bblv120_fixed_term', CodeManager.termCd[this.billInf.termCd]);
        // 定存编号
        this.showAndSetBillItem('bblv120_fixed_id', Constant.billPrefix + this.billInf.fixedId);
        // 不存在关联账单的场合
        if (assBills.length === 0) {
          // 定存状态: 在存定期
          this.showAndSetBillItem('bblv120_bill_state', '在存定期');
        } else {
          // 存在关联账单的场合(中断账单、自动结束账单)
          const assBill = assBills[0];
          // 中断的场合(定期转活期的场合)
          if (assBill.billActionCd === billActionCd.code_04) {
            // 定存状态
            this.showAndSetBillItem('bblv120_bill_state', '定期存款已经中断');
            // 设置更多详情的名称
            this.showAndSetBillItem('bblv120_more_button', '定期存款中断详情' + Constant.billMoreDownArrow);
            // 定期存款中断详情的详细项目设值

            // 自动到期的场合
          } else {
            // 定存状态
            this.showAndSetBillItem('bblv120_bill_state', '定期存款已自动到期');
            // 设置更多详情的名称
            this.showAndSetBillItem('bblv120_more_button', '定期存款自动到期详情' + Constant.billMoreDownArrow);
            // 定期存款中断详情的详细项目设值

          }
        }
      // 定期转活期
      case billActionCd.code_04:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '转存活期';
      // 消费支出
      case billActionCd.code_05:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '支出金额';
      // 定期自动到期
      case billActionCd.code_06:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '定期利息';
      // 抽奖
      case billActionCd.code_07:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '获奖金额';
      // 借贷
      case billActionCd.code_08:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '借取金额';
      // 还款
      case billActionCd.code_09:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '还款金额';
      // 取消账单
      case billActionCd.code_10:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '退款金额';
      default:
        return;
    }
  }

  /** 
   * 设置更多信息的文字
   */
  setMoreInfText() {

    // 定期转活期、定期自动到期、还款(偿还本金)、取消账单的场合、新增定期()
    if (this.billInf.billActionCd === billActionCd.code_04
      || this.billInf.billActionCd === billActionCd.code_06
      || this.billInf.billActionCd === billActionCd.code_09
      || this.billInf.billActionCd === billActionCd.code_10) {
      $('#bblv120_more_button').removeClass('d-none');
      if (this.billInf.billActionCd === billActionCd.code_04
        || this.billInf.billActionCd === billActionCd.code_06) {
        document.getElementById('bblv120_more_button').innerText = '定期存款详情 ⌵';
      } else if (this.billInf.billActionCd === billActionCd.code_09) {
        document.getElementById('bblv120_more_button').innerText = '借贷详情 ⌵';
      } else {
        document.getElementById('bblv120_more_button').innerText = '前账单详情 ⌵';
      }
    }
  }

  /**
   * 显示并设置本账单的项目
   */
  showAndSetBillItem(itemId, text) {
    $('#' + itemId).removeClass('d-none');
    document.getElementById(itemId + '_value').innerText = text;
  }
}