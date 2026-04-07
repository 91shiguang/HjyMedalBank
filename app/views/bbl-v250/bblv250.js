/**
 * 密码验证对话框画面
 */
class BBLV250View {
  /** 识别ID */
  recognitionId;

  /**
   * 画面元素的初始化
   */
  onInit(params) {
    // 识别ID
    this.recognitionId = params.recognitionId;
  }

  /**
   * 点击关闭按钮
   */
  close() {
    PageUtil.emitDialog(this.recognitionId, BtnType.CLOSE);
  }

  /**
   * 点击眼睛图片
   */
  togglePwd(inputId, imgId) {
    const pwdInput = document.getElementById(inputId);
    const eyePwd = document.getElementById(imgId);
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      eyePwd.src = 'assets/images/睁眼睛.png';
    } else {
      pwdInput.type = 'password';
      eyePwd.src = 'assets/images/闭眼睛.png';
    }
  }

  /**
   * 点击确定按钮
   */
  async confirm() {
    const pwdInput = document.getElementById('pwd');
    // 1. 获取输入内容，去除首尾空格
    const pwd = CommonUtils.getInputElementValue('pwd').trim();
    document.getElementById('pwd_error').innerText = Constant.blank;

    if (!pwd) {
      document.getElementById('pwd_error').innerText = '请输入6位数字的密码';
      pwdInput.focus();
      return;
    }

    // 从数据库中获取设置内容
    settingInf = await DataBase.getSettingInfFromDB();
    if (pwd !== settingInf.password) {
      document.getElementById('pwd_error').innerText = '密码不正确，请重新输入。';
      pwdInput.focus();
      pwdInput.select();
      return;
    }

    // 关闭对话框
    PageUtil.emitDialog(this.recognitionId, BtnType.CONFIRM);
  }

  /**
   * 点击忘记密码
   */
  async forget() {
    // 打开修改密码画面
    const btnType = await PageUtil.openDialogPage(PageId.bblv240, { isNewPswAtn: false });
    // 关闭对话框
    PageUtil.emitDialog(this.recognitionId, btnType);
  }
}