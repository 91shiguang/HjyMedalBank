// 页面管理的文件

/** 查询标签主画面用js对象 */
const bblv010 = new BBLV010View();
/** 存储标签主画面用js对象 */
const bblv020 = new BBLV020View();
/** 支出标签主画面用js对象 */
const bblv030 = new BBLV030View();
/** 借用标签主画面用js对象 */
const bblv040 = new BBLV040View();
/** 设置标签主画面用js对象 */
const bblv050 = new BBLV050View();
/** 勋章查询结果画面用js对象 */
const bblv060 = new BBLV060View();
// /** 勋章查询条件对话框画面用js对象 */
// const bblv070 = new BBLV070View();
// /** 勋章详细信息对话框画面用js对象 */
// const bblv080 = new BBLV080View();
// /** 勋章历史记录对话框画面用js对象 */
// const bblv090 = new BBLV090View();
// /** 账单查询结果画面用js对象 */
// const bblv100 = new BBLV100View();
// /** 账单查询条件对话框画面用js对象 */
// const bblv110 = new BBLV110View();
// /** 账单详细信息对话框画面用js对象 */
// const bblv120 = new BBLV120View();
// /** 显示账单对应勋章对话框画面用js对象 */
// const bblv121 = new BBLV121View();
// /** 常规存储画面用js对象 */
// const bblv130 = new BBLV130View();
// /** 定期转活期、定期批次选择对话框画面用js对象 */
// const bblv140 = new BBLV140View();
// /** 抽奖画面用js对象 */
// const bblv150 = new BBLV150View();
// /** 增加抽奖次数对话框画面用js对象 */
// const bblv151 = new BBLV151View();
// /** 抽奖选项对话框画面用js对象 */
// const bblv152 = new BBLV152View();
// /** 借用记录详细信息对话框画面用js对象 */
// const bblv160 = new BBLV160View();
// /** 还款记录详细信息对话框画面用js对象 */
// const bblv170 = new BBLV170View();
// /** 去借款对话框画面用js对象 */
// const bblv180 = new BBLV180View();
// /** 还款对象一览对话框画面用js对象 */
// const bblv190 = new BBLV190View();
// /** 还款详细对话框画面用js对象 */
// const bblv200 = new BBLV200View();
// /** 账号、密码注册/修改密码对话框画面用js对象 */
// const bblv210 = new BBLV210View();
// /** 密码验证对话框画面用js对象 */
// const bblv220 = new BBLV220View();
// /** 提示信息对话框画面用js对象 */
// const bblv230 = new BBLV230View();
// /** 警告信息对话框画面用js对象 */
// const bblv240 = new BBLV240View();
// /** 错误信息对话框画面用js对象 */
// const bblv250 = new BBLV250View();
// /** 确认信息对话框画面用js对象 */
// const bblv260 = new BBLV260View();
// /** 定期结束提示对话框画面用js对象 */
// const bblv270 = new BBLV270View();

/** 画面ID管理 */
const PageId = {
  /** 查询标签主画面 */
  bblv010: 'bblv010',
  /** 存储标签主画面 */
  bblv020: 'bblv020',
  /** 支出标签主画面*/
  bblv030: 'bblv030',
  /** 借用标签主画面 */
  bblv040: 'bblv040',
  /** 设置标签主画面 */
  bblv050: 'bblv050',
  /** 勋章查询结果画面 */
  bblv060: 'bblv060',
  /** 勋章查询条件对话框画面 */
  bblv070: 'bblv070',
  /** 勋章详细信息对话框画面 */
  bblv080: 'bblv080',
  /** 勋章历史记录对话框画面 */
  bblv090: 'bblv090',
  /** 账单查询结果画面 */
  bblv100: 'bblv100',
  /** 账单查询条件对话框画面 */
  bblv110: 'bblv110',
  /** 账单详细信息对话框画面 */
  bblv120: 'bblv120',
  /** 显示账单对应勋章对话框画面 */
  bblv121: 'bblv121',
  /** 常规存储画面 */
  bblv130: 'bblv130',
  /** 定期转活期、定期批次选择对话框画面 */
  bblv140: 'bblv140',
  /** 抽奖画面 */
  bblv150: 'bblv150',
  /** 增加抽奖次数对话框画面 */
  bblv151: 'bblv151',
  /** 抽奖选项对话框画面 */
  bblv152: 'bblv152',
  /** 借用记录详细信息对话框画面 */
  bblv160: 'bblv160',
  /** 还款记录详细信息对话框画面 */
  bblv170: 'bblv170',
  /** 去借款对话框画面 */
  bblv180: 'bblv180',
  /** 还款对象一览对话框画面 */
  bblv190: 'bblv190',
  /** 还款详细对话框画面 */
  bblv200: 'bblv200',
  /** 账号、密码注册/修改密码对话框画面 */
  bblv210: 'bblv210',
  /** 密码验证对话框画面 */
  bblv220: 'bblv220',
  /** 提示信息对话框画面 */
  bblv230: 'bblv230',
  /** 警告信息对话框画面 */
  bblv240: 'bblv240',
  /** 错误信息对话框画面 */
  bblv250: 'bblv250',
  /** 确认信息对话框画面 */
  bblv260: 'bblv260',
  /** 定期结束提示对话框画面 */
  bblv270: 'bblv270',
}

/** 
 * 对话框画面js对象映射管理
 */
const JSObject = {
  // /** 勋章查询条件对话框画面用js对象 */
  // bblv070,
  // /** 勋章详细信息对话框画面用js对象 */
  // bblv080,
  // /** 勋章历史记录对话框画面用js对象 */
  // bblv090,
  // /** 账单查询条件对话框画面用js对象 */
  // bblv110,
  // /** 账单详细信息对话框画面用js对象 */
  // bblv120,
  // /** 显示账单对应勋章对话框画面用js对象 */
  // bblv121,
  // /** 定期转活期、定期批次选择对话框画面用js对象 */
  // bblv140,
  // /** 增加抽奖次数对话框画面用js对象 */
  // bblv151,
  // /** 抽奖选项对话框画面用js对象 */
  // bblv152,
  // /** 借用记录详细信息对话框画面用js对象 */
  // bblv160,
  // /** 还款记录详细信息对话框画面用js对象 */
  // bblv170,
  // /** 去借款对话框画面用js对象 */
  // bblv180,
  // /** 还款对象一览对话框画面用js对象 */
  // bblv190,
  // /** 还款详细对话框画面用js对象 */
  // bblv200,
  // /** 账号、密码注册/修改密码对话框画面用js对象 */
  // bblv210,
  // /** 密码验证对话框画面用js对象 */
  // bblv220,
  // /** 提示信息对话框画面用js对象 */
  // bblv230,
  // /** 警告信息对话框画面用js对象 */
  // bblv240,
  // /** 错误信息对话框画面用js对象 */
  // bblv250,
  // /** 确认信息对话框画面用js对象 */
  // bblv260,
  // /** 定期结束提示对话框画面用js对象 */
  // bblv270,
}

/**
 * 画面表示相关的共通方法
 */
class PageUtil {
  /**
   * 把html文件的内容加载到画面元素中
   */
  static async loadHtmlToElement(htmlPath, element) {
    if (!htmlPath || !element) {
      return;
    }
    const res = await fetch(htmlPath);
    const html = await res.text();
    element.innerHTML = html;
  }


}