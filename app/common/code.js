/**
 * 区分管理
 */
class Code {

  /** 勋章状态区分 */
  static medalCdNm = 'medalCd';
  static medalCd = {
    'code_01': {code: '01', name: '活期勋章'},
    'code_02': {code: '02', name: '定期勋章'},
    'code_03': {code: '03', name: '借用勋章'},
    'code_04': {code: '04', name: '已还款勋章'},
    'code_05': {code: '05', name: '已支出勋章'},
    'code_06': {code: '06', name: '已提现勋章'},
    'code_07': {code: '07', name: '罚扣勋章'},
  };

  /** 经办人区分 */
  static pchCdNm = 'pchCd';
  static pchCd = {
    'code_01': {code: '01', name: '妈妈'},
    'code_02': {code: '02', name: '爸爸'},
  };

  /** 选中/未选中区分 */
  static switchCdNm = 'switchCd';
  static switchCd = {
    'code_0': {code: '0', name: '选中'},
    'code_1': {code: '1', name: '未选中'},
  }

  /** 存储类型区分 */
  static saveTypeCdNm = 'saveTypeCd';
  static saveTypeCd = {
    'code_01': {code: '01', name: '活期勋章'},
    'code_02': {code: '02', name: '定期勋章'},
  }

  /** 支出类型区分 */
  static expenseTypeCdNm = 'expenseTypeCd';
  static expenseTypeCd = {
    'code_01': {code: '01', name: '消费支出'},
    'code_02': {code: '02', name: '提现支出'},
  }

  /** 获取code值 */
  static getCode(child, codeKey) {
    return this[child][codeKey].code;
  }

  /** 根据code值获取code名称 */
  static getCodeName(child, code) {
    return this[child]['code_' + code].name;
  }
}

