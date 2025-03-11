import { Const } from "../config/Const";

export class Common_HttpInterface {
    /**登录 */
    public static UserLogin = "user/login";

    /**宝箱操作 */
    public static BoxTodo = "user/boxsTodo";

    /**匹配对手 */
    public static MatchPlayer = "user/getRandomUser";

    /**战斗结算 */
    public static BattleFinish = "user/battleFinish";

    /**道具升级 */
    public static GoodsUp = "user/goodsUp";

    /**获取用户用户数据 */
    public static GetUser = "/v1/custom_data";

    /**更新用户信息 */
    public static UpdateUser = "/v1/custom_data";

    /**记录日志 */
    public static Report = "report";

    /**改造 */
    public static Reform = "reform";

    /**获取token */
    public static GetJWT = "getJWT";

    /**提交分数 */
    public static updateRankScore = "ranklist";

    /**获取排行榜列表 */
    public static getRankList = "ranklist";

    /**改造 */
    public static UpdateReform = "user/reform";

    /**金手指 */
    public static testUpdate = "user/testUpdate";

    /**获取服务器时间 */
    public static serverTime = "serverTime";
}

export class Common_UIPath {
    /**设置界面ui */
    public static SettingUI = "ui/setting/SettingView_IOS";

    /**主菜单页面ui */
    public static MenuUI = "ui/menu/MenuView_IOS";

    /**战斗页面ui */
    public static FightUI = "ui/fight/FightUI";

    /**结算界面 */
    public static ResultUI = "ui/result/ResultView";

    /**复活界面 */
    public static ReliveUI = "ui/fight/ReliveView";

    /**暂停界面 */
    public static PauseUI = "ui/fight/PauseView";

    /**暂停界面 */
    public static PauseNewUI = "ui/fight/PauseNewView";

    /**商店界面 */
    public static ShopUI = "ui/shop/ShopView_IOS";

    /**预览武器界面 */
    public static ShopPreview = "ui/equip/WeaponVideoView";

    /**更多金币界面 */
    public static MoreGoldUI = "ui/moregold/MoreGoldView_IOS";

    /**邀请和客服界面 */
    public static InviteAndServiceUI = "ui/moregold/InviteAndService_IOS";

    /**成长界面 */
    public static GroupUI = "ui/group/GroupView_IOS";

    /**获得奖励展示界面 */
    public static GetRewardUI = "ui/common/GetRewardPanel_IOS";

    /**获得奖励展示界面 */
    public static GetDiamondUI = "ui/common/GetDiamondPanel_IOS";

    /**兑换金币界面 */
    public static ExchangeDiamondUI = "ui/common/ExchangeDiamond_IOS";

    /**免费获得金币界面 */
    public static GetFreeGold = "ui/common/GetFreeGold_IOS";

    /**免费获得钻石界面 */
    public static GetFreeDiamond = "ui/common/GetFreeDiamond_IOS";

    /**免费试用武器界面 */
    public static GetFreeWeapon = "ui/common/GetFreeWeapon_IOS";

    /**解锁额外奖励界面 */
    public static GetExtraReward = "ui/common/GetExtraReward_IOS";

    /**邀请的枪界面 */
    public static InviteWeaponUI = "ui/common/InviteWeaponUI";

    /**更多界面 */
    public static BtnMorePanel = "ui/btnmore/BtnMorePanel";

    /**秘籍界面 */
    public static CheatUI = "ui/cheat/CheatView";

    /**新手引导界面 */
    public static GuideUI = "ui/guide/GuideView";

    /**新手动画引导界面 */
    public static AnimationGuideView = "ui/guide/AnimationGuideView";

    /** 新结算界面 */
    public static ResultNewUI = 'ui/result/ResultNewView_IOS';

    /** 抽奖界面 */
    public static DrawUI = 'ui/draw/DrawView_IOS';

    /** 主页抽奖界面 */
    public static MainDrawUI = 'ui/draw/MainDrawView_IOS';

    /**新手引导界面 */
    public static ServiceUI = "ui/service/ServiceView_IOS";

    /** 公告界面 */
    public static NoticeUI = 'ui/notice/NoticeView';

    /** 领取计时奖励 */
    public static TimeGold = 'ui/common/GetTimeGold_IOS';

    /** 邀请界面 */
    public static InviteUI = 'ui/invite/InvitePanel';

    /** 排行界面 */
    public static RankUI = 'ui/rank/RankView';

    /** 超越好友界面 */
    public static SurpassFriend = 'ui/rank/SurpassFriendView';

    /** 新引导系统 */
    public static GuideNewView = 'ui/guide/GuideNewView';

    /** 体力兑换 */
    public static ExchangePowerUI = 'ui/common/ExchangePower_IOS';

    /** 解锁装备或者金币成功界面 */
    public static RewardUI = 'ui/common/RewardUI';

    /** 悬赏任务领取成功界面 */
    public static RewardTaskUI = 'ui/common/RewardTaskUI';

    /** banner界面 */
    public static BannerPanel = 'ui/common/BannerPanel';

    /** DSP界面 */
    public static DSPPanel = 'ui/dsp/DSPPanel';

    /** 会员UI */
    public static MemberUI = 'ui/member/MemberView';

    /** 会员每日领取界面 */
    public static MemberRewardView = 'ui/member/MemberRewardView';

    /** 主界面IOS才开启的按钮view */
    public static MenuIOSBtnView = 'ui/menu/MenuIOSButtonView';
    /**其他途径获取奖励UI */
    public static GetRewardOtherUI = 'ui/common/GetRewardOtherUI';

    /** 设置界面（IOS版本） */
    public static SettingView_IOS = "ui/setting/SettingView_IOS";

    /** 加载中ui */
    public static TipsLoadingView = "ui/tips/TipsLoadingView";
    /**录屏UI */
    public static RecordVideoUI = 'ui/ZiJie/ZiJieRecord';

    /** 武器展示ui */
    public static WeaponDisplayUI = "ui/weapondisplay/WeaponDisplay";
    /**过关小诀窍ui */
    public static UpgradePanelUI = 'ui/common/UpgradePanel';

    /**boss界面 */
    public static BossRankUI = 'ui/boss/BossView';

    public static BossHelpUI = 'ui/boss/BossHelpView';

    public static BossAlertUI = 'ui/boss/BossAlert';

    public static ReliveTipsUI = 'ui/common/ReliveTipsUI';

    public static AnimGuideView = 'ui/guide/AnimationGuideView';

    public static UIRolePath = 'ui/component/UIRole';

    public static loadingUI = 'ui/common/LoadingView';

    public static CurrencyUI = 'ui/common/CurrencyView';

    public static DropPreviewUI = 'ui/equip/DropPreview';

    public static BoxView = 'ui/box/BoxView';

    public static BoxOpenView = 'ui/box/BoxOpenView';
    public static EquipView = 'ui/equip/EquipView';
    public static EquipTipsView = 'ui/tips/EquipTipsView';
    public static EquipIntensifyView = 'ui/equip/EquipIntensifyView';
    public static EquipSmeltView = 'ui/equip/EquipSmeltView';
    public static UpdateRewardView = 'ui/common/UpdateRewardView';
    public static PropertyView = 'ui/equip/PropertyDetail';
    public static FunUnlockTipsView = 'ui/tips/fununlocktips/FunUnlockTipsView';

    public static PersonCreateView = 'ui/person/PersonCreateView';

    public static PersonView = 'ui/person/PersonView';
    public static PersonOtherInfo = 'ui/person/OtherInfoView';

    /**悬赏任务 */
    public static RewardTaskView = 'ui/rewardtask/RewardTaskView';

    /** 技能tips */
    public static SkillTipsView = 'ui/tips/skilltips/SkillTipsView';

    /** 科技改造 */
    public static TechnologyView = 'ui/technology/TechnologyView';
    // 生态研究界面
    public static EcologicalView = 'ui/ecological/EcologicalView';
    // 生态研究奖励界面
    public static EcologicalRewardView = 'ui/ecological/EcologicalRewardView';
}

export declare interface AttackVo {
    insId: number,  //
    hurt: number,   //伤害值
    hitRadius?: number,//伤害半径
    bulletType?: number,//子弹类型
    belongto?: Const.BulletBelong, //0 我的，1 敌方
    hitPos?: cc.Vec2,    //攻击目标点
    hitEffectId?: number,    //受击效果id
    hitAudioId?: number,
    doubleReward?: number,
    doubleHit?: boolean,   //是否是暴击
    hitDir?: cc.Vec2,         //击退方向
    hitBack?: number,        //击退距离
    showDamage?: number,
    hurtRatio?: number,      //火力加强倍率
    extraHurtRatio?: number,    //额外武器系数
}

/**分享渠道码 */
export class ShareCode {
    public static result: string = "result";    //结算分享
    public static regular: string = "regular";  //常规分享
    public static invite: string = "invite";    //邀请
    public static shop: string = "shop"; //商店解锁
    public static service: string = "service";//客服分享
    public static home: string = "home"; //主页分享
    public static box: string = "box"; //宝箱
    public static rank: string = "rank"; //排行榜
    public static gunAway: string = "gunAway";
    public static gunTry: string = "gunTry";
    public static bossresult: string = "bossresult";//炫耀boss战
}

/**分享场景值 打点需要 */
export class ShareScene {
    public static inviteReward: string = "分享邀请进入游戏";
}

export interface ItemData {
    /** 物品实例ID */
    itemInstanceID: number,
    /** 物品ID */
    itemID: number,
    /** 物品数量(数量大于0时则展示 x数量 隐藏 阶级) */
    goodsNum?: number
}

export enum EquipTipsType {
    Compare = 0,
    Normal,
}
export interface EquipTipsData {
    /** tips框类型 */
    type?: EquipTipsType,
    /** 左边物品ID */
    itemLeftID: number,
    /** 左边实例ID */
    itemLeftInstanceID?: number,
    /** 右边物品ID */
    itemRightID?: number,
    /** 右边实例ID */
    itemRightInstanceID?: number,
    /** 对比装备的ID */
    compareID?: number,
    /** 装备按钮回调 */
    btnEquipHandler?: (itemData: ItemData) => any,
    /** 锁定按钮回调 */
    btnLockHandler?: (itemData: ItemData) => any,
    /** 相对于Node的位置，不填则默认 */
    comparePosNode?: cc.Node,
    /** 绝对位置(优先级最高)，不填则默认 */
    pos?: cc.Vec2,

    /**是否隐藏附加属性 */
    isHideAttach?: boolean,

    checkGuide?: boolean
}

export interface EquipTipsItemData {
    /** 物品ID */
    itemID: number,
    /** 物品实例ID */
    itemInstanceID?: number,
    /** 比较ID */
    compareID?: number,
    /** 是否显示底部按钮 */
    showButton?: boolean,
    /** 装备等级 */
    level?: number,
    /** 是否装备中 */
    isPuted?: boolean,
    /** 是否隐藏附加属性 */
    hideAttachProperty?: boolean,
    /** 装备按钮回调 */
    btnEquipHandler?: (itemData: ItemData) => any,
    /** 锁定按钮回调 */
    btnLockHandler?: (itemData: ItemData) => any
}

export interface RemindData {
    name: string,
    node: cc.Node,
    type?: number,                      //红点类型，默认为有数字，1为没数字的感叹号
    checkFunc: () => number | any,
    scale?: number,
    offsetX?: number,
    offsetY?: number,
    hideNum?: boolean
}

/** 功能玩法ID */
export enum GameFunID {
    /** 枪械库 */
    WeaponLib = 1,
    /** 会员 */
    Member,
    /** 转盘 */
    MainDraw,
    /** 签到 */
    Sign,
    /** 悬赏 */
    RewardTask,
    /** 头目战 */
    Boss,
    /** 排行榜 */
    Rank,
    /** 装备强化 */
    EquipUpgrade,
    /** 装备熔炼 */
    EquipSmelt,
    /** 生态研究 */
    Ecological,
    /** 科技改造 */
    Technology,
    /**宝箱 */
    Box,
}

export enum GameFunUnlockType {
    /** 关卡满足 */
    Level = 1,
    /** 角色等级满足 */
    RoleLevel
}

export interface FunUnlockTipsData {
    /** 功能玩法ID */
    funID: GameFunID,
    /** 功能节点位置 */
    node: cc.Node,
    /** 解锁条件 */
    unlockType: GameFunUnlockType,
    /** 解锁值 */
    value: number,
}

/** 游戏事件 */
export enum GameEventID {
    /** 主界面被打开 */
    Menu_Open = 1,
}

export enum TaskType {
    Daily = 1,
    Stage = 2,
    Battle = 3,
}

export enum TaskSubType {
    WinTarget = 1,
    StrengTarget = 3,
    SmeltReward = 4,
    KillTarget = 5,
    ResumeHp = 6,
    ToolReward = 7,
    EquipReward = 8,
    DrawTarget = 11,
    BoxTarget = 13,
    BoxBuy = 14,
    SuitUpTarget = 16,
    BattleTarget = 17,
}

export namespace Guide {
    export interface GuideItemData {
        /** 目标节点 */
        node: cc.Node,
        /** 节点编号 */
        tag: number,
        /**节点所在引导页面 */
        tagLayer?,
        /** 点击回调 */
        callBack: () => any,
        /**检测功能开启回调 */
        checkOpenFunc?: () => any,
    }

    /** 新手引导条件类型 */
    export enum GuideCondictionCheckType {
        /** 等级达到则开启指引 */
        Level = 1,
        /** 装备解锁而且有高战力装备时 */
        Stronger_Equip,
        /** 强化解锁解锁时 */
        Unlock_Upgrade,
        /** 熔炼解锁时 */
        Unlock_Smelt,
    }

    export enum GuideModuleNum {
        /** 武器装备指引 */
        Equip_1 = 1,
        /** 枪口装备指引 */
        Equip_2,
        /** 护甲装备指引 */
        Equip_3,
        /** 吊坠装备指引 */
        Equip_4,
        /** 强化装备 */
        Upgrade,
        /** 熔炼指引 */
        Smelt,
        /** 新用户首次进入游戏首页 */
        FirstOpenMenu,
        /** 首次进入关卡中 */
        FirstEnterGame,
        /** 首次挑战关卡结束（无论失败还是成功） */
        FirstGameResult,
        /** 首次通过第一章节 */
        FitstPassOneChapter
    }

    export let GuideName = {
        1: "Equip_1",
        2: "Equip_2",
        3: "Equip_3",
        4: "Equip_4",
        5: "Upgrade",
        6: "Smelt"
    }

    /** 指引模块对应配置ID */
    export let GuideInstanceID = {
        [GuideModuleNum.Equip_1]: 1,
        [GuideModuleNum.Equip_2]: 4,
        [GuideModuleNum.Equip_3]: 7,
        [GuideModuleNum.Equip_4]: 10,
        [GuideModuleNum.Upgrade]: 13,
    }
} 

/** 科技系统 */
export namespace Technology {
    /** 升级消耗类型 */
    export enum CostType {
        /** 金币 */
        Gold = 1,
        /** 钻石 */
        Diamond,
        /** 体力 */
        Power,
        /** 科技点 */
        TechPoint,
    }
}