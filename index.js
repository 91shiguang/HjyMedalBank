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
    await Message.showInformation(Message.BBL0013I);
    // 弹出注册画面对话框
    await PageUtil.openDialogPage(PageId.bblv240, {isNewPswAtn: true});
  }
  // 加载首页的HTML
  changeMainTab(PageId.bblv010, true);
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

  // tab按钮变为未选中
  $('.main-tab').removeClass('active');
  $('.tab-content').removeClass('d-block');
  // tab图片变为未选中
  document.querySelectorAll('.tab-img').forEach(img => {
    const src = img.getAttribute('src');
    img.setAttribute('src', src.replace('_active', ''));
  });
  // 选中目标tab按钮
  $('#main_tab_' + pageId).addClass('active');
  $('#' + pageId).addClass('d-block');
  // 选中目标tab图片
  const src = document.getElementById('tab_img_' + pageId).getAttribute('src');
  document.getElementById('tab_img_' + pageId).setAttribute('src', src.replace('.png', '_active.png'));
  // 播放tab切换的音效
  if (!noAudio) {
    CommonUtils.playAudio('tab_change_audio');
  }
  // 加载目标画面的内容
  await PageUtil.loadTargetPage(pageId);
}


