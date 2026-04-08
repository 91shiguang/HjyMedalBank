/**
 * 存储标签主画面
 */
class BBLV020View {
  /**
   * 画面元素的初始化
   */
  onInit() {
    // 隐藏勋章存储和抽奖画面
    $('#bblv020_sub_page').addClass('d-none');
  }

  /** 
   * 点击勋章存储按钮
   */
  async clickMedalSaveBtn() {
    // 隐藏存储标签主画面
    $('#bblv020_main').addClass('d-none');
    // 显示勋章存储画面
    $('#bblv020_sub_page').removeClass('d-none');
    $('#bblv140').removeClass('d-none');
    // 隐藏抽奖画面
    $('#bblv160').addClass('d-none');
    // 加载常规存储画面
    await PageUtil.loadTargetPage(PageId.bblv140);
  }

  /**
   * 点击抽奖按钮
   */
  async clickLotteryBtn() {
    // 隐藏存储标签主画面
    $('#bblv020_main').addClass('d-none');
    // 显示抽奖画面
    $('#bblv020_sub_page').removeClass('d-none');
    $('#bblv160').removeClass('d-none');
    // 隐藏勋章存储画面
    $('#bblv140').addClass('d-none');
    // 加载抽奖画面
    await PageUtil.loadTargetPage(PageId.bblv160);
  }

  /**
   * 点击返回按钮
   */
  clickBackBtn() {
    // 隐藏勋章存储和抽奖画面
    $('#bblv020_sub_page').addClass('d-none');
    document.getElementById('bblv140').innerHTML = null;
    document.getElementById('bblv160').innerHTML = null;
    // 显示存储标签主画面
    $('#bblv020_main').removeClass('d-none');
    
  }
}