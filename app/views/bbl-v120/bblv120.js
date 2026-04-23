/**
 * 账单详细信息对话框画面
 */
class BBLV120View {
  /** 识别ID */
  recognitionId;

  /** 账单ID */
  billId;

  /** 账单信息 */
  billInf;

  /** 关联账单 */
  assBills;

  /** 关联账单详情信息的区分 */
  assBillCode;

  /** 账单被取消flg */
  isBillCancel;

  /**
   * 画面元素的初始化
   */
  async onInit(params) {
    this.isBillCancel = false;
    // 识别ID
    this.recognitionId = params.recognitionId;
    // 账单ID
    this.billId = params.input;
    // 获取所有的账单
    const billLit = await DataBase.getBillInfFromDB();
    // 账单信息
    this.billInf = structuredClone(billLit.find(bill => bill.billId === this.billId));
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
      .classed('error-text', this.billInf.billActionCd === billActionCd.code_05 && this.billInf.billTipCd === epsTyCd.code_03);
    // 账单金额
    document.getElementById('bblv120_sub_amount_value').innerText = this.billInf.billCount;
    // 经办人
    document.getElementById('bblv120_pch_value').innerText = CodeManager.pchCd[this.billInf.billPchCd];
    // 经办时间
    document.getElementById('bblv120_time_value').innerText = this.billInf.billTime;
    // 详细说明
    if (this.billInf.billTipDetail) {
      this.showAndSetBillItem('bblv120_bill_detail', this.billInf.billTipDetail);
    }
    // 账单编号
    document.getElementById('bblv120_bill_id').innerText = Constant.billPrefix + this.billInf.billId;
    // 根据账单事件设置画面内容
    await this.setMorePageInfByBillActionCd(billLit);
  }

  /**
   * 刷新画面
   */
  async refresh() {
    // 获取所有的账单
    const billLit = await DataBase.getBillInfFromDB();
    // 账单信息
    this.billInf = structuredClone(billLit.find(bill => bill.billId === this.billId));
    // 根据账单事件设置画面内容
    await this.setMorePageInfByBillActionCd(billLit);
  }


  /**
   * 点击关闭按钮
   */
  close() {
    // 返回的参数
    const btnType = this.isBillCancel ? BtnType.BILLCANCEL : BtnType.CLOSE;
    PageUtil.emitDialog(this.recognitionId, btnType);
  }

  /**
   * 点击取消订单的按钮
   */
  async billCancel() {
    // 打开账单取消确认画面
    const btnType = await PageUtil.openDialogPage(PageId.bblv180, this.billInf.billId);
    // 点击确定的场合
    if (btnType === BtnType.CONFIRM) {
      this.isBillCancel = true;
      // 刷新画面
      this.refresh();
    }
  }

  /**
   * 根据账单事件设置画面内容
   */
  async setMorePageInfByBillActionCd(billLit) {
    // 存在关联账单的场合
    this.assBills = [];
    if (this.billInf.assBillIdLit && this.billInf.assBillIdLit.length > 0) {
      this.billInf.assBillIdLit.forEach(assBillId => {
        const assBill = billLit.find(bill => bill.billId === assBillId);
        this.assBills.push(assBill);  
      });
    }
    switch (this.billInf.billActionCd) {
      // 新增勋章-活期存储
      case billActionCd.code_01:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '新增活期';
        return;
      // 新增勋章-定期存储
      case billActionCd.code_02:
      // 活期转定期
      case billActionCd.code_03:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '定期存额';
        // 存期
        this.showAndSetBillItem('bblv120_fixed_term', CodeManager.termCd[this.billInf.termCd]);
        // 存单编号
        this.showAndSetBillItem('bblv120_fixed_id', Constant.fixedPrefix + this.billInf.fixedId);
        // 不存在关联账单的场合
        if (this.assBills.length === 0) {
          // 定存状态: 在存定期
          this.showAndSetBillItem('bblv120_bill_state', '在存定期');
        } else {
          // 存在关联账单的场合(中断账单、自动结束账单)
          const assBill = this.assBills[0];
          // 中断的场合(定期转活期的场合)
          if (assBill.billActionCd === billActionCd.code_04) {
            // 定存状态
            this.showAndSetBillItem('bblv120_bill_state', '定期存款已中断');
            // 设置更多详情的名称
            this.showAndSetBillItem('bblv120_more_button', assBillTypeNm[assBillType.code_01] + Constant.billMoreDownArrow);
            // 关联账单详情信息的区分
            this.assBillCode = assBillType.code_01;

            // 自动到期的场合
          } else {
            // 获得收益
            this.showAndSetBillItem('bblv120_fixed_new', assBill.billCount);
            // 定存状态
            this.showAndSetBillItem('bblv120_bill_state', '定期存款已自动到期');
            // 设置更多详情的名称
            this.showAndSetBillItem('bblv120_more_button', assBillTypeNm[assBillType.code_02] + Constant.billMoreDownArrow);
            // 关联账单详情信息的区分
            this.assBillCode = assBillType.code_02;
          }
        }
        return;
      // 定期转活期
      case billActionCd.code_04:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '转存活期';
        // 设置更多详情的名称
        this.showAndSetBillItem('bblv120_more_button', assBillTypeNm[assBillType.code_03] + Constant.billMoreDownArrow);
        // 关联账单详情信息的区分
        this.assBillCode = assBillType.code_03;
        return;
      // 消费支出
      case billActionCd.code_05:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '支出金额';
        // 不存在关联账单的场合
        if (this.assBills.length === 0) {
          // 显示取消账单按钮
          $('#bblv120_single_footer').addClass('d-none');
          $('#bblv120_double_footer').removeClass('d-none');

          // 存在关联账单的场合
        } else {
          // 显示已取消的标记
          $('#bblv120_bill_cancel_sign').removeClass('d-none');
          // 隐藏取消账单按钮
          $('#bblv120_single_footer').removeClass('d-none');
          $('#bblv120_double_footer').addClass('d-none');
          // 设置更多详情的名称
          this.showAndSetBillItem('bblv120_more_button', assBillTypeNm[assBillType.code_05] + Constant.billMoreDownArrow);
          // 关联账单详情信息的区分
          this.assBillCode = assBillType.code_05;
        }
        return;
      // 定期自动到期
      case billActionCd.code_06:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '定期利息';
        document.getElementById('bblv120_pch_value').innerText = '系统自行办理';
        // 设置更多详情的名称
        this.showAndSetBillItem('bblv120_more_button', assBillTypeNm[assBillType.code_04] + Constant.billMoreDownArrow);
        // 关联账单详情信息的区分
        this.assBillCode = assBillType.code_04;
        return;
      // 抽奖
      case billActionCd.code_07:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '获奖金额';
        return;
      // 借贷
      case billActionCd.code_08:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '借取金额';
        // 借贷利息
        this.showAndSetBillItem('bblv120_borrow_new', this.billInf.borrowInterest);
        // 借贷办理编号
        this.showAndSetBillItem('bblv120_borrow_id', Constant.borrowPrefix + this.billInf.borrowId);
        // 存在关联账单的场合
        if (this.assBills.length > 0) {
          // 获取所有的勋章
          const medalLit = await DataBase.getMedalInfFromDB();
          // 同借单编号关联的勋章
          const assMedals = medalLit.filter(medal => medal.borrowId === this.billInf.borrowId);
          // 还款状态
          const state = assMedals.length === 0 ? '已还完本金' : '未换完本金';
          // 借款状态
          this.showAndSetBillItem('bblv120_bill_state', state);
          // 设置更多详情的名称
          this.showAndSetBillItem('bblv120_more_button', assBillTypeNm[assBillType.code_06] + Constant.billMoreDownArrow);
          // 关联账单详情信息的区分
          this.assBillCode = assBillType.code_06;
        } else {
          // 借款状态
          this.showAndSetBillItem('bblv120_bill_state', '未还款');
        }
        return;
      // 还款
      case billActionCd.code_09:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '还款金额';
        // 还款种类是本金还款的场合
        if (this.billInf.billTipCd === repayCd.code_01) {
          // 设置更多详情的名称
          this.showAndSetBillItem('bblv120_more_button', assBillTypeNm[assBillType.code_07] + Constant.billMoreDownArrow);
          // 关联账单详情信息的区分
          this.assBillCode = assBillType.code_07;
        }
        return;
      // 取消账单
      case billActionCd.code_10:
        // 账单金额标题
        document.getElementById('bblv120_sub_amount_title').innerText = '退款金额';
        // 账单取消理由
        this.showAndSetBillItem('bblv120_cancel_reason', this.billInf.billTipDetail);
        // 设置更多详情的名称
        this.showAndSetBillItem('bblv120_more_button', assBillTypeNm[assBillType.code_08] + Constant.billMoreDownArrow);
        // 关联账单详情信息的区分
        this.assBillCode = assBillType.code_08;
        return;
      default:
        return;
    }
  }

  /**
   * 点击链接显示关联账单详情信息
   */
  clickShowMoreInf() {
    $('#bblv120_more_button').addClass('d-none');
    $('#bblv120_bill_more_area').removeClass('d-none');
    $('#bblv120_bill_more_' + this.assBillCode).removeClass('d-none');
    // 设置关联账单的标题
    document.getElementById('bblv120_bill_more_title_' + this.assBillCode).innerText = assBillTypeNm[this.assBillCode];
    // 关联账单的账单事件区分
    switch (this.assBillCode) {
      // 定期账单(已被中断)，关联的定期转活期的账单详情
      case assBillType.code_01:
        // 转存活期额度
        document.getElementById('bblv120_more_amount_01').innerText = this.assBills[0].billCount;
        // 经办人
        document.getElementById('bblv120_more_pch_01').innerText = CodeManager.pchCd[this.assBills[0].billPchCd];
        // 经办时间
        document.getElementById('bblv120_more_time_01').innerText = this.assBills[0].billTime;
        // 账单编号
        document.getElementById('bblv120_more_id_01').innerText = Constant.billPrefix + this.assBills[0].billId;
        return;
      // 定期账单(已到期)，关联的定期存款自动到期账单详情
      case assBillType.code_02:
        // 定存收益
        document.getElementById('bblv120_more_amount_02').innerText = this.assBills[0].billCount;
        // 经办时间
        document.getElementById('bblv120_more_time_02').innerText = this.assBills[0].billTime;
        // 账单编号
        document.getElementById('bblv120_more_id_02').innerText = Constant.billPrefix + this.assBills[0].billId;
        return;
      // 定期转活期的账单，关联的定期存款详情
      case assBillType.code_03:
        // 定期存额
        document.getElementById('bblv120_more_amount_03').innerText = this.assBills[0].billCount;
        // 存期
        document.getElementById('bblv120_more_term_03').innerText = CodeManager.termCd[this.assBills[0].termCd];
        // 存单编号
        document.getElementById('bblv120_more_fixed_id_03').innerText = Constant.fixedPrefix + this.assBills[0].fixedId;
        // 定期来源
        if (this.assBills[0].billActionCd === billActionCd.code_02) {
          document.getElementById('bblv120_more_medal_src_03').innerText = '新增勋章';
          // 来源说明
          this.showAndSetBillItem('bblv120_more_medal_src_tip_03', CodeManager.mdlSrcTipCd[this.assBills[0].billTipCd]);
          // 详细说明
          if (this.assBills[0].billTipDetail) {
            this.showAndSetBillItem('bblv120_more_detail_03', this.assBills[0].billTipDetail);
          }
        } else {
          document.getElementById('bblv120_more_medal_src_03').innerText = '活期转定期';
        }
        // 经办人
        document.getElementById('bblv120_more_pch_03').innerText = CodeManager.pchCd[this.assBills[0].billPchCd];
        // 经办时间
        document.getElementById('bblv120_more_time_03').innerText = this.assBills[0].billTime;
        // 账单编号
        document.getElementById('bblv120_more_id_03').innerText = Constant.billPrefix + this.assBills[0].billId;
        return;
      // 定期自动到期的账单，关联的定期存款详情
      case assBillType.code_04:
        // 定期存额
        document.getElementById('bblv120_more_amount_04').innerText = this.assBills[0].billCount;
        // 存期
        document.getElementById('bblv120_more_term_04').innerText = CodeManager.termCd[this.assBills[0].termCd];
        // 存单编号
        document.getElementById('bblv120_more_fixed_id_04').innerText = Constant.fixedPrefix + this.assBills[0].fixedId;
        // 定期来源
        if (this.assBills[0].billActionCd === billActionCd.code_02) {
          document.getElementById('bblv120_more_medal_src_04').innerText = '新增勋章';
          // 来源说明
          this.showAndSetBillItem('bblv120_more_medal_src_tip_04', CodeManager.mdlSrcTipCd[this.assBills[0].billTipCd]);
          // 详细说明
          if (this.assBills[0].billTipDetail) {
            this.showAndSetBillItem('bblv120_more_detail_04', this.assBills[0].billTipDetail);
          }
        } else {
          document.getElementById('bblv120_more_medal_src_04').innerText = '活期转定期';
        }
        // 经办人
        document.getElementById('bblv120_more_pch_04').innerText = CodeManager.pchCd[this.assBills[0].billPchCd];
        // 经办时间
        document.getElementById('bblv120_more_time_04').innerText = this.assBills[0].billTime;
        // 账单编号
        document.getElementById('bblv120_more_id_04').innerText = Constant.billPrefix + this.assBills[0].billId;
        return;
      // 支出账单，取消详情
      case assBillType.code_05:
        // 退款金额
        document.getElementById('bblv120_more_amount_05').innerText = this.assBills[0].billCount;
        // 取消理由
        document.getElementById('bblv120_more_reason_05').innerText = this.assBills[0].billTipDetail;
        // 经办人
        document.getElementById('bblv120_more_pch_05').innerText = CodeManager.pchCd[this.assBills[0].billPchCd];
        // 经办时间
        document.getElementById('bblv120_more_time_05').innerText = this.assBills[0].billTime;
        // 账单编号
        document.getElementById('bblv120_more_id_05').innerText = Constant.billPrefix + this.assBills[0].billId;
        return;
      // 借贷账单，还款详情
      case assBillType.code_06:
        // TODO
        return;
      // 还款账单，原借贷账单详情
      case assBillType.code_07:
        // 借取金额
        document.getElementById('bblv120_more_amount_07').innerText = this.assBills[0].billCount;
        // 借贷说明
        document.getElementById('bblv120_more_detail_07').innerText = this.assBills[0].billTipDetail;
        // 借贷利息
        document.getElementById('bblv120_more_borrow_new_07').innerText = this.assBills[0].borrowInterest;
        // 借条编号
        document.getElementById('bblv120_more_borrow_id_07').innerText = Constant.borrowPrefix + this.assBills[0].borrowId;
        // 获取所有的勋章
        const medalLit = await DataBase.getMedalInfFromDB();
        // 同借单编号关联的勋章
        const assMedals = medalLit.filter(medal => medal.borrowId === this.assBills[0].borrowId);
        // 还款状态
        const state = assMedals.length === 0 ? '已还完本金' : '未换完本金';
        document.getElementById('bblv120_more_state_07').innerText = state;
        // 经办人
        document.getElementById('bblv120_more_pch_07').innerText = CodeManager.pchCd[this.assBills[0].billPchCd];
        // 经办时间
        document.getElementById('bblv120_more_time_07').innerText = this.assBills[0].billTime;
        // 账单编号
        document.getElementById('bblv120_more_id_07').innerText = Constant.billPrefix + this.assBills[0].billId;
        return;
      // 取消账单，原支出账单详情
      case assBillType.code_08:
        // 支出金额
        document.getElementById('bblv120_more_amount_08').innerText = this.assBills[0].billCount;
        // 支出类型
        d3.select('#bblv120_more_expense_type_08').text(CodeManager.epsTyCd[this.assBills[0].billTipCd])
          .classed('error-text', this.assBills[0].billTipCd === epsTyCd.code_03);
        // 详细说明
        if (this.assBills[0].billTipDetail) {
          this.showAndSetBillItem('bblv120_more_detail_08', this.assBills[0].billTipDetail);
        }
        // 经办人
        document.getElementById('bblv120_more_pch_08').innerText = CodeManager.pchCd[this.assBills[0].billPchCd];
        // 经办时间
        document.getElementById('bblv120_more_time_08').innerText = this.assBills[0].billTime;
        // 账单编号
        document.getElementById('bblv120_more_id_08').innerText = Constant.billPrefix + this.assBills[0].billId;
        return;
      default:
        return;
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

/**
 * 关联账单详情信息的区分
 */
const assBillType = {
  /** 定期账单(已被中断)，关联的定期转活期的账单详情 */
  code_01: '01',
  /** 定期账单(已到期)，关联的定期存款自动到期账单详情 */
  code_02: '02',
  /** 定期转活期的账单，关联的定期存款详情 */
  code_03: '03',
  /** 定期自动到期的账单，关联的定期存款详情 */
  code_04: '04',
  /** 支出账单，取消详情 */
  code_05: '05',
  /** 借贷账单，还款详情 */
  code_06: '06',
  /** 还款账单，原借贷账单详情 */
  code_07: '07',
  /** 取消账单，原支出账单详情 */
  code_08: '08',
}

const assBillTypeNm = {
  /** 定期账单(已被中断)，关联的定期转活期的账单详情 */
  '01': '定期存款中断详情',
  /** 定期账单(已到期)，关联的定期存款自动到期账单详情 */
  '02': '定期存款自动到期详情',
  /** 定期转活期的账单，关联的定期存款详情 */
  '03': '原定期存款详情',
  /** 定期自动到期的账单，关联的定期存款详情 */
  '04': '原定期存款详情',
  /** 支出账单，取消详情 */
  '05': '取消详情',
  /** 借贷账单，还款详情 */
  '06': '更多还款详情',
  /** 还款账单，原借贷账单详情 */
  '07': '原借贷账单详情',
  /** 取消账单，原支出账单详情 */
  '08': '原支出账单详情',
}