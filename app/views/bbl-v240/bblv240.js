/**
 * 账号、密码注册/修改密码对话框画面
 */
class BBLV240View {
  /** 识别ID */
  recognitionId;

  /** 注册区分 */
  isNewPswAtn = true;

  /**
   * 画面元素的初始化
   */
  onInit(params) {
    // 识别ID
    this.recognitionId = params.recognitionId;
    // 注册区分
    this.isNewPswAtn = params.input.isNewPswAtn;
    // 注册的场合
    if (this.isNewPswAtn) {
      document.getElementById('bblv240_title').innerText = '账号注册';
      // 隐藏关闭和确定按钮
      $('#edit_body').addClass('d-none');
      $('#bblv240_edit_footer').addClass('d-none');
      // 显示注册按钮
      $('#register_body').removeClass('d-none');
      $('#bblv240_register_footer').removeClass('d-none');
      d3.select('#register_pwd_eye').attr('src', 'assets/images/闭眼睛.png');
      d3.select('#register_pwd_eye_cfm').attr('src', 'assets/images/闭眼睛.png');
    } else {
      document.getElementById('bblv240_title').innerText = '修改密码';
      // 隐藏显示注册按钮
      $('#register_body').addClass('d-none');
      $('#bblv240_register_footer').addClass('d-none');
      // 显示关闭和确定按钮
      $('#edit_body').removeClass('d-none');
      $('#bblv240_edit_footer').removeClass('d-none');
      d3.select('#edit_pwd_eye').attr('src', 'assets/images/闭眼睛.png');
      d3.select('#edit_pwd_eye_cfm').attr('src', 'assets/images/闭眼睛.png');
    }
  }

  /**
   * 点击关闭按钮
   */
  close() {
    CommonUtils.playAudio('click_audio');
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
   * 点击注册按钮
   */
  async register() {
    CommonUtils.playAudio('click_audio');
    const accountInput = document.getElementById('register_account');
    const pwdInput = document.getElementById('register_pwd');
    const confirmPwdInput  = document.getElementById('register_pwd_confirm');
    // 1. 获取输入内容，去除首尾空格
    const account = CommonUtils.getInputElementValue('register_account').trim();
    const pwd = CommonUtils.getInputElementValue('register_pwd').trim();
    const confirmPwd = CommonUtils.getInputElementValue('register_pwd_confirm').trim();
    document.getElementById('register_account_error').innerText = Constant.blank;
    document.getElementById('register_pwd_error').innerText = Constant.blank;
    document.getElementById('register_pwd_confirm_error').innerText = Constant.blank;

    // 2. 校验账号（身份证后6位）
    const accountReg = /^\d{6}$/;
    if (!account) {
      document.getElementById('register_account_error').innerText = '请输入账号（身份证后6位）';
      accountInput.focus();
      return;
    }
    if (!accountReg.test(account)) {
      document.getElementById('register_account_error').innerText = '账号必须是身份证后6位数字';
      accountInput.focus();
      accountInput.select();
      return;
    }

    // 3. 校验密码（6位数字）
    const pwdReg = /^\d{6}$/;
    if (!pwd) {
      document.getElementById('register_pwd_error').innerText = '请设置6位数字的密码';
      pwdInput.focus();
      return;
    }
    if (!pwdReg.test(pwd)) {
      document.getElementById('register_pwd_error').innerText = '密码必须是6位数字';
      pwdInput.focus();
      pwdInput.select();
      return;
    }

    // 4. 校验确认密码
    if (!confirmPwd) {
      document.getElementById('register_pwd_confirm_error').innerText = '请再次输入密码';
      confirmPwdInput.focus();
      return;
    }
    if (pwd !== confirmPwd) {
      document.getElementById('register_pwd_confirm_error').innerText = '两次输入的密码不一致';
      confirmPwdInput.focus();
      confirmPwdInput.select();
      return;
    }

    // 从数据库中获取设置内容
    settingInf = await DataBase.getSettingInfFromDB();
    // 音效开关
    settingInf.audioFlg = Constant.flg_on;
    // 账号
    settingInf.pswAtn = account;
    // 密码
    settingInf.password = pwd;
    // 保存设置信息
    await DataBase.saveSettingInfToDB(settingInf);
    // 关闭对话框
    PageUtil.emitDialog(this.recognitionId, BtnType.REGISTER);
  }

  /**
   * 点击确定按钮
   */
  async confirm() {
    CommonUtils.playAudio('click_audio');
    const accountInput = document.getElementById('edit_account');
    const pwdInput = document.getElementById('edit_pwd');
    const confirmPwdInput  = document.getElementById('edit_pwd_confirm');
    // 1. 获取输入内容，去除首尾空格
    const account = CommonUtils.getInputElementValue('edit_account').trim();
    const pwd = CommonUtils.getInputElementValue('edit_pwd').trim();
    const confirmPwd = CommonUtils.getInputElementValue('edit_pwd_confirm').trim();
    document.getElementById('edit_account_error').innerText = Constant.blank;
    document.getElementById('edit_pwd_error').innerText = Constant.blank;
    document.getElementById('edit_pwd_confirm_error').innerText = Constant.blank;

    // 从数据库中获取设置内容
    settingInf = await DataBase.getSettingInfFromDB();

    // 2. 校验账号（身份证后6位）
    const accountReg = /^\d{6}$/;
    if (!account) {
      document.getElementById('edit_account_error').innerText = '请输入注册时的账号';
      accountInput.focus();
      return;
    }
    if (!accountReg.test(account)) {
      document.getElementById('edit_account_error').innerText = '账号必须是身份证后6位数字';
      accountInput.focus();
      accountInput.select();
      return;
    }
    if (account !== settingInf.pswAtn) {
      document.getElementById('edit_account_error').innerText = '不存在该账号，请重新输入';
      accountInput.focus();
      accountInput.select();
      return;
    }

    // 3. 校验密码（6位数字）
    const pwdReg = /^\d{6}$/;
    if (!pwd) {
      document.getElementById('edit_pwd_error').innerText = '请设置6位数字的密码';
      pwdInput.focus();
      return;
    }
    if (!pwdReg.test(pwd)) {
      document.getElementById('edit_pwd_error').innerText = '密码必须是6位数字';
      pwdInput.focus();
      pwdInput.select();
      return;
    }

    // 4. 校验确认密码
    if (!confirmPwd) {
      document.getElementById('edit_pwd_confirm_error').innerText = '请再次输入密码';
      confirmPwdInput.focus();
      return;
    }
    if (pwd !== confirmPwd) {
      document.getElementById('edit_pwd_confirm_error').innerText = '两次输入的密码不一致';
      confirmPwdInput.focus();
      confirmPwdInput.select();
      return;
    }

    // 从数据库中获取设置内容
    settingInf = await DataBase.getSettingInfFromDB();
    // 密码
    settingInf.password = pwd;
    // 保存设置信息
    await DataBase.saveSettingInfToDB(settingInf);
    // 关闭对话框
    PageUtil.emitDialog(this.recognitionId, BtnType.CONFIRM);
  }

}