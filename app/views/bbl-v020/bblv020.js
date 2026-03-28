class BBLV020View {
  /**
   * 画面元素的初始化
   */
  onInit() {
    // 存储经办人：妈妈
    CommonUtils.clickRadio('savePch', 'savePch_01');
    // 存储类型：活期
    CommonUtils.clickRadio('saveType', 'saveType_01');
    // 勋章来源：新增
    CommonUtils.clickRadio('medalSource', 'medalSource_01');
    // 存储时间：现在时间
    document.getElementById('saveTime').value = CommonUtils.getDateEx(new Date());
    // 存储数量：1
    document.getElementById('saveCount').value = 1;
  }
  /**
   * 点击确认存储按钮
   */
  clickSaveButton() {
    // 获取存储类型
    const saveType = CommonUtils.getRadioCheckedValue('saveType');
    
  }
}