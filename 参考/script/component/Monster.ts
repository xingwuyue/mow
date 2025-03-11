import { GameStateMachine } from "../fsm/GameStateMachine";
import { AttackVo } from "../common/Common_Define";
import { Bullet } from "./Bullet";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Util } from "../utils/Util";
import { RoleManager } from "../manager/RoleManager";
import { Manager } from "../manager/Manager";
import { AudioType } from "../manager/AudioManager";
import SettingModel from "../module/setting/SettingModel";
import { MonsterCfg } from "../config/MonsterCfg";
import { Const } from "../config/Const";
import { GameVoManager } from "../manager/GameVoManager";
import { Gun } from "./Gun";
import { Bomb } from "./Bomb";
import { Buff } from "./Buff";
import FightModel from "../module/fight/FightModel";
import { Time } from "../framework/Time";
import { Cfg } from "../config/Cfg";
import { CallID } from "../CallID";
import { PropertyVO } from "../module/equip/Property";
import { StateMachine } from "../fsm/StateMachine";
import { MonsterState } from "../fsm/MonsterState";
import { SteeringBehavior } from "./SteeringBehaviors";
import { GameWorld } from "./GameWorld";
import { SkillState } from "../fsm/SkillState";
import { Agent } from "./Agent";
import SkillCircle from "./SkillCircle";

export declare interface MonsterVo {
    insId?: number,
    monsterVoCfg: MonsterCfg,
    extarInfo?: any
}

/**
 * 无敌列表
 * [1：首次受击无敌,无敌时间]
 * [2：循环无敌，无敌时间，间隔]
 */
let firstInvicibleList = {
    "327": [1, 1.5, 0],
    "117": [1, 1.5, 0]
}
let loopInvicibleList = {
    "343": [2, 2, 3],
    "345": [2, 2, 3],
    "352": [2, 2, 3],
    "357": [2, 2, 3],
    "406": [2, 2, 3],
}

/**
 * 冲刺列表
 * []
 */
let spurtList = {
    "324": 1,
    "624": 1,
}


/**
 * 自爆列表
 * 
 */
let boomSelfList = {
    "107": 1,
    "328": 1,
    "605": 1,
}

/**
 * 爆炸留下一个区域伤害
 * [道具id]
 */
let deadRangeList = {
    "325": [6001]
}

/**
 * 击杀恢复血量[百分比]
 */
let bloodResume = {
    "331": [100],
    "332": [100],
    "333": [100],
    "334": [100],
    "335": [100],
    "339": [100],
    "340": [100],
    "341": [100],
    "342": [100],
    "343": [100],
    "344": [100],
    "345": [100],
    "346": [100],
    "603": [50],
    "604": [100],
}

/**
 * 加速列表 加速范围内怪物速度
 * [速度增加值，范围半径，持续时间，释放间隔]
 */
let speedList = {
    "318": [130, 180, 2, 4],
    "111": [130, 180, 2, 4],
}

/**不被击退（不进入受击状态）
 * [id]
 */
let nohitList = {
    "321": 1,
    "322": 1,
    "323": 1,
    "331": 1,
    "332": 1,
    "333": 1,
    "334": 1,
    "335": 1,
    "336": 1,
    "337": 1,
    "338": 1,
    "339": 1,
    "340": 1,
    "341": 1,
    "342": 1,
    "343": 1,
    "344": 1,
    "345": 1,
    "346": 1,
    "347": 1,
    "348": 1,
    "349": 1,
    "350": 1,
    "351": 1,
    "352": 1,
    "353": 1,
    "354": 1,
    "357": 1,
    "355": 1,
    "356": 1,
    "358": 1,
    "359": 1,
    "360": 1,
    "361": 1,
    "362": 1,
    "363": 1,
    "364": 1,
    "365": 1,
    "366": 1,
    "401": 1,
    "402": 1,
    "403": 1,
    "404": 1,
    "405": 1,
    "406": 1
}

/**
 * 加血列表
 * [血量百分比，范围半径，释放间隔]
 */
let bloodList = {
    "329": [5, 180, 7],
    "108": [5, 180, 7],
}

export class Monster extends Agent {
    protected gunObject: Gun;
    public monsterVoCfg: MonsterCfg;
    public anim: cc.Animation = null;
    private hitCount: number = 0;   //被攻击次数
    // private _skillStateMachine: StateMachine<Monster> = null;
    private hitAudioId: number = 0;
    public attackNum: number = 0;   //伤害值
    private hpNode: cc.ProgressBar = null;
    private warnNode: cc.Node = null;
    private warnRangeNode: cc.Node = null;
    public hitBack: number = 0;
    private rewardGold: number = 0;
    public resId: string = "";
    public bodyNode: cc.Node = null;
    private attackRect: cc.Rect = null;
    private isSpurting: boolean = false; //是否在冲刺中
    private monsterForm: number = 0;//根据血量改变形态 0第一形态 1第二形态 2第三形态
    private createToolTargetHp: number = 0;
    private weaponIdList: number[] = [];
    public capacity: number = 0;     //能力比例
    protected _buffList: Buff.BuffManager<Monster>;
    public property: PropertyVO;
    protected _typeId: number = 0;
    protected _GameState: StateMachine<Monster>;
    protected m_Steering: SteeringBehavior<Monster>;
    protected bloodBuffValue: number = 0;
    protected icecount: number = 0;
    protected firecount: number = 0;
    protected poisioncount: number = 0;
    protected circleNode: cc.Node = null;
    public constructor() {
        super();
        this.changeListener(true);
        this._buffList = new Buff.BuffManager(this);
        this.gunObject = new Gun(Const.BulletBelong.MONSTER_BULLET, this, false);
        this.m_Steering = new SteeringBehavior<Monster>(this);
    }
    private curBodyScale: number = 0;
    private bodyScaleDelta: number = 0;
    public movespeed: number = 0;
    public init(insId: number, node: cc.Node, monVo: MonsterVo) {
        this.SetID(insId);
        this.node = node;
        this.capacity = Notifier.call(CallID.Fight_GetMonCapacity);
        if (monVo.extarInfo) {
            this.weaponIdList = monVo.extarInfo.guns;
            this.property.hp = monVo.extarInfo.monHp * this.capacity;
            this.initHp(this.property.hp);
        } else {
            this.weaponIdList = monVo.monsterVoCfg.weaponId;
            this.property.hp = monVo.monsterVoCfg.hp * this.capacity;
            this.initHp(this.property.hp);
        }
        this._typeId = monVo.monsterVoCfg.id;
        this.property.defense = FightModel.getInstance.fightType == 0 ? monVo.monsterVoCfg.defence * this.capacity : 0;
        this.property.attack = monVo.monsterVoCfg.hurt * this.capacity;
        this.attackNum = this.property.attack;
        this._node.group = Const.GroupMonster;
        this.monsterVoCfg = monVo.monsterVoCfg;
        this.resId = this.monsterVoCfg.monResPath.substr(-3, 3);
        this.attackRange = monVo.monsterVoCfg.attackRange;
        this.attackRange += this.BRadius;
        this.attackDelta = monVo.monsterVoCfg.shootDelta;
        this._node.colliderComponent = this;
        this._isDead = false;
        this.hitCount = 0;
        this.hurtDeltaCount = 0;
        this.isSpurting = false;
        this.anim = this._node.getComponent(cc.Animation);
        this.hitAudioId = 0;
        this._buffList.clearBuff();
        this.curattackDelta = 0;
        this.blackHolecount = 0;
        this.firstAttack = true;
        this.monsterForm = -1;
        this.circleTime = 0;
        this.doTransform(1.0);
        if (nohitList[this.monsterVoCfg.id]) {//更新血条
            if ((FightModel.getInstance.fightType != 0 && FightModel.getInstance.targetId == this.Id) || FightModel.getInstance.fightType == 0) {
                Notifier.send(ListenID.Fight_ShowBossBlood, true, this._curHp, this._allHp);
            }
        }
        this._node.active = true;
        this.MaxSpeed = Util.random(this.monsterVoCfg.moveSpeed[0], this.monsterVoCfg.moveSpeed[1]);
        this.movespeed = this.MaxSpeed;
        this.MaxForce = this.MaxSpeed * 100;
        this.m_Velocity = cc.Vec2.ZERO;
        this._GameState.ChangeState(MonsterState.StateType.NONE);
        this.speedNode = this._node.getChildByName("speed");
        this.bodyNode = this._node.getChildByName("body");
        this.circleNode = this._node.getChildByName("circle");
        this.SetScale(this.monsterVoCfg.bodyScale[0]);
        this.curBodyScale = this.monsterVoCfg.bodyScale[0];
        this.bodyScaleDelta = this.monsterVoCfg.bodyScale[1] - this.curBodyScale;
        this.monsterHead = this._node.getChildByName("head");
        this.inVincibleNode = this._node.getChildByName("wudi");
        if (this.monsterHead) this.monsterHead.scale = 1;
        if (this.inVincibleNode) this.inVincibleNode.scale = 1;
        if (boomSelfList[this.monsterVoCfg.id]) {
            this.warnNode = this._node.getChildByName("warn");
            this.warnRangeNode = this._node.getChildByName("warnwarn")
            if (this.warnNode) {
                this.warnNode.active = false;
                this.warnNode.width = 2 * this.monsterVoCfg.skillRange;
                this.warnNode.height = 2 * this.monsterVoCfg.skillRange;
            }
            if (this.warnRangeNode) {
                this.warnRangeNode.scale = 0;
                this.warnRangeNode.active = false;
                this.warnRangeNode.width = 2 * this.monsterVoCfg.skillRange;
                this.warnRangeNode.height = 2 * this.monsterVoCfg.skillRange;
            }
        }
        if (this.speedNode) {
            this.speedNode.scale = 0;
        }
        if (loopInvicibleList[this.monsterVoCfg.id]) {
            this.setInvicibleBuff();
        }
        if (speedList[this.monsterVoCfg.id]) {
            this.setSkillSpeedBuff(speedList[this.monsterVoCfg.id]);
        } else if (bloodList[this.monsterVoCfg.id]) {
            this.setSkillBloodBuff(bloodList[this.monsterVoCfg.id]);
        }
        this.icecount = 0;
        this.firecount = 0;
        this.poisioncount = 0;
        this.hideIce();
        this.hideFireEffect();
        this.hidePoisionEffect();
    }

    public registerFSM() {
        this._GameState = new StateMachine<Monster>(this);
        this._GameState.registerState(MonsterState.StateType.NONE, new MonsterState.NoneState());
        this._GameState.registerState(MonsterState.StateType.STAND, new MonsterState.StandState());
        this._GameState.registerState(MonsterState.StateType.PURSUIT, new MonsterState.PursuitState());
        this._GameState.registerState(MonsterState.StateType.ATTACk, new MonsterState.AttackState());
        this._GameState.registerState(MonsterState.StateType.BEHIT, new MonsterState.BeHitState());
        this._GameState.registerState(MonsterState.StateType.DEAD, new MonsterState.DeadState());
        this._GameState.registerState(MonsterState.StateType.SPURT, new MonsterState.SpurtState());
        this._GameState.ChangeState(MonsterState.StateType.NONE);
    }

    public get isSpurtMonster() { return spurtList[this.monsterVoCfg.id]; }


    public setGunInfo(typeId: number, time: number = 0, reset: boolean = false) {
        this.gunObject.setGunInfo(typeId, time, null, () => {
            this.attackDelta = this.gunObject.getShootDelta();
            let attackrange = this.gunObject.getAttackRange();
            this.attackRange = attackrange[0] + this.BRadius;
            // if (!this.attackRect)
            //     this.attackRect = new cc.Rect(0, 0, attackrange[0] * 2, attackrange[1] * 2);
            // this.attackRect.width = attackrange[0] * 2;
            // this.attackRect.height = attackrange[1] * 2;
        });
    }

    gunChange() {
        this.attackDelta = this.gunObject.getShootDelta();
        let attackrange = this.gunObject.getAttackRange();
        this.attackRange = attackrange[0] + this.BRadius;

        // if (!this.attackRect)
        //     this.attackRect = new cc.Rect(0, 0, attackrange[0] * 2, attackrange[1] * 2);
        // this.attackRect.width = attackrange[0] * 2;
        // this.attackRect.height = attackrange[1] * 2;
    }

    public qteReset() {
        // this.setQTEBuff(5, 5);
    }

    public cleanLaserNode() {
        let node = this._node.getChildByName("bullet");
        if (node) {
            this.gunObject.resetReadyState();
            Notifier.send(ListenID.Fight_RecycleBullet, this._node.bulletId);
        }
    }

    /**初始化血量 */
    public initHp(hp: number) {
        this._allHp = hp;
        this._curHp = this._allHp;
        this.createToolTargetHp = this._allHp * 0.15;
        let node = this._node.getChildByName("hpNode");
        if (node) {
            this.hpNode = node.getChildByName("hp").getComponent(cc.ProgressBar);
            this.hpNode.progress = this._curHp / this._allHp;
        } else this.hpNode = null;
    }

    public doTransform(hpRatio: number) {
        if (hpRatio > 0.6 && this.monsterForm < 0) {
            this.monsterForm = 0;
            if (this.monsterVoCfg.monType == 2) {
                this.gunObject.stopWarning();
                if (this.weaponIdList[0])
                    this.setGunInfo(this.weaponIdList[0], 0, true);
                if (this.anim && this.anim.getAnimationState("form0" + this.resId))
                    this.anim.play("form0" + this.resId);
            }
        } else if (hpRatio > 0.3 && hpRatio <= 0.6 && this.monsterForm < 1) {
            this.monsterForm = 1;
            if (this.monsterVoCfg.monType == 2) {
                this.gunObject.stopWarning();
                if (this.weaponIdList[1])
                    this.setGunInfo(this.weaponIdList[1], 0, true);
                if (this.anim && this.anim.getAnimationState("form1" + this.resId))
                    this.anim.play("form1" + this.resId);
            }
        } else if (hpRatio <= 0.3 && this.monsterForm < 2) {
            this.monsterForm = 2;
            if (this.monsterVoCfg.monType == 2) {
                this.gunObject.stopWarning();
                if (this.weaponIdList[2])
                    this.setGunInfo(this.weaponIdList[2], 0, true);
                if (this.anim && this.anim.getAnimationState("form2" + this.resId))
                    this.anim.play("form2" + this.resId);
            }
        }
    }
    public doBossGenTool(hurt?: number) {
        // if (this.isBoss()) {
        //     this.createToolTargetHp -= hurt;
        //     if (this.createToolTargetHp <= 0) {
        //         this.createToolTargetHp = this._allHp * 0.15;
        //         let pos = this.node.position.add(this._normalDir.mul(Util.random(200, 450)).rotate(Util.random(-Math.PI, Math.PI)));
        //         pos = pos.clampf(this._gameWorld.BottomLeft, this._gameWorld.TopRight);
        //         // Notifier.send(ListenID.Fight_AddTool, 0, 0, pos);
        //         let len = this.monsterVoCfg.dropPool.length;
        //         let pool = [];
        //         for (let i = 0; i < len; i++) {
        //             if (GameVoManager.getInstance.myUserVo.dropList[this.monsterVoCfg.dropPool[i]]) {
        //                 pool.push(this.monsterVoCfg.dropPool[i]);
        //             }
        //         }
        //         try {
        //             let index = Util.random(0, pool.length);
        //             if (pool[index]) {
        //                 let id = pool[index];
        //                 Notifier.send(ListenID.Fight_AddTool, id, 0, pos, 0);
        //             }
        //         } catch (error) {

        //         }
        //     }
        // }
        let curhp = this._curHp;
        if (this._curHp < 0) {
            curhp = 0;
        }
        if (this.anim && this.anim.getAnimationState("action")) {
            this.anim.playAdditive('action');
        }
        this.curBodyScale = this.monsterVoCfg.bodyScale[0] + this.bodyScaleDelta * (1 - curhp / this._allHp);
    }

    public setSkillDeBuff(attack, skillList) {
        if (!skillList) return;
        for (let key in skillList) {
            let skillId = Number(key);
            if (skillId == 8006 || skillId == 8028) {
                this.setSkillPoisionBuff(attack * skillList[key].value, skillList[key].time);
            } else if (skillId == 8007 || skillId == 8027) {
                this.setSkillFireBuff(attack * skillList[key].value, skillList[key].time);
            } else if (skillId == 8008 || skillId == 8026) {
                this.setSkillIceBuff(skillList[key].value, skillList[key].time);
            }
        }
    }
    /**
     * 
     * @param pos 目标点
     */
    public moveTo(pos: cc.Vec2): void {
        this.RotateHeadingToFacePosition(pos);
        if (!this._isDead) {
            this._GameState.ChangeState(MonsterState.StateType.PURSUIT);
        }
    }

    public gunUpdate(leftnum, allnum) {

    }

    private hurtDeltaTime: number = 0;
    private circleTime: number = 0;
    public update(dt) {
        super.Update(dt);
        this._GameState.Update(dt);
        if (!this._isDead) {
            this._buffList.update(dt);
            if (this.startScale) {
                this.SetScale(Math.lerp(this.ScaleX, 0.5, dt + 0.03));
                if (this.ScaleX <= 0.5) {
                    this.startScale = false;
                }
            } else {
                this.SetScale(Math.lerp(this.Scale.x, this.curBodyScale, dt + 0.04));
            }

            if (RoleManager.getInstance.isFighting && RoleManager.getInstance.isPause <= 0) {
                this.gunObject.update(dt);
            }
            if (this.circleNode) {
                this.circleTime += 2;
                this.circleNode.rotation = -this._node.rotation + this.circleTime;
            }
            if (this.firenode) {
                this.firenode.rotation = -this._node.rotation;
            }
            if (this.poisionnode) {
                this.poisionnode.rotation = - this._node.rotation;
            }
        }
        if (this.hpNode) {
            this.hpNode.progress = this._curHp / this._allHp;
            this.hpNode.node.parent.rotation = -this._node.rotation;
        }
    }

    public isBoss(): boolean {
        return !!nohitList[this.monsterVoCfg.id];
    }

    private doubleReward: number = 0;
    /**
     * 
     * @param vo 
     * @param type 受击类型 0直接受击  1 被波及 2炸弹不显示受击效果 11特殊武器爆炸 15技能雷击 30 毒伤害 31火伤害
     */
    public behit(vo: AttackVo, type: number = 0) {
        if (this._isDead || FightModel.getInstance.isPause > 0) return;
        if (type == 0 || (type == 1 && vo.bulletType != 8)) {
            Notifier.send(ListenID.Fight_SHOWEFFECT, type, vo.hitEffectId, vo.hitPos);
        } else if (type == 11) {
            Notifier.send(ListenID.Fight_SHOWEFFECT, 11, 0, vo.hitPos);
        } else if (type == 13) {
            Notifier.send(ListenID.Fight_SHOWEFFECT, 13, 0, vo.hitPos);
        } else if (type == 15) {
            Notifier.send(ListenID.Fight_SHOWEFFECT, 15, 0, vo.hitPos);
        }
        this.doubleReward = 0;
        if (vo.hitDir && vo.hitDir.mag() != 0) {
            this.hitDir = vo.hitDir.normalize();
        } else {
            this.hitDir = this.Pos.sub(RoleManager.getInstance.mainRole.Pos).normalize();
        }
        if (!this.IsInBuff(Buff.BuffType.INVICIBLE)) {
            if (firstInvicibleList[this.monsterVoCfg.id] && this.hitCount <= 0) {
                this.setInvicibleBuff();
                this.hitCount++;
            } else {
                let doublehit = !!vo.doubleHit;
                let hurt = Math.ceil(vo.hurt);
                this._curHp -= hurt;
                if (nohitList[this.monsterVoCfg.id]) {//更新血条
                    if ((FightModel.getInstance.fightType != 0 && FightModel.getInstance.targetId == this.Id) || FightModel.getInstance.fightType == 0) {
                        Notifier.send(ListenID.Fight_ShowBossBlood, true, this._curHp, this._allHp);
                    }
                }
                if (!spurtList[this.monsterVoCfg.id])
                    this.doTransform(this._curHp / this._allHp);
                this.doBossGenTool();
                let isdirkill = RoleManager.getInstance.mainRole.isDirectKillAttack() && !nohitList[this.monsterVoCfg.id];
                if (SettingModel.getInstance.hurtShow) {
                    let showDamage = vo.showDamage ? vo.showDamage : hurt;
                    if (isdirkill) {
                        Notifier.send(ListenID.Fight_SHOWEFFECT_NUM, 1, this.Pos, this.Id, false, true);
                    } else {
                        let param = null;
                        if (type == 30 || type == 31) {
                            param = { type };
                        }
                        Notifier.send(ListenID.Fight_SHOWEFFECT_NUM, -showDamage, this.Pos, this.Id, doublehit, false, param);
                    }
                }
                if (this._curHp <= 0 || isdirkill) {
                    if (vo.hitAudioId && (vo.hitAudioId == 207 || vo.hitAudioId == 3001)) {
                        Manager.audio.playAudio(vo.hitAudioId, AudioType.Hit, 0);
                    }
                    if (this._isDead) return;

                    this._isDead = true;
                    this._GameState.ChangeState(MonsterState.StateType.DEAD)
                } else {
                    if (vo.hitAudioId && vo.hitAudioId > 0)
                        Manager.audio.playAudio(vo.hitAudioId, AudioType.Hit, 0);
                    if (SettingModel.getInstance.blockShake && RoleManager.getInstance.vibrateNum <= 0) {
                        RoleManager.getInstance.vibrateNum++;
                    }
                    if (!nohitList[this.monsterVoCfg.id] && this.hitBack != 0 && !this._isDead && !spurtList[this.monsterVoCfg.id])
                        this._GameState.ChangeState(MonsterState.StateType.BEHIT);
                }
            }
        }
        return;
    }


    // private extraSpeed: cc.Vec2 = cc.Vec2.ZERO;
    private startScale: boolean = false;
    private blackHolecount: number = 0;
    /**
     * 计算吸附力修改速度值
     */
    public calExtraForce(cenpos: cc.Vec2) {
        // let dir = cenpos.sub(this.Pos);
        // this.extraSpeed = dir.normalize().mul(300);
        // this.startScale = true;
    }

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    private hurtDelta = 0;
    private startHurtDelta: boolean = false;
    private hurtDeltaCount: number = 0;
    private hitDir: cc.Vec2 = cc.Vec2.ZERO;
    public onCollisionEnter(other, self) {
        if (!this._isDead && FightModel.getInstance.isPause <= 0) {
            this.hitBack = 0;
            if (other.node.group == Const.GroupBullet) {
                let bullet: Bullet = other.node.colliderComponent;
                if (!bullet.isDead && bullet.belongto != Const.BulletBelong.MONSTER_BULLET) {
                    if (bullet.hitBack)
                        this.hitBack = bullet.hitBack;
                    let type = 0;
                    if (bullet.bulletType == 17) {
                        type = 11;
                    } else if (bullet.bulletType == 37) {
                        type = 13;
                    }
                    if (nohitList[this.monsterVoCfg.id]) this.hitBack = 0;
                    let hitpos = other.world.points && other.world.points[0] || other.world.position;
                    let isviolent = RoleManager.getInstance.mainRole.isViolentAttack();
                    let showhurt = bullet.isTool ? RoleManager.getInstance.getOtherRealHurt(this.property.getDefense(), bullet.hurt, isviolent, RoleManager.getInstance.mainRole.getGunHurtRatio()) : RoleManager.getInstance.getAttackRealHurtByRole(this.property.getDefense(), isviolent, RoleManager.getInstance.mainRole.getGunHurtRatio(), bullet.extraHurtRatio);
                    let realhurt = FightModel.getInstance.fightType == 1 ? Const.AttackInBoss : showhurt;

                    this.behit({ insId: bullet.insId, showDamage: showhurt, hurt: realhurt, hitPos: hitpos, bulletType: bullet.bulletType, hitEffectId: bullet.hitEffectId, hitAudioId: bullet.hitAudioId, doubleReward: bullet.doubleReward, doubleHit: isviolent, hitDir: bullet.hitDir }, type);
                    this.setSkillDeBuff(realhurt, bullet.extraSkill);
                    if (bullet.hurtRange > 0) {
                        RoleManager.getInstance.AttackOtherMonster(this.Pos, bullet.hurtRange, { showDamage: showhurt, hitBack: this.hitBack, insId: -1, hurt: realhurt, hitPos: other.world.position, bulletType: bullet.bulletType, hitEffectId: 0, doubleHit: isviolent }, this.Id);
                    }
                    if (!bullet.canCross) {
                        Notifier.send(ListenID.Fight_RecycleBullet, bullet.insId);
                        bullet.isDead = true;
                    }
                    if (bullet.effectType && bullet.effectType == 1) {//发射子弹环
                        Util.fireToolBullet(4004, this.node.position, Const.BulletBelong.MY_BULLET);
                    }
                    if (bullet.hurtDelta) {
                        this.hurtDelta = bullet.hurtDelta;
                        this.hurtDeltaCount += 1;
                        if (this.hurtDeltaCount > 0) {
                            this.startHurtDelta = true;
                            this.hurtDeltaTime = 0;
                        }
                    }
                }
            } else if (other.node.group == Const.GroupBomb) {
                let isviolent = RoleManager.getInstance.mainRole.isViolentAttack();
                if (other.node.name == "reliveBoom") {
                    let boomhurt = RoleManager.getInstance.getOtherRealHurt(this.property.getDefense(), Const.ReliveBoomHurt, isviolent, RoleManager.getInstance.mainRole.getGunHurtRatio());
                    // let boomhurt = Util.getMainRoleHurtByLevel(Const.ReliveBoomHurt, GameVoManager.getInstance.myUserVo.roleLvs[0]);
                    // let realboomhurt = Util.getMainRoleHurtByLevel(Const.ReliveBoomHurt, FightModel.getInstance.fightType == 0 ? GameVoManager.getInstance.myUserVo.roleLvs[0] : 0);
                    let realhurt = FightModel.getInstance.fightType == 1 ? Const.AttackInBoss : boomhurt;
                    this.behit({ insId: -1, showDamage: boomhurt, hurt: realhurt, hitPos: this.Pos, hitEffectId: 0, doubleHit: isviolent }, 2);
                } else {
                    let bomb = other.node.colliderComponent;
                    if (bomb.toolType == 4005 || bomb.toolType == 4006) {//黑洞吸附
                        this.blackHolecount++;
                        this.calExtraForce(bomb.node.position)
                    } else if (bomb.toolType == 6003) {

                    } else if (bomb.toolType == 6004 || bomb.toolType == 6005 || bomb.toolType == 6006) {
                        let skillobject = bomb as SkillCircle;
                        let skillParam = skillobject.skillParam;
                        let attack = RoleManager.getInstance.getAttackRealHurtByRole(this.property.getDefense(), false, RoleManager.getInstance.mainRole.getGunHurtRatio(), RoleManager.getInstance.mainRole.getGunInfo().getBulletHurtRandom());
                        let realattack = Math.ceil(attack * skillParam[0]);
                        this.behit({ showDamage: realattack, insId: -1, hurt: realattack, hitPos: this.Pos, hitEffectId: 0, doubleHit: false }, 2);
                        let skilllist = {}
                        skilllist[bomb.skillId] = { value: skillParam[3], time: skillParam[4] };
                        this.setSkillDeBuff(attack, skilllist);
                    }
                    else {
                        let boomhurt = RoleManager.getInstance.getOtherRealHurt(this.property.getDefense(), bomb.hurt, isviolent, RoleManager.getInstance.mainRole.getGunHurtRatio());
                        let realhurt = FightModel.getInstance.fightType == 1 ? Const.AttackInBoss : boomhurt;
                        console.log("boomhurt", boomhurt, realhurt);
                        this.behit({ showDamage: boomhurt, insId: -1, hurt: realhurt, hitPos: this.Pos, hitEffectId: 0, doubleHit: isviolent }, 2);
                    }
                }
            }
        }
    }

    public recycleBullet(id: number) {
        Notifier.send(ListenID.Fight_RecycleBullet, id);
    }

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     **/
    public onCollisionStay(other, self: cc.Collider) {
        if (!this.isDead) {
            if (other.node.group == Const.GroupBullet) {
                let bullet: Bullet = other.node.colliderComponent;
                if (this.startHurtDelta && !bullet.isDead && bullet.belongto != Const.BulletBelong.MONSTER_BULLET) {
                    this.hurtDeltaTime += Time.deltaTime;
                    if (this.hurtDeltaTime > this.hurtDelta) {
                        this.hurtDeltaTime = 0;
                        this.hitBack = bullet.hitBack;
                        let hitpos = other.world.points && other.world.points[0] || other.world.position;
                        let isviolent = RoleManager.getInstance.mainRole.isViolentAttack();
                        let showhurt = bullet.isTool ? RoleManager.getInstance.getOtherRealHurt(this.property.getDefense(), bullet.hurt, isviolent, RoleManager.getInstance.mainRole.getGunHurtRatio()) : RoleManager.getInstance.getAttackRealHurtByRole(this.property.getDefense(), isviolent, RoleManager.getInstance.mainRole.getGunHurtRatio(), bullet.extraHurtRatio);
                        // if (bullet.weaponType == 3) {
                        //     realhurt *= RoleManager.getInstance.mainRole.getGunHurtRatio();
                        //     // bullet.doubleHit = RoleManager.getInstance.mainRole.getGunDoubleHit();
                        // }
                        let realhurt = FightModel.getInstance.fightType == 1 ? Const.AttackInBoss : showhurt;
                        this.behit({ showDamage: showhurt, doubleHit: isviolent, insId: bullet.insId, hurt: realhurt, hitPos: hitpos, bulletType: bullet.bulletType, hitEffectId: bullet.hitEffectId, hitAudioId: bullet.hitAudioId });
                    }
                }
            } else if (other.node.group == Const.GroupBomb) {
                let bomb: Bomb = other.node.colliderComponent;
                if (other.node.name != "reliveBoom" && (bomb.toolType == 4005 || bomb.toolType == 4006)) {//黑洞吸附
                    this.calExtraForce(bomb.node.position)
                }
            }
        }
    }

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     **/
    public onCollisionExit(other, self: cc.Collider) {
        if (other.node.group == Const.GroupBullet) {
            let bullet: Bullet = other.node.colliderComponent;
            if (!bullet.isDead && bullet.belongto != Const.BulletBelong.MONSTER_BULLET) {
                this.hurtDeltaCount--;
                if (this.hurtDeltaCount <= 0) {
                    this.startHurtDelta = false;
                    this.hurtDeltaCount = 0;
                }
            }
            if (bullet.weaponType == 4) {
                let hitpos = other.world.points && other.world.points[0] || other.world.position;
                let isviolent = RoleManager.getInstance.mainRole.isViolentAttack();
                let showhurt = RoleManager.getInstance.getAttackRealHurtByRole(this.property.getDefense(), isviolent, RoleManager.getInstance.mainRole.getGunHurtRatio(), bullet.extraHurtRatio);
                let realhurt = FightModel.getInstance.fightType == 1 ? Const.AttackInBoss : showhurt;
                this.behit({ showDamage: showhurt, doubleHit: isviolent, insId: bullet.insId, hurt: realhurt, hitPos: hitpos, bulletType: bullet.bulletType, hitEffectId: bullet.hitEffectId, hitAudioId: bullet.hitAudioId });
            }
        } else if (other.node.group == Const.GroupBomb) {
            let bomb: Bomb = other.node.colliderComponent;
            // this.extraSpeed = cc.Vec2.ZERO;
            if (other.node.name != "reliveBoom" && (bomb.toolType == 4005 || bomb.toolType == 4006)) {//黑洞吸附
                this.blackHolecount--;
                if (this.blackHolecount <= 0) {
                    this.startScale = false;
                    this.SetScale(this.curBodyScale);
                }
            }
        }
    }

    private EnforceNonPeretration() {
        let mondata = RoleManager.getInstance._monsterList;
        for (let k in mondata) {
            if (!mondata[k].isDead && mondata[k].Id != this.Id) {
                let dispos = this.Pos.sub(mondata[k].Pos);
                let dis = dispos.mag();
                if (dis < Const.disBewteenMon) {
                    let offset = this.Pos.add(dispos.normalize().mul(Const.disBewteenMon - dis));
                    this.Pos.x = Math.lerp(this.Pos.x, offset.x, Time.deltaTime + 0.02);
                    this.Pos.y = Math.lerp(this.Pos.y, offset.y, Time.deltaTime + 0.02);
                }
            }
        }
    }

    /**
     * 自爆
     */
    public boomSelfAttack(range: number = 150) {
        Notifier.send(ListenID.Fight_SHOWEFFECT, 1, 117, this.Pos);
        RoleManager.getInstance.AttackAllInRange(this.Pos, range * this.curBodyScale, { insId: -1, hurt: this.property.getAttack(), hitPos: this.Pos, hitEffectId: 0, }, this.Id);
    }

    public showIce() {
        this.icecount++;
        // let node = this._node.getChildByName("ice");
        let node2 = this._node.getChildByName("ice2");
        // if (!node) {
        //     node = new cc.Node("ice");
        //     let sprite = node.addComponent(cc.Sprite);
        //     sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //     Manager.spAtlas.getMonsterBuffIcon("bingdong1").then(res => {
        //         sprite.spriteFrame = res;
        //     });
        //     this._node.addChild(node, 0, "ice");
        //     node.setSiblingIndex(0);
        //     node.width = this.BRadius - 10;
        //     node.height = node.width;
        // }
        // node.active = true;
        if (!node2) {
            node2 = new cc.Node("ice2");
            let sprite = node2.addComponent(cc.Sprite);
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            Manager.spAtlas.getMonsterBuffIcon("bingdong").then(res => {
                sprite.spriteFrame = res;
            });
            this._node.addChild(node2, 1 << 10, "ice2");
            node2.width = this.BRadius - 10;
            node2.height = node2.width;

        }
        node2.active = true;
        // if (this.icecount == 1) {
        //     node2.scale = 0.1;
        //     node2.runAction(cc.scaleTo(0.2, 1));
        // }

    }

    public hideIce() {
        this.icecount--;
        if (this.icecount <= 0) {
            this.icecount = 0;
            let node = this._node.getChildByName("ice");
            if (node) {
                node.active = false;
            }
            node = this._node.getChildByName("ice2");
            if (node) {
                node.active = false;
            }
        }

    }
    private firenode: cc.Node = null;
    public showFireEffect() {
        this.firecount++;
        let node = this._node.getChildByName("fireBuff");
        if (!node) {
            node = RoleManager.getInstance.popBuffEffectNode(1);
            this._node.addChild(node);
        }
        this.firenode = node;
        node.active = true;
    }

    public hideFireEffect() {
        this.firecount--;
        if (this.firecount <= 0) {
            this.firecount = 0;
            let node = this._node.getChildByName("fireBuff");
            if (node) node.active = false;
            this.firenode = null;
        }
    }
    private poisionnode: cc.Node = null;
    public showPoisionEffect() {
        this.poisioncount++;
        let node = this._node.getChildByName("poisionBuff");
        if (!node) {
            node = RoleManager.getInstance.popBuffEffectNode(2);
            this._node.addChild(node);
        }
        this.poisionnode = node;
        node.active = true;

    }

    public hidePoisionEffect() {
        this.poisioncount--;
        if (this.poisioncount <= 0) {
            this.poisioncount = 0;
            let node = this._node.getChildByName("poisionBuff");
            if (node) node.active = false;
            this.poisionnode = null;
        }
    }

    /********************************************************
     * 
     * 
     *                    状态相关START
     * 
     * *******************************************************
    */

    /**追踪状态 */
    public pursuitEnterFunc() {
        this.m_Steering.PursuitOn(RoleManager.getInstance.mainRole);
        this.m_Steering.SeparationOn();
        if (this.anim) {
            let animname = `form${this.monsterForm}${this.resId}`;
            let animname2 = `move${this.resId}`;
            if (this.anim.getAnimationState(animname)) {
                this.anim.play(animname);
            } else if (this.anim.getAnimationState(animname2)) {
                this.anim.play(animname2);
            }
        }
    }

    public pursuitUpdate(dt) {
        // let oldpos: cc.Vec2 = this.Pos;
        if (!RoleManager.getInstance.isFighting/* || this.IsInBuff(Buff.BuffType.ICE)*/) return;
        let SteeringForce = this.m_Steering.Calculate();
        let acceleration = SteeringForce;
        this.m_Velocity = this.m_Velocity.add(acceleration.mul(dt));
        this.m_Velocity = this.m_Velocity.Truncate(this.MaxSpeed);
        this.SetPos(this.Pos.add(this.m_Velocity.mul(dt)));
        this.EnforceNonPeretration();
        if (this.m_Velocity.magSqr() > 0.00001) {
            this.m_Heading = this.m_Velocity.normalize();
            if (this.monsterVoCfg.needRotate == 1)
                this._node.rotation = Util.getAngle(this._normalDir, this.m_Heading);
            this.m_Side = this.m_Heading.Perp();
        }
        this.Pos = this.Pos.clampf(this._gameWorld.BottomLeft, this._gameWorld.TopRight);
    }

    public checkOutInAttackRange() {
        let inattack = false;
        // if (this.monsterVoCfg.monType == 2 && !spurtList[this.monsterVoCfg.id]) {
        //     this.attackRect.x = this.PosX - this.attackRect.width * 0.5;
        //     this.attackRect.y = this.PosY - this.attackRect.height * 0.5;
        //     if (this.attackRect.contains(RoleManager.getInstance.mainRole.Pos)) {
        //         inattack = true;
        //     }
        // } else {
        if (RoleManager.getInstance.mainRole.Pos.sub(this.Pos).magSqr() <= (this.attackRange * this.attackRange)) {
            inattack = true;
        }
        // }
        return inattack;
    }

    public pursuitExitFunc() {
        this.m_Steering.PursuitOff();
        this.m_Steering.SeparationOff();
    }

    private behittime: number = 0;
    private hitStateTime: number = 0;
    public behitEnterFunc() {
        this.behittime = 0;
        this.hitCount++;
        this.hitStateTime = 0.15;
        if (this.anim && this.anim.getAnimationState("hit" + this.resId)) {
            let state = this.anim.play("hit" + this.resId);
            this.hitStateTime = state.duration;
        }
    }
    public behitUpdateFunc(dt) {
        this.behittime += dt;
        if (this.behittime <= 0.15) {
            this.Pos = this.Pos.add(this.hitDir.mul(this.hitBack * dt));
        }
        this.EnforceNonPeretration();
        this.Pos = this.Pos.clampf(this._gameWorld.BottomLeft, this._gameWorld.TopRight);
        if (this.behittime >= this.hitStateTime) {
            this._GameState.ChangeState(MonsterState.StateType.PURSUIT);
        }
    }

    public behitExitFunc() {

    }

    public bekickAss(dis, dir: cc.Vec2) {
        this.hitDir = dir.normalize();
        this.hitBack = dis / 0.15;
        this._GameState.ChangeState(MonsterState.StateType.BEHIT);
    }

    private attackDelta: number = 1;
    private curattackDelta: number = 0;
    private monsterHead: cc.Node = null;
    private firstAttack: boolean = false;
    public attackEnterFunc() {
        this.monsterHead = this._node.getChildByName("head");
        if (this.firstAttack) {
            this.firstAttack = false;
            this.attackFunc(false);
        }
    }
    private shoulerotation: boolean = false;
    public attackUpdateFunc(dt) {
        if (RoleManager.getInstance.isFighting) {
            this.shoulerotation = true;
            if (!this.gunObject.warning && !this.isSpurting) { this.curattackDelta += dt; } else { this.shoulerotation = false; }
            if (this.monsterVoCfg.monType == 2 && this.shoulerotation) {//冲刺怪瞄准
                let disVec = RoleManager.getInstance.mainRole.Pos.sub(this.Pos);
                let angle = Util.getAngle(this._normalDir, disVec);
                let delta = this._node.rotation - angle;
                if (delta > 180 || delta < -180) {
                    if (angle >= 0) {
                        if (this._node.rotation < 0) {
                            this._node.rotation += 360;
                        }
                    } else if (this._node.rotation > 0) {
                        this._node.rotation -= 360;
                    }
                }
                this._node.rotation = Math.lerp(this._node.rotation, angle, dt + 0.05);
            }
            if (this.curattackDelta >= this.attackDelta) {
                this.curattackDelta = 0;
                this.attackFunc(false);
            }
        }
    }

    public attackFunc(isqte: boolean, targetPos?: cc.Vec2) {
        // if (this.IsInBuff(Buff.BuffType.ICE)) return;
        if (this.monsterVoCfg.monType == 1) {
            if (boomSelfList[this.monsterVoCfg.id]) {
                this._GameState.ChangeState(MonsterState.StateType.DEAD);
                return;
            }
            if (RoleManager.getInstance.mainRole.Pos.sub(this.Pos).mag() <= this.attackRange) {
                Notifier.send(ListenID.Fight_MonAttack, this.attackNum);
            }
        } else if (this.monsterVoCfg.monType == 2) {
            if (this.monsterHead) {
                let disVec = RoleManager.getInstance.mainRole.Pos.sub(this.Pos);
                let angle = Util.getAngle(this._normalDir, disVec);
                this.monsterHead.rotation = angle - this._node.rotation;
            }
            let bulletPos = RoleManager.getInstance.mainRole.Pos.sub(this.Pos).normalize();
            if (this.resId == '332') {
                bulletPos.mulSelf(200);
            } else if (this.resId == '333') {
                bulletPos.mulSelf(80);
            }
            this.gunObject.showWarning(this.Pos.add(bulletPos), RoleManager.getInstance.mainRole.Pos, (startPos, targetPos) => {
                let inattack = false;
                if (spurtList[this.monsterVoCfg.id]) {
                    this.setSpurtBuff(targetPos.sub(this.Pos).normalize().mul(this.monsterVoCfg.skillRange), this.monsterVoCfg.attackRange * 2 / this.monsterVoCfg.skillRange);
                    return;
                }
                this.gunObject.onFire(startPos, targetPos);
                // if (this.monsterVoCfg.monType == 2) {
                //     this.attackRect.x = this._node.x - this.attackRect.width * 0.5;
                //     this.attackRect.y = this._node.y - this.attackRect.height * 0.5;
                //     let warning = /*isqte ? this.gunList[0].warning :*/ this.gunObject.warning;
                //     if (this.attackRect.contains(RoleManager.getInstance.mainRole.Pos) || warning) {
                //         inattack = true;
                //     }
                // } else {
                if (RoleManager.getInstance.mainRole.Pos.sub(this.Pos).magSqr() <= this.attackRange * this.attackRange) {
                    inattack = true;
                }
                // }
                if (!inattack) {
                    this._GameState.ChangeState(MonsterState.StateType.PURSUIT);
                }
            })
        }
        let inattack = true;
        if (false && this.monsterVoCfg.monType == 2) {
            let warning = this.gunObject.warning;
            // if (spurtList[this.monsterVoCfg.id]) {
            if (RoleManager.getInstance.mainRole.Pos.sub(this.Pos).magSqr() <= this.attackRange * this.curBodyScale * this.curBodyScale * this.attackRange || warning) {
                inattack = true;
            }
            // } else {
            //     this.attackRect.x = this._node.x - this.attackRect.width * 0.5;
            //     this.attackRect.y = this._node.y - this.attackRect.height * 0.5;
            //     if (this.attackRect.contains(RoleManager.getInstance.mainRole.Pos) || warning) {
            //         inattack = true;
            //     }
            // }
        } else {
            if (RoleManager.getInstance.mainRole.Pos.sub(this.Pos).magSqr() > this.attackRange * this.attackRange) {
                inattack = false;
            }
        }
        if (!inattack) {
            this._GameState.ChangeState(MonsterState.StateType.PURSUIT);
        }
    }

    public attackExitFunc() {

    }

    /**死亡 */
    private curdeadTime = 0;
    private deadType: number = 0;
    private deadTime: number = 0;
    public deadEnterFunc() {
        this._isDead = true;
        this.curdeadTime = 0;
        if (boomSelfList[this.monsterVoCfg.id]) {
            this.deadType = 1;
            this.deadTime = this.monsterVoCfg.shootDelta;
            let node = this._node.getChildByName("body");
            node.runAction(cc.blink(this.deadTime, 15).easing(cc.easeIn(2.0)));
            if (this.warnNode) this.warnNode.active = true;
            if (this.warnRangeNode) {
                this.warnRangeNode.active = true;
                this.warnRangeNode.scale = 0;
                this.warnRangeNode.runAction(cc.scaleTo(this.deadTime, 1));
            }
        } else {//普通死亡
            this.deadType = 0;
            this.deadTime = 0.2;
            if (this.monsterVoCfg.deadAudioID > 0)
                Manager.audio.playAudio(this.monsterVoCfg.deadAudioID, AudioType.Dead, 0);
            if (SettingModel.getInstance.blockShake && RoleManager.getInstance.vibrateNum <= 0) {
                RoleManager.getInstance.vibrateNum++;
            }
            if (this.monsterVoCfg.monType == 2) {//回收即将发射的
                this.gunObject.stopWarning();
            }
            Notifier.send(ListenID.Fight_SHOWEFFECT, 10, 0, this.Pos);
        }
    }

    public deadUpdateFunc(dt) {
        this.curdeadTime += dt;
        if (this.curdeadTime >= this.deadTime) {
            try {
                this.speedNode && cc.isValid(this.speedNode) && (this.speedNode.scale = 0);
                this.warnNode && cc.isValid(this.warnNode) && (this.warnNode.active = false);
                this.warnRangeNode && cc.isValid(this.warnRangeNode) && (this.warnRangeNode.scale = 0);
            } catch (error) {
                console.log(error);
            }
            if (this.deadType == 1) this.boomSelfAttack(this.monsterVoCfg.skillRange);
            if (deadRangeList[this.monsterVoCfg.id]) {
                Notifier.send(ListenID.Fight_SHOWEFFECT, 14, deadRangeList[this.monsterVoCfg.id][0], this.Pos);
            }
            if (bloodResume[this.monsterVoCfg.id]) {
                RoleManager.getInstance.mainRole.addBlood(bloodResume[this.monsterVoCfg.id][0]);
            }
            this.deadTime = 999;
            this._buffList.clearBuff();
            if (nohitList[this.monsterVoCfg.id]) {//更新血条
                if ((FightModel.getInstance.fightType != 0 && FightModel.getInstance.targetId == this.Id) || FightModel.getInstance.fightType == 0) {
                    Notifier.send(ListenID.Fight_ShowBossBlood, false, this._curHp, this._allHp);
                }
            }
            RoleManager.getInstance.removeMonster(this.Id, this.monsterVoCfg.id);
        }
    }

    public deadExitFunc() {

    }
    /********************************************************
     * 
     * 
     *                    状态相关END
     * 
     * *******************************************************
    */


    /********************************************************
     * 
     * 
     *                    BUFF相关START
     * 
     * *******************************************************
    */

    /**无敌start ******************************/
    public inVincibleNode: cc.Node = null;
    public inVincibleRadius: number = 55;
    public tempVincibleRadisu: number = 35;
    public getInvicibleBuffInfo() {
        let isloop = !!loopInvicibleList[this.monsterVoCfg.id];
        let data = isloop ? loopInvicibleList[this.monsterVoCfg.id] : firstInvicibleList[this.monsterVoCfg.id];
        return {
            isloop: isloop,
            invincibleDelta: data[1],
            loopDeltaTime: data[2],
        }
    }
    public invincibleBuffEnter() {
        if (firstInvicibleList[this.monsterVoCfg.id]) {
            this.inVincibleRadius = 35;
            this.tempVincibleRadisu = 55;
        }
        if (loopInvicibleList[this.monsterVoCfg.id]) {
            this.inVincibleRadius = 80;
            this.tempVincibleRadisu = 120;
        }
        this.setInvicibleVisible(true);
    }
    public setInvicibleVisible(boo) {
        if (boo) {
            this.inVincibleNode = this._node.getChildByName("wudi");
            if (this.inVincibleNode) {
                this.inVincibleNode.active = true;
                if (this.anim && this.anim.getAnimationState("wudi" + this.resId)) {
                    this.anim.play("wudi" + this.resId);
                }
                this._node.getComponent(cc.CircleCollider).radius = this.tempVincibleRadisu;
            }
        } else {
            if (this.inVincibleNode) {
                this.inVincibleNode.active = false;
                this._node.getComponent(cc.CircleCollider).radius = this.inVincibleRadius;
            }
        }
    }
    public setInvicibleBuff() {
        let param = this.getInvicibleBuffInfo();
        this._buffList.addBuff(Buff.BuffType.INVICIBLE, param);
    }
    /**无敌end *******************************/

    private speedNode: cc.Node = null;
    public setSkillSpeedBuff(skillParam: any) {
        let data = skillParam;
        this._buffList.addBuff(Buff.BuffType.SKILL_SPEED, { isloop: true, buffTime: data[3], buffValue: data[0], buffRange: data[1] * this.ScaleX, addbuffTime: data[2] })
    }

    public setSkillBloodBuff(skillParam: any) {
        let data = skillParam;
        this._buffList.addBuff(Buff.BuffType.SKILL_BLOOD, { isloop: true, buffTime: data[2], buffValue: data[0], buffRange: data[1] * this.ScaleX });
    }

    public doAddSpeedExcute(range, buffValue, buffTime) {
        if (this.speedNode) {
            this.anim.playAdditive("addspeed");
        }
        RoleManager.getInstance.addSpeedToMonster(this.Pos, range, buffValue, buffTime, this.Id);
    }

    public doAddBloodExcute(range: number, buffValue: number) {
        if (this.speedNode) {
            this.anim.playAdditive("addblood");
        }
        RoleManager.getInstance.addBloodToMonster(this.Pos, range, buffValue, this.Id);
    }

    public setSpeedBuff(speed: number, time: number) {
        if (this.IsInBuff(Buff.BuffType.SPEED)) return;
        this._buffList.addBuff(Buff.BuffType.SPEED, { buffTime: time, buffValue: speed });
    }

    public addBlood(bloodValue) {
        let blood = Math.floor(this._allHp * bloodValue / 100);
        this._curHp += blood;
        this._curHp = cc.misc.clampf(this._curHp, 0, this._allHp);
        this.curBodyScale = this.monsterVoCfg.bodyScale[0] + this.bodyScaleDelta * (1 - this._curHp / this._allHp);
        if (SettingModel.getInstance.hurtShow)
            Notifier.send(ListenID.Fight_SHOWEFFECT_NUM, blood, this.Pos, this.Id);
    }

    public setIceBuff(time: number) {
        this._buffList.addBuff(Buff.BuffType.ICE, { buffTime: time });
    }

    private curSpurtTime: number = 0;
    private spurtTime: number = 0;
    private spurtSpeed: cc.Vec2 = null;
    public setSpurtBuff(speed: cc.Vec2, time: number) {
        this.spurtSpeed = speed;
        this.spurtTime = time;
        this._GameState.ChangeState(MonsterState.StateType.SPURT);
    }
    public spurtEnter() {
        this.isSpurting = true;
        this.curSpurtTime = 0;
    }

    public spurtUpdate(dt) {
        this.curSpurtTime += dt;
        this.Pos = this.Pos.add(this.spurtSpeed.mul(dt));
        this.Pos = this.Pos.clampf(this._gameWorld.BottomLeft, this._gameWorld.TopRight);
        if (this.curSpurtTime >= this.spurtTime) {
            this.isSpurting = false;
            return false;
        }
        return true;
    }
    public spurtExit() {
        this.isSpurting = false;
    }

    public setBloodBuff(blood: number) {
        this.bloodBuffValue = blood;
        this._buffList.addBuff(Buff.BuffType.BLOOD, { buffValue: blood });
    }

    public setSkillPoisionBuff(attack: number, time: number, ratiotime: number = 0.2) {
        if (!this.IsInBuff(Buff.BuffType.SKILL_POISION)) {
            this._buffList.addBuff(Buff.BuffType.SKILL_POISION, { buffValue: attack, buffTime: time, deltaTime: ratiotime });
        }
    }

    public setSkillFireBuff(attack: number, time: number, ratiotime: number = 0.2) {
        if (!this.IsInBuff(Buff.BuffType.SKILL_FIRE)) {
            this._buffList.addBuff(Buff.BuffType.SKILL_FIRE, { buffValue: attack, buffTime: time, deltaTime: ratiotime });
        }
    }
    public setSkillIceBuff(speed: number, time: number) {
        this._buffList.addBuff(Buff.BuffType.SKILL_ICE, { buffValue: speed, buffTime: time });
    }

    public setSkillRaduisDamageBuff(hurtRatio: number, deltaTime: number) {
        let attack = RoleManager.getInstance.getAttackRealHurtByRole(this.property.getDefense(), false, RoleManager.getInstance.mainRole.getGunHurtRatio(), RoleManager.getInstance.mainRole.getGunInfo().getBulletHurtRandom());
        this._buffList.addBuff(Buff.BuffType.SKILL_DAMAGE, { buffValue: Math.ceil(attack * hurtRatio), buffTime: deltaTime });
    }
    public clearRaduisDamageBuff() {
        this._buffList.clearBuff(Buff.BuffType.SKILL_DAMAGE);
    }

    /********************************************************
     * 
     * 
     *                    BUFF相关END
     * 
     * *******************************************************
    */
}
