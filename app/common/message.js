/**
 * 错误/警告/提示的文言
 */
class Message {
  /** 从DB中取数据时发生异常的错误内容 */
  static BBL0001E = {messageId: 'BBL0001E', message: '完啦！拿数据的时候出现异常了！💔'};
  /** 存储数据时发生异常的错误内容 */
  static BBL0002E = {messageId: 'BBL0002E', message: '完啦！数据储存出现异常了！💔'};
  /** 清空数据时发生异常的错误内容 */
  static BBL0003E = {messageId: 'BBL0003E', message: '完啦！数据储存出现异常了！💔'};
  /** 新增存储成功的提示内容 */
  static BBL0004I = {messageId: 'BBL0004I', message: '你的付出与汗水已成功转为勋章，让我们再接再厉，努力提高自己吧！🎉🎉🎉'};
  /** 活期转定期成功的提示内容 */
  static BBL0005I = {messageId: 'BBL0005I', message: '定期存款已经转存成功啦，一定要坚持到最后哦。💪'};
  /** 定期转活期时，不存在定期款项的错误内容 */
  static BBL0006E = {messageId: 'BBL0006E', message: '目前还没有定期存款哦。'};
  /** 定期转活期确认时的确认内容 */
  static BBL0007C = {messageId: 'BBL0007C', message: '提前结束定期会让你损失利息哦，确定要结束当前的定期款项吗❓'};
  /** 定期转活期成功的提示内容 */
  static BBL0008I = {messageId: 'BBL0008I', message: '定期存款已取出，好可惜哦，离拿到利息就差一点了呢。😿'};
  /** 日常消费支出成功的提示内容 */
  static BBL0009I = {messageId: 'BBL0009I', message: '恭喜你通过自己的努力买到了想要的东西，让我们在学会独立的过程中不断成长吧！\^o^/'};
  /** 提现成功的提示内容 */
  static BBL0010I = {messageId: 'BBL0010I', message: '你有了自己的现金，要学会合理分配、理智消费哦(*^_^*)'};
  /** 罚扣成功的提示内容 */
  static BBL0011I = {messageId: 'BBL0011I', message: '犯了错不算什么，但一定要改正哦，希望这是我们最后一次罚扣了。🤜🤛'};
  /** 支出时，可支配的勋章数量不足提示内容 */
  static BBL0012I = { messageId: 'BBL0012I', message: '可自由支配的勋章余额不足哦，快去努力赚取吧！O(∩_∩)O' };
  /** 没有注册信息时的提示 */
  static BBL0013I = { messageId: 'BBL0013I', message: '未检测到勋章银行的账户，请先注册吧。' };
  /** 活期转定期时，非借用的勋章数量不足提示内容 */
  static BBL0014I = { messageId: 'BBL0014I', message: '定期存款必须是非借用的勋章哦，你的余额还不足呢，减少定期存款的金额试试呢！O(∩_∩)O' };
  
  /**
   * 显示提示画面
   */
  static async showInformation(message) {
    // 识别ID
    const recognitionId = PageId.bblv260 + '_information';
    // 创建提示框元素
    d3.select('#information_dialog')
      .append('div')
      .attr('id', PageId.bblv260)
      .attr('class', 'w-100 d-flex justify-content-center');
    // 获取提示框元素l
    const bblv260El = document.getElementById(PageId.bblv260);
    // 添加提示框点击事件返回的监听事件
    const wait = new Promise(resolve => {
      const handler = (result) => {
        resolve(result.detail);
        // 关闭提示框画面
        $('#information_dialog').addClass('d-none');
        bblv260El.remove();
        window.removeEventListener(recognitionId, handler);
      };
      window.addEventListener(recognitionId, handler);
    });

    // 加载提示画面的内容
    const params = {recognitionId: recognitionId, input: message}
    PageUtil.loadTargetPage(PageId.bblv260, params);

    // 打开提示框画面
    $('#information_dialog').removeClass('d-none');

    return await wait;
  }
}