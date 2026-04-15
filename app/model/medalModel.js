/**
 * 勋章的数据类型
 */
class MedalModel {
  /** 勋章ID */
  medalId;

  /** 勋章状态 */
  saveStateCd;

  /** 定存开始时间 */
  fixedStartTime;

  /** 定存结束时间 */
  fixedEndTime;

  /** 定存办理批次Id */
  fixedId;

  /** 借贷时间 */
  borrowTime;

  /** 借贷办理批次Id */
  borrowId;

  /** 承诺还款时间 */
  pmsRepayTime;

  /** 实际还款时间 */
  repayTime;

  /** 回退情报 */
  backInf;

  // 构造函数：创建实例时自动执行，用于初始化属性
  constructor(medalInf) {
    if (medalInf) {
      /** 勋章ID */
      this.medalId = medalInf.medalId;
      /** 勋章状态 */
      this.saveStateCd = medalInf.saveStateCd;
      /** 定存开始时间 */
      this.fixedStartTime = medalInf.fixedStartTime;
      /** 定存结束时间 */
      this.fixedEndTime = medalInf.fixedEndTime;
      /** 定存办理批次Id */
      this.fixedId = medalInf.fixedId;
      /** 借贷时间 */
      this.borrowTime = medalInf.borrowTime;
      /** 借贷办理批次Id */
      this.borrowId = medalInf.borrowId;
      /** 承诺还款时间 */
      this.pmsRepayTime = medalInf.pmsRepayTime;
      /** 实际还款时间 */
      this.repayTime = medalInf.repayTime;
      /** 回退情报 */
      this.backInf = medalInf.backInf;
    }
  }
}