class BBLV010View {
  /** 
   * 点击勋章查询/回退按钮
   */
  async clickMedalSearchOrBackBtn() {
    // 从数据库中取得现有所有的勋章
    const medalLit = await DataBase.getMedalInfFromDB();
    if (medalLit.length === 0) {
      alert('你暂时没有勋章哦, 好好表现，加油赚取吧！(*^_^*)');
    } else {
      alert('你现在有'+ medalLit.length + '个勋章哦, 继续努力吧！');
    }
    
  }
}