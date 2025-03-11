

export namespace Const {
    export const APP_ID = "wxc93ee93882288748";

    export const designWidth = 720;
    export const designHeight = 1280;

    export const mapHeight = 3200;
    export const mapWidth = 2160;

    /**格子长宽度 */
    export const gridWidth = 120;
    export const gridHeight = 100;


    export const GAME_SCENENAME = "GameScene";

    export const GameName: string = "热血猎手";

    /**是否开启输出console.log */
    export const SHOW_LOG = true;

    //本地缓存key
    export const STORAGE_SETTING: string = "setting";//设置
    export const STORAGE_NEWUSER: string = "newuser";//新用户标记

    export const STORAGE_STORE_GOLD: string = "store_gold";//商店金币信息
    export const STORAGE_STORE_POWER: string = "store_power";//商店体力信息
    export const STORAGE_STORE_BOX: string = "store_box";//白银宝箱
    export const STORAGE_STORE_LOCKLIST: string = "store_locklist";//锁定列表
    export const STORAGE_MENU_FULI: string = "menu_fuli";
    export const STORAGE_BOSS_HELP: string = "boss_help";
    export const STORAGE_CHAPTER_INFO: string = "chapter_info";
    export const enum BulletBelong {
        MY_BULLET = 0,
        MONSTER_BULLET = 1,
    }
    export const MonsterNum: number = 40;

    /**播放多个音效时间间隔 */
    export const audioLimitTime: number = 0.2;

    /**间隔距离 */
    export const disBewteenMon: number = 60;
    /**震动间隔 */
    export const shakeLimitTime: number = 0.15;

    /**道具数量上限 */
    export const ToolMaxNum: number = 10;

    export const FIGHT_STATETIME: number = 1.5;//脱离战斗状态时间

    /**复活所需金币数 */
    export const ReliveGold: number = 800;

    /**复活爆炸伤害 */
    export const ReliveBoomHurt: number = 150;

    // 体力恢复时间(1点)秒
    export const PowerRecoverTime: number = 300;

    // 最大体力(仅作用于自动恢复功能)
    export const MaxPower: number = 25;

    // 每局消耗
    export const PowerCost: number = 5;

    // 每日视频次数
    export const TotalVideoTimes: number = 10;

    // 每日免费金币次数
    export const FreeGoldTimes: number = 5;

    // 每日免费钻石次数
    export const FreeDiamondTimes: number = 3;

    // 每日免费钻石数量
    export const FreeDiamondCount: number = 50;

    // 宝箱上限
    export const treasureBoxLimited: number = 50;
    export const treasureBoxDayLimited: number = 6;

    // 每日主界面转盘次数
    export const MainDrawTimes: number = 15;
    // 每日宝箱免费开启次数
    export const TreatureBoxFreeTimes: number = 1;

    // 开启宝箱次数超过5次额外随机
    export const OpenTreaseBoxNum = 5;

    export const ReliveDiamond: number = 30;
    /**
     * 收藏奖励
     */
    export const CollectReward: number = 150;

    export const loopStageRange: number[] = [241, 255];
    export const loopBossRange: number[] = [23, 27];

    export const inGameLimited: number = 2;
    export const upgradeHurCost: number = 2500;
    export const fullWeaponFailTimes: number = 2;//满级使用出现时机失败次数
    export const failWeaponUpgradeTimes: number = 1;//武器提示升级失败次数
    export const fullWeaponLevel: number = 20;//满级使用出现最低关卡等级
    export const upgradeFireLevel: number = 10;//升级火力出现最高关卡等级
    export const maxShootSpeedLv = 50;      //最大射速等级
    export const maxBulletCapacityLv = 50;  //最大子弹容量等级
    export const fireHotLv = 50;            //火力加成等级
    export const rewardRoundTime = 20;      //收益奖励时间20s
    export const awakeUpLevel = 20;     //唤醒等级
    export const awakeLimite = 5;           //觉醒等级上限
    export const MonsterBronRangeMin: cc.Vec2 = cc.v2(-1080, -1600);
    export const MonsterBronRangeMax: cc.Vec2 = cc.v2(1080, 1600);
    export const BossRangeMin: cc.Vec2 = cc.v2(-450, -832);
    export const BossRangeMax: cc.Vec2 = cc.v2(450, 832);
    /**人物初始血量 */
    export const RoleHP: number = 100;

    // export const JsonRemoteUrl: string = ``; //测试版配置
    export const JsonRemoteUrl: string = ``; //正式版配置

    /**组名 */
    export const GroupDefault = "Default";
    export const GroupTerrain = "Terrain";
    export const GroupDecorate = "Decorate";
    export const GroupMainRole = "MainRole";
    export const GroupMonster = "Monster";
    export const GroupBomb = "Bomb";
    export const GroupBullet = "Bullet";
    export const GroupTool = "Tool";
    export const GroupUI = "UI";

    /**金币怪奖励血量百分比 */
    export const GeBuLin: number = 0.1;

    export const MainWeaponPos = {
        // 缩放比例 位置坐标posittion 角度 size大小xy 
        "101": { scale: 1, pos: cc.v2(-6, -15), rotate: 10, width: 241, height: 122 },
        "102": { scale: 0.9, pos: cc.v2(7, -7), rotate: 45, width: 220, height: 133 },
        "103": { scale: 0.9, pos: cc.v2(17, -15), rotate: 6, width: 308, height: 106 },
        "104": { scale: 0.9, pos: cc.v2(39, 11), rotate: 10, width: 252, height: 183 },
        "105": { scale: 0.9, pos: cc.v2(26, -9), rotate: 20, width: 229, height: 130 },
        "106": { scale: 1, pos: cc.v2(-34, -2), rotate: 10, width: 255, height: 131 },
        "107": { scale: 1, pos: cc.v2(-6, -19), rotate: 25, width: 281, height: 113 },
        "109": { scale: 1, pos: cc.v2(52, -2), rotate: 5, width: 247, height: 104 },
        "111": { scale: 0.9, pos: cc.v2(52, 20), rotate: -2, width: 262, height: 149 },
        "112": { scale: 0.9, pos: cc.v2(21, 10), rotate: 0, width: 185, height: 119 },
        "117": { scale: 1.1, pos: cc.v2(44, -5), rotate: -10, width: 196, height: 62 },
        "120": { scale: 0.9, pos: cc.v2(21, -1), rotate: 0, width: 184, height: 148 },
        "121": { scale: 1, pos: cc.v2(34.4, 2), rotate: 18, width: 206, height: 126 },
        "122": { scale: 1, pos: cc.v2(11, -9), rotate: 10, width: 227, height: 116 },
        "123": { scale: 0.5, pos: cc.v2(22, 90), rotate: -10, width: 220, height: 133 },
    }

    export const DefaultGunId: number = 105;

    /**
     * 掉落类型
     */
    export enum dropType {
        Gold = 1,
        Equip = 2,
        Box = 3,
    }

    export const ItemType = [
        "枪械",
        "枪口",
        "护甲",
        "挂坠"
    ]
    export const ItemQuality = [
        "普通",
        "优秀",
        "精良",
        "史诗",
        "传说"
    ]

    export const ItemQualityColor = [
        "#ffffff",//普通
        "#00e998",//精良
        "#00dafc",//优秀
        "#c55bfa",//史诗
        "#ffa33c"//传说
    ]

    export const Color = {
        blue: "#90d3ff",//蓝色
        green: "#83f35d" //绿色
    }

    export const NormalAttack: number = 25;
    export const NormalHp: number = 300;
    export const AttackInBoss: number = 50;

    export const enum ViewMap {
        MainView = 1,
        EquipView = 2,
        BoxView = 3,
        EquipIntenView = 4,
        EquipSmeltView = 5,
        BossView = 6,
        RankView = 7,
        EcologicalView = 8,
        TechnologyView = 9,
    }

    export const enum rewardType {
        gold = 1,
        diamond = 2,
        power = 3,
        science = 4,
        exp = 5,
    }

    export const EquipMaxToTips: number = 50;

    export const DrawKillNum: number = 500;

    export const BossBronPos: number[][] = [[-450, 550], [-150, 550], [150, 550], [450, 550]];

    export const enum GuideType {
        /** 对话框 */
        Dialog = 1,
        /** 指引 */
        Guide,
    }

    export const GuideConditionType = {
        /** 通关数 */
        TopLevels: "1",
        /** 有新解锁的部位并且有装备佩戴 */
        NewEquip: "2",
        /** 强化功能解锁 */
        UnlockUpgrade: "3",
        /** 熔炼功能解锁 */
        UnlockSmelt: "4",
        /** 新用户首次进入游戏首页 */
        FirstOpenMenu: "5",
        /** 首次进入关卡中 */
        FirstEnterGame: "6",
        /** 首次挑战关卡结束（无论失败还是成功） */
        FirstGameResult: "7",
        /** 首次通过第一章节 */
        FitstPassOneChapter: "8"
    }
}

// event_1:看5次视频获得钻石
// event_2:转盘看视频抽奖
// event_3:结算转盘抽奖
// event_4:双倍签到
// event_5:复活
// event_6:视频开启白银宝箱
// event_7:视频开启紫金宝箱(暂配置钻石购买)
// event_8:购买小堆金币
// event_9:购买中堆金币
// event_10:购买小量体力
// event_11:购买中量体力
// event_12:三倍领取离线奖励
