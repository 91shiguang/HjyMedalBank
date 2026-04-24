/**
 * 首页主画面
 */
class BBLV010View {
  /**
   * 画面元素的初始化
   */
  onInit() {
    // 隐藏存储主画面和账单查询画面
    $('#bblv010_sub_page').addClass('d-none');
    this.refresh();
  }

  /**
   * 画面刷新
   */
  async refresh() {
    // 从数据库中取得现有所有的勋章
    let list = await DataBase.getMedalInfFromDB();
    // 获取活期勋章数量
    const currentCount = list.filter(item =>
      // 活期勋章
      item.saveStateCd === mdlCd.code_01
    ).length;
    // 获取定期勋章的数量
    const fixedCount = list.filter(item =>
      // 定期勋章
      item.saveStateCd === mdlCd.code_02
    ).length;
    // 活期资产设定值
    document.getElementById('current_assets').innerText = CommonUtils.addComma(currentCount);
    // 定期资产设定值
    document.getElementById('fixed_assets').innerText = CommonUtils.addComma(fixedCount);
    // 定期资产link
    $('#fixed_div').removeClass('fixed-link');
    if (fixedCount > 0) {
      $('#fixed_div').addClass('fixed-link');
    }
  }

  /** 
   * 点击存储按钮
   */
  async clickSaveBtn() {
    CommonUtils.playAudio('click_audio');
    // 隐藏查询标签主画面
    $('#bblv010_main').addClass('d-none');
    // 显示存储画面
    $('#bblv010_sub_page').removeClass('d-none');
    $('#bblv140').removeClass('d-none');
    // 隐藏其他子画面画面
    $('#bblv160').addClass('d-none');
    $('#bblv030').addClass('d-none');
    $('#bblv100').addClass('d-none');
    // 隐藏过滤按钮
    $('#filter_btn').addClass('d-none');
    // 隐藏底部菜单
    $('#main_footer').addClass('d-none');
    // 标题设置为存储
    document.getElementById('bblv010_title').innerText = '存储';
    // 主题背景颜色变为浅蓝色
    PageUtil.setMainBgWathet();
    // 加载勋章查询画面
    await PageUtil.loadTargetPage(PageId.bblv140);
  }

  /**
   * 点击支出按钮
   */
  async clickExpenseBtn() {
    CommonUtils.playAudio('click_audio');
    // 隐藏查询标签主画面
    $('#bblv010_main').addClass('d-none');
    // 显示支出画面
    $('#bblv010_sub_page').removeClass('d-none');
    $('#bblv030').removeClass('d-none');
    // 隐藏其他子画面画面
    $('#bblv140').addClass('d-none');
    $('#bblv160').addClass('d-none');
    $('#bblv100').addClass('d-none');
    // 隐藏过滤按钮
    $('#filter_btn').addClass('d-none');
    // 隐藏底部菜单
    $('#main_footer').addClass('d-none');
    // 标题设置为支出
    document.getElementById('bblv010_title').innerText = '支出';
    // 主题背景颜色变为浅蓝色
    PageUtil.setMainBgWathet();
    // 加载勋章查询画面
    await PageUtil.loadTargetPage(PageId.bblv030);
  }

  /**
   * 点击抽奖按钮
   */
  async clickLotteryBtn() {
    CommonUtils.playAudio('click_audio');
    // 隐藏查询标签主画面
    $('#bblv010_main').addClass('d-none');
    // 显示抽奖画面
    $('#bblv010_sub_page').removeClass('d-none');
    $('#bblv160').removeClass('d-none');
    // 隐藏其他子画面画面
    $('#bblv140').addClass('d-none');
    $('#bblv030').addClass('d-none');
    $('#bblv100').addClass('d-none');
    // 隐藏过滤按钮
    $('#filter_btn').addClass('d-none');
    // 隐藏底部菜单
    $('#main_footer').addClass('d-none');
    // 标题设置为抽奖
    document.getElementById('bblv010_title').innerText = '抽奖';
    // 主题背景颜色变为浅蓝色
    PageUtil.setMainBgWathet();
    // 加载勋章查询画面
    await PageUtil.loadTargetPage(PageId.bblv160);
  }

  /**
   * 点击账单按钮
   */
  async clickBillBtn() {
    CommonUtils.playAudio('click_audio');
    // 隐藏查询标签主画面
    $('#bblv010_main').addClass('d-none');
    // 显示账单画面
    $('#bblv010_sub_page').removeClass('d-none');
    $('#bblv100').removeClass('d-none');
    // 隐藏其他子画面画面
    $('#bblv140').addClass('d-none');
    $('#bblv030').addClass('d-none');
    $('#bblv160').addClass('d-none');
    // 显示过滤按钮
    $('#filter_btn').removeClass('d-none');
    // 隐藏底部菜单
    $('#main_footer').addClass('d-none');
    // 标题设置为账单
    document.getElementById('bblv010_title').innerText = '账单';
    // 主题背景颜色变为浅蓝色
    PageUtil.setMainBgWathet();
    // 加载勋章账单画面
    await PageUtil.loadTargetPage(PageId.bblv100);
  }

  /**
   * 点击返回按钮
   */
  async clickBackBtn() {
    CommonUtils.playAudio('click_audio');
    // 隐藏勋章查询和账单查询画面
    $('#bblv010_sub_page').addClass('d-none');
    document.getElementById('bblv140').innerHTML = null;
    document.getElementById('bblv160').innerHTML = null;
    document.getElementById('bblv030').innerHTML = null;
    document.getElementById('bblv100').innerHTML = null;
    // 显示查询标签主画面
    $('#bblv010_main').removeClass('d-none');
    // 显示底部菜单
    $('#main_footer').removeClass('d-none');
    // 主题背景颜色变为粉色
    PageUtil.setMainBgPink();
    await this.refresh();
  }

  /**
   * 点击定期资产链接
   */
  async clickFixedAssetsLink() {
    CommonUtils.playAudio('click_audio');
    // 不存在定期资产的场合
    if (!$('#fixed_div').hasClass('fixed-link')) {
      return;
    }
    // 显示定期资产一览
    await PageUtil.openDialogPage(PageId.bblv150, PageId.bblv010);
  }
}