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

  /** 存单编号 */
  fixedId;

  /** 定存存期 */
  termCd;

  /** 定存计划结束时间 */
  fixedEndTime;

  /** 借贷办理编号 */
  borrowId;

  /** 借贷利息累计 */
  borrowInterest = 0;

  /** 前回计算利息时间 */
  lstIntClcDatTs;

  /** 关联账单ID数组 */
  assBillIdLit = [];

  /** 消费支出账单绑定的勋章ID数组 */
  expenseMedalIdLit = [];
}