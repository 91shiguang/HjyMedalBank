/**
 * 查询标签主画面
 */
class BBLV010View {
  /**
   * 画面元素的初始化
   */
  onInit() {
    // 隐藏勋章查询和账单查询画面
    $('#bblv010_sub_page').addClass('d-none');
  }

  /** 
   * 点击勋章查询按钮
   */
  async clickMedalSearchBtn() {
    // 隐藏查询标签主画面
    $('#bblv010_main').addClass('d-none');
    // 显示勋章查询画面
    $('#bblv010_sub_page').removeClass('d-none');
    $('#bblv070').removeClass('d-none');
    // 隐藏账单查询画面
    $('#bblv110').addClass('d-none');
    // 加载勋章查询画面
    await PageUtil.loadTargetPage(PageId.bblv070);
  }

  /**
   * 点击账单查询按钮
   */
  async clickBillSearchBtn() {
    // 隐藏查询标签主画面
    $('#bblv010_main').addClass('d-none');
    // 显示账单查询画面
    $('#bblv010_sub_page').removeClass('d-none');
    $('#bblv110').removeClass('d-none');
    // 隐藏勋章查询画面
    $('#bblv070').addClass('d-none');
    // 加载账单查询画面
    await PageUtil.loadTargetPage(PageId.bblv110);
  }

  /**
   * 点击返回按钮
   */
  clickBackBtn() {
    // 隐藏勋章查询和账单查询画面
    $('#bblv010_sub_page').addClass('d-none');
    document.getElementById('bblv070').innerHTML = null;
    document.getElementById('bblv110').innerHTML = null;
    // 显示查询标签主画面
    $('#bblv010_main').removeClass('d-none');
  }
}