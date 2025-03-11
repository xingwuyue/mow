
export class StateVo {
    public isGetData: boolean = false;    //是否已经获取了数据
    public collectGold: number = 0;      //收藏金币待领取
    public bannerY: number = -398;
    public stepNum: number = 0;         //关卡总数
    public curLevel: number = 0;         //当前关卡
    public startCount: number = 0;       //开始游戏次数
    public isNewUser: boolean = false;
    public channel_code: string = "";
    public levelFailTimes: number = 0;       //当前关卡连续失败次数
    public shakeCount: number = 0;
    public loadTime: number = 0;
    public loadUid: string = "";
    public isHide: boolean = false;
    public viewIndex: number = 0;   //当前主页面
    public rewardDiamond:number = 0;
    public chapterInfo:any = null;
    // public isUpdateReward:number = 0;//1普通 2是会员
}
