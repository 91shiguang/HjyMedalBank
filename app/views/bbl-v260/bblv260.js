/**
 * 提示信息对话框画面
 */
class BBLV260View {

  /**
   * 画面元素的初始化
   */
  onInit(params) {
    this.recognitionId = params.recognitionId;
    const message = params.input.message;
    document.getElementById('bblv260_content').innerText = message;

    const btn = document.getElementById('bblv260_confirm');
    btn.addEventListener('click', () => {
      PageUtil.emitDialog(this.recognitionId, BtnType.OK);
    });
  }
}