/**
 * 设置的数据类型
 */
class SettingModel {
  /** 音效开关 */
  audioFlg;

  /** 借用利率 */
  borrowRate;

  /** 借用额度上限 */
  borrowMax;

  /** 借用生成利息计数 */
  borrowRateMedalCount;

  /** 定期利率 */
  fixedRate;

  /** 父母账号密码 */
  password;

  /** 父母密码认证(身份证后六位) */
  pswAtn;

  // 构造函数：创建实例时自动执行，用于初始化属性
  constructor(settingInf) {
    if (settingInf) {
      /** 音效开关 */
      this.audioFlg = settingInf.audioFlg;
      /** 借用利率 */
      this.borrowRate = settingInf.borrowRate;
      /** 借用额度上限 */
      this.borrowMax = settingInf.borrowMax;
      /** 借用生成利息计数 */
      this.borrowRateMedalCount = settingInf.borrowRateMedalCount;
      /** 定期利率 */
      this.fixedRate = settingInf.fixedRate;
      /** 父母账号密码 */
      this.password = settingInf.password;
      /** 父母密码认证(身份证后六位) */
      this.pswAtn = settingInf.pswAtn;
    }
  }
}