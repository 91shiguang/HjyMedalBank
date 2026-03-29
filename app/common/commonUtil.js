/**
 * 共通函数
 */
class CommonUtils {
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

  /**
   * 获取单选框选中的值
   */
  static getRadioCheckedValue(radioNm) {
    // 获取选中的单选框
    const checkedRadio = document.querySelector('input[name="' + radioNm + '"]:checked');
    if (checkedRadio) {
      return checkedRadio.value;
    }
    return null;
  }

  /**
   * 点击单选框选择
   */
  static clickRadio(radioNm, radioId) {
    if (document.getElementById(radioId).checked) {
      return;
    }
    const radios = document.querySelectorAll('input[name="' + radioNm + '"]');
    radios.forEach(radio => radio.checked = false);
    document.getElementById(radioId).checked = true;
  }

  /**
   * 获取时间字符串
   * @param date Date类型的时间
   * @returns {@literal yyyy-mm-dd} 形式的字符串
   */
  static getDateEx(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  /**
   * 限制说明输入框的字数
   */
  static limitDetailTextarea(textareaId) {
    // 说明输入框
    const textarea = document.getElementById(textareaId);
    const maxLength = 30; // 最大30字
    // 监听输入，强制限制字数
    textarea.addEventListener('input', function () {
      if (this.value.length > maxLength) {
        this.value = this.value.substring(0, maxLength);
      }
    });

    // 兼容粘贴、输入法等极端情况
    textarea.addEventListener('compositionend', function () {
      if (this.value.length > maxLength) {
        this.value = this.value.substring(0, maxLength);
      }
    });
  }

  /** 
   * 限制存储、支出数量为0以上的整数
   */
  static limitMedalCountInput(inputId) {
    const storageInput = document.getElementById(inputId);
    const maxStorage = 999999; // 可根据需求设置上限

    // 输入时校验
    storageInput.addEventListener('input', function () {
      // 移除非数字字符
      this.value = this.value.replace(/[^0-9]/g, '');

      // 确保≥0且不超过上限
      if (this.value < 0) this.value = 0;
      if (this.value > maxStorage) this.value = maxStorage;
    });

    // 粘贴时强制清理
    storageInput.addEventListener('paste', function (e) {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      const num = text.replace(/[^0-9]/g, '');
      this.value = num ? Math.max(0, Math.min(parseInt(num), maxStorage)) : '';
    });

    // 空值自动变成 1
    storageInput.addEventListener('blur', function () {
      if (!this.value || this.value < 1) {
        this.value = 1;
      }
    });
  }

}