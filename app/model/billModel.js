/**
 * 账单的数据类型
 */
class BillModel {
  /** 账单ID */
  billId;

  /** 账单说明 */
  billContent;

  /** 账单时间 */
  billTime;

  /** 账单的勋章数量 */
  billCount;

  /** 账单经办人 */
  billPchCd;

  /** 账单提示 */
  billTip;

  // 构造函数：创建实例时自动执行，用于初始化属性
  constructor(billInf) {
    /** 账单ID */
    this.billId = billInf.billId;
    /** 账单说明 */
    this.billContent = billInf.billContent;
    /** 账单时间 */
    this.billTime = billInf.billTime;
    /** 账单的勋章数量 */
    this.billCount = billInf.billCount;
    /** 账单经办人 */
    this.billPchCd = billInf.billPchCd;
    /** 账单提示 */
    this.billTip = billInf.billTip;
  }
}