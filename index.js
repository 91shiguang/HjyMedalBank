

/**
 * 切换主画面的tab标签
 */
function changeMainTab(tabIndex) {
  // tab按钮已经是选中状态时
  if ($('#main_tab_' + tabIndex).hasClass('active')) {
    // 播放点击音效
    document.getElementById('click_audio').play();
    return;
  }
  // tab按钮由未选中变为选中
  // 更改tab按钮的状态, 显示该tab对应的主画面
  $('.main-tab').removeClass('active');
  $('.tab-content').removeClass('d-block');
  $('#main_tab_' + tabIndex).addClass('active');
  $('#tab_content_' + tabIndex).addClass('d-block');
  // 播放tab切换的音效
  document.getElementById('tab_change_audio').play();
  // 加载tab标签画面的HTML
  loadTabPage(tabIndex);
}

/**
 * 加载tab标签画面的HTML
 */
async function loadTabPage(tabIndex) {
  const element = document.getElementById('tab_content_' + tabIndex);
  if (!element.innerHtml) {
    // 获取对应tab主画面的html
    var htmlPath = CommonConstant.blank;
    switch (tabIndex) {
      case 0:
        htmlPath = CommonConstant.searchPageHtml;
        break;
      case 1:
        htmlPath = CommonConstant.savePageHtml;
        break;
      case 2:
        htmlPath = CommonConstant.shopPageHtml;
        break;
      case 3:
        htmlPath = CommonConstant.borrowPageHtml;
        break;
      case 4:
        htmlPath = CommonConstant.settingPageHtml;
        break;
      default:
        break;
    }
  }
  // 把html文件的内容加载到画面元素中
  await CommonUtils.loadHtmlToElement(htmlPath, element);
}
