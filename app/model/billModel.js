/**
 * 账单的数据类型
 */
class BillModel {
  /** 账单ID */
  billId;

  /** 账单说明区分 */
  billTipCd;

  /** 账单详细说明 */
  billTipDetail;

  /** 账单时间 */
  billTime;

  /** 账单的勋章数量 */
  billCount;

  /** 账单经办人 */
  billPchCd;

  /** 账单事件区分 */
  billActionCd;

  /** 账单事件关联的勋章ID数组 */
  billMedalIdLit = [];

  // 构造函数：创建实例时自动执行，用于初始化属性
  constructor(billInf) {
    if (billInf) {
      /** 账单ID */
      this.billId = billInf.billId;
      /** 账单说明区分 */
      this.billTipCd = billInf.billTipCd;
      /** 账单详细说明 */
      this.billTipDetail = billInf.billTipDetail;
      /** 账单时间 */
      this.billTime = billInf.billTime;
      /** 账单的勋章数量 */
      this.billCount = billInf.billCount;
      /** 账单经办人 */
      this.billPchCd = billInf.billPchCd;
      /** 账单事件区分 */
      this.billActionCd = billInf.billActionCd;
      /** 账单事件关联的勋章ID数组 */
      this.billMedalIdLit = billInf.billMedalIdLit;
    }
  }
}