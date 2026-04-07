/**
 * 查询标签主画面
 */
class BBLV010View {
  /** 
   * 点击勋章查询
   */
  async clickMedalSearch() {
    // 从数据库中取得现有所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    // 获取可以使用的勋章
    const effectiveCount = medalLit.filter(item => item.saveStateCd === mdlCd.code_01).length;
    if (effectiveCount === 0) {
      // 播放伤心音效
      CommonUtils.playAudio('sad_audio');
      alert('你暂时没有勋章哦, 好好表现，加油赚取吧！(*^_^*)');
    } else {
      CommonUtils.playAudio('expense_success_audio');
      alert('你现在有'+ effectiveCount + '个勋章哦, 继续努力吧！');
    }
    
  }

  /**
   * 点击账单查询
   */
  async clickBillSearchOrBackBtn() {
    const result = await PageUtil.openDialogPage(PageId.bblv240);
  }
}