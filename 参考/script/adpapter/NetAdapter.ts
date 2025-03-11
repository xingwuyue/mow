import BaseNet from "../framework/BaseNet";
import { Config } from "../sdk/Config";
import { GameVoManager } from "../manager/GameVoManager";

export class ErrCode {
    public static code = {
        // "2001": "角色不存在",
        // "2002": "用户不存在",
        // "2010": "宝箱不存在",
        // "2011": "时间未到，无法领取宝箱",
        // "2012": "今日观看视频次数已达上限",
        // "2013": "宝箱已达到最高等级，无法升级",
        // "2014": "该道具不存在，请确认",
        // "2015": "数量不足，无法升级",
        // "2016": "无法重复升级宝箱",
        // "2017": "无法重复刷新宝箱奖励",
        // "2018": "宝箱还不能开启",
        // "2019": "宝箱尚未开启，无法刷新奖励",
        // "2020": "加速功能休息中！",
        // "2021": "不满足条件，请参与战斗获得奖杯!",
    };
}

let _instance: NetAdapter;

export default class NetAdapter {
    public static Init(): void {
        _instance = new NetAdapter();
    }

    public static CheckPayInfo() {
        if (GameVoManager.getInstance.stateVo.isGetData) {
            let info = GameVoManager.getInstance.getOneRepairInfo();
            if (info) {
                NetAdapter.repairPayInfo({ order_id: info.orderId, delivered_at: info.delivered_at }).then(res => {
                    GameVoManager.getInstance.removeOrderInfo(info.orderId)
                }).catch(err => {

                });
            }
        }
    }

    public static httpPost(request: string, body: any, customUrl: string = null, authorization: string = null): Promise<any> {
        // let url = serverUrlConfig[appConfig.env].commonUrl;
        // if (customUrl) {
        //     url = customUrl;
        // }
        // let auth = authorization;
        // if (!authorization) {
        //     auth = HD_MODULE.PLATFORM.token;
        // }
        return null;//BaseNet.httpPost(url + request, body, auth);
    }

    public static httpGet(request: string, body: any, customUrl: string = null, authorization: string = null): Promise<any> {
        // let url = serverUrlConfig[appConfig.env].commonUrl;
        // if (customUrl) {
        //     url = customUrl;
        // }
        // let auth = authorization;
        // if (!authorization) {
        //     auth = HD_MODULE.PLATFORM.token;
        // }
        return null;//BaseNet.httpGet(url + request, body, auth);
    }

    public static httpDelete(request: string, body: any, customUrl: string = null, authorization: string = null) {
        // let url = Config.gameUrl;
        // if (customUrl) {
        //     url = customUrl;
        // }
        // let auth = authorization;
        // if (!authorization) {
        //     auth = HD_MODULE.PLATFORM.token;
        // }
        return;;//BaseNet.httpDelete(url + request, body, auth);
    }

    public static httpPut(request: string, body: any, customUrl: string = null, authorization: string = null) {
        // let url = Config.gameUrl;
        // if (customUrl) {
        //     url = customUrl;
        // }
        // let auth = authorization;
        // if (!authorization) {
        //     auth = HD_MODULE.PLATFORM.token;
        // }
        return null;//BaseNet.httpPut(url + request, body, auth);
    }


    public static repairPayInfo(info: any): Promise<any> {
        return _instance._repairOrderInfo(info);
    }

    public static requestOrderId(): Promise<any> {
        return _instance._requestOrderId();
    }

    /** 获取  服务器时间 */
    public static getServerTime(): Promise<any> {
        return _instance._getServerTime();
    }

    /** 获取  KVDATA */
    public static getKVData(): Promise<any> {
        return _instance._getKVData();
    }

    /** 
     * 上报  KVDATA 
     */
    public static putKVData(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            /** 上报数据 */
            if (GameVoManager.getInstance.stateVo.isGetData) {
                return _instance._putKVData(params).catch(() => {
                    // AlertManager.showNormalTips("网络波动，数据保存失败", 6, 2);
                    // setI
                    reject();
                }).then(resolve);
            }
        }).catch(err => {

        });;
    }

    public static patchKVData(params: any): Promise<any> {
        return _instance._patchKVData(params);
    }

    /** 
     * 获取  排行榜 
     * @param params type:自定义的排行榜类型, cycle:清榜周期  'week'为一周，'forever'为永久，page：请求页数，page_size:每页的数据个数
     */
    public static getRankData(params: any): Promise<any> {
        return _instance._getRankData(params);
    }

    /** 
     * 上报  排行榜 
     * @param params type:自定义的排行榜类型, cycle:清榜周期，'week'为一周，'forever'为永久，score：分数，customData:自定义数据，例如头像
     */
    public static postRankData(params: any): Promise<any> {
        return _instance._postRankData(params);
    }

    /**
     * 上报  登录小游戏服务器(微信静默登录时自动登录)
     */
    public static postMiniGameLogin(params: any, timeOutFunc: Function): Promise<any> {
        return _instance._postMiniGameLogin(params, timeOutFunc);
    }

    /**
     * 获取  交叉推广数据
     */
    public static getDSPInfo(param: any): Promise<any> {
        return _instance._getDSPInfo(param);
    }

    public static onlineTime(time: number = 10): Promise<any> {
        return _instance._onLineTIme(time);
    }

    public static getRankInfoByKey(param: string[]): Promise<any> {
        return _instance._getRankInfoByKey(param);
    }

    public static putNickName(nickName): Promise<any> {
        return _instance._putNickName(nickName);
    }

    public static getRandomNickName(): Promise<any> {
        return _instance._getRandomNickName();
    }

    public static postByteDanceActiveLog(param: any): Promise<any> {
        return _instance._postByteDanceActiveLog(param);
    }

    /***************内部实现************************/

    /** 获取  服务器时间 */
    _getServerTime(): Promise<any> {
        return new Promise((resolve, reject) => {
            reject();
        }).catch(err => {

        });
    }


    _getKVData(): Promise<any> {
        return null//BaseProtocol.requestByConfig('kvDataGet', {});
    }

    /**
     * 
     * @param params 
     */
    _patchKVData(params: any): Promise<any> {
        return null;//.requestByConfig('kvDataPatch', params);
    }

    /** 
     * 上报所有  KVDATA 
     */
    _putKVData(params: any): Promise<any> {
        return null;//BaseProtocol.requestByConfig('kvDataPut', params);
    }

    _getKVDataByKey(param: string[]): Promise<any> {
        return null//BaseProtocol.requestByConfig('kvDataGetByKey', { hidden: param });
    }

    /** 
     * 获取  排行榜 
     * @param params type:自定义的排行榜类型, cycle:清榜周期  'week'为一周，'forever'为永久，page：请求页数，page_size:每页的数据个数
     */
    _getRankData(params: any): Promise<any> {
        return null;//BaseProtocol.requestByConfig('rankGet', params);
    }

    /** 
     * 上报  排行榜 
     * @param params type:自定义的排行榜类型, cycle:清榜周期，'week'为一周，'forever'为永久，score：分数，customData:自定义数据，例如头像
     */
    _postRankData(params: any): Promise<any> {

        return new Promise((resolve, reject) => {
            reject();
        }).catch(err => {

        });//BaseProtocol.requestByConfig('rankPost', params);
    }

    /**
     * 上报  登录小游戏服务器(微信静默登录时自动登录)
     */
    _postMiniGameLogin(params: any, timeOutFunc: Function): Promise<any> {
        return null//;BaseProtocol.requestByConfig('login', params, null, false, true, timeOutFunc);
    }

    /**
     * 获取  交叉推广数据
     */
    _getDSPInfo(param: any): Promise<any> {
        return null;//BaseProtocol.requestByConfig('dspGet', param);
    }

    /**
     * 在线时长统计
     */
    _onLineTIme(time: number): Promise<any> {
        return null;//BaseProtocol.requestByConfig('online', { duration: time }, null, true, false);
    }

    /**
     * 获取排行榜排名
     */
    _getRankInfoByKey(param: string[]): Promise<any> {
        return new Promise((resolve, reject) => {
            reject();
        }).catch(err => {

        });//BaseProtocol.requestByConfig('selfRank', { ranking_names: param }, null, true, false);
    }

    /**
     * 更新名字
     */
    _putNickName(nickName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            reject();
        }).catch(err => {

        });//BaseProtocol.requestByConfig('nickName', { nick_name: nickName }, null, true, false);
    }

    _getRandomNickName(): Promise<any> {
        return null;//BaseProtocol.requestByConfig("getRandomNickName", null);
    }
    _postByteDanceActiveLog(param: any): Promise<any> {
        return null;//BaseProtocol.requestByConfig('postByteDanceActiveLog', param, null, true, false);
    }

    _requestOrderId(): Promise<any> {
        return null;//BaseProtocol.requestByConfig('getOrderId', null, null, true, false);
    }

    _repairOrderInfo(orderInfo: any): Promise<any> {
        return null;//BaseProtocol.requestByConfig('repairOrderInfo', orderInfo, null, true, false);
    }
}
