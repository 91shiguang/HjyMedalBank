/**
 * 账单查询结果画面
 */
class BBLV100View {
  /** 账单数据 */
  billData = [];

  /**
   * 初始化
   */
  onInit() {
    this.refresh();
  }

  /**
   * 画面刷新
   */
  async refresh() {
    // 取得账单数据
    await this.getBillData();
    // 画面表示/隐藏元素
    this.showOrHiddenEle();
    // 绘制账单一览
    this.renderBills();
  }

  /** 
   * 取得账单数据
   */
  async getBillData() {
    // 获取所有的账单
    const billLit = structuredClone(await DataBase.getBillInfFromDB());
    // 将账单按日期从近到远，以月分类
    const billMap = {};
    for (let i = billLit.length - 1; i >= 0; i--) {
      const billInf = billLit[i];
      // 账单时间
      const time = billInf.billTime.substring(0, 7);
      const headerTxt = CommonUtils.transToDtilDate(time);
      if (!billMap[time]) {
        billMap[time] = { headerTxt: headerTxt, data: [] };
      }
      billMap[time].data.push(billInf);
    }
    // 账单数据
    this.billData = Object.values(billMap, {});
  }

  /**
   * 表示/隐藏画面元素
   */
  showOrHiddenEle() {
    // 没有账单数据的场合
    if (this.billData.length === 0) {
      $('#bblv100_data_none').removeClass('d-none');
      $('#bblv100_data_have').addClass('d-none');
    } else {
      $('#bblv100_data_have').removeClass('d-none');
      $('#bblv100_data_none').addClass('d-none');
    }
  }

  /**
   * 绘制账单一览
   */
  renderBills() {
    const container = d3.select('#bblv100_bill_ara');
    // 清除画布
    container.selectAll('*').remove();

    for (let monthIndex = 0; monthIndex < this.billData.length; monthIndex++) {
      const monthInf = this.billData[monthIndex];
      // 添加月模块
      const month = container.append('div').attr('class', 'month');
      // 添加月模块的头部时间
      month.append('div').attr('class', 'bill-header sticky-header').text(monthInf.headerTxt);
      // 添加月模块的主体部分
      const billBody = month.append('div').attr('class', 'bill-body-bg')
        .append('div').attr('class', 'bill-body');

      for (let billIndex = 0; billIndex < monthInf.data.length; billIndex++) {
        const billInf = monthInf.data[billIndex];
        // 添加账单条
        const billLine = billBody.append('div')
          .attr('class', 'w-100')
          .on('click', async () => {
            // 弹出账单详细画面
            const btnType = await PageUtil.openDialogPage(PageId.bblv120, billInf);
            // 点击取消账单的场合
            if (btnType === BtnType.BILLCANCEL) {
              // 刷新画面
              this.refresh();
            }
          });
        const lineConstnt = billLine.append('div').attr('class', 'line-content');
        // 添加左侧内容
        const leftContent = lineConstnt.append('div')
          .attr('class', 'd-flex')
        // 添加左侧图标
        const leftImg = leftContent.append('img')
          .attr('width', '30')
          .attr('height', '30')
          .attr('class', 'me-3');
        // 根据事件设置图标的地址
        leftImg.attr('src', CommonUtils.getBillIcon(billInf.billActionCd));
        // 添加左侧详细
        const leftDetail = leftContent.append('div');
        // 账单事件
        leftDetail.append('div')
          .text(CodeManager.billActionCd[billInf.billActionCd]);
        // 账单简易说明
        leftDetail.append('div').attr('class', 'font-14 color-gary mt-1')
          .classed('error-text', billInf.billActionCd === billActionCd.code_05 && billInf.billTipCd === epsTyCd.code_03)
          .text(CommonUtils.getBillSimpleTip(billInf.billActionCd, billInf.billTipCd));
        // 账单时间
        leftDetail.append('div').attr('class', 'font-14 color-gary mt-1')
          .text(billInf.billTime);
        // 添加右侧内容
        const rightContent = lineConstnt.append('div').attr('class', 'position-relative');
        const rightDetail = rightContent.append('div').attr('class', 'd-flex')
          .classed('error-text', billInf.billActionCd === billActionCd.code_05 && billInf.billTipCd === epsTyCd.code_03);
        // 活期转定期或者定期转活期的场合
        if (billInf.billActionCd === billActionCd.code_03 || billInf.billActionCd === billActionCd.code_04) {
          // 添加循环图标
          rightDetail.append('img').attr('width', '24').attr('height', '24')
            .attr('class', 'me-1').attr('src', 'assets/images/循环.png');
        } else {
          // 添加+或-
          rightDetail.append('div').text(CommonUtils.getExpensePro(billInf.billActionCd));
        }
        // 添加账单金额
        rightDetail.append('div').text(billInf.billCount);
        // 订单被取消的场合
        if (billInf.isCancel) {
          // 添加已取消
          rightContent.append('div').text('已取消').attr('class', 'bill-cancel text-info');
        }
        // 添加分隔线
        if (billIndex !== monthInf.data.length - 1) {
          billLine.append('hr').attr('class', 'line-border');
        }
      }
    }
  }
}