import { BulletManager } from "../manager/BulletManager";
import { Const } from "../config/Const";
import { BulletVo, Bullet } from "./Bullet";
import FightModel from "../module/fight/FightModel";
import { Manager } from "../manager/Manager";
import { AudioType } from "../manager/AudioManager";
import { Util } from "../utils/Util";
import { WeaponCfg } from "../config/WeaponCfg";
import { Cfg } from "../config/Cfg";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { RoleManager } from "../manager/RoleManager";
import { GameVoManager } from "../manager/GameVoManager";
import { MainRole } from "./MainRole";
import { Monster } from "./Monster";

export class Gun {

    public constructor(belongType: Const.BulletBelong, belongObj: MainRole | Monster | any, isQte?: boolean, ) {
        this.belongType = belongType;
        this.isQteGun = !!isQte;
        this.belongObj = belongObj;
        this.initSkillInfo();
    }
    /**枪类型id */
    protected gunTypeId: number = 0;

    /**是否可以发射了 */
    public gunReady: boolean = false;

    /**剩余弹夹数量 */
    public leftBulletNum: number = 0;

    /**武器信息 */
    protected weaponInfo: WeaponCfg = null;

    protected tempGunTypeId: number = 0;

    public isQteGun: boolean = false;

    protected belongType: Const.BulletBelong = Const.BulletBelong.MY_BULLET;

    protected lifeTime: number = 0;
    protected startLife: number = 0;
    protected effectAnim: cc.Animation = null;
    private effetName: string = "";
    private effectId: number = 0;
    private fireEffectId: number = 0;
    private fireAudioId: number = 0;
    private allBulletNum: number = 0;
    protected hurt: number = 0;
    protected hitBack: number = 0;     //击退距离
    private effectType: number = 0;  //武器特性
    private isReadyState: number = 0;   //0 还没蓄力 1蓄力中 2蓄力完成
    private hitAudioId: number = 0;
    private _hurtRatio: number = 1;
    private singleNum: number = 1;   //单次发射子弹数量
    protected belongObj: MainRole | Monster = null;
    public warnTime: number = 0;
    public warning: boolean = false;
    public warninglist: cc.Node[] = [];
    protected normalVec: cc.Vec2 = cc.v2(0, 1);

    private startRotation: boolean = true;
    private deltaRadius: number = 0;//旋转弧度
    private rotationSpeed: number = 0;

    private extraStcarRatio: number = 0;
    private extraSingleNum: number = 0;
    private allSingleNum: number = 1;
    private isMapping: boolean = false;
    private extraBulletRatio: number = 1;
    private chamber: number = 0.5;//时间
    public skillList: any = {};

    public initSkillInfo() {
        this.extraBulletRatio = 1;
        this.isMapping = false;
        this.extraStcarRatio = 0;
        this.extraSingleNum = 0;
        this.skillList = {};
    }
    public setGunInfo(typeId: number, time: number = 0, fire?: cc.Animation, callback?: Function) {
        this.bulletHurtIndex = 0;
        this.bulletShowHurtIndex = 0;
        this.bulletHurtList = [];
        this.bulletShowHurt = [];
        if (fire) {
            this.effectAnim = fire;
        }
        Manager.audio.stopGunFire(this.fireAudioId);
        if (time == 0) {//永久
            this.tempGunTypeId = typeId;
        } else {
            this.startLife = time;
        }
        this.lifeTime = time;
        this.gunTypeId = typeId;
        this.weaponInfo = Cfg.Weapon.get(this.gunTypeId);
        if (this.weaponInfo) {
            this.chamber = this.weaponInfo.chamber;
            if (this.weaponInfo.bulletType[0] == 3) {
                this.startRotation = true;
                this.rotationSpeed = Util.AngleToRadinas(this.weaponInfo.bulletType[1]);
                this.deltaRadius = 0;
            } else {
                this.startRotation = false;
                this.deltaRadius = 0;
                this.rotationSpeed = 0;
            }
            this.bulletSpeedIndex = 0;
            this.bulletSpeedList = [];
            this.effectId = this.weaponInfo.hitEffectId;
            this.fireAudioId = this.weaponInfo.fireAudioId;
            this.fireEffectId = this.weaponInfo.fireEffectId;
            this.hitBack = this.weaponInfo.hitBack;
            this.effectType = this.weaponInfo.effectType;
            this.hitAudioId = 0;
            if (this.weaponInfo.hitAudioId.length > 0) {
                let index = Util.random(0, this.weaponInfo.hitAudioId.length);
                this.hitAudioId = this.weaponInfo.hitAudioId[index];
            }
            this.belongObj && this.belongObj.cleanLaserNode();
            this.isReadyState = 0;
            this.warnTime = this.weaponInfo.warning;
            if (this.belongType == Const.BulletBelong.MY_BULLET) {
                // let lv = FightModel.getInstance.fightType == 0 ? GameVoManager.getInstance.myUserVo.roleLvs[0] : 0;
                for (let i = 0; i < 12; i++) {
                    let hurt = Util.random(this.weaponInfo.hurt[0], this.weaponInfo.hurt[1] + 1);
                    this.bulletHurtList.push(hurt);

                    let showhurt = this.belongObj.property.getAttack();
                    this.bulletShowHurt.push(showhurt);
                }
            } else {
                for (let i = 0; i < 2; i++) {
                    // let hurt = Util.random(this.weaponInfo.hurt[0], this.weaponInfo.hurt[1] + 1);
                    let belongObj = this.belongObj as Monster;
                    this.bulletHurtList.push(belongObj.property.attack);
                    this.bulletShowHurt.push(belongObj.property.attack);
                }
            }
            this.leftBulletNum = Math.ceil(this.weaponInfo.bulletNum * this.extraBulletRatio);
            this.allBulletNum = this.leftBulletNum;
            for (let i = 0; i < 16; i++) {
                let speed = Util.random(this.weaponInfo.shootSpeed[0], this.weaponInfo.shootSpeed[1] + 1);
                this.bulletSpeedList.push(speed);
            }
            this.singleNum = this.weaponInfo.singleNum;
            this.allSingleNum = this.singleNum + this.extraSingleNum;
            // this.singleNum = this.checkSingNum(this.weaponInfo, this.singleNum);
            this.gunReady = true;
            //加载
            this.effetName = "";
            if (this.fireEffectId > 0) {
                let animname = `fire${this.fireEffectId}`;
                if (this.effectAnim && this.effectAnim.getAnimationState(animname)) {
                    this.effetName = animname;
                } else {
                    Manager.anim.getFireAnimationClip(animname).then((res) => {
                        if (this.effectAnim && res) {
                            this.effetName = animname;
                            this.effectAnim.addClip(res);
                        }
                    });
                }
            }
            if (this.belongObj && !this.isQteGun) this.belongObj.gunChange();
            if (this.belongType == Const.BulletBelong.MY_BULLET && !this.isQteGun) {
                Notifier.send(ListenID.Fight_ChangeGun, this.gunTypeId, this.leftBulletNum);
                Notifier.send(ListenID.Fight_TryEquipUpdate, this.lifeTime, this.startLife);
            } else if (this.belongType == Const.BulletBelong.MONSTER_BULLET) {
                callback && callback();
            }
        }
    }

    public setTempLv(type: number = 0) {
    }

    public getWeaponInfo(): WeaponCfg {
        return this.weaponInfo;
    }

    public setHurtRatio(ratio: number) {
        this._hurtRatio += ratio;
    }

    public getHurtRatio() {
        return this._hurtRatio;
    }

    public getHurtRange() {
        return [this.weaponInfo.hurt[0], this.weaponInfo.hurt[1]];
    }
    public stopWarning() {
        // this.gunReady = false;
        this.warning = false;
        for (let i = 0; i < this.warninglist.length; i++) {
            this.warninglist[i].active = false;
        }
    }

    public setMapping(boo: boolean) {
        this.isMapping = boo;
    }

    public setExtraSingNum(num: number) {
        this.extraSingleNum += num;
        this.allSingleNum = this.singleNum + this.extraSingleNum;
    }
    public setExtraStcarRatio(ratio: number) {
        this.extraStcarRatio += ratio;
    }

    public setExtraBulletRatio(ratio: number) {
        this.extraBulletRatio += ratio;
        this.allBulletNum = Math.ceil(this.weaponInfo.bulletNum * this.extraBulletRatio);
        if (this.belongType == Const.BulletBelong.MY_BULLET) {
            this.belongObj.gunUpdate(this.leftBulletNum, this.allBulletNum);
        }
    }



    protected targetPos: cc.Vec2 = null;
    protected startPos: cc.Vec2 = null;
    protected warnCurTime: number = 0;
    protected fireCB: Function = null;
    public showWarning(startpos: cc.Vec2, endpos: cc.Vec2, callback?: Function) {
        if (this.warnTime <= 0) {
            this.warning = false;
            this.fireCB = null;
            callback && callback(startpos, endpos);
        } else {
            let dir = endpos.sub(startpos);
            if (this.weaponInfo && this.gunReady) {
                if (this.weaponInfo.weaponType == 2) {//散弹齐发
                    this.fireCB = callback;
                    let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                    if (bullet) {
                        this.warnCurTime = this.warnTime;
                        this.targetPos = endpos;
                        this.startPos = startpos;
                        this.warning = true;
                        let size: cc.BoxCollider = bullet.getComponent(cc.BoxCollider);
                        let width = size && size.size.width || 50;
                        if (width < 50) width = 50;
                        let node = null;
                        if (this.warninglist[0]) {
                            node = this.warninglist[0];
                            node.active = true;
                        } else {
                            node = BulletManager.getInstance.popWarningNode();
                            this.warninglist[0] = node;
                            node.setParent(FightModel.getInstance.warnParent);
                        }
                        let angle = Util.getAngle(this.normalVec, dir);
                        if (node) {
                            node.position = startpos;
                            node.width = width;
                            node.rotation = angle;
                        }
                        node.scaleX = 0;
                        node.runAction(cc.scaleTo(0.3, 1));
                        let t = this.weaponInfo.scatterRatio;
                        for (let i = 0; i < this.allSingleNum - 1; i++) {
                            let node = null;
                            if (this.warninglist[i + 1]) {
                                node = this.warninglist[i + 1];
                                node.active = true;
                            } else {
                                node = BulletManager.getInstance.popWarningNode();
                                this.warninglist[i + 1] = node;
                                node.setParent(FightModel.getInstance.warnParent);
                            }
                            node.scaleX = 0;
                            node.runAction(cc.scaleTo(0.3, 1));
                            let offsetdir = i % 2 == 0;
                            let dis = t * (Math.floor(i / 2) + 1);
                            let newdir = dir.rotate(dis * (offsetdir ? 1 : -1));
                            let angle = Util.getAngle(this.normalVec, newdir);
                            if (node) {
                                node.position = startpos;
                                node.width = width;
                                node.rotation = angle;
                            }
                        }
                        BulletManager.getInstance.pushBulletNodeByType(this.weaponInfo.bulletId, bullet);
                    }
                } else if (this.weaponInfo.weaponType == 1) {
                    this.fireCB = callback;
                    let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                    if (bullet) {
                        this.warnCurTime = this.warnTime;
                        this.targetPos = endpos;
                        this.startPos = startpos;
                        this.warning = true;
                        let size: cc.BoxCollider = bullet.getComponent(cc.BoxCollider);
                        let width = size && size.size.width || 50;
                        if (width < 50) width = 50;
                        let node = null;
                        if (this.warninglist[0]) {
                            node = this.warninglist[0];
                            node.active = true;
                        } else {
                            node = BulletManager.getInstance.popWarningNode();
                            this.warninglist[0] = node;
                            node.setParent(FightModel.getInstance.warnParent);
                        }
                        let angle = Util.getAngle(this.normalVec, dir);
                        if (node) {
                            node.position = startpos;
                            node.width = width;
                            node.rotation = angle;
                        }
                        node.scaleX = 0;
                        node.runAction(cc.scaleTo(0.3, 1));
                        BulletManager.getInstance.pushBulletNodeByType(this.weaponInfo.bulletId, bullet);
                    }
                }
                else {
                    this.warning = false;
                }
            } else {
                this.warning = false;
            }
        }
    }

    protected bulletHurtList = [];
    protected bulletShowHurt = [];
    protected bulletHurtIndex = 0;
    protected bulletShowHurtIndex = 0;
    public getBulletHurtRandom(): number {
        let hurt = this.bulletHurtList[this.bulletHurtIndex % this.bulletHurtList.length];
        this.bulletHurtIndex++;
        return hurt;
    }
    public getShowHurtRandom(): number {
        let hurt = this.bulletShowHurt[this.bulletShowHurtIndex % this.bulletShowHurt.length];
        this.bulletHurtIndex++;
        return hurt;
    }

    protected bulletSpeedList = [];
    protected bulletSpeedIndex = 0;
    public getBulletSpeedRandom(): number {
        let spped = this.bulletSpeedList[this.bulletSpeedIndex % this.bulletSpeedList.length];
        this.bulletSpeedIndex++;
        return spped;
    }
    protected endPos: cc.Vec2 = cc.Vec2.ZERO;
    protected startXuli: boolean = false;
    protected xulitime: number = 0;
    public onFire(startpos: cc.Vec2, endpos: cc.Vec2) {
        // let dir = endpos.sub(startpos);
        if (this.weaponInfo && this.gunReady) {
            if (this.fireAudioId > 0 && this.belongType == Const.BulletBelong.MY_BULLET && this.weaponInfo.weaponType != 3)// && cc.sys.os != cc.sys.OS_ANDROID)
                Manager.audio.playAudio(this.fireAudioId, AudioType.Gun);
            if (this.weaponInfo.weaponType == 3 && this.isReadyState == 0) {
                Manager.audio.playAudio(this.fireAudioId, AudioType.Gun);
            }
            if (this.weaponInfo.weaponType == 3 && this.isReadyState == 2) {
                Manager.audio.playAudio(this.hitAudioId, AudioType.Gun);
            }
            /**
             * 有动画同时有配置id->激光蓄力
             * 没->
             */
            if (this.fireEffectId > 0) {
                if (this.weaponInfo.weaponType == 3 && this.isReadyState != 0) 1;
                else {
                    if (this.effectAnim) {
                        this.effectAnim.node.scale = 1;
                        this.effectAnim.node.opacity = 255;
                        this.effectAnim.play(this.effetName);
                    } else {
                        if (this.effectAnim) this.effectAnim.node.scale = 0;
                    }
                    if (this.weaponInfo.weaponType == 3) {
                        // this.effectAnim.on("finished", this.fightLaser, this);
                        this.startXuli = true;
                        this.xulitime = 0.78;
                    }
                }
            } else {
                if (this.effectAnim) this.effectAnim.node.scale = 0;
            }
            if (this.weaponInfo.weaponType == 1) {//散弹散发
                let dir = endpos.sub(startpos);
                let t = (this.weaponInfo.scatterRatio + this.extraStcarRatio) * 10000;
                let createbullet = (a) => {
                    let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                    if (bullet) {
                        bullet.position = startpos;
                        let bulvo: BulletVo = {
                            hitAudioId: this.hitAudioId, effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                            shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1],
                        };
                        bulvo = this.checkSpecial(this.weaponInfo, bulvo);
                        let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                        bullet.setParent(this.belongType == Const.BulletBelong.MY_BULLET ? FightModel.getInstance.bulletParent : FightModel.getInstance.bulletMonParent);
                        if (this.weaponInfo.shootSpeed[2]) {
                            bul.moveSpeed(this.weaponInfo.shootSpeed[0], this.weaponInfo.shootSpeed[1]);
                        } else
                            bul.moveSpeed(this.getBulletSpeedRandom());
                        bul.setTargetPos(startpos.add(a));
                    }
                }
                for (let i = 0; i < this.allSingleNum; i++) {
                    let hudu = Util.random(-t, t);
                    hudu /= 10000;
                    let offsetdir = i % 2 == 0;
                    let newdir = dir.rotate(hudu * (offsetdir ? 1 : -1));
                    createbullet(newdir);
                    if (this.isMapping) {
                        let mappingdir = newdir.rotate(Math.PI);
                        createbullet(mappingdir);
                    }
                }
            } else if (this.weaponInfo.weaponType == 2) {//散弹齐发
                let dir = endpos.sub(startpos);
                let createbulltype = (dirr) => {
                    let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                    if (bullet) {
                        bullet.position = startpos;
                        let bulvo: BulletVo = {
                            hitAudioId: this.hitAudioId, effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                            shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1],
                        };
                        bulvo = this.checkSpecial(this.weaponInfo, bulvo);
                        let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                        if (this.weaponInfo.shootSpeed[2]) {
                            bul.moveSpeed(this.weaponInfo.shootSpeed[0], this.weaponInfo.shootSpeed[1]);
                        } else
                            bul.moveSpeed(this.weaponInfo.shootSpeed[0]);
                        if (this.weaponInfo.effectType == 8 || this.weaponInfo.effectType == 9) {
                            let dir = dirr.normalize();//endpos.sub(startpos).normalize();
                            dir.mulSelf(this.weaponInfo.attackRange[0]);
                            bul.setTargetPos(startpos.add(dir));
                        } else {
                            let dir = dirr;//endpos.sub(startpos);
                            bul.setTargetPos(startpos.add(dir));
                        }
                        bullet.setParent(this.belongType == Const.BulletBelong.MY_BULLET ? FightModel.getInstance.bulletParent : FightModel.getInstance.bulletMonParent);
                    }
                }
                if (!this.startRotation) {
                    let dir = endpos.sub(startpos);
                    createbulltype(dir);
                    if (this.isMapping) {
                        createbulltype(dir.rotate(Math.PI));
                    }
                    let t = this.weaponInfo.scatterRatio + this.extraStcarRatio;
                    for (let i = 0; i < this.allSingleNum - 1; i++) {
                        let offsetdir = i % 2 == 0;
                        let dis = t * (Math.floor(i / 2) + 1);
                        let newdir = dir.rotate(dis * (offsetdir ? 1 : -1));
                        createbulltype(newdir);
                        // let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                        // if (bullet) {
                        //     bullet.position = startpos;
                        //     let bulvo: BulletVo = {
                        //         hitAudioId: this.hitAudioId, effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                        //         shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1],
                        //     };
                        //     bulvo = this.checkSpecial(this.weaponInfo, bulvo);
                        //     let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);

                        //     if (this.weaponInfo.shootSpeed[2]) {
                        //         bul.moveSpeed(this.weaponInfo.shootSpeed[0], this.weaponInfo.shootSpeed[1]);
                        //     } else
                        //         bul.moveSpeed(this.weaponInfo.shootSpeed[0]);
                        //     if (this.weaponInfo.effectType == 8 || this.weaponInfo.effectType == 9) {
                        //         let ndir = newdir.normalize();
                        //         ndir.mulSelf(this.weaponInfo.attackRange[0]);
                        //         bul.setTargetPos(startpos.add(ndir));
                        //     } else {
                        //         bul.setTargetPos(startpos.add(newdir));
                        //     }

                        //     bullet.setParent(this.belongType == Const.BulletBelong.MY_BULLET ? FightModel.getInstance.bulletParent : FightModel.getInstance.bulletMonParent);
                        // }
                        if (this.isMapping) {
                            createbulltype(newdir.rotate(Math.PI));
                        }
                    }
                }
                else {
                    let twopai = 2 * Math.PI;
                    for (let i = 0; i < this.allSingleNum; i++) {
                        let endpos = this.normalVec.rotate(twopai / this.allSingleNum * i)
                        endpos = endpos.mul(dir.mag());
                        endpos = endpos.rotate(this.deltaRadius)
                        let newdir = startpos.add(endpos);
                        let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                        if (bullet) {
                            bullet.position = startpos;
                            let bulvo: BulletVo = {
                                hitAudioId: this.hitAudioId, effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                                shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1],
                            };
                            bulvo = this.checkSpecial(this.weaponInfo, bulvo);
                            let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                            bullet.setParent(this.belongType == Const.BulletBelong.MY_BULLET ? FightModel.getInstance.bulletParent : FightModel.getInstance.bulletMonParent);
                            if (this.weaponInfo.shootSpeed[2]) {
                                bul.moveSpeed(this.weaponInfo.shootSpeed[0], this.weaponInfo.shootSpeed[1]);
                            } else
                                bul.moveSpeed(this.weaponInfo.shootSpeed[0]);
                            bul.setTargetPos(newdir);
                        }
                    }
                }
            } else if (this.weaponInfo.weaponType == 3) {//激光
                if (this.isReadyState <= 0) {
                    this.isReadyState = 1;
                }
                this.endPos = endpos;
            } else if (this.weaponInfo.weaponType == 4) {//固定光环
                // for (let i = 0; i < this.singleNum; i++) {
                let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                bullet.position = cc.Vec2.ZERO;
                let bulvo: BulletVo = {
                    effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                    shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1],
                };
                bulvo = this.checkSpecial(this.weaponInfo, bulvo);
                let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                bullet.bulletId = bul.insId;
                bullet.active = true;
                RoleManager.getInstance.mainRole.addSpecialBullet(bullet);
                bul.moveSpeed(0);
                bul.setTargetPos(this.endPos);
                // }
                this.gunReady = false;
            } else if (this.weaponInfo.weaponType == 5) {//旋转激光
                let delta = this.getShootDelta();
                for (let i = 0; i < this.allSingleNum; i++) {
                    let angle = Util.RadinasToAngle(i * this.weaponInfo.scatterRatio);
                    let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                    bullet.position = cc.Vec2.ZERO;
                    let bulvo: BulletVo = {
                        hurtDelta: delta, effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                        shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1], offsetAngle: angle,
                    };
                    bulvo = this.checkSpecial(this.weaponInfo, bulvo);
                    bullet.rotation = angle;
                    let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                    bullet.bulletId = bul.insId;
                    RoleManager.getInstance.mainRole.addSpecialBullet(bullet);
                    bul.moveSpeed(0);
                    bul.setTargetPos(this.endPos);
                }
                this.gunReady = false;
            } else if (this.weaponInfo.weaponType == 6) {
                let a = endpos.sub(startpos);
                let createbullet = (direct) => {
                    let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                    if (bullet) {
                        bullet.position = startpos;
                        let bulvo: BulletVo = {
                            hitAudioId: this.hitAudioId, effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                            shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1], weaponType: this.weaponInfo.weaponType,
                        };
                        bulvo = this.checkSpecial(this.weaponInfo, bulvo);
                        let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                        if (this.weaponInfo.shootSpeed[2]) {
                            bul.moveSpeed(this.weaponInfo.shootSpeed[0], this.weaponInfo.shootSpeed[1]);
                        } else
                            bul.moveSpeed(this.weaponInfo.shootSpeed[0]);
                        if (this.weaponInfo.effectType == 8) {
                            let dir = direct.normalize();
                            dir.mulSelf(this.weaponInfo.attackRange[0]);
                            bul.setTargetPos(startpos.add(dir));
                        } else {
                            let dir = direct;
                            bul.setTargetPos(startpos.add(dir));
                        }
                        bullet.setParent(this.belongType == Const.BulletBelong.MY_BULLET ? FightModel.getInstance.bulletParent : FightModel.getInstance.bulletMonParent);
                    }
                }
                let createbullettype = (num, direct) => {
                    for (let i = 0; i < num; i++) {
                        let offsetdir = i % 2 == 0;
                        let a = Math.floor(i / 2) + 1;
                        let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
                        if (bullet) {
                            bullet.position = startpos;
                            let bulvo: BulletVo = {
                                hitAudioId: this.hitAudioId, effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                                shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1], weaponType: this.weaponInfo.weaponType,
                            };
                            bulvo = this.checkSpecial(this.weaponInfo, bulvo);
                            let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
                            bullet.setParent(this.belongType == Const.BulletBelong.MY_BULLET ? FightModel.getInstance.bulletParent : FightModel.getInstance.bulletMonParent);
                            if (this.weaponInfo.shootSpeed[2]) {
                                bul.moveSpeed(this.weaponInfo.shootSpeed[0], this.weaponInfo.shootSpeed[1]);
                            } else
                                bul.moveSpeed(this.weaponInfo.shootSpeed[0]);
                            bul.setExtraParam(offsetdir ? 1 : -1, a * bullet.width);
                            bul.setTargetPos(startpos.add(direct));
                        }
                    }
                }
                createbullet(a);
                if (this.allSingleNum % 2 == 0) {
                    createbullettype(this.allSingleNum, a);
                    if (this.isMapping) {
                        createbullettype(this.allSingleNum, a.rotate(Math.PI))
                    }
                } else {
                    let t = a.rotate(Math.PI);
                    createbullet(a);
                    createbullettype(this.allSingleNum - 1, a);
                    if (this.isMapping) {
                        createbullet(t);
                        createbullettype(this.allSingleNum - 1, t);
                    }
                }
            }
            if (this.weaponInfo.weaponType == 3 && this.isReadyState != 2) 1;
            else {
                this.leftBulletNum--;
                if (this.belongType == Const.BulletBelong.MY_BULLET) {
                    this.belongObj.gunUpdate(this.leftBulletNum, this.allBulletNum);
                }
            }

            if (this.leftBulletNum <= 0) {
                this.gunReady = false;
                this.chamberTime = 0;
                if (this.belongType == Const.BulletBelong.MY_BULLET) {
                    let belongObj = this.belongObj as MainRole;
                    if (this.lifeTime > 0) {
                        this.lifeTime--;
                        Notifier.send(ListenID.Fight_TryEquipUpdate, this.lifeTime, this.startLife);
                        if (this.lifeTime == 0) {
                            belongObj.setTryEquip(false, 0, 0);
                            return;
                        }
                    }
                    this.chamber = this.weaponInfo.chamber - (this.weaponInfo.chamber * belongObj.getGunReloadSpeedRatio());
                    if (this.chamber <= 0) this.chamber = 0.01;
                    Notifier.send(ListenID.Fight_GunCD, this.chamber)
                    if (this.weaponInfo.chamber >= 0) {
                        this.belongObj && this.belongObj.cleanLaserNode();
                        this.resetReadyState();
                    }
                    Manager.audio.playAudio(518);
                }
            }
        }
    }
    protected chamberTime: number = 0;
    public update(dt) {
        if (this.startXuli) {
            this.xulitime -= dt;
            if (this.xulitime <= 0) {
                this.fightLaser();
                this.startXuli = false;
            }
        }
        if (this.warning) {
            this.warnCurTime -= dt;
            if (this.warnCurTime <= 0) {
                this.warning = false;
                for (let i = 0; i < this.warninglist.length; i++) {
                    this.warninglist[i].active = false;
                }
                this.fireCB && this.fireCB(this.startPos, this.targetPos);
            }
        }
        if (this.startRotation) {
            this.deltaRadius += dt * this.rotationSpeed;
            if (this.deltaRadius >= 6.2831) {
                this.deltaRadius = 0;
            }
        }
        // if (this.lifeTime > 0) {
        //     this.startLife += dt;
        //     if (this.startLife >= this.lifeTime) {
        //         if (this.isQteGun) {
        //             this.lifeTime = 0;
        //             this.gunReady = false;
        //             // Notifier.send(ListenID.Fight_QTE_STOP);
        //             this.belongObj && this.belongObj.qteReset();
        //         } else {
        //             this.setGunInfo(this.tempGunTypeId);
        //             // Notifier.send(ListenID.Fight_QTE_STOP);
        //             this.belongObj && this.belongObj.qteReset();
        //         }
        //     }
        // }
        if (!this.gunReady && this.weaponInfo && !this.isQteGun) {
            this.chamberTime += dt;
            if (this.chamberTime >= this.chamber) {
                this.gunReady = true;
                this.deltaRadius = 0;

                if (this.belongType == Const.BulletBelong.MY_BULLET) {
                    this.allBulletNum = Math.ceil(this.weaponInfo.bulletNum * this.extraBulletRatio);
                    this.leftBulletNum = this.allBulletNum;
                    this.belongObj.gunUpdate(this.leftBulletNum, this.allBulletNum);
                } else {
                    this.leftBulletNum = this.weaponInfo.bulletNum;
                    this.allBulletNum = this.weaponInfo.bulletNum;
                }
            }
        }
    }

    public checkWeaponInfo(weaponId: number) {
        let weaponinfp = GameVoManager.getInstance.myUserVo.weaponList[weaponId];
        if (!weaponinfp) {
            return [0, 0, 0];
        }
        return weaponinfp;
    }
    public getShootDelta(): number {
        if (this.weaponInfo) {
            return this.weaponInfo.shootDelta;
        } else {
            return 100;
        }
    }

    public getAttackRange(): number[] {
        if (this.weaponInfo) {
            return this.weaponInfo.attackRange || [480, 800];
        } else {
            return [480, 800];
        }
    }

    public getGunTypeId(): number {
        return this.gunTypeId;
    }

    public getGunType(): number {
        if (this.weaponInfo) {
            return this.weaponInfo.weaponType
        } else {
            return 0;
        }
    }

    public getGunAudioId(): number {
        return this.fireAudioId;
    }

    public getGunAllBulletNum(): number {
        if (this.weaponInfo) {
            return Math.ceil(this.weaponInfo.bulletNum * this.extraBulletRatio);
        } else {
            return 1;
        }
    }

    public fightLaser() {
        if (this.weaponInfo.weaponType != 3) return;
        let bullet = BulletManager.getInstance.popBulletNodeByType(this.weaponInfo.bulletId);
        if (bullet) {
            bullet.position = cc.v2(0, 10);
            bullet.rotation = 0;
            let delta = this.getShootDelta();
            let bulvo: BulletVo = {
                hurtDelta: delta, effectType: this.effectType, hitBack: this.hitBack, hurt: this.belongObj.property.getAttack(), radius: this.weaponInfo.hurtRange, bulletType: this.weaponInfo.bulletId, belongto: this.belongType, canCross: !!this.weaponInfo.isCross, hitEffecId: this.effectId,
                shapeType: this.weaponInfo.bulletType[0], shapeNum: this.weaponInfo.bulletType[1], weaponType: this.weaponInfo.weaponType,
            };
            bulvo = this.checkSpecial(this.weaponInfo, bulvo);
            let bul: Bullet = BulletManager.getInstance.addBullet(bullet, bulvo);
            bullet.setParent(this.belongObj.node);
            this.belongObj.node.bulletId = bul.insId;
            bul.moveSpeed(0);
            bul.setTargetPos(this.endPos);
            this.isReadyState = 2;
        }
    }

    public resetReadyState() {
        this.isReadyState = 0;
    }

    public checkSpecial(weaponInfo: WeaponCfg, bulvo: BulletVo): BulletVo {
        if (weaponInfo && this.belongType == Const.BulletBelong.MY_BULLET) {
            bulvo.showDamage = this.getShowHurtRandom();
            bulvo.hurtRatio = this._hurtRatio;
            bulvo.extraHurtRatio = this.getBulletHurtRandom();
            bulvo.weaponType = weaponInfo.weaponType;
            bulvo.extraSkill = this.skillList;
            if (weaponInfo.effectType == 7) {
                bulvo.shootNum = weaponInfo.scatterRatio;
            }
            if (weaponInfo.effectType == 8 || weaponInfo.effectType == 9) {
                bulvo.hurtDelta = weaponInfo.scatterRatio;
            }
        }
        return bulvo;
    }

    public checkSingNum(weaponInfo: WeaponCfg, singnum: number): number {
        let num = singnum;
        return num;
    }
}
