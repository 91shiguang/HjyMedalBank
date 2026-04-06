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
/** 勋章查询结果对话框画面用js对象 */
const bblv060 = new BBLV060View();
/** 勋章查询条件画面用js对象 */
const bblv070 = new BBLV070View();
/** 勋章详细信息对话框画面用js对象 */
const bblv080 = new BBLV080View();
/** 勋章历史记录对话框画面用js对象 */
const bblv090 = new BBLV090View();
/** 账单查询结果画面用js对象 */
const bblv100 = new BBLV100View();
/** 账单查询条件对话框画面用js对象 */
const bblv110 = new BBLV110View();
/** 账单详细信息对话框画面用js对象 */
const bblv120 = new BBLV120View();
/** 显示账单对应勋章对话框画面用js对象 */
const bblv130 = new BBLV130View();
/** 常规存储画面用js对象 */
const bblv140 = new BBLV140View();
/** 定期转活期、定期批次选择对话框画面用js对象 */
const bblv150 = new BBLV150View();
/** 抽奖画面用js对象 */
const bblv160 = new BBLV160View();
/** 增加抽奖次数对话框画面用js对象 */
const bblv170 = new BBLV170View();
/** 抽奖选项对话框画面用js对象 */
const bblv180 = new BBLV180View();
/** 借用记录详细信息对话框画面用js对象 */
const bblv190 = new BBLV190View();
/** 还款记录详细信息对话框画面用js对象 */
const bblv200 = new BBLV200View();
/** 去借款对话框画面用js对象 */
const bblv210 = new BBLV210View();
/** 还款对象一览对话框画面用js对象 */
const bblv220 = new BBLV220View();
/** 还款详细对话框画面用js对象 */
const bblv230 = new BBLV230View();
/** 账号、密码注册/修改密码对话框画面用js对象 */
const bblv240 = new BBLV240View();
/** 密码验证对话框画面用js对象 */
const bblv250 = new BBLV260View();
/** 提示信息对话框画面用js对象 */
const bblv260 = new BBLV260View();
/** 警告信息对话框画面用js对象 */
const bblv270 = new BBLV270View();
/** 错误信息对话框画面用js对象 */
const bblv280 = new BBLV280View();
/** 确认信息对话框画面用js对象 */
const bblv290 = new BBLV290View();
/** 定期结束提示对话框画面用js对象 */
const bblv300 = new BBLV300View();

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
  /** 勋章查询结果对话框画面 */
  bblv060: 'bblv060',
  /** 勋章查询条件画面 */
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
  bblv130: 'bblv130',
  /** 常规存储画面 */
  bblv140: 'bblv140',
  /** 定期转活期、定期批次选择对话框画面 */
  bblv150: 'bblv150',
  /** 抽奖画面 */
  bblv160: 'bblv160',
  /** 增加抽奖次数对话框画面 */
  bblv170: 'bblv170',
  /** 抽奖选项对话框画面 */
  bblv180: 'bblv180',
  /** 借用记录详细信息对话框画面 */
  bblv190: 'bblv190',
  /** 还款记录详细信息对话框画面 */
  bblv200: 'bblv200',
  /** 去借款对话框画面 */
  bblv210: 'bblv210',
  /** 还款对象一览对话框画面 */
  bblv220: 'bblv220',
  /** 还款详细对话框画面 */
  bblv230: 'bblv230',
  /** 账号、密码注册/修改密码对话框画面 */
  bblv240: 'bblv240',
  /** 密码验证对话框画面 */
  bblv250: 'bblv250',
  /** 提示信息对话框画面 */
  bblv260: 'bblv260',
  /** 警告信息对话框画面 */
  bblv270: 'bblv270',
  /** 错误信息对话框画面 */
  bblv280: 'bblv280',
  /** 确认信息对话框画面 */
  bblv290: 'bblv290',
  /** 定期结束提示对话框画面 */
  bblv300: 'bblv300',
}

/** 
 * 画面js对象映射管理
 */
const JSObject = {
  /** 查询标签主画面用js对象 */
  bblv010,
  /** 存储标签主画面用js对象 */
  bblv020,
  /** 支出标签主画面用js对象 */
  bblv030,
  /** 借用标签主画面用js对象 */
  bblv040,
  /** 设置标签主画面用js对象 */
  bblv050,
  /** 勋章查询结果对话框画面用js对象 */
  bblv060,
  /** 勋章查询条件画面用js对象 */
  bblv070,
  /** 勋章详细信息对话框画面用js对象 */
  bblv080,
  /** 勋章历史记录对话框画面用js对象 */
  bblv090,
  /** 账单查询结果画面用js对象 */
  bblv100,
  /** 账单查询条件对话框画面用js对象 */
  bblv110,
  /** 账单详细信息对话框画面用js对象 */
  bblv120,
  /** 显示账单对应勋章对话框画面用js对象 */
  bblv130,
  /** 常规存储画面用js对象 */
  bblv140,
  /** 定期转活期、定期批次选择对话框画面用js对象 */
  bblv150,
  /** 抽奖画面用js对象 */
  bblv160,
  /** 增加抽奖次数对话框画面用js对象 */
  bblv170,
  /** 抽奖选项对话框画面用js对象 */
  bblv180,
  /** 借用记录详细信息对话框画面用js对象 */
  bblv190,
  /** 还款记录详细信息对话框画面用js对象 */
  bblv200,
  /** 去借款对话框画面用js对象 */
  bblv210,
  /** 还款对象一览对话框画面用js对象 */
  bblv220,
  /** 还款详细对话框画面用js对象 */
  bblv230,
  /** 账号、密码注册/修改密码对话框画面用js对象 */
  bblv240,
  /** 密码验证对话框画面用js对象 */
  bblv250,
  /** 提示信息对话框画面用js对象 */
  bblv260,
  /** 警告信息对话框画面用js对象 */
  bblv270,
  /** 错误信息对话框画面用js对象 */
  bblv280,
  /** 确认信息对话框画面用js对象 */
  bblv290,
  /** 定期结束提示对话框画面用js对象 */
  bblv300,
}

/**
 * 对话框画面返回的按钮区分
 */
const BtnType = {
  /** OK */
  OK: 'ok',
  /** 关闭 */
  CLOSE: 'close',
  /** 回退 */
  UNDO: 'undo',
  /** 确定 */
  CONFIRM: 'confirm',
  /** 注册 */
  REGISTER: 'register',
}

/**
 * 画面表示相关的共通方法
 */
class PageUtil {

  /**
   * 加载目标画面的内容
   */
  static async loadTargetPage(pageId, inputData) {
    // 获取容器
    const element = document.getElementById(pageId);
    // 画面第一次被加载时
    if (!element.innerHTML) {
      // 画面的path
      const id = pageId.replace(Constant.pagePrefix, Constant.blank);
      const pagePath = 'app/views/bbl-v' + id + '/bblv' + id + '.html';
      // 加载目标画面的HTML
      const res = await fetch(pagePath);
      const html = await res.text();
      element.innerHTML = html;
      // 设置目标画面的初始内容
      if (JSObject[pageId].onInit) {
        JSObject[pageId].onInit(inputData);
      }

      // 目标画面已经存在时
    } else {
      // 刷新目标画面的内容
      if (JSObject[pageId].refresh) {
        JSObject[pageId].refresh();
      }
    }
  }

  /** 
   * 打开对话框画面
   */
  static async openDialogPage(pageId, input) {
    const recognitionId = pageId + Date.now();
    // 创建modal元素
    d3.select('#main_page')
      .append('div')
      .attr('class', 'modal fade')
      .attr('id', pageId + '_modal')
      .attr('tabindex', '-1')
      .attr('aria-hidden', 'true')
      .append('div')
      .attr('class', 'modal-dialog modal-dialog-centered')
      .append('div')
      .attr('class', 'modal-content ')
      .attr('id', pageId);

    // 获取 modal 元素
    const modalEl = document.getElementById(pageId + '_modal');
    // 添加对话框画面点击事件返回的监听事件
    const wait = this.waitForEventListener(recognitionId, modalEl);

    // 加载目标画面的内容
    const params = {recognitionId: recognitionId, input: input}
    this.loadTargetPage(pageId, params);

    // 打开 modal(打开对话框画面)
    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    return await wait;
  }

  /**
   * 添加对话框画面点击事件返回的监听事件
   */
  static waitForEventListener(recognitionId, modalEl) {
    return new Promise(resolve => {
      const handler = (result) => {
        resolve(result.detail);
        // 关闭 modal(关闭对话框画面)
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        // 清理modal元素
        modalEl.addEventListener('hidden.bs.modal', () => {
          modalEl.remove();
        });
        window.removeEventListener(recognitionId, handler);
      };
      window.addEventListener(recognitionId, handler);
    });
  }

  /**
   * 对话框画面通过事件返回数据
   */
  static emitDialog(recognitionId, data) {
    window.dispatchEvent(new CustomEvent(recognitionId, {detail: data}));
  }
}

/**
 * 
 */