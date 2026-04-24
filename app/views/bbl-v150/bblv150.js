/**
 * 定期转活期、定期批次选择对话框画面
 */
class BBLV150View {
  /** 识别ID */
  recognitionId;

  /** 账单数据 */
  fixedBills = [];

  /**
   * 初始化
   */
  async onInit(params) {
    // 识别ID
    this.recognitionId = params.recognitionId;
    // 源主画面ID
    const pageFrom = params.input;
    // 取得定期存款的账单数据
    await this.getFixedBillData(pageFrom);
    // 绘制定期存款一览
    this.renderFixedBills(pageFrom);
  }

  /** 
   * 取得账单数据
   */
  async getFixedBillData(pageFrom) {
    // 获取所有的账单
    const billLit = structuredClone(await DataBase.getBillInfFromDB());
    // 获取所有在存定期存款的账单数据
    this.fixedBills = billLit.filter(bill => !CommonUtils.isNumberEmpty(bill.fixedId) && bill.assBillIdLit.length === 0);
    // 首页迁移的场合
    if (pageFrom === PageId.bblv010) {
      // 将账单按定存计划结束时间由近到远排序
      this.fixedBills.sort((a, b) => a.fixedEndTime.localeCompare(b.fixedEndTime));
      // 设置画面标题
      document.getElementById('bblv150_title').innerText = '定期资产一览';
      // 设置关闭按钮标题
      document.getElementById('bblv150_footer_btn').innerText = '关闭';

      // 存储画面迁移的场合
    } else {
      // 将账单按定存计划结束时间由远到近排序
      this.fixedBills.sort((a, b) => b.fixedEndTime.localeCompare(a.fixedEndTime));
      // 设置画面标题
      document.getElementById('bblv150_title').innerText = '请选择一款定期';
      // 设置取消按钮标题
      document.getElementById('bblv150_footer_btn').innerText = '取消';
    }
  }

  /**
   * 绘制定期存款一览
   */
  renderFixedBills(pageFrom) {
    const container = d3.select('#bblv150_fixed_data');
    // 清除画布
    container.selectAll('*').remove();

    for (let billIndex = 0; billIndex < this.fixedBills.length; billIndex++) {
      const billInf = this.fixedBills[billIndex];
      // 添加账单条
      const billLine = container.append('div')
        .attr('class', 'bill-line')
        .classed('mt-3', billIndex !== 0)
        .on('click', async () => {
          // 存储画面迁移的场合
          if (pageFrom === PageId.bblv140) {
            // 弹出选择的定期存款详细对话框画面
            const btnType = await PageUtil.openDialogPage(PageId.bblv130, billInf);
            // 点击确定的场合
            if (btnType === BtnType.CONFIRM) {
              PageUtil.emitDialog(this.recognitionId, {btnType: BtnType.CONFIRM, selFixedBillId: billInf.billId, billCount: billInf.billCount});
            }
          }
        });
      const lineConstnt = billLine.append('div').attr('class', 'line-content');
      // 添加左侧内容
      const leftContent = lineConstnt.append('div')
        .attr('class', 'd-flex')
      // 添加左侧图标
      leftContent.append('img')
        .attr('width', '30')
        .attr('height', '30')
        .attr('class', 'me-3')
        .attr('src', 'assets/images/定期存款.png');
      // 添加左侧详细
      const leftDetail = leftContent.append('div');
      // 账单事件
      leftDetail.append('div')
        .text(CodeManager.billActionCd[billInf.billActionCd]);
      // 定存存期
      leftDetail.append('div').attr('class', 'font-14 color-gary mt-1')
        .text(CodeManager.termCd[billInf.termCd]);
      // 剩余时间
      const remain = leftDetail.append('div').attr('class', 'd-flex mt-1 align-items-center');
      remain.append('div').attr('class', 'font-14 color-gary me-1').text('剩余');
      remain.append('div').text(CommonUtils.calculateFixedRemainTime(billInf.fixedEndTime) + '天');
      // 添加右侧内容
      const rightContent = lineConstnt.append('div').attr('class', 'd-flex');
      // 活期转定期的场合
      if (billInf.billActionCd === billActionCd.code_03) {
        // 添加循环图标
        rightContent.append('img').attr('width', '24').attr('height', '24')
          .attr('class', 'me-1').attr('src', 'assets/images/循环.png');
      } else {
        // 添加+
        rightContent.append('div').text('+');
      }
      // 添加账单金额
      rightContent.append('div').text(billInf.billCount);
    }
  }

  /**
   * 关闭/取消
   */
  close() {
    CommonUtils.playAudio('click_audio');
    PageUtil.emitDialog(this.recognitionId, {btnType: BtnType.CLOSE});
  }
}