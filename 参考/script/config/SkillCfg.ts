import { TConfig } from "./TConfig";


export interface SkillCfg extends IConfig {skillId:number;skillType:number;skillName:string;skillDesc:string;skillCompose:number;skillIcon:string;isDouble:number;param:number[];skillClass:string;unLock:number;show:number;}



export class SkillCfgReader extends TConfig<SkillCfg> {
    protected _name : string = "Skill";

    public constructor() {
        super();
        this.initByMap({
    "8001": {
        "skillId": 8001,
        "skillType": 1,
        "skillName": "射速提升(小）",
        "skillDesc": "小幅度增加射击速度",
        "skillCompose": 3,
        "skillIcon": "8001",
        "isDouble": 1,
        "param": [
            0.2
        ],
        "skillClass": "SkillGunSpeed",
        "unLock": 0,
        "show": 1
    },
    "8002": {
        "skillId": 8002,
        "skillType": 1,
        "skillName": "射速提升(大）",
        "skillDesc": "增加射击速度",
        "skillCompose": 3,
        "skillIcon": "8002",
        "isDouble": 1,
        "param": [
            0.3
        ],
        "skillClass": "SkillGunSpeed",
        "unLock": 0,
        "show": 1
    },
    "8003": {
        "skillId": 8003,
        "skillType": 2,
        "skillName": "伤害提升(小)",
        "skillDesc": "小幅度增加攻击伤害",
        "skillCompose": 3,
        "skillIcon": "8003",
        "isDouble": 1,
        "param": [
            0.2
        ],
        "skillClass": "SkillGunHurt",
        "unLock": 0,
        "show": 1
    },
    "8004": {
        "skillId": 8004,
        "skillType": 2,
        "skillName": "伤害提升(大)",
        "skillDesc": "增加攻击伤害",
        "skillCompose": 3,
        "skillIcon": "8004",
        "isDouble": 1,
        "param": [
            0.3
        ],
        "skillClass": "SkillGunHurt",
        "unLock": 0,
        "show": 1
    },
    "8005": {
        "skillId": 8005,
        "skillType": 5,
        "skillName": "多重子弹",
        "skillDesc": "攻击弹道+1",
        "skillCompose": 3,
        "skillIcon": "8005",
        "isDouble": 0,
        "param": [
            0.15,
            0
        ],
        "skillClass": "SkillTrajectory",
        "unLock": 0,
        "show": 1
    },
    "8006": {
        "skillId": 8006,
        "skillType": 6,
        "skillName": "剧毒弹",
        "skillDesc": "敌人受到剧毒持续伤害",
        "skillCompose": 0,
        "skillIcon": "8006",
        "isDouble": 0,
        "param": [
            0.5,
            3
        ],
        "skillClass": "SkillPoisonBullet",
        "unLock": 0,
        "show": 1
    },
    "8007": {
        "skillId": 8007,
        "skillType": 7,
        "skillName": "烈焰弹",
        "skillDesc": "敌人受到火焰持续伤害",
        "skillCompose": 0,
        "skillIcon": "8007",
        "isDouble": 0,
        "param": [
            0.5,
            3
        ],
        "skillClass": "SkillFireBullet",
        "unLock": 0,
        "show": 1
    },
    "8008": {
        "skillId": 8008,
        "skillType": 8,
        "skillName": "寒冰弹",
        "skillDesc": "敌人受到冰冻伤害",
        "skillCompose": 0,
        "skillIcon": "8008",
        "isDouble": 0,
        "param": [
            0.4,
            3
        ],
        "skillClass": "SkillIceBullet",
        "unLock": 0,
        "show": 1
    },
    "8009": {
        "skillId": 8009,
        "skillType": 9,
        "skillName": "背向复制",
        "skillDesc": "反向复制弹道",
        "skillCompose": 0,
        "skillIcon": "8009",
        "isDouble": 0,
        "param": [
            9
        ],
        "skillClass": "SkillMapping",
        "unLock": 0,
        "show": 1
    },
    "8010": {
        "skillId": 8010,
        "skillType": 10,
        "skillName": "快速弹夹",
        "skillDesc": "增加换弹速度",
        "skillCompose": 1,
        "skillIcon": "8010",
        "isDouble": 0,
        "param": [
            0.5
        ],
        "skillClass": "SkillReloadGun",
        "unLock": 0,
        "show": 1
    },
    "8011": {
        "skillId": 8011,
        "skillType": 11,
        "skillName": "换弹护罩",
        "skillDesc": "换弹时无敌",
        "skillCompose": 0,
        "skillIcon": "8011",
        "isDouble": 0,
        "param": [
            11
        ],
        "skillClass": "SkillReloadInvinci",
        "unLock": 0,
        "show": 1
    },
    "8012": {
        "skillId": 8012,
        "skillType": 12,
        "skillName": "扩容弹夹",
        "skillDesc": "增加枪械携弹量",
        "skillCompose": 2,
        "skillIcon": "8012",
        "isDouble": 1,
        "param": [
            0.3
        ],
        "skillClass": "SkillCharger",
        "unLock": 0,
        "show": 1
    },
    "8013": {
        "skillId": 8013,
        "skillType": 13,
        "skillName": "2倍镜",
        "skillDesc": "增加较小暴击几率",
        "skillCompose": 1,
        "skillIcon": "8013",
        "isDouble": 1,
        "param": [
            0.1
        ],
        "skillClass": "SkillMirrors",
        "unLock": 0,
        "show": 1
    },
    "8014": {
        "skillId": 8014,
        "skillType": 13,
        "skillName": "4倍镜",
        "skillDesc": "增加暴击几率",
        "skillCompose": 1,
        "skillIcon": "8014",
        "isDouble": 1,
        "param": [
            0.15
        ],
        "skillClass": "SkillMirrors",
        "unLock": 0,
        "show": 1
    },
    "8015": {
        "skillId": 8015,
        "skillType": 13,
        "skillName": "8倍镜",
        "skillDesc": "增加较高暴击几率",
        "skillCompose": 1,
        "skillIcon": "8015",
        "isDouble": 1,
        "param": [
            0.2
        ],
        "skillClass": "SkillMirrors",
        "unLock": 0,
        "show": 1
    },
    "8016": {
        "skillId": 8016,
        "skillType": 13,
        "skillName": "15倍镜",
        "skillDesc": "增加超高暴击几率",
        "skillCompose": 0,
        "skillIcon": "8016",
        "isDouble": 0,
        "param": [
            0.3
        ],
        "skillClass": "SkillMirrors",
        "unLock": 0,
        "show": 1
    },
    "8017": {
        "skillId": 8017,
        "skillType": 17,
        "skillName": "移速提升",
        "skillDesc": "增加角色移速",
        "skillCompose": 3,
        "skillIcon": "8017",
        "isDouble": 1,
        "param": [
            0.1
        ],
        "skillClass": "SkillMoveSpeed",
        "unLock": 0,
        "show": 1
    },
    "8018": {
        "skillId": 8018,
        "skillType": 18,
        "skillName": "生命提升(小)",
        "skillDesc": "小幅度增加生命上限",
        "skillCompose": 3,
        "skillIcon": "8018",
        "isDouble": 1,
        "param": [
            0.2
        ],
        "skillClass": "SkillHpMax",
        "unLock": 0,
        "show": 1
    },
    "8019": {
        "skillId": 8019,
        "skillType": 18,
        "skillName": "生命提升(大)",
        "skillDesc": "增加生命上限",
        "skillCompose": 2,
        "skillIcon": "8019",
        "isDouble": 1,
        "param": [
            0.4
        ],
        "skillClass": "SkillHpMax",
        "unLock": 0,
        "show": 1
    },
    "8020": {
        "skillId": 8020,
        "skillType": 20,
        "skillName": "恢复绷带",
        "skillDesc": "小幅度恢复生命",
        "skillCompose": 30,
        "skillIcon": "8020",
        "isDouble": 1,
        "param": [
            0.3
        ],
        "skillClass": "SkillRecoverHp",
        "unLock": 0,
        "show": 1
    },
    "8021": {
        "skillId": 8021,
        "skillType": 21,
        "skillName": "恢复急救",
        "skillDesc": "恢复生命",
        "skillCompose": 30,
        "skillIcon": "8021",
        "isDouble": 1,
        "param": [
            0.5
        ],
        "skillClass": "SkillRecoverHp",
        "unLock": 0,
        "show": 1
    },
    "8022": {
        "skillId": 8022,
        "skillType": 22,
        "skillName": "量子护罩",
        "skillDesc": "间隔时间生成护罩",
        "skillCompose": 0,
        "skillIcon": "8022",
        "isDouble": 0,
        "param": [
            20,
            3
        ],
        "skillClass": "SkillInvincible",
        "unLock": 0,
        "show": 1
    },
    "8023": {
        "skillId": 8023,
        "skillType": 23,
        "skillName": "快速反应",
        "skillDesc": "受击后角色移速增加",
        "skillCompose": 0,
        "skillIcon": "8023",
        "isDouble": 0,
        "param": [
            0.4,
            5
        ],
        "skillClass": "SkillFast",
        "unLock": 0,
        "show": 1
    },
    "8024": {
        "skillId": 8024,
        "skillType": 24,
        "skillName": "嗜血",
        "skillDesc": "血量越低,伤害越高",
        "skillCompose": 0,
        "skillIcon": "8024",
        "isDouble": 0,
        "param": [
            1
        ],
        "skillClass": "SkillBloodthirsty",
        "unLock": 0,
        "show": 1
    },
    "8025": {
        "skillId": 8025,
        "skillType": 25,
        "skillName": "剧毒辐射",
        "skillDesc": "周围敌人受到辐射伤害",
        "skillCompose": 0,
        "skillIcon": "8025",
        "isDouble": 0,
        "param": [
            2,
            0.5,
            300
        ],
        "skillClass": "SkillRadiusDamage",
        "unLock": 0,
        "show": 1
    },
    "8026": {
        "skillId": 8026,
        "skillType": 26,
        "skillName": "寒冰环绕",
        "skillDesc": "敌人碰撞到后,受到减速伤害",
        "skillCompose": 2,
        "skillIcon": "8026",
        "isDouble": 0,
        "param": [
            1.5,
            150,
            300,
            1,
            0.5
        ],
        "skillClass": "SkillCircleIce",
        "unLock": 0,
        "show": 1
    },
    "8027": {
        "skillId": 8027,
        "skillType": 27,
        "skillName": "烈焰环绕",
        "skillDesc": "敌人碰撞到后,受到火焰持续伤害",
        "skillCompose": 2,
        "skillIcon": "8027",
        "isDouble": 0,
        "param": [
            1.5,
            150,
            300,
            0.5,
            3
        ],
        "skillClass": "SkillCircleFire",
        "unLock": 0,
        "show": 1
    },
    "8028": {
        "skillId": 8028,
        "skillType": 28,
        "skillName": "剧毒环绕",
        "skillDesc": "敌人碰撞到后,受到剧毒持续伤害",
        "skillCompose": 2,
        "skillIcon": "8028",
        "isDouble": 0,
        "param": [
            1.5,
            150,
            300,
            0.5,
            3
        ],
        "skillClass": "SkillCirclePoision",
        "unLock": 0,
        "show": 1
    },
    "8029": {
        "skillId": 8029,
        "skillType": 29,
        "skillName": "生命汲取",
        "skillDesc": "击杀敌人后有几率恢复生命",
        "skillCompose": 2,
        "skillIcon": "8029",
        "isDouble": 0,
        "param": [
            0.05,
            0.1
        ],
        "skillClass": "SkillSuckBlood",
        "unLock": 0,
        "show": 1
    },
    "8030": {
        "skillId": 8030,
        "skillType": 30,
        "skillName": "狂暴合剂(小)",
        "skillDesc": "提升伤害和闪避，生命上限下降",
        "skillCompose": 1,
        "skillIcon": "8030",
        "isDouble": 0,
        "param": [
            0.3,
            0.3,
            0.05
        ],
        "skillClass": "SkillStreng",
        "unLock": 0,
        "show": 1
    },
    "8031": {
        "skillId": 8031,
        "skillType": 31,
        "skillName": "狂暴合剂(大)",
        "skillDesc": "提升伤害和闪避，生命上限下降",
        "skillCompose": 1,
        "skillIcon": "8031",
        "isDouble": 0,
        "param": [
            0.4,
            0.4,
            0.2
        ],
        "skillClass": "SkillStreng",
        "unLock": 0,
        "show": 1
    },
    "8032": {
        "skillId": 8032,
        "skillType": 32,
        "skillName": "闪避提升",
        "skillDesc": "增加闪避率",
        "skillCompose": 2,
        "skillIcon": "8032",
        "isDouble": 1,
        "param": [
            0.1
        ],
        "skillClass": "SkillMiss",
        "unLock": 0,
        "show": 1
    },
    "8033": {
        "skillId": 8033,
        "skillType": 33,
        "skillName": "雷击天罚",
        "skillDesc": "间隔时间引雷攻击",
        "skillCompose": 5,
        "skillIcon": "8033",
        "isDouble": 0,
        "param": [
            3,
            2,
            500
        ],
        "skillClass": "SkillThunder",
        "unLock": 0,
        "show": 1
    },
    "8034": {
        "skillId": 8034,
        "skillType": 34,
        "skillName": "赏金猎人",
        "skillDesc": "击杀敌人,有几率获取双倍金币",
        "skillCompose": 0,
        "skillIcon": "8034",
        "isDouble": 0,
        "param": [
            0.2
        ],
        "skillClass": "SkillGold",
        "unLock": 0,
        "show": 1
    },
    "8035": {
        "skillId": 8035,
        "skillType": 35,
        "skillName": "强力反弹",
        "skillDesc": "受伤后弹开周边敌人",
        "skillCompose": 0,
        "skillIcon": "8035",
        "isDouble": 0,
        "param": [
            300,
            300
        ],
        "skillClass": "SkillRebound",
        "unLock": 0,
        "show": 1
    },
    "8036": {
        "skillId": 8036,
        "skillType": 36,
        "skillName": "子弹反击",
        "skillDesc": "受伤后发射子弹反击敌人",
        "skillCompose": 0,
        "skillIcon": "8036",
        "isDouble": 0,
        "param": [
            5,
            4002
        ],
        "skillClass": "SkillThorns",
        "unLock": 0,
        "show": 1
    },
    "8037": {
        "skillId": 8037,
        "skillType": 37,
        "skillName": "冲击弹",
        "skillDesc": "低几率秒杀敌人",
        "skillCompose": 2,
        "skillIcon": "8037",
        "isDouble": 0,
        "param": [
            0.015
        ],
        "skillClass": "SkillKill",
        "unLock": 0,
        "show": 1
    },
    "8038": {
        "skillId": 8038,
        "skillType": 18,
        "skillName": "生命上限增加",
        "skillDesc": "上限+10%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.1
        ],
        "skillClass": "SkillHpMax",
        "unLock": 0,
        "show": 0
    },
    "8039": {
        "skillId": 8039,
        "skillType": 18,
        "skillName": "生命上限增加",
        "skillDesc": "上限+20%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.2
        ],
        "skillClass": "SkillHpMax",
        "unLock": 0,
        "show": 0
    },
    "8040": {
        "skillId": 8040,
        "skillType": 18,
        "skillName": "生命上限增加",
        "skillDesc": "上限+30%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.3
        ],
        "skillClass": "SkillHpMax",
        "unLock": 0,
        "show": 0
    },
    "8041": {
        "skillId": 8041,
        "skillType": 18,
        "skillName": "生命上限削减",
        "skillDesc": "上限-10%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.1
        ],
        "skillClass": "SkillHpMax",
        "unLock": 0,
        "show": 0
    },
    "8042": {
        "skillId": 8042,
        "skillType": 18,
        "skillName": "生命上限削减",
        "skillDesc": "上限-20%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.2
        ],
        "skillClass": "SkillHpMax",
        "unLock": 0,
        "show": 0
    },
    "8043": {
        "skillId": 8043,
        "skillType": 18,
        "skillName": "生命上限削减",
        "skillDesc": "上限-30%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.3
        ],
        "skillClass": "SkillHpMax",
        "unLock": 0,
        "show": 0
    },
    "8044": {
        "skillId": 8044,
        "skillType": 20,
        "skillName": "恢复生命",
        "skillDesc": "恢复10%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.1
        ],
        "skillClass": "SkillRecoverHp",
        "unLock": 0,
        "show": 0
    },
    "8045": {
        "skillId": 8045,
        "skillType": 20,
        "skillName": "恢复生命",
        "skillDesc": "恢复20%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.2
        ],
        "skillClass": "SkillRecoverHp",
        "unLock": 0,
        "show": 0
    },
    "8046": {
        "skillId": 8046,
        "skillType": 20,
        "skillName": "恢复生命",
        "skillDesc": "恢复30%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.3
        ],
        "skillClass": "SkillRecoverHp",
        "unLock": 0,
        "show": 0
    },
    "8047": {
        "skillId": 8047,
        "skillType": 20,
        "skillName": "扣减生命",
        "skillDesc": "扣减10%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.1
        ],
        "skillClass": "SkillRecoverHp",
        "unLock": 0,
        "show": 0
    },
    "8048": {
        "skillId": 8048,
        "skillType": 20,
        "skillName": "扣减生命",
        "skillDesc": "扣减20%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.2
        ],
        "skillClass": "SkillRecoverHp",
        "unLock": 0,
        "show": 0
    },
    "8049": {
        "skillId": 8049,
        "skillType": 20,
        "skillName": "扣减生命",
        "skillDesc": "扣减30%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.3
        ],
        "skillClass": "SkillRecoverHp",
        "unLock": 0,
        "show": 0
    },
    "8050": {
        "skillId": 8050,
        "skillType": 2,
        "skillName": "伤害增加",
        "skillDesc": "上限+10%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.1
        ],
        "skillClass": "SkillGunHurt",
        "unLock": 0,
        "show": 0
    },
    "8051": {
        "skillId": 8051,
        "skillType": 2,
        "skillName": "伤害增加",
        "skillDesc": "上限+20%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.2
        ],
        "skillClass": "SkillGunHurt",
        "unLock": 0,
        "show": 0
    },
    "8052": {
        "skillId": 8052,
        "skillType": 2,
        "skillName": "伤害增加",
        "skillDesc": "上限+30%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            0.3
        ],
        "skillClass": "SkillGunHurt",
        "unLock": 0,
        "show": 0
    },
    "8053": {
        "skillId": 8053,
        "skillType": 2,
        "skillName": "伤害削减",
        "skillDesc": "上限-10%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.1
        ],
        "skillClass": "SkillGunHurt",
        "unLock": 0,
        "show": 0
    },
    "8054": {
        "skillId": 8054,
        "skillType": 2,
        "skillName": "伤害削减",
        "skillDesc": "上限-20%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.2
        ],
        "skillClass": "SkillGunHurt",
        "unLock": 0,
        "show": 0
    },
    "8055": {
        "skillId": 8055,
        "skillType": 2,
        "skillName": "伤害削减",
        "skillDesc": "上限-30%",
        "skillCompose": 99,
        "skillIcon": "0",
        "isDouble": 0,
        "param": [
            -0.3
        ],
        "skillClass": "SkillGunHurt",
        "unLock": 0,
        "show": 0
    }
});
    }
}