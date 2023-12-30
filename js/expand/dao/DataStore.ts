import {get} from './HiNet';
import Constants from './Constants';
import {URL} from 'react-native-url-polyfill';
export const FLAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending',
};
export default class DataStore {
  fetchData(url: string, flag: string, pageIndex = 1, pageSize = 25) {
    const isTrending = flag === FLAG_STORAGE.flag_trending;
    let api,
      params: any = {pageIndex, pageSize};
    if (isTrending) {
      api = Constants.trending.api;
      params.sourceUrl = url;
    } else {
      api = Constants.popular.api;
      // 从url中取出q参数
      const q = new URL(url).searchParams.get('q');
      params.q = q;
    }
    return get(api)(params);
  }
}
