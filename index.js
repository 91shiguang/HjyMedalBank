// 创建唯一数据库
const medalDB = localforage.createInstance({
  name: DataBase.DATE_BASE_NAME, // 数据库名（唯一）
  version: 1.0,
  description: "勋章管理数据库"
});

// app的初始化
initApplication();

/**
 * 应用初始化
 */
async function initApplication() {
  // 从数据库中获取设置内容
  settingInf = await DataBase.getSettingInfFromDB();
  // 获取不到认证信息的场合
  if (!settingInf.pswAtn) {
    // 弹出未注册的提示框
    await PageUtil.openDialogPage(PageId.bblv260, Message.BBL0013I);
    // 弹出注册画面对话框
    await PageUtil.openDialogPage(PageId.bblv240);
  }
  // 加载查询画面的HTML
  loadTabPage(PageId.bblv010);
}

/**
 * 切换主画面的tab标签
 */
async function changeMainTab(pageId, noAudio) {
  // tab按钮已经是选中状态时
  if ($('#main_tab_' + pageId).hasClass('active')) {
    // 播放点击音效
    if (!noAudio) {
      CommonUtils.playAudio('click_audio');
    }
    return;
  }

  // tab按钮由未选中变为选中
  $('.main-tab').removeClass('active');
  $('.tab-content').removeClass('d-block');
  $('#main_tab_' + pageId).addClass('active');
  $('#' + pageId).addClass('d-block');
  // 播放tab切换的音效
  if (!noAudio) {
    CommonUtils.playAudio('tab_change_audio');
  }
  // 加载目标画面的内容
  await PageUtil.loadTargetPage(pageId);
}


