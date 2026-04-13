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
    // 实现虚拟滚动加载更多数据
    const container = document.getElementById('bblv100_data_have');
    container.addEventListener('scroll', ()=> {
      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      if (scrollHeight - scrollTop <= clientHeight + 100) { // 当滚动到接近底部时
        this.loadData(); // 模拟加载更多数据
      }
    });
    this.refresh();
  }

  /**
   * 画面刷新
   */
  async refresh() {
    // 取得账单数据
    // await this.getBillData();
    this.billData = this.generateBillData(100);
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
          .attr('class', 'bill-line')
          .on('click', () => {
            alert(`点击了账单 ID: ${billInf.billId}`);
          });
        // 添加左侧内容
        const leftContent = billLine.append('div')
          .attr('class', 'd-flex')
        // 添加左侧图标
        const leftImg = leftContent.append('img').attr('width', '30')
        // TODO 根据事件设置图标的地址
        leftImg.attr('src', 'assets/images/支出.png')
        // 添加左侧详细
        const leftDetail = leftContent.append('div');
        // TODO 账单事件
        leftDetail.append('p').text(`账单类型: ${billInf.billTipDetail}`);
        leftDetail.append('p').text(`时间: ${billInf.billTime}`);
        leftDetail.append('p').text(`金额: ¥${billInf.billCount}`);
        leftDetail.append('p').text(`账单编号: ${billInf.billId}`);
        // TOTO 添加右侧内容
        // 添加分隔线
        billLine.append('br');
        billLine.append('hr').attr('class', 'line-border');
      }
      
    }
  }

  // 生成随机账单数据
  generateBillData(num) {
        const billTypes = ['01', '02', '03'];
        const billDetails = ['测试详细内容', '测试详细内容', '测试详细内容', '测试详细内容'];
        const billActions = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
        const medalIds = [1, 2, 3, 4, 5];
        
        const billData = [];
        for (let i = 0; i < num; i++) {
            const month = `2026年${(Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0')}月`;
            const billId = i + 1;
            const billTipCd = billTypes[Math.floor(Math.random() * billTypes.length)];
            const billTipDetail = billDetails[Math.floor(Math.random() * billDetails.length)];
            const billTime = new Date(2026, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60)).toISOString().replace('T', ' ').substring(0, 19);
            const billCount = (Math.random() * 1000).toFixed(2);
            const billPchCd = '01';
            const billActionCd = billActions[Math.floor(Math.random() * billActions.length)];
            const billMedalIdLit = [medalIds[Math.floor(Math.random() * medalIds.length)]];

            const billItem = {
                billId,
                billTipCd,
                billTipDetail,
                billTime,
                billCount,
                billPchCd,
                billActionCd,
                billMedalIdLit
            };

            // Check if the month already exists
            let monthData = billData.find(item => item.headerTxt === month);
            if (!monthData) {
                monthData = {
                    headerTxt: month,
                    data: []
                };
                billData.push(monthData);
            }
            
            // Add the generated bill to the corresponding month
            monthData.data.push(billItem);
        }
        
        return billData;
    }


}