/**
 * 提示信息对话框画面
 */
class BBLV260View {
  /** 识别ID */
  recognitionId;

  /**
   * 画面元素的初始化
   */
  onInit(params) {
    this.recognitionId = params.recognitionId;
    const message = params.input.message;
    document.getElementById('bblv260_content').innerText = message;
    if (params.input.messageId.indexOf('C') !== -1) {
      // 显示取消和确定按钮
      $('#doubble_footer').removeClass('d-none');
      $('#sign_footer').addClass('d-none');
    } else {
      // 显示OK按钮
      $('#sign_footer').removeClass('d-none');
      $('#doubble_footer').addClass('d-none');
    }
  }

  /**
   * 点击确定按钮
   */
  clickOkBtn() {
    CommonUtils.playAudio('click_audio');
    PageUtil.emitDialog(this.recognitionId, BtnType.CONFIRM);
  }

  /**
   * 点击取消按钮
   */
  clickCancelBtn() {
    CommonUtils.playAudio('click_audio');
    PageUtil.emitDialog(this.recognitionId, BtnType.Cancel);
  }
}