import { Manager } from "../manager/Manager";
import { AudioType } from "../manager/AudioManager";
import { BulletVo, Bullet } from "./Bullet";
import { Const } from "../config/Const";
import FightModel from "../module/fight/FightModel";
import { BulletManager } from "../manager/BulletManager";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { DropCfg } from "../config/DropCfg";
import { Cfg } from "../config/Cfg";
import { RoleManager } from "../manager/RoleManager";
import { AttackVo, TaskSubType } from "../common/Common_Define";
import { ToolManager } from "../manager/ToolManager";
import { Bomb, BombVo } from "./Bomb";
import { GameVoManager } from "../manager/GameVoManager";
import { Time } from "../framework/Time";
import { Util } from "../utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tool extends cc.Component {

    protected _toolType: number = 0;
    private insId: number = 0;
    private liftTime: number = 10;
    private startTime: number = 0;
    private toolCfg: DropCfg = null;
    private hurt: number = 0;
    private checkShowName: number = 0.2;
    public belong: Const.BulletBelong = Const.BulletBelong.MY_BULLET;
    private anim: cc.Animation = null;
    private animName: string = "";
    public showDamage: number = 0;
    public toolKindType: number = 0;

    @property(cc.Sprite)
    body: cc.Sprite = null;

    @property(cc.Sprite)
    bodyName: cc.Sprite = null;

    @property(cc.Node)
    boxlight: cc.Node = null;

    start() {
        this.node.colliderComponent = this;
        this.node.group = Const.GroupTool;
    }

    public isPause: boolean = false;
    pauseNodeAction() {
        if (this.node.getActionByTag(1)) {
            this.node.pauseAllActions();
        }
        this.isPause = true;
    }

    resumeNodeAction() {
        if (this.node.getActionByTag(1)) {
            this.node.resumeAllActions();
        }
        this.isPause = false;
    }

    init(id: number, _toolType) {
        this.insId = id;
        this._toolType = _toolType;
        this.toolCfg = Cfg.Drop.get(this._toolType);
        this.isPause = false;
        if (!this.toolCfg) return;
        this.startHurtDelta = false;
        this.node.stopAllActions();
        this.liftTime = this.toolCfg.lifeTime;
        this.startTime = 0;
        this.boxlight && (this.boxlight.active = false);
        this.toolKindType = this.toolCfg.toolType;
        if (this.toolCfg.toolType == 10) {//
            this.belong = Const.BulletBelong.MONSTER_BULLET;
            let collider = this.node.getComponent(cc.CircleCollider);
            collider.radius = this.toolCfg.hurtRange;
            this.node.opacity = 255;
            this.hurt = this.toolCfg.hurt * FightModel.getInstance.monsterCapacity;//, FightModel.getInstance.curLevel);
            this.anim = this.node.getComponent(cc.Animation);
            this.animName = `toolEffect${this._toolType}`;
        } else {
            this.belong = Const.BulletBelong.MY_BULLET;
            let lv = FightModel.getInstance.fightType == 0 ? GameVoManager.getInstance.myUserVo.roleLvs[0] : 0;
            this.hurt = Util.getMainRoleHurtByLevel(this.toolCfg.hurt, lv);
            this.showDamage = Util.getMainRoleHurtByLevel(this.toolCfg.hurt, GameVoManager.getInstance.myUserVo.roleLvs[0]);
            if (this.toolCfg.toolType != 12) {
                let action = cc.sequence(cc.repeat(cc.sequence(cc.scaleTo(0.5, 1.3), cc.scaleTo(0.5, 1)), this.liftTime - 5), cc.blink(5, 30).easing(cc.easeIn(2.0)));
                action.setTag(1);
                this.node.runAction(action);
            } else {
                this.boxlight.active = true;
                this.boxlight.opacity = 255;
                let action = cc.repeat(cc.sequence(cc.fadeTo(0.5, 76), cc.fadeTo(0.5, 255)), this.liftTime);
                action.setTag(1);
                this.boxlight.runAction(action);
            }
            // if (this.toolCfg.toolType == 2) {
            //     Manager.spAtlas.getWeaponIcon(this.toolCfg.weaponId).then((res) => {
            //         if (this.body) {
            //             this.body.spriteFrame = res;
            //             let ratio = this.body.node.height / this.body.node.width;
            //             this.body.node.width = cc.misc.clampf(this.body.node.width, 30, 73);
            //             this.body.node.height = this.body.node.width * ratio;
            //         }
            //     })
            // } else {
            Manager.spAtlas.getToolIcon(this.toolCfg.id).then((res) => {
                if (this.body) {
                    this.body.spriteFrame = res;
                    let ratio = this.body.node.height / this.body.node.width;
                    let maxwidth = this.toolCfg.toolType != 12 ? 73 : 94;
                    this.body.node.width = cc.misc.clampf(this.body.node.width, 70, maxwidth);
                    this.body.node.height = this.body.node.width * ratio;
                }
            })
            // }
            Manager.spAtlas.getToolNameSprite(this.toolCfg.id).then((res) => {
                this.bodyName.spriteFrame = res;
            })
        }
    }

    public startAttack() {
        this.startTime = 0;
        if (this.anim) {
            this.anim.setCurrentTime(0, this.animName);
            this.anim.play(this.animName);
            if (this.anim.getAnimationState(`toolEffect${this.toolType}_1`)) {
                this.anim.playAdditive(`toolEffect${this.toolType}_1`);
            }
        }
    }

    public get toolType(): number {
        return this._toolType;
    }
    // update (dt) {}

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionEnter(other, self) {
        // Notifier.send(ListenID.Fight_ShowShake);
        if (this.toolCfg) {
            if (this.toolCfg.toolType == 2) {//武器
                RoleManager.getInstance.mainRole.setGunInfo(this.toolCfg.weaponId, this.toolCfg.buffTime);
                // Manager.audio.playAudio(503, AudioType.Tool);
                Notifier.send(ListenID.Fight_ShowBuffUI, this.toolCfg.toolType, this.toolCfg.weaponId, this.toolCfg.buffTime);
            } else if (this.toolCfg.toolType == 1) {//子弹扩散范围
                let normalvect = cc.v2(0, 1);
                let twopai = 2 * Math.PI;
                for (let i = 0; i < this.toolCfg.bulletNum; i++) {
                    let endpos = normalvect.rotate(twopai / this.toolCfg.bulletNum * i);
                    endpos = endpos.mul(1000);
                    let bullet = BulletManager.getInstance.popBulletNodeByType(this.toolCfg.bulletId);
                    if (bullet) {
                        bullet.position = this.node.position;
                        let bulvo: BulletVo = { showDamage: this.showDamage, hurt: this.hurt, radius: 0, bulletType: this.toolCfg.bulletId, belongto: Const.BulletBelong.MY_BULLET, canCross: true, hitEffecId: 0 };
                        let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                        bul.isTool = true;
                        bullet.setParent(FightModel.getInstance.bulletParent);
                        bul.moveSpeed(1000);
                        bul.setTargetPos(bullet.position.add(endpos));
                    }
                }
                Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);

            } else if (this.toolCfg.toolType == 0) {//固定范围伤害
                let bomb = ToolManager.getInstance.popToolEffectNodeByType(this.toolCfg.id);
                if (bomb) {
                    bomb.position = this.node.position;
                    let bombvo: BombVo = { showDamage: this.showDamage, hurt: this.hurt, radius: this.toolCfg.hurtRange, toolType: this.toolCfg.id }
                    let bom: Bomb = ToolManager.getInstance.addToolEffect(bomb, bombvo);
                    bomb.setParent(FightModel.getInstance.bombParent);
                    bom.startAttack();
                    Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
                }
            } else if (this.toolCfg.toolType == 3) {//减速
                let speed = ToolManager.getInstance.popToolEffectNodeByType(this.toolCfg.id);
                if (speed) {
                    speed.position = this.node.position;
                    let bombvo: BombVo = { showDamage: this.showDamage, hurt: this.hurt, radius: this.toolCfg.hurtRange, toolType: this.toolCfg.id }
                    let bom: Bomb = ToolManager.getInstance.addToolEffect(speed, bombvo);
                    speed.setParent(FightModel.getInstance.bombParent);
                    bom.startAttack();
                    Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
                }
                Notifier.send(ListenID.Fight_ShowBuffUI, this.toolCfg.toolType, this.toolCfg.id, this.toolCfg.buffTime);
                RoleManager.getInstance.mainRole.moveSpeed = 800;
                Time.setScale(0.3, this.toolCfg.buffTime, false);
            } else if (this.toolCfg.toolType == 4) {//人物无敌
                RoleManager.getInstance.mainRole.setInvicibleBuff(this.toolCfg.buffTime);
                Notifier.send(ListenID.Fight_ShowBuffUI, this.toolCfg.toolType, this.toolCfg.id, this.toolCfg.buffTime);
                Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
            } else if (this.toolCfg.toolType == 5) {//人物加血百分比
                RoleManager.getInstance.mainRole.setBloodBuff(33);
                Notifier.send(ListenID.Fight_SHOWEFFECT, 12, this.toolCfg.id, this.node.position);
                Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
            } else if (this.toolCfg.toolType == 6) { //冰冻
                let ice = ToolManager.getInstance.popToolEffectNodeByType(this.toolCfg.id);
                if (ice) {
                    ice.position = this.node.position;
                    let bombvo: BombVo = { showDamage: this.showDamage, hurt: this.hurt, radius: this.toolCfg.hurtRange, toolType: this.toolCfg.id }
                    let bom: Bomb = ToolManager.getInstance.addToolEffect(ice, bombvo);
                    ice.setParent(FightModel.getInstance.bombParent);
                    bom.startAttack();
                    Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
                }
                Notifier.send(ListenID.Fight_ShowBuffUI, this.toolCfg.toolType, this.toolCfg.id, this.toolCfg.buffTime);
                RoleManager.getInstance.iceAllMonster(this.toolCfg.buffTime);
            } else if (this.toolCfg.toolType == 7) { //暴击伤害
                // RoleManager.getInstance.mainRole.setDoubleHurtBuff(2, this.toolCfg.buffTime);
                Notifier.send(ListenID.Fight_ShowBuffUI, this.toolCfg.toolType, this.toolCfg.id, this.toolCfg.buffTime);
                Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
            } else if (this.toolCfg.toolType == 8) { //双倍奖励
                Notifier.send(ListenID.Fight_ShowBuffUI, this.toolCfg.toolType, this.toolCfg.id, this.toolCfg.buffTime);
                // RoleManager.getInstance.mainRole.setDoubleRewardBuff(5, this.toolCfg.buffTime);
                Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
            } else if (this.toolCfg.toolType == 9) {  //满射速
                Notifier.send(ListenID.Fight_ShowBuffUI, this.toolCfg.toolType, this.toolCfg.id, this.toolCfg.buffTime);
                // RoleManager.getInstance.mainRole.setFullSpeedBuff(this.toolCfg.buffTime);
                Manager.audio.playAudio(this.toolCfg.id, AudioType.Tool);
            } else if (this.toolCfg.toolType == 10) {//陷阱
                this.startHurtDelta = true;
                this.hurtDeltaTime = 0;
                this.hurtDelta = this.toolCfg.buffTime;
                Notifier.send(ListenID.Fight_MonAttack, this.hurt);
            } else if (this.toolCfg.toolType == 11) {
                RoleManager.getInstance.addAgent(this.node.position, this.toolCfg.weaponId, this.toolCfg.buffTime);
            } else if (this.toolCfg.toolType == 12) {//宝箱
                if (FightModel.getInstance.fightType == 1) {
                    GameVoManager.getInstance.myUserVo.bossBox += 1;
                    GameVoManager.getInstance.myUserVo.treasureBox += 1;
                    GameVoManager.getInstance.myUserVo.boxDayLimited += 1;
                } else {
                    GameVoManager.getInstance.myUserVo.stageboxNum += 1;
                }
                Notifier.send(ListenID.Fight_ShowFlyGold, this.node.position, 3);
            }

            if (this.toolCfg.toolType != 10) {
                Notifier.send(ListenID.Fight_RecycleTool, this.insId, this._toolType);
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.ToolReward, 1);
            }
        }

    }
    private startHurtDelta: boolean = false;
    private hurtDeltaTime: number = 0;
    private hurtDelta: number = 0;
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionStay(other, self: cc.Collider) {
        if (this.startHurtDelta && this.belong == Const.BulletBelong.MONSTER_BULLET) {
            this.hurtDeltaTime += Time.deltaTime;
            if (this.hurtDeltaTime > this.hurtDelta) {
                this.hurtDeltaTime = 0;
                Notifier.send(ListenID.Fight_MonAttack, this.hurt);
            }
        }
    }

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionExit(other: cc.Collider, self: cc.Collider) {
        this.startHurtDelta = false;
    }

    update(dt) {
        if (this.liftTime > 0 && !this.isPause) {
            this.startTime += dt;
            if (this.toolCfg.toolType == 10 && this.liftTime - this.startTime <= 1) {
                this.node.opacity = cc.misc.clampf((this.liftTime - this.startTime) * 255, 0, 255);
            }
        }
        if (this.startTime >= this.liftTime) {
            this.belong == Const.BulletBelong.MY_BULLET ? Notifier.send(ListenID.Fight_RecycleTool, this.insId, this._toolType) : ToolManager.getInstance.recycleTrapByType(this._toolType, this.node);
            this.liftTime = 0;
            if (this.toolCfg.toolType == 12) {
                if (FightModel.getInstance.fightType == 1) {
                    GameVoManager.getInstance.myUserVo.bossBox += 1;
                    GameVoManager.getInstance.myUserVo.treasureBox += 1;
                    GameVoManager.getInstance.myUserVo.boxDayLimited += 1;
                } else {
                    GameVoManager.getInstance.myUserVo.stageboxNum += 1;
                }
                Notifier.send(ListenID.Fight_ShowFlyGold, this.node.position, 3);
            }
        }
        if (this.belong == Const.BulletBelong.MY_BULLET) {
            this.checkShowName -= dt;
            if (this.checkShowName <= 0) {
                this.checkShowName = 0.2;
                let dis = this.node.position.sub(RoleManager.getInstance.mainRole.node.position).mag();
                this.bodyName && (this.bodyName.node.active = dis < 550);
            }
        }
    }
}
