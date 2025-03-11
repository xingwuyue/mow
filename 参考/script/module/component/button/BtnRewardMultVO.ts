export default class BtnRewardMultVO {
    /** 金币金币数 */
    gold: number = 0;
    /** 倍数 */
    multNum: number = 3;
    /** 领取类型 */
    rewardType: number = 1; //1：分享，2：视频
    /** 是否打开转盘 */
    isOpenDrawView: boolean = false;
    /** 是否在领取状态 */
    isRewardState: boolean = false;
    /** 当前配置 */
    curConfig: any = null;
    /** 会员领取次数 */
    vipCount: number = 0;
}
