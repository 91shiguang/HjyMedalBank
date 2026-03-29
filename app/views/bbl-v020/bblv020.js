class BBLV020View {
  /**
   * 画面元素的初始化
   */
  onInit() {
    // 存储经办人：妈妈
    CommonUtils.clickRadio('savePch', 'savePch_01');
    // 存储时间：现在时间
    document.getElementById('saveTime').value = CommonUtils.getDateEx(new Date());
    // 存储数量：1
    document.getElementById('saveCount').value = 1;
    // 限制输入存储数量的数字类型为0以上的整数
    CommonUtils.limitMedalCountInput('saveCount');
    // 存储类型：活期
    CommonUtils.clickRadio('saveType', 'saveType_01');
    // 勋章来源：新增
    CommonUtils.clickRadio('medalSource', 'medalSource_01');
    // 勋章来源说明：学习奖励
    CommonUtils.clickRadio('mdlSrcTip', 'mdlSrcTip_01');
    // 勋章来源详细说明的字数限制
    CommonUtils.limitDetailTextarea('mdlSrcTipFree');
  }

  /** 
   * 点击勋章来源的单选框
   */
  clickMedalSrcRadio(value) {
    CommonUtils.clickRadio('medalSource', 'medalSource_' + value);
    // 新增的场合
    if (value === '01') {
      if ($('#mdl_src_tip').hasClass('d-none')) {
        // 显示勋章来源说明
        $('#mdl_src_tip').removeClass('d-none');
        $('#mdl_src_tip').addClass('d-flex');
      }

      // 转存的场合
    } else {
      if ($('#mdl_src_tip').hasClass('d-flex')) {
        // 隐藏勋章来源说明
        $('#mdl_src_tip').removeClass('d-flex');
        $('#mdl_src_tip').addClass('d-none');
      }
    }
  }

  /**
   * 点击确认存储按钮
   */
  clickSaveButton() {
    // 获取存储类型
    const saveType = CommonUtils.getRadioCheckedValue('saveType');
    
  }
}