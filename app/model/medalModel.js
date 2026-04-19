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

  /** 定存自动结束时间 */
  fixedEndTime;

  /** 定存办理批次Id */
  fixedId;

  /** 定存存期 */
  termCd;

  /** 借贷时间 */
  borrowTime;

  /** 借贷办理批次Id */
  borrowId;
}