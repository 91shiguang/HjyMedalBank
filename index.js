/**
 * 应用初始化
 */
async function initApplication() {
  // 从数据库中获取设置内容
  settingInf = await DataBase.getSettingInfFromDB();
  // 获取不到认证信息的场合
  if (!settingInf.pswAtn) {
    // 切换到设置标签
    $('.main-tab').removeClass('active');
    $('.tab-content').removeClass('d-block');
    $('#main_tab_4').addClass('active');
    $('#tab_content_4').addClass('d-block');
    // 加载设置画面的HTML
    loadTabPage(4);
    // 给tab标签画面内容设置初始内容
    initTabPageItems(4);
  } else {
    // 加载查询画面的HTML
    loadTabPage(0);
  }
}

/**
 * 切换主画面的tab标签
 */
async function changeMainTab(tabIndex) {
  // tab按钮已经是选中状态时
  if ($('#main_tab_' + tabIndex).hasClass('active')) {
    // 播放点击音效
    CommonUtils.playAudio('click_audio');
    return;
  }
  // tab按钮由未选中变为选中
  // 更改tab按钮的状态, 显示该tab对应的画面
  $('.main-tab').removeClass('active');
  $('.tab-content').removeClass('d-block');
  $('#main_tab_' + tabIndex).addClass('active');
  $('#tab_content_' + tabIndex).addClass('d-block');
  // 播放tab切换的音效
  CommonUtils.playAudio('tab_change_audio');
  // tab标签画面的innerHTML
  const innerHTML = document.getElementById('tab_content_' + tabIndex).innerHTML;
  // 避免重复加载HTML
  if (!innerHTML) {
    // 加载tab标签画面的HTML
    await loadTabPage(tabIndex);
    // 给tab标签画面内容设置初始内容
    initTabPageItems(tabIndex);
  } else {
    // 刷新标签画面内容
    refreshTabPage(tabIndex);
  }
  
}

/**
 * 加载tab标签画面的HTML
 */
async function loadTabPage(tabIndex) {
  const element = document.getElementById('tab_content_' + tabIndex);
  if (!element.innerHTML) {
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

/**
 * 给tab标签画面内容设置初始内容
 */
function initTabPageItems(tabIndex) {
  setTimeout(() => {
    switch (tabIndex) {
      // case 0:
      //   htmlPath = CommonConstant.searchPageHtml;
      //   break;
      case 1:
        bblv020.onInit();
        break;
      case 2:
        bblv030.onInit();
        break;
      // case 3:
      //   htmlPath = CommonConstant.borrowPageHtml;
      //   break;
      // case 4:
      //   htmlPath = CommonConstant.settingPageHtml;
      //   break;
      default:
        break;
    }
  });
}

/**
 * 刷新标签画面内容
 */
function refreshTabPage(tabIndex) {
  switch (tabIndex) {
    // case 0:
    //   htmlPath = CommonConstant.searchPageHtml;
    //   break;
    // case 1:
    //   htmlPath = CommonConstant.savePageHtml;
    //   break;
    case 2:
      bblv030.refreshPage();
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


