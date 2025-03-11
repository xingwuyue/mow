import { Util } from "../utils/Util";
import { Const } from "../config/Const";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Monster } from "./Monster";
import { RoleManager } from "../manager/RoleManager";
import { Cfg } from "../config/Cfg";

export declare interface BulletVo {
    hurt: number,   //伤害值
    radius: number,//伤害半径
    insId?: number,
    bulletType: number,//子弹类型
    belongto: Const.BulletBelong, //0 我的，1 敌方
    canCross?: boolean,  //是否可以穿透
    hitEffecId: number,
    hitBack?: number,
    effectType?: number,
    hurtDelta?: number,
    hitAudioId?: number,
    doubleReward?: number,   //是否双倍收益
    width?: number,  //光能枪射击宽度
    doubleHit?: number,
    hitDir?: cc.Vec2,        //击退方向
    shapeType?: number,      //优化
    shapeNum?: number,
    shootNum?: number,       //弹射次数
    offsetAngle?: number,
    weaponType?: number,
    showDamage?: number,
    hurtRatio?: number,
    extraHurtRatio?: number,
    extraSkill?: any,
}

export class Bullet {
    private _moveSpeed: number = 1800;//像素/s;
    private speed: cc.Vec2 = cc.Vec2.ZERO;
    private _node: cc.Node;
    private _insId: number = 0;
    private _hurt: number = 0;   //伤害值
    private _radius: number = 0;//伤害范围半径
    private _isDead: boolean = false; //是否已死亡
    private _belongTo: Const.BulletBelong = Const.BulletBelong.MY_BULLET;//子弹归属
    private _bulletType: number = 0;
    private _canCross: boolean = false;
    public hitEffectId: number = 0;
    private partice: cc.Node = null;
    public hitBack: number = 0;
    public effectType: number = 0;
    public hurtDelta: number = 0;
    public hitAudioId: number = 0;
    public doubleReward: number = 0;
    public width: number = 0;
    public doubleHit: number = 1;
    public hitDir: cc.Vec2 = cc.Vec2.ZERO;
    public shapeType: number = 0;
    public shapeNum: number = 700;
    public shootNum: number = 0;
    public followType: number = 0;//0直线  1跟踪
    public offsetAngle: number = 0;   //偏移度数 旋转激光类型有用
    public weaponType: number = 0;
    public bodyNode: cc.Node = null;
    public showDamage: number = 0;
    public hurtRatio: number = 0;//buff伤害系数
    public extraHurtRatio: number = 0;//武器附加系数
    public extraSkill: any = null;
    private bronMin = Const.MonsterBronRangeMin;//.add(cc.v2(50, 50));
    private bronMax = Const.MonsterBronRangeMax;//.sub(cc.v2(50, 50));
    private rect: cc.Rect = null;
    public isTool: boolean = false;
    constructor() {
        this.rect = cc.Rect.fromMinMax(this.bronMin, this.bronMax);
    }
    public init(insId: number, node: cc.Node, bulletVo: BulletVo) {
        this._insId = insId;
        this._node = node;
        this._hurt = bulletVo.hurt;
        this._radius = bulletVo.radius;
        this._isDead = false;
        this.isTool = false;
        this.startMove = false;
        this._node.group = Const.GroupBullet;
        this._belongTo = bulletVo.belongto;
        this._bulletType = bulletVo.bulletType || 1;
        this.doubleReward = bulletVo.doubleReward || 0;
        this._canCross = !!bulletVo.canCross;
        this.hitEffectId = bulletVo.hitEffecId;
        this.hitBack = bulletVo.hitBack;
        this.hitAudioId = bulletVo.hitAudioId;
        this.effectType = bulletVo.effectType;
        this.hurtDelta = bulletVo.hurtDelta;
        this.doubleHit = bulletVo.doubleHit || 1;
        this.showDamage = bulletVo.showDamage || bulletVo.hurt;
        this.hitDir = bulletVo.hitDir || null;
        this._extraSpeed = null;
        this.offsetDir = 0;
        this.shapeType = bulletVo.shapeType || 0;
        this.shapeNum = bulletVo.shapeNum || 0;
        this.shootNum = bulletVo.shootNum || 0;
        this.followType = this.shootNum > 0 ? 1 : 0;
        this.offsetAngle = bulletVo.offsetAngle || 0;
        this.weaponType = bulletVo.weaponType || 0;
        this.hurtRatio = bulletVo.hurtRatio || 1;
        this.extraHurtRatio = bulletVo.extraHurtRatio || 1;
        this.extraSkill = bulletVo.extraSkill || null;
        this._node.colliderComponent = this;
        if (bulletVo.width && this._bulletType == 20) {
            this._node.getComponent(cc.BoxCollider).size.width = bulletVo.width;
            this.resetLaserWidth(bulletVo.width);
        }
        this.partice = this._node.getChildByName("particle");
        this.bodyNode = this._node.getChildByName("body");
        if (this.bodyNode) this.bodyNode.active = true;
        this.resetStreak();
    }

    private _extraSpeed: cc.Vec2 = null;
    /**
     * 
     * @param offsetDir 开始发射方向
     * @param width 宽度
     */
    private offsetX: number = 0;
    private offsetDir: number = 0;
    public setExtraParam(offsetDir: number, width?: number) {
        if (offsetDir != 0) {
            this.offsetX = width;
            this.offsetDir = offsetDir;
        }
    }

    private targetPos: cc.Vec2;
    private startPos: cc.Vec2;
    private startSpeed: cc.Vec2;
    private accSpeed: cc.Vec2;
    private startMove: boolean = false;
    private disX: number = 0;//x移动距离值
    private disY: number = 0;
    private moveTime: number = 0;
    private curTime: number = 0;
    private target: Monster = null;
    private normalVec: cc.Vec2 = cc.v2(0, 1);
    private stayTime: number = 0;        //开始停留时间节点
    public setTargetPos(epos: cc.Vec2, sPos?: cc.Vec2) {
        this.lastInsId = 0;
        if (this._bulletType == 20) {//激光
            let anim = this._node.getComponent(cc.Animation);
            this.moveTime = 999960;
            anim.play("bullet202");
            this.speed = cc.Vec2.ZERO;
            this.hitDir = this.speed;
            this.startSpeed = this.speed;
            this.accSpeed = cc.Vec2.ZERO;
        }
        else if (this.effectType == 7) {
            this.target = RoleManager.getInstance.findClosedMonsterByPos(this._node.position, this.lastInsId);
            this.targetPos = this._node.position;
            this.startPos = this._node.position;
            this.moveTime = 999960;
            this.accSpeed = cc.Vec2.ZERO;
            this.speed = cc.Vec2.ZERO;
        } else if (this.weaponType && this.weaponType == 4) {//旋转
            let anim = this._node.getComponent(cc.Animation);
            this.moveTime = 999960;
            anim.play("bullet" + this._bulletType);
            this.targetPos = cc.Vec2.ZERO;
            this.startPos = cc.Vec2.ZERO;
            this.accSpeed = cc.Vec2.ZERO;
            this.speed = cc.Vec2.ZERO;
        } else {
            let startpos = this._node.position;
            if (sPos) {
                startpos = sPos;
            }
            this.startPos = startpos;
            this.targetPos = epos;
            let disVec = this.targetPos.sub(startpos);
            let angle = Util.getAngle(this.normalVec, disVec);
            let dislen = disVec.mag();
            let radiotime = this._belongTo == Const.BulletBelong.MY_BULLET ? 1.5 : 3;
            this.moveTime = this._canCross ? 10 : radiotime * disVec.mag() / this._moveSpeed;
            if (this.moveTime < 2) this.moveTime = 2;
            if (this.effectType == 8 || this.effectType == 9) {
                if (this._accelaretedSpeed != 0) {
                    let move1 = (-this._moveSpeed - 2 * Math.sqrt(this._moveSpeed * this._moveSpeed * 0.25 + 8 * this._accelaretedSpeed * dislen)) / (4 * this._accelaretedSpeed);
                    let move2 = (-this._moveSpeed + 2 * Math.sqrt(this._moveSpeed * this._moveSpeed * 0.25 + 8 * this._accelaretedSpeed * dislen)) / (4 * this._accelaretedSpeed);
                    this.moveTime = move1 > move2 ? move1 : move2;
                } else {
                    this.moveTime = dislen / this._moveSpeed;
                }
                this.stayTime = this.moveTime;
                if (this.effectType == 8) {
                    let data = Cfg.Drop.get(4005);
                    if (data) {
                        this.moveTime += data.buffTime;
                    }
                } else if (this.effectType == 9) {
                    this.node.scale = 0.1;
                    this.moveTime = 9999;
                }
            }
            this._node.rotation = angle;
            disVec.normalizeSelf();
            this.speed = disVec.mul(this._moveSpeed);
            this.accSpeed = disVec.mul(this._accelaretedSpeed);
            this.hitDir = this.speed;
            this.startSpeed = this.speed;
            if (this.offsetDir != 0) {
                this._startExtraTime = 0.2;
                this._extraSpeed = this.speed.rotate(Math.PI * 0.5 * this.offsetDir).normalize().mul(1 / this._startExtraTime);
            }
        }
        this.curTime = 0;
        this.startMove = true;
        this.stopMove = false;
    }
    private _startExtraTime: number = 0;
    private timeDelay: number = 0;
    private stopMove: boolean = false;
    public update(dt) {
        if (this.startMove && !this._isDead) {
            this.curTime += dt;
            if (this.followType == 0) {
                if (this.effectType == 8 && !this.stopMove && (this.curTime >= this.stayTime || this.checkoutIsOutMap())) {
                    this.curTime = this.stayTime;
                    this.stayTime = 999999999;
                    this.stopMove = true;
                    this.createBlackHole();
                }
                if (this.effectType == 9) {
                    if (this.curTime >= this.stayTime || this.checkoutIsOutMap()) {
                        this.node.scale = 2;
                        this.curTime = this.stayTime;
                    } else {
                        this.node.scale = Math.lerp(this.node.scale, 2, dt + 0.1);
                    }
                }
                if (!this.stopMove && this.weaponType != 4 && this.weaponType != 5 && this.weaponType != 3) {
                    if (this.effectType == 9 && this.curTime >= this.stayTime) {
                        let disVec = RoleManager.getInstance.mainRole.node.position.sub(this._node.position);
                        let dislen = disVec.mag();
                        disVec.normalizeSelf();
                        this.speed = disVec.mul(this._moveSpeed);
                        this._node.position = this._node.position.add(this.speed.mul(dt));
                        if (dislen <= 25) {
                            Notifier.send(ListenID.Fight_RecycleBullet, this._insId);
                            this._isDead = true;//死亡，通知回收
                            this.startMove = false;
                            this.curTime = 0;
                            return;
                        }
                    } else {
                        this._node.position = this.startPos.add(this.speed.mul(this.curTime).add(this.accSpeed.mul(0.5 * this.curTime * this.curTime)));
                    }
                    if (this._extraSpeed) {
                        let time = cc.misc.clampf(this.curTime, 0, this._startExtraTime);
                        this._node.position = this._node.position.add(this._extraSpeed.mul(this.offsetX * time));
                    }
                }

                if (this.curTime >= this.moveTime) {
                    Notifier.send(ListenID.Fight_RecycleBullet, this._insId);
                    this._isDead = true;//死亡，通知回收
                    this.startMove = false;
                    this.curTime = 0;
                }
                if (this.shapeType == 1) {//字段旋转
                    if (this._node && cc.isValid(this._node))
                        this._node.rotation += dt * this.shapeNum;
                } else if (this.shapeType == 2) {
                    if (this._node && cc.isValid(this._node)) {
                        this._node.rotation -= dt * this.shapeNum;
                    }
                }
            } else {
                if (this.target && !this.target.isDead && this.target.node) {
                    this.timeDelay = 0;
                    let disVec = this.target.node.position.sub(this._node.position);
                    let angle = Util.getAngle(this.normalVec, disVec);
                    disVec.normalizeSelf();
                    this.speed = disVec.mul(this._moveSpeed);
                    this._node.position = this._node.position.add(this.speed.mul(dt));
                    this._node.rotation = angle;
                } else {
                    if (this.shootNum > 0) {
                        this.timeDelay += dt;
                        if (this.timeDelay > 0.5) {
                            this.deadDelay();
                            return;
                        }
                        this.target = RoleManager.getInstance.findClosedMonsterByPos(this._node.position, this.lastInsId);
                    } else {
                        this.deadDelay();
                    }
                }
            }
        }
    }

    public deadDelay() {
        this.followType = 0;
        this.accSpeed = cc.Vec2.ZERO;
        let rati = Util.random(-2000, 2000);
        rati /= 1000;
        this.speed.rotateSelf(rati);
        let angle = Util.getAngle(this.normalVec, this.speed);
        this._node.rotation = angle;
        this.startPos = this._node.position;
        this.moveTime = 1;
        this.shapeType = 0;
        this.curTime = 0;
    }

    public get isDead(): boolean {
        return this._isDead;
    }

    public set node(bulletnode: cc.Node) {
        this._node = bulletnode;
    }
    public get node(): cc.Node {
        return this._node;
    }
    public get insId(): number {
        return this._insId;
    }
    public get hurt(): number {
        return this._hurt;
    }
    public set isDead(dead: boolean) {
        this._isDead = dead;
    }

    public get bulletType(): number {
        return this._bulletType;
    }

    public get belongto(): Const.BulletBelong {
        return this._belongTo;
    }

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    private lastInsId: number = 0;
    public onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.node.group == Const.GroupTerrain && this._bulletType != 20 && this._bulletType != 35) {
            this._isDead = true;
            Notifier.send(ListenID.Fight_RecycleBullet, this._insId);
        } else if (other.node.group == Const.GroupMonster) {
            if (this.effectType == 7) {
                let mon: Monster = other.node.colliderComponent;
                if (this.target && mon.Id == this.target.Id) {
                    this.lastInsId = this.target.Id;
                    this.target = RoleManager.getInstance.findClosedMonsterByPos(this._node.position, this.lastInsId, this.target.node.getBoundingBox().width);
                    this.shootNum--;
                    if (this.shootNum <= 0) {
                        this.deadDelay();
                    }
                }
            }
        }
    }
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    private attacktime = 1;
    public onCollisionStay(other: cc.Collider, self: cc.Collider) {
        if (this._bulletType == 31 || this._bulletType == 38 || this._bulletType == 22) {
            this.attacktime++;
            if (this.attacktime >= 30) {
                this.attacktime = 1;
                let mon: Monster = other.node.colliderComponent;
                if (this.target && mon.Id == this.target.Id) {
                    this.lastInsId = this.target.Id;
                    this.target = RoleManager.getInstance.findClosedMonsterByPos(this._node.position, this.lastInsId, this.target.node.getBoundingBox().width);
                    this.shootNum--;
                    if (this.shootNum <= 0) {
                        this.deadDelay();
                    }
                }
            }
        }
    }

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionExit(other: cc.Collider, self: cc.Collider) {

    }

    private _accelaretedSpeed: number = 0;
    public moveSpeed(startspeed: number, acceleratedSpeed: number = 0) {
        this._moveSpeed = startspeed;
        this._accelaretedSpeed = acceleratedSpeed;
    }

    public get canCross(): boolean {
        return this._canCross;
    }

    public get hurtRange(): number {
        return this._radius;
    }

    public resetStreak() {
        if (this._node.getChildByName("streak"))
            this._node.getChildByName("streak").getComponent(cc.MotionStreak).reset();
        if (this.partice) {
            this.partice.getComponent(cc.ParticleSystem).resetSystem();
        }
    }

    public resetLaserWidth(width: number) {
        let ratio = width / 40;
        this._node.getChildByName("waiwei").width = 47.5 * ratio;
        this._node.getChildByName("waiwei2").width = 103.5 * ratio;
        this._node.getChildByName("thunder").width = 63 * ratio;
        this._node.getChildByName("bg").width = 55.5 * ratio;
    }

    public createBlackHole() {
        if (this._bulletType == 39) {
            Util.createBlackHole(this._node.position, 4006);
            if (this.bodyNode) this.bodyNode.active = false;
        } else if (this._bulletType == 32) {
            Util.createBlackHole(this._node.position, 4005);
        }

    }


    public checkoutIsOutMap() {
        return !this.rect.contains(this._node.position);
    }
}
