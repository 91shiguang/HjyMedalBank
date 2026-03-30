/**
 * 数据存储管理专用类
 */
class DataBase {
  /** 数据库名称 */
  static DATE_BASE_NAME = 'HJY_MEDAL_BANK';

  /** 数据库中保存勋章部分的名称 */
  static MEDAL_INF ='MEDAL_INF';

  /** 数据库中保存账单部分的名称 */
  static BILL_INF = 'BILL_INF';

  /** 数据库中保存设置部分的名称 */
  static SETTING_INF = 'SETTING_INF';

  /** 
   * 从DB中获取勋章信息
   */
  static async getMedalInfFromDB () {
    let medalInf = null;
    try {
      medalInf = await medalDB.getItem(DataBase.MEDAL_INF);
    } catch (error) {
      console.error("从DB中获取勋章信息时出错", error);
    }
    if (!medalInf) {
      return [];
    }
    return medalInf;
  }

  /** 
   * 把勋章信息保存到DB中
   */
  static async saveMedalInfToDB(data) {
    try {
      await medalDB.setItem(DataBase.MEDAL_INF, data);
    } catch (error) {
      console.error("把勋章信息保存到DB中时出错", error);
    }
  }

  /** 
   * 从DB中获取账单信息
   */
  static async getBillInfFromDB() {
    let billInf = null;
    try {
      billInf = await medalDB.getItem(DataBase.BILL_INF);
    } catch (error) {
      console.error("从DB中获取账单信息时出错", error);
    }
    if (!billInf) {
      return [];
    }
    return billInf;
  }

  /** 
   * 把账单信息保存到DB中
   */
  static async saveBillInfToDB(data) {
    try {
      await medalDB.setItem(DataBase.BILL_INF, data);
    } catch (error) {
      console.error("把账单信息保存到DB中时出错", error);
    }
  }

  /**
   * 从DB中获取设置信息
   */
  static async getSettingInfFromDB() {
    let settingInf = null;
    try {
      settingInf = await medalDB.getItem(DataBase.SETTING_INF);
    } catch (error) {
      console.error("从DB中获取设置信息时出错", error);
    }
    return settingInf ? settingInf : new SettingModel();
  }

  /**
   * 把设置信息保存到DB中
   */
  static async saveSettingInfToDB(data) {
    try {
      await medalDB.setItem(DataBase.SETTING_INF, data);
    } catch (error) {
      console.error("把设置信息保存到DB中时出错", error);
    }
  }
      
  /**
   * 清空整个数据库
   */
  static async clearAll() {
    try {
      await medalDB.clear();
    } catch (error) {
      console.error("清空DB时出错", error);
    }
  }

  /**
   * 搬家_取得数据库中所有的数据，以字符串的方式返回。
   */
  static async getAllDataStr() {
    let dataString = null;
    try {
      const medalInf = await medalDB.getItem(DataBase.MEDAL_INF);
      const billInf = await medalDB.getItem(DataBase.BILL_INF);
      const settingInf = await medalDB.getItem(DataBase.SETTING_INF);
      const data = {};
      if (medalInf) {
        data[DataBase.MEDAL_INF] = medalInf;
      }
      if (billInf) {
        data[DataBase.BILL_INF] = billInf;
      }
      if (settingInf) {
        data[DataBase.SETTING_INF] = settingInf;
      }
      dataString = JSON.stringify(data);
    } catch (error) {
      console.error("从DB中导出数据时出错", error);
    }
    return dataString;
  }

  /**
   * 搬家_把字符串的数据存入到DB中。
   */
  static async saveAllData(dataString) {
    if (!dataString) {
      return;
    }
    const data = JSON.parse(dataString);
    try {
      if (data[DataBase.MEDAL_INF]) {
        await this.saveMedalInfToDB(data[DataBase.MEDAL_INF]);
      }
      if (data[DataBase.BILL_INF]) {
        await this.saveBillInfToDB(data[DataBase.BILL_INF]);
      }
      if (data[DataBase.SETTING_INF]) {
        await this.saveSettingInfToDB(data[DataBase.SETTING_INF]);
      }
    } catch (error) {
      console.error("把数据导入DB时出错", error);
    }
  }
}