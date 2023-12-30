import Constants from './Constants';
import {post} from './HiNet';
export default class SignUpDao {
  private static instance: SignUpDao;
  private constructor() {}
  public static getInstance(): SignUpDao {
    if (!SignUpDao.instance) {
      // 不存在进行new操作
      SignUpDao.instance = new SignUpDao();
    }
    return SignUpDao.instance;
  }
  signup(
    userName: string,
    password: string,
    imoocId: string,
    orderId: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const {
        registration: {api},
      } = Constants;
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('password', password);
      formData.append('imoocId', imoocId);
      formData.append('orderId', orderId);
      post(api)(formData)()
        .then((res: any) => {
          const {code, data, msg} = res;
          if (code === 0) {
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
