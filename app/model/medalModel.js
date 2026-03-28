/**
 * 勋章的数据类型
 */
class MedalModel {
  /** 勋章ID */
  medalId;

  /** 存储时间 */
  saveTime;

  /** 存储类型 */
  saveTypeCd;

  /** 存储说明 */
  saveContent;

  /** 存储的经办人 */
  savePchCd;

  /** 借用时间 */
  borrowTime;

  /** 借用说明 */
  borrowContent;

  /** 借用的经办人 */
  borrowPchCd;

  /** 还款时间 */
  repayTime;

  /** 还款的经办人 */
  repayPchCd;

  /** 支出时间 */
  expenseTime;

  /** 支出类型 */
  expenseTypeCd;

  /** 支出说明 */
  expenseContent;

  /** 支出的经办人 */
  expensePchCd;

  /** 罚扣时间 */
  deductTime;

  /** 罚扣说明 */
  deductContent;

  /** 罚扣的经办人 */
  deductPchCd;

  // 构造函数：创建实例时自动执行，用于初始化属性
  constructor(medalInf) {
    /** 勋章ID */
    this.medalId = medalInf.medalId;
    /** 存储时间 */
    this.saveTime = medalInf.saveTime;
    /** 存储类型 */
    this.saveTypeCd = medalInf.saveTypeCd;
    /** 存储说明 */
    this.saveContent = medalInf.saveContent;
    /** 存储的经办人 */
    this.savePchCd = medalInf.savePchCd;
    /** 借用时间 */
    this.borrowTime = medalInf.borrowTime;
    /** 借用说明 */
    this.borrowContent = medalInf.borrowContent;
    /** 借用的经办人 */
    this.borrowPchCd = medalInf.borrowPchCd;
    /** 还款时间 */
    this.repayTime = medalInf.repayTime;
    /** 还款的经办人 */
    this.repayPchCd = medalInf.repayPchCd;
    /** 支出时间 */
    this.expenseTime = medalInf.expenseTime;
    /** 支出类型 */
    this.expenseTypeCd = medalInf.expenseTypeCd;
    /** 支出说明 */
    this.expenseContent = medalInf.expenseContent;
    /** 支出的经办人 */
    this.expensePchCd = medalInf.expensePchCd;
    /** 罚扣时间 */
    this.deductTime = medalInf.deductTime;
    /** 罚扣说明 */
    this.deductContent = medalInf.deductContent;
    /** 罚扣的经办人 */
    this.deductPchCd = medalInf.deductPchCd;
  }
}