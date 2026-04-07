/**
 * 勋章的数据类型
 */
class MedalModel {
  /** 勋章ID */
  medalId;

  /** 勋章状态 */
  saveStateCd;

  /** 存储时间 */
  saveTime;

  /** 定存开始时间 */
  fixedStartTime;

  /** 定存结束时间 */
  fixedEndTime;

  /** 定存办理批次Id */
  fixedId;

  /** 勋章来源 */
  medalSrcCd;

  /** 来源说明 */
  medalSrcTipCd;

  /** 来源详细说明 */
  medalSrcTipDetail;

  /** 存储的经办人 */
  savePchCd;

  /** 借用时间 */
  borrowTime;

  /** 借用说明 */
  borrowContent;

  /** 借用的经办人 */
  borrowPchCd;

  /** 承诺还款时间 */
  pmsRepayTime;

  /** 还款时间 */
  repayTime;

  /** 还款的经办人 */
  repayPchCd;

  /** 支出时间 */
  expenseTime;

  /** 支出类型 */
  expenseTypeCd;

  /** 支出说明 */
  expenseTipDetail;

  /** 支出的经办人 */
  expensePchCd;

  /** 回退情报 */
  backInf;

  // 构造函数：创建实例时自动执行，用于初始化属性
  constructor(medalInf) {
    if (medalInf) {
      /** 勋章ID */
      this.medalId = medalInf.medalId;
      /** 勋章状态 */
      this.saveStateCd = medalInf.saveStateCd;
      /** 存储时间 */
      this.saveTime = medalInf.saveTime;
      /** 定存开始时间 */
      this.fixedStartTime = medalInf.fixedStartTime;
      /** 定存结束时间 */
      this.fixedEndTime = medalInf.fixedEndTime;
      /** 定存办理批次Id */
      this.fixedId = medalInf.fixedId;
      /** 勋章来源 */
      this.medalSrcCd = medalInf.medalSrcCd;
      /** 来源说明 */
      this.medalSrcTip = medalInf.medalSrcTip;
      /** 来源详细说明 */
      this.medalSrcTipDetail = medalInf.medalSrcTipDetail;
      /** 存储的经办人 */
      this.savePchCd = medalInf.savePchCd;
      /** 借用时间 */
      this.borrowTime = medalInf.borrowTime;
      /** 借用说明 */
      this.borrowContent = medalInf.borrowContent;
      /** 借用的经办人 */
      this.borrowPchCd = medalInf.borrowPchCd;
      /** 承诺还款时间 */
      this.pmsRepayTime = medalInf.pmsRepayTime;
      /** 还款时间 */
      this.repayTime = medalInf.repayTime;
      /** 还款的经办人 */
      this.repayPchCd = medalInf.repayPchCd;
      /** 支出时间 */
      this.expenseTime = medalInf.expenseTime;
      /** 支出类型 */
      this.expenseTypeCd = medalInf.expenseTypeCd;
      /** 支出说明 */
      this.expenseTipDetail = medalInf.expenseTipDetail;
      /** 支出的经办人 */
      this.expensePchCd = medalInf.expensePchCd;
      /** 回退情报 */
      this.backInf = medalInf.backInf;
    }
  }
}