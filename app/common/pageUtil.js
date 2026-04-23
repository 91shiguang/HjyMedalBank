// 页面管理的文件

/** 首页主画面用js对象 */
const bblv010 = new BBLV010View();
/** 支出标签主画面用js对象 */
const bblv030 = new BBLV030View();
/** 借贷标签主画面用js对象 */
const bblv040 = new BBLV040View();
/** 设置标签主画面用js对象 */
const bblv050 = new BBLV050View();
/** 账单查询结果画面用js对象 */
const bblv100 = new BBLV100View();
/** 账单查询条件对话框画面用js对象 */
const bblv110 = new BBLV110View();
/** 账单详细信息对话框画面用js对象 */
const bblv120 = new BBLV120View();
/** 定期转活期, 选择的定期详细对话框画面用js对象 */
const bblv130 = new BBLV130View();
/** 常规存储画面用js对象 */
const bblv140 = new BBLV140View();
/** 定期转活期、定期批次选择对话框画面用js对象 */
const bblv150 = new BBLV150View();
/** 抽奖画面用js对象 */
const bblv160 = new BBLV160View();
/** 抽奖设置对话框画面用js对象 */
const bblv170 = new BBLV170View();
/** 订单取消理由对话框画面用js对象 */
const bblv180 = new BBLV180View();
/** 借贷记录详细信息对话框画面用js对象 */
const bblv190 = new BBLV190View();
/** 还款记录详细信息对话框画面用js对象 */
const bblv200 = new BBLV200View();
/** 去借款对话框画面用js对象 */
const bblv210 = new BBLV210View();
/** 还款对象一览对话框画面用js对象 */
const bblv220 = new BBLV220View();
/** 账号、密码注册/修改密码对话框画面用js对象 */
const bblv240 = new BBLV240View();
/** 密码验证对话框画面用js对象 */
const bblv250 = new BBLV250View();
/** 提示信息对话框画面用js对象 */
const bblv260 = new BBLV260View();
/** 定期结束提示对话框画面用js对象 */
const bblv300 = new BBLV300View();

/** 画面ID管理 */
const PageId = {
  /** 首页主画面 */
  bblv010: 'bblv010',
  /** 支出画面*/
  bblv030: 'bblv030',
  /** 借贷标签主画面 */
  bblv040: 'bblv040',
  /** 设置标签主画面 */
  bblv050: 'bblv050',
  /** 账单查询结果画面 */
  bblv100: 'bblv100',
  /** 账单查询条件对话框画面 */
  bblv110: 'bblv110',
  /** 账单详细信息对话框画面 */
  bblv120: 'bblv120',
  /** 定期转活期, 选择的定期详细对话框画面 */
  bblv130: 'bblv130',
  /** 常规存储画面 */
  bblv140: 'bblv140',
  /** 定期转活期、定期批次选择对话框画面 */
  bblv150: 'bblv150',
  /** 抽奖画面 */
  bblv160: 'bblv160',
  /** 抽奖设置对话框画面 */
  bblv170: 'bblv170',
  /** 订单取消理由对话框画面 */
  bblv180: 'bblv180',
  /** 借贷记录详细信息对话框画面 */
  bblv190: 'bblv190',
  /** 还款记录详细信息对话框画面 */
  bblv200: 'bblv200',
  /** 去借款对话框画面 */
  bblv210: 'bblv210',
  /** 还款对象一览对话框画面 */
  bblv220: 'bblv220',
  /** 账号、密码注册/修改密码对话框画面 */
  bblv240: 'bblv240',
  /** 密码验证对话框画面 */
  bblv250: 'bblv250',
  /** 提示信息对话框画面 */
  bblv260: 'bblv260',
  /** 定期结束提示对话框画面 */
  bblv300: 'bblv300',
}

/** 
 * 画面js对象映射管理
 */
const JSObject = {
  /** 首页标签主画面用js对象 */
  bblv010,
  /** 支出画面用js对象 */
  bblv030,
  /** 借贷标签主画面用js对象 */
  bblv040,
  /** 设置标签主画面用js对象 */
  bblv050,
  /** 账单查询结果画面用js对象 */
  bblv100,
  /** 账单查询条件对话框画面用js对象 */
  bblv110,
  /** 账单详细信息对话框画面用js对象 */
  bblv120,
  /** 定期转活期, 选择的定期详细对话框画面 */
  bblv130,
  /** 常规存储画面用js对象 */
  bblv140,
  /** 定期转活期、定期批次选择对话框画面用js对象 */
  bblv150,
  /** 抽奖画面用js对象 */
  bblv160,
  /** 增加抽奖次数对话框画面用js对象 */
  bblv170,
  /** 订单取消理由对话框画面用js对象 */
  bblv180,
  /** 借贷记录详细信息对话框画面用js对象 */
  bblv190,
  /** 还款记录详细信息对话框画面用js对象 */
  bblv200,
  /** 去借款对话框画面用js对象 */
  bblv210,
  /** 还款对象一览对话框画面用js对象 */
  bblv220,
  /** 账号、密码注册/修改密码对话框画面用js对象 */
  bblv240,
  /** 密码验证对话框画面用js对象 */
  bblv250,
  /** 提示信息对话框画面用js对象 */
  bblv260,
  /** 定期结束提示对话框画面用js对象 */
  bblv300,
}

/**
 * 对话框画面返回的按钮区分
 */
const BtnType = {
  /** 关闭/取消 */
  CLOSE: 'close',
  /** 确定/OK */
  CONFIRM: 'confirm',
  /** 取消账单 */
  BILLCANCEL: 'billCancel',
  /** 注册 */
  REGISTER: 'register',
  /** 还款 */
  REPAYMENT: 'repayment',
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
    // modal 显示时的监听
    modalEl.addEventListener('show.bs.modal', () => {
      setTimeout(() => {
        $('.modal').css('display', 'none');
        $('.modal-backdrop').css('display', 'none');
        $('.modal').last().css('display', 'block');
        $('.modal-backdrop').last().css('display', 'block');
      });
    });
    // 添加对话框画面点击事件返回的监听事件
    const wait = this.waitForEventListener(recognitionId, modalEl);

    // 加载目标画面的内容
    const params = {recognitionId: recognitionId, input: input}
    this.loadTargetPage(pageId, params);

    // 打开 modal(打开对话框画面)
    const modal = new bootstrap.Modal(modalEl, {
      backdrop: 'static', // 禁止点击背景关闭
      keyboard: false // 禁止 ESC 关闭
    });
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
          setTimeout(() => {
            $('.modal').css('display', 'none');
            $('.modal-backdrop').css('display', 'none');
            $('.modal').last().css('display', 'block');
            $('.modal-backdrop').last().css('display', 'block');
          });
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

  /**
   * 将主背景设置为粉色
   */
  static async setMainBgPink() {
    $('#main_page').removeClass('wathet-bg');
    $('#main_page').addClass('pink-bg');
  }

  /**
   * 将主背景设置为浅蓝色
   */
  static async setMainBgWathet() {
    $('#main_page').removeClass('pink-bg');
    $('#main_page').addClass('wathet-bg');
  }
}