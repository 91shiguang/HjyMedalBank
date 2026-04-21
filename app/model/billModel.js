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

  /** 定存办理编号 */
  fixedId;

  /** 定存存期 */
  termCd;

  /** 定存计划结束时间 */
  fixedEndTime;

  /** 借贷办理编号 */
  borrowId;

  /** 关联账单ID数组 */
  assBillIdLit = [];

  /** 取消理由 */
  cancelReason;

  /** 取消订单flg */
  isCancel;
}