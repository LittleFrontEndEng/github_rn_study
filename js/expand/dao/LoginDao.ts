import Constants from './Constants';
import {saveBoarding} from '../../../utils/BoardingUtil';
import {post} from './HiNet';
export default class LoginDao {
  private static instance: LoginDao;
  private constructor() {}
  public static getInstance(): LoginDao {
    if (!LoginDao.instance) {
      LoginDao.instance = new LoginDao();
    }
    return LoginDao.instance;
  }
  login(userName: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const {
        login: {api},
      } = Constants;
      const formData = new FormData();
      // formData.append('userName', userName);
      // formData.append('password', password);
      post(api)(formData)({userName, password})
        .then((res: any) => {
          console.log('响应', res);
          const {code, data, msg} = res;
          if (code === 0) {
            saveBoarding(data);
            resolve(data || msg);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          console.log(err);
          reject({code: -1, msg: '出错了'});
        });
    });
  }
}
