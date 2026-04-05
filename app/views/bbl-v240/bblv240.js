/**
 * 账号、密码注册/修改密码对话框画面
 */
class BBLV240View {
  /** 识别ID */
  recognitionId;

  /**
   * 画面元素的初始化
   */
  onInit(params) {
    this.recognitionId = params.recognitionId;

  }

  closeDialog() {
    PageUtil.emitDialog(this.recognitionId, 'OK');
  }

}