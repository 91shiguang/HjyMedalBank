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

}