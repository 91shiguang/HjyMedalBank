/**
 * 共通函数
 */
class CommonUtils {
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
  static clickRadio(radioNm, radioId, event) {
    if (event) {
      event.stopPropagation(); // 阻止冒泡
      event.preventDefault();  // 阻止默认行为
    }
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
    const maxStorage = 10000; // 可根据需求设置上限

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

  /** 
   * 获取输入框的内容
   */
  static getInputElementValue(elementId) {
    const value = document.getElementById(elementId).value;
    if (value) {
      return document.getElementById(elementId).value;
    }
    return '';
  }

  /**
   * 获取时间输入框的内容
   */
  static getTimeInputElementValue(elementId) {
    const date = document.getElementById(elementId).value.split('-');
    return date[0] + '年' + date[1] + '月' + date[2] + '日'
  }

  /**
   * 获取账单发生的时间
   */
  static getBillTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  }

  /**
   * 创建新的勋章ID
   */
  static createNewMedalId(medalLit) {
    // 如果数组中没有勋章
    if (medalLit.length === 0) {
      return 1;
    } else {
      return Math.max(...medalLit.map(item => item.medalId)) + 1;
    }
  }

  /**
   * 创建新的账单ID
   */
  static createNewBillId(billLit) {
    // 如果数组中没有账单
    if (billLit.length === 0) {
      return 1;
    } else {
      return Math.max(...billLit.map(item => item.billId)) + 1;
    }
  }

  /**
   * 数字为空的判断
   */
  static isNumberEmpty(number) {
    return !number && number !== 0
  }

  /**
   * 播放音频
   */
  static playAudio(audioId) {
    document.getElementById(audioId).play();
  }

  /**
   * 终止音频
   */
  static stopAudio(audioId) {
    const audio = document.getElementById(audioId);
    // 停止播放
    audio.pause();
    // 重置播放位置到开头（可选，下次从头播）
    audio.currentTime = 0;
  }

}