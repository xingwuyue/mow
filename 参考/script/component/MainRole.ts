import { GameStateMachine } from "../fsm/GameStateMachine";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Gun } from "./Gun";
import { Watcher } from "../framework/Watcher";
import { Time } from "../framework/Time";
import { Util } from "../utils/Util";
import { Const } from "../config/Const";
import FightModel from "../module/fight/FightModel";
import { RoleManager } from "../manager/RoleManager";
import { UIManager } from "../framework/UIManager";
import { Common_UIPath, AttackVo, TaskSubType } from "../common/Common_Define";
import { MVC } from "../framework/MVC";
import { Bullet } from "./Bullet";
import { Manager } from "../manager/Manager";
import { AudioType } from "../manager/AudioManager";
import { Buff } from "./Buff";
import { GameVoManager } from "../manager/GameVoManager";
import { NotifyID } from "../framework/NotifyID";
import { Monster } from "./Monster";
import { CallID } from "../CallID";
import { PropertyVO } from "../module/equip/Property";
import { StateMachine } from "../fsm/StateMachine";
import { MainRoleState } from "../fsm/RoleState";
import { Agent } from "./Agent";
import { BaseSkill } from "../module/skill/SkillModule";
import { Cfg } from "../config/Cfg";


export declare interface MainRoleVo {
    allHp: number,
    curHp: number,
    insId: number,

}

/**
 * 无敌列表
 * [1：首次受击无敌,无敌时间]
 * [2：循环无敌，无敌时间，间隔]
 */
let firstInvicibleList = {
    "0": [1, 5, 0],
}
let normalSpeed = 450;


export class MainRole extends Agent {
    protected gunObject: Gun;
    public isCanReliVe: boolean = false;
    public property: PropertyVO;
    protected _typeId: number = 0;
    /**角色类型 */
    protected _type: number = 0;
    /**状态机 */
    protected _gameStateMachine: GameStateMachine;
    protected _gameState: StateMachine<MainRole>;
    protected _buffList: Buff.BuffManager<MainRole>;
    /**移动速度 */
    public _moveSpeed: number = 240;//像素/s;

    public pMissRatio: number = 0;   //闪避概率
    public pViolentRatio: number = 0;    //暴击概率
    public pViolentNum: number = 0;      //暴击伤害
    protected fightTime: number = 0;
    protected bloodBuffValue: number = 0;
    protected _skills: BaseSkill<MainRole>[];

    public constructor() {
        super();
        this._skills = new Array<BaseSkill<MainRole>>();
        this.gunObject = new Gun(Const.BulletBelong.MY_BULLET, this, false);
        this._buffList = new Buff.BuffManager(this);
    }
    private hpBlood: cc.ProgressBar = null;
    private foot: cc.Animation = null;
    private hand: cc.Animation = null;
    private fireEffect: cc.Animation = null;
    private roadGuide: cc.Node = null;
    private bulletRecover: cc.Node = null;
    private bulletHole: cc.Node = null;
    private bulletRecoverBar: cc.ProgressBar = null;
    private gunShoot: cc.Sprite = null;
    private qtelight: cc.Node = null;
    public cheat: boolean = false;
    public hpBloodBg: cc.Node = null;
    public attackCircle: cc.Node = null;
    public skillBullet: cc.Node = null;
    public needRotation: cc.Node = null;
    public hpLabel: cc.Label = null;
    public _baseAllHp: number = 0;
    public init(insId: number, node: cc.Node, state: number = 0) {
        this.SetID(insId);
        this.node = node;
        if (!this.needRotation) {
            this.needRotation = this._node.getChildByName("needRotation");
        }
        if (!this.hpBlood) {
            this.hpBlood = this._node.getChildByName("hpBlood").getComponent(cc.ProgressBar);
        }
        if (!this.hpBloodBg) {
            this.hpBloodBg = this._node.getChildByName("blood");
        }
        if (!this.foot) {
            this.foot = this.needRotation.getChildByName("foot").getComponent(cc.Animation);
        }
        if (!this.hand) {
            this.hand = this.needRotation.getChildByName("hand").getComponent(cc.Animation);
        }
        if (!this.fireEffect) {
            this.fireEffect = this.needRotation.getChildByName("fireEffect").getComponent(cc.Animation);
        }
        if (!this.roadGuide) {
            this.roadGuide = this._node.getChildByName("guide");
        }
        if (!this.bulletRecover) {
            this.bulletRecover = this._node.getChildByName("bulletRecover");
        }
        if (!this.bulletRecoverBar) {
            this.bulletRecoverBar = cc.find("bulletbg/bar", this.bulletRecover).getComponent(cc.ProgressBar);
        }
        if (!this.gunShoot) {
            this.gunShoot = this.fireEffect.node.getChildByName("gun").getComponent(cc.Sprite);
        }
        if (!this.bulletHole) {
            this.bulletHole = this._node.parent.getChildByName("bulletHole");
        }
        if (!this.qtelight) {
            this.qtelight = this._node.getChildByName("qtelight");
        }
        if (!this.attackCircle) {
            this.attackCircle = this._node.getChildByName("attackRange");
        }
        if (!this.skillBullet) {
            this.skillBullet = this._node.getChildByName("skillBullet");
        }
        if (!this.hpLabel) {
            this.hpLabel = this._node.getChildByName("hpLabel").getComponent(cc.Label);
        }
        if (state != 1) {//非复活
            this.initProperty();
            this.gunSpeedRatio = 1;
            this.reloadgunSpeed = 0;
            this.incibleVisibleTime = 0;
            this.isProtectedInReload = false;
            this.skillViolentRatio = 0;
            this.skillMissRatio = 0;
            this.moveSpeedRatio = 1;
            this.hpMaxRatio = 1;
            this._moveSpeed = normalSpeed;
            this.MaxSpeed = normalSpeed;
            this.beHitFast = -1;
            this.extraSkillHurtRatio = 1;
            this.bloodThirstyIndex = -1;
            this.suckBloodRatio = 0;
            this.suckBloodValue = 0;
            this.skillSuck = -1;
            this.rewardRatio = 0;
            this.skillReboundIndex = -1;
            this.skillThornsIndex = -1;
            this.thunderNum = 0;
            this.skillBullet.removeAllChildren();
            this._buffList.clearBuff();
            this._baseAllHp = Math.ceil(this.property.getHp() + Const.NormalHp);
            this.initHp(this._baseAllHp * this.hpMaxRatio);
        } else {
            this.initHp(this._allHp);
        }
        this.circleTime = 0;
        this.qtelight.active = false;
        this.initMissRatio();
        this.initViolentRatio();
        this.initDoubleRewardRatio();
        this.initDirectKillRatio();

        this._node.colliderComponent = this;
        this._isDead = false;
        this.inDead = false;
        this.bulletRecover.active = false;
        this.hurtDeltaCount = 0;
        if (this.inVincibleNode && cc.isValid(this.inVincibleNode)) {
            this.inVincibleNode.active = false;
        }

        this._gameState.ChangeState(MainRoleState.StateType.NONE);

    }

    public initProperty(){
        let property = Notifier.call(CallID.Equip_GetBodyEquipPro, 0) as PropertyVO;
        // console.log("equip property = ", property.toString());
        this.property = property.clone();
        let a = Notifier.call(CallID.Techonlogy_GetAllProperty);
        // console.log("sengtai property = ", a.toString());
        this.property.addPropertySelf(a);
        // console.log("all property = ", this.property.toString());
    }
    public registerFSM() {
        this._gameState = new StateMachine<MainRole>(this);
        this._gameState.registerState(MainRoleState.StateType.NONE, new MainRoleState.NoneState());
        this._gameState.registerState(MainRoleState.StateType.STAND, new MainRoleState.StandState());
        this._gameState.registerState(MainRoleState.StateType.MOVE, new MainRoleState.MoveState());
        this._gameState.registerState(MainRoleState.StateType.DEAD, new MainRoleState.DeadState());
    }

    private miss: boolean[] = [];
    private missIndex: number = 0;

    private istry: boolean = false;
    private equipId: number = 0;

    public rebron() {
        this.circleTime = 0;
        this.qtelight.active = false;
        this._node.colliderComponent = this;
        this._isDead = false;
        this.inDead = false;
        this.bulletRecover.active = false;
        this.hurtDeltaCount = 0;
        this.initHp(this._allHp);
    }

    public setCurHp(hp: number) {
        super.setCurHp(hp);
        this.hpBlood.progress = this._curHp / this._allHp;
        this.hpLabel.string = Util.numFormat1(this._curHp);
    }
    public setTryEquip(boo: boolean, equipid: number, times: number = 0) {
        this.istry = boo;
        this.equipId = equipid;
        if (boo) {
            let equip = Cfg.Equip.get(equipid);
            let newequip = new PropertyVO(equip.property);
            console.log("newequip zero = ",newequip.attack);
            console.log("this.property", this.property.attack);
            let gunpro = Notifier.call(CallID.Equip_GetBodyEquipPro, 1);
            console.log("oldequip zero = ",gunpro.attack,gunpro.intensifyLv);
            const partlevel = GameVoManager.getInstance.getEquipPartLevel(0);
            newequip.setPartAndLevel(0,partlevel);
            console.log("newequip", newequip.attack,partlevel)
            this.property.reducePropertySelf(gunpro);
            console.log("reduceafter", this.property.attack);
            this.property.addPropertySelf(newequip);
            console.log('newproattack-after', this.property.attack);
            this.setGunInfo(equip.weaponId, times);
        } else {
            this.initProperty();
            this.setGunInfo(GameVoManager.getInstance.myUserVo.defaultGunId, 0);
        }
    }

    public addSkill(skillId: number, isdouble: boolean = false) {
        let data = Cfg.Skill.get(skillId);
        if (!data) return;
        let comdata = this.skillComposeType[skillId];
        if (comdata && comdata.cur > comdata.all) {
            return;
        }
        if (!comdata) {
            this.skillComposeType[skillId] = { cur: 0, all: data.skillCompose };
        }
        let mod = require("SkillModule");
        this.skillComposeType[skillId].cur++;
        let skill = new mod[data.skillClass](skillId, this, isdouble) as BaseSkill<MainRole>;
        this._skills.push(skill);
        this.skillIdList.push(skillId);
        this.skillIdDoubleList.push(isdouble);
        skill.index = this._skills.length - 1;//用于索引
        skill.load();
    }

    public isSkillLimited(skillId: number) {
        if (!this.skillComposeType[skillId]) {
            return false;
        } else {
            return this.skillComposeType[skillId].cur >= this.skillComposeType[skillId].all;
        }
    }

    public clearSkill() {
        for (let i = this._skills.length - 1; i >= 0; i--) {
            this._skills[i].unload();
            delete this._skills[i];
        }
        this._skills = [];
        this.skillComposeType = {};
        this.skillIdList = [];
    }

    public initMissRatio() {
        this.pMissRatio = this.property.getMissRatio(FightModel.getInstance.curLevel) * 100;
        this.missIndex = 0;
        for (let i = 0; i < 60; i++) {
            let a = Util.random(0, 100);
            this.miss[i] = a < (this.pMissRatio + this.skillMissRatio);
        }
    }

    public getMissRatio() {
        return this.pMissRatio + this.skillMissRatio;
    }

    public getViolentRatio() {
        return this.pViolentRatio + this.skillViolentRatio;
    }

    public getKillRatio() {
        return this.skillkillRatio;
    }

    public isMiss() {
        let boo = this.miss[this.missIndex];
        this.missIndex++;
        if (this.missIndex >= this.miss.length) {
            this.missIndex = 0;
        }
        return boo;
    }
    private violent: boolean[] = [];
    private vidoentIndex: number = 0;
    public initViolentRatio() {
        this.pViolentRatio = this.property.getViolentRatio(FightModel.getInstance.curLevel) * 100;
        this.vidoentIndex = 0;
        for (let i = 0; i < 60; i++) {
            let a = Util.random(0, 100);
            this.violent[i] = a < (this.pViolentRatio + this.skillViolentRatio);
        }
    }

    public isViolentAttack() {
        let boo = this.violent[this.vidoentIndex];
        this.vidoentIndex++;
        if (this.vidoentIndex >= this.violent.length) {
            this.vidoentIndex = 0;
        }
        return boo;
    }

    public gunUpdate(leftnum, allnum) {
        Notifier.send(ListenID.Fight_GunUpdate, leftnum, allnum);
    }

    protected gunDelta: number = 0;
    public attackRanges: number[] = [0, 0];
    public setGunInfo(typeId: number, time: number = 0) {
        this.gunObject.setGunInfo(typeId, time, this.fireEffect);
        this.attackRanges = this.gunObject.getAttackRange();
        if (this.attackCircle) { this.attackCircle.width = this.attackRanges[0] * 2; this.attackCircle.height = this.attackRanges[0] * 2 };
        this.gunDelta = this.gunObject.getShootDelta();
        this.fightTime = this.gunDelta - 0.05;
    }

    public getGunInfo(): Gun {
        return this.gunObject;
    }
    /****************************技能相关参数start************************************* */

    protected gunSpeedRatio: number = 1;
    public addGunSpeedRadio(ratio: number) {
        this.gunSpeedRatio += ratio;
    }

    public addGunHurtRatio(ratio: number) {
        this.gunObject.setHurtRatio(ratio);
    }

    protected reloadgunSpeed: number = 0;
    public addGunReloadSpeed(ratio: number) {
        this.reloadgunSpeed += ratio;
    }
    public getGunReloadSpeedRatio() {
        return this.reloadgunSpeed;
    }

    protected isProtectedInReload: boolean = false;
    public setProtectedInReload(boo: boolean) {
        this.isProtectedInReload = boo;
    }
    protected skillViolentRatio: number = 0;
    public setSkillViolentRatio(ratio: number) {
        this.skillViolentRatio += ratio * 100;
        this.initViolentRatio();
    }

    protected skillMissRatio: number = 0;
    public setSkillMissRatio(ratio: number) {
        this.skillMissRatio += ratio * 100;
        this.initMissRatio();
    }

    protected skillkillRatio: number = 0;//秒杀概率
    public setKillRatio(ratio: number) {
        this.skillkillRatio += ratio;
        this.initDirectKillRatio();
    }
    private dKill: boolean[] = [];
    private dKillIndex: number = 0;
    public initDirectKillRatio() {
        this.dKillIndex = 0;
        for (let i = 0; i < 60; i++) {
            let a = Util.random(0, 100);
            this.dKill[i] = a < this.skillkillRatio;
        }
    }

    public isDirectKillAttack() {
        let boo = this.dKill[this.dKillIndex];
        this.dKillIndex++;
        if (this.dKillIndex >= this.dKill.length) {
            this.dKillIndex = 0;
        }
        return boo;
    }
    public moveSpeedRatio: number = 1;
    public hpMaxRatio: number = 1;
    public addhpMaxRatio(ratio: number) {
        this.hpMaxRatio += ratio;
        if (this.hpMaxRatio < 0.1) {
            this.hpMaxRatio = 0.1;
        }
        this.resetHp(Math.ceil(this._baseAllHp * this.hpMaxRatio), true);
    }

    public resetHp(hp: number, showAnim: boolean) {
        if (hp <= 0) {
            hp = 1;
        }
        let newhp = hp;
        let temp = newhp - this._allHp;
        if (temp > 0) {
            this._curHp += temp;
        }
        this._allHp = newhp;
        this._curHp = cc.misc.clampf(this._curHp, 1, this._allHp);
        this.hpBlood.progress = this._curHp / this._allHp;
        this.hpLabel.string = Util.numFormat1(this._curHp);
        if (showAnim && temp > 0) {
            Notifier.send(ListenID.Fight_SHOWEFFECT_NUM, temp, this.Pos, 0);
            Notifier.send(ListenID.Fight_SHOWEFFECT, 12, 5003, this.Pos);
        }
    }

    public beHitFast: number = -1;//受击快速反应下标

    public bloodThirstyIndex: number = -1;
    public extraSkillHurtRatio: number = 1;

    private suckBloodRatio: number = 0;//吸血概率
    private suckBloodValue: number = 0;//吸血百分比
    public setSkillSuckBlood(value, ratio) {
        this.suckBloodRatio = ratio;
        this.suckBloodValue += value;
    }
    public skillSuck: number = -1;
    public triggerSuckBlood() {
        if (this.skillSuck >= 0 && this._curHp < this._allHp) {
            let random = Util.random(1, 101);
            if (random <= this.suckBloodRatio) {
                this.addBlood(this.suckBloodValue);
            }
        }
    }

    private rewardRatio: number = 0;
    public setSkillDoubleRewardRatio(ratio: number) {
        this.rewardRatio += ratio;
        this.initDoubleRewardRatio();
    }
    private doubleratios: boolean[] = [];
    private doubleRewardIndex: number = 0;
    public initDoubleRewardRatio() {
        this.doubleRewardIndex = 0;
        for (let i = 0; i < 60; i++) {
            let a = Util.random(0, 100);
            this.doubleratios[i] = a < this.rewardRatio;
        }
    }

    public isDoubleReward() {
        let boo = this.doubleratios[this.doubleRewardIndex];
        this.doubleRewardIndex++;
        if (this.doubleRewardIndex >= this.doubleratios.length) {
            this.doubleRewardIndex = 0;
        }
        return boo;
    }

    public skillThornsIndex: number = -1;
    public skillReboundIndex: number = -1;//反伤下标
    public kickMonsterAss(dis: number, range: number) {
        RoleManager.getInstance.kickMonsterAss(dis, range);
    }

    public percircleSpeedRatio: number = 360;
    /******************************技能相关参数end*********************************** */

    public changeListener(enable: boolean) {
        super.changeListener(enable);
        Notifier.changeListener(enable, ListenID.Fight_RoleMove, this.onMove, this);
        Notifier.changeListener(enable, ListenID.Fight_RoleStand, this.onStand, this);
        Notifier.changeListener(enable, ListenID.Fight_GunCD, this.onGunRecover, this);
        Notifier.changeListener(enable, NotifyID.Time_Scale, this.timeScale, this);
        Notifier.changeListener(enable, ListenID.Fight_RecycleObj, this.recycleobj, this);
        Notifier.changeListener(enable, ListenID.Fight_AddSkill, this.addSkill, this);
    }

    recycleobj() {
        if (this.qtelight) this.qtelight.active = false;
    }

    /**初始化血量 */
    public initHp(hp: number) {
        if (FightModel.getInstance.fightType == 1) {
            this._allHp = Const.NormalHp;
        } else {
            this._allHp = hp;
        }
        this._curHp = this._allHp;
        this.hpBlood.progress = this._curHp / this._allHp;
        this.hpLabel.string = Util.numFormat1(this._curHp);
    }

    private _watcher: Watcher = null;
    public fightStart() {
        this.gunDelta = this.gunObject.getShootDelta();
    }

    public fightEnd() {
        this.targetMonId = -1;
    }

    public get moveSpeed(): number {
        return this.MaxSpeed;//this._moveSpeed * this.moveSpeedRatio;
    }

    public set moveSpeed(speed: number) {
        this._moveSpeed = speed;
        this.MaxSpeed = this._moveSpeed * this.moveSpeedRatio;
    }

    protected targetMonId: number = -1;
    protected targetDir: cc.Vec2 = cc.Vec2.ZERO;
    protected fightState: number = 0;
    /**
     * 
     * @param monId 怪物id -1为找不到怪物
     * @param targetPos 射击坐标
     * @param distance 距离
     */
    public setFireInfo(monId: number, targetPos: cc.Vec2, distance?: number) {
        if (monId != -1) {
            if (this.targetMonId == -1 && (this.gunObject.getGunTypeId() == 109 ||
                this.gunObject.getGunTypeId() == 120 ||
                this.gunObject.getGunTypeId() == 121 ||
                this.gunObject.getGunTypeId() == 122 ||
                this.gunObject.getGunTypeId() == 422 ||
                this.gunObject.getGunTypeId() == 417 ||
                this.gunObject.getGunTypeId() == 103 ||
                this.gunObject.getGunTypeId() == 104)) {
                this.fightTime = this.gunObject.getShootDelta();
            }
            this.fightState = 1;
            this.fightResetTime = 0;
            let dir = targetPos.sub(this.Pos);
            this.needRotation.runAction(cc.rotateTo(0.25, Util.getAngle(this._normalDir, dir.normalize())));
            this.targetMonId = monId;
            this.targetDir = targetPos;
        } else {
            this.targetMonId = -1;
            this.fightTime = 0;
            this.targetDir = cc.Vec2.ZERO;
            if (this.gunObject.getGunType() == 3) {
                this.cleanLaserNode();
            }
            this.pauseFireAudio();
        }
    }

    private recoverTime: number = 0;
    private currecoverTime: number = 0;
    private startRecover: boolean = false;
    public onGunRecover(cd: number) {
        this.recoverTime = cd;
        this.currecoverTime = 0;
        this.bulletRecoverBar.progress = 0;
        this.bulletRecover.active = true;
        this.startRecover = true;
        if (this.isProtectedInReload) {
            this.setInvicibleBuff(this.recoverTime);
        }
    }

    gunChange() {
        this.gunDelta = this.gunObject.getShootDelta();
        this.attackRanges = this.gunObject.getAttackRange();
    }

    public timeScale(scale) {
        if (scale == 1) {
            // this.MaxSpeed = this._moveSpeed *  normalSpeed;
        }
    }

    public qteReset() {
        this.cleanBulletHole();
    }

    public pushToFire: boolean = false;
    /**
     * 
     * @param pos 移动方向，单位向量
     */
    onMove(pos: cc.Vec2) {
        this.Heading = pos;
        this.pushToFire = false;
        this.Velocity = this.Heading.mul(this.MaxSpeed);
        if (!this._gameState.isInState(MainRoleState.StateType.MOVE) && !this._isDead) {
            this._gameState.ChangeState(MainRoleState.StateType.MOVE);
        }
    }

    onStand() {
        this.Velocity = cc.Vec2.ZERO;
        this.pushToFire = FightModel.getInstance.fireMode;
        if (!this._gameState.isInState(MainRoleState.StateType.STAND)) {
            this._gameState.ChangeState(MainRoleState.StateType.STAND);
        }
    }

    onFire(isqte: boolean) {
        if (this.targetMonId != -1 && !RoleManager.getInstance.isPause && !this.cheat && !this.pushToFire) {
            let bulletPos = this.targetDir.sub(this.Pos).normalize();
            if (this.gunObject.getGunTypeId() != 102 && this.gunObject.getGunTypeId() != 402) {
                bulletPos = bulletPos.mul(40);
            }
            this.gunObject.onFire(this.Pos.add(bulletPos), this.targetDir);
        }
    }

    public addSpecialBullet(bullet: cc.Node) {
        bullet.setParent(this.bulletHole);
    }

    public cleanLaserNode() {
        let node = this._node.getChildByName("bullet");
        if (node) {
            this.gunObject.resetReadyState();
            Notifier.send(ListenID.Fight_RecycleBullet, this._node.bulletId);
        }
    }

    public cleanBulletHole() {
        if (this.bulletHole.childrenCount > 0) {
            let removeid = [];
            for (let i = 0; i < this.bulletHole.childrenCount; i++) {
                removeid.push(this.bulletHole.children[i].bulletId)
            }
            for (let j = 0; j < removeid.length; j++) {
                Notifier.send(ListenID.Fight_RecycleBullet, removeid[j]);
            }
        }
    }

    private inDead: boolean = false;
    public hitCount: number = 0;
    reduceBlood(hurt: number) {
        this.hitCount++;
        if (this.hitCount > 1) return;
        if (this.beHitFast >= 0) {
            this._skills[this.beHitFast] && this._skills[this.beHitFast].excute();
        }

        if (this.skillReboundIndex >= 0) {
            this._skills[this.skillReboundIndex] && this._skills[this.skillReboundIndex].excute();
        }
        if (this.skillThornsIndex >= 0) {
            this._skills[this.skillThornsIndex] && this._skills[this.skillThornsIndex].excute();
        }
        if (this.IsInBuff(Buff.BuffType.INVICIBLE) || this.IsInBuff(Buff.BuffType.SKILL_INVICIBLE)) return;
        if (this.bloodThirstyIndex >= 0) {
            this._skills[this.bloodThirstyIndex] && this._skills[this.bloodThirstyIndex].excute();
        }
        let realhurt = hurt - (FightModel.getInstance.fightType == 1 ? 0 : this.property.getDefense());
        if (realhurt <= 0) realhurt = 1;
        if (this.isMiss()) {
            Notifier.send(ListenID.Fight_SHOWEFFECT_NUM, 0, this.Pos, 0, false);
            return;
        } else {
            Notifier.send(ListenID.Fight_SHOWEFFECT_NUM, -Math.ceil(realhurt), this.Pos, 0, false);
        }
        this._curHp -= Math.ceil(realhurt);
        this.hpBlood.progress = this._curHp / this._allHp;
        this.hpLabel.string = Util.numFormat1(this._curHp);
        Notifier.send(ListenID.Fight_BloodWarn);
        Manager.audio.playAudio(506, AudioType.UI);
        if (this._curHp <= 0) {
            if (!this.inDead && RoleManager.getInstance.isFighting) {
                this.inDead = true;
                this._gameState.ChangeState(MainRoleState.StateType.DEAD);
            }
        }
    }

    public behit(vo: AttackVo, type: number) {
        this.reduceBlood(vo.hurt);
    }

    public pauseFireAudio() {
        Manager.audio.stopGunFire(this.gunObject.getGunAudioId());
    }

    private fightResetTime: number = 0;
    private invicibletime: number = 0;
    private circleTime: number = 0;
    public update(dt) {
        super.Update(dt);
        this._gameState && this._gameState.Update(dt);
        if (this.bulletHole) {
            this.bulletHole.position = this.Pos;
        }
        this.fightResetTime += dt;
        if (this.fightResetTime >= Const.FIGHT_STATETIME) {
            this.fightState = 0;
        }

        if (this.skillBullet && this.skillBullet.childrenCount > 0) {
            this.circleTime -= this.percircleSpeedRatio * dt;
            let circlrlen = this.skillBullet.childrenCount;
            let percircle = 180 / circlrlen;
            for (let i = 0; i < circlrlen; i++) {
                this.skillBullet.children[i].rotation = i * percircle + this.circleTime;
            }
        }
        if (RoleManager.getInstance.isFighting) {
            this.fightTime += dt;
            if (this.fightTime >= this.gunDelta / this.gunSpeedRatio) {
                this.onFire(false);
                this.fightTime = 0;
            }
            this.gunObject.update(dt);
        }
        this._buffList.update(dt);
        // if (this.hpBlood) {
        //     this.hpBlood.node.x = this._node.x - 44.6;
        //     this.hpBlood.node.y = this._node.y - 60;
        // }
        // if (this.hpBloodBg) {
        //     this.hpBloodBg.x = this._node.x;
        //     this.hpBloodBg.y = this._node.y - 60;
        // }
        // if (this.bulletRecover && this.bulletRecover.active) {
        //     this.bulletRecover.rotation = -this._node.rotation;
        // }
        if (this.attackCircle && this.attackCircle.active) {
            // this.attackCircle.rotation = -this._node.rotation;
            this.attackCircle.color = this.targetMonId != -1 ? cc.Color.WHITE.fromHEX("#fe3030") : cc.Color.WHITE;
        }
        if (this.inVincibleNode && this.inVincibleNode.active) {
            this.invicibletime += 3;
            this.inVincibleNode.rotation = /*-this._node.rotation*/ + this.invicibletime;
        }
        if (this.startRecover) {
            this.currecoverTime += dt;
            this.bulletRecoverBar.progress = this.currecoverTime / this.recoverTime;
            if (this.currecoverTime >= this.recoverTime) {
                this.startRecover = false;
                this.bulletRecover.active = false;
            }
        }
    }

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionStay(other, self: cc.Collider) {
        if (!this.isDead) {
            if (other.node.group == Const.GroupBullet) {
                let bullet: Bullet = other.node.colliderComponent;
                if (this.startHurtDelta && !bullet.isDead && bullet.belongto != Const.BulletBelong.MONSTER_BULLET) {
                    this.hurtDeltaTime += Time.deltaTime;
                    if (this.hurtDeltaTime > this.hurtDelta) {
                        this.hurtDeltaTime = 0;
                        this.reduceBlood(bullet.hurt);
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
        if (other.node.group == Const.GroupBullet) {
            let bullet: Bullet = other.node.colliderComponent;
            if (!bullet.isDead && bullet.belongto != Const.BulletBelong.MONSTER_BULLET) {
                this.hurtDeltaCount--;
                if (this.hurtDeltaCount <= 0) {
                    this.startHurtDelta = false;
                    this.hurtDeltaCount = 0;
                }
            }
        }
    }

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    private hurtDelta = 0;
    private startHurtDelta: boolean = false;
    private hurtDeltaCount: number = 0;
    private hurtDeltaTime: number = 0;
    public onCollisionEnter(other, self) {
        if (!this._isDead) {
            if (other.node.group == Const.GroupBullet) {
                let bullet: Bullet = other.node.colliderComponent;
                if (!bullet.isDead && bullet.belongto != Const.BulletBelong.MY_BULLET) {
                    this.reduceBlood(bullet.hurt);
                    if (!bullet.canCross) {
                        Notifier.send(ListenID.Fight_RecycleBullet, bullet.insId);
                        bullet.isDead = true;
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
            } else if (other.node.group == Const.GroupMonster) {
                let mon: Monster = other.node.colliderComponent;
                if (!mon.isDead && mon.isSpurtMonster) {
                    this.reduceBlood(mon.attackNum);
                }
            }
        }
    }
    public getGunHurtRatio() {
        return this.gunObject.getHurtRatio();
    }

    public getGunDelta() {
        return this.gunDelta / this.gunSpeedRatio;
    }
    //****************状态函数相关***********************/

    /**移动状态 */
    public moveEnterFunc() {
        this.foot.play("playerMoveAni");
    }

    private footDelta: number = 0.15;
    private curMoveTime: number = 0;
    private footAction: number = -1;
    public moveUpdateFunc(dt) {
        this.SetPos(this.Pos.add(this.Velocity.mul(dt)));
        this.Pos = this.Pos.clampf(this._gameWorld.BottomLeft, this._gameWorld.TopRight);


        if (this.fightState == 0 && this.needRotation) {
            this.needRotation.rotation = Util.getAngle(this._normalDir, this.Heading);
        }

        this.roadGuide.rotation = Util.getAngle(this._normalDir, this.Velocity);
        this.curMoveTime += dt;
        if (this.curMoveTime >= this.footDelta) {
            this.addFootMark();
            this.curMoveTime = 0;
        }
    }
    public addFootMark() {
        let node = FightModel.getInstance.popFootMarkNode();
        node.active = true;
        let dir = this.Heading.normalize().mul(10);
        node.position = this.Pos.add(dir.rotate(Math.PI * 0.5 * this.footAction));
        this.footAction *= -1;
        node.rotation = Util.getAngle(this._normalDir, this.Heading);
        node.opacity = 255;
        node.setParent(FightModel.getInstance.footmarkParent);
        node.runAction(cc.sequence(cc.fadeOut(0.7), cc.callFunc(() => {
            FightModel.getInstance.putFootMarkNode(node);
        })))
    }
    public moveExitFunc() { }

    private behittime: number = 0;
    private behitdis: number = 500;
    public behitEnterFunc() { this.behittime = 0; }
    public behitUpdateFunc(dt) { }
    public behitExitFunc() { }

    /**死亡 */
    // private deadTime = 0;
    public deadEnterFunc() {
        // this.deadTime = 0;
        this._isDead = true;
        Notifier.send(ListenID.Log_Event, { event_name: "level_die" });
        if (this.isCanReliVe) {
            this.isCanReliVe = false;
            Notifier.send(ListenID.Fight_Pause, true);
            Time.delay(0.5, () => {
                // if (GameVoManager.getInstance.myUserVo.topLevel < 2) {
                //     UIManager.Open(Common_UIPath.ReliveTipsUI, MVC.eTransition.Default, MVC.eUILayer.Popup);
                // } else {
                UIManager.Open(Common_UIPath.ReliveUI, MVC.eTransition.Default, MVC.eUILayer.Popup);
                // }
            });
        } else {
            Notifier.send(ListenID.Fight_End, false);
        }
        this._gameState.ChangeState(MainRoleState.StateType.NONE)
    }
    public deadUpdateFunc(dt) { }
    public deadExitFunc() { }

    //站立状态
    public standEnterFunc() { this.foot.play("playerStandAni"); }
    public standUpdateFunc(dt) { }
    public standExitFunc() { }

    public inVincibleNode: cc.Node = null;
    protected incibleVisibleTime: number = 0;
    public invincibleBuffEnter() {
        this.setInvicibleVisible(true);

    }
    public setInvicibleVisible(boo) {
        if (boo) {
            this.inVincibleNode = this._node.getChildByName("wudi");
            this.incibleVisibleTime++;
            if (this.inVincibleNode) {
                this.inVincibleNode.active = true;
            }

        } else {
            this.incibleVisibleTime--;
            if (this.incibleVisibleTime <= 0) {
                this.incibleVisibleTime = 0;
                if (this.inVincibleNode) {
                    this.inVincibleNode.active = false;
                }
            }
        }
    }
    public getInvicibleBuffInfo(): any {
        let data = firstInvicibleList[0];
        return {
            isloop: false,
            invincibleDelta: data[1],
            loopDeltaTime: data[2],
        }
    }

    public setInvicibleBuff(duraTime: number = 5) {
        let param = this.getInvicibleBuffInfo();
        param.invincibleDelta = duraTime;
        this._buffList.addBuff(Buff.BuffType.INVICIBLE, param);
    }

    public setSkillInvicibleBuff(delta: number, loopTime: number, isloop: boolean = true) {
        let data = {
            isloop: isloop,
            invincibleDelta: delta,
            loopDeltaTime: loopTime,
        }
        this._buffList.addBuff(Buff.BuffType.SKILL_INVICIBLE, data);
    }

    public removeSkillInvicibleBuff() {
        this._buffList.clearBuff(Buff.BuffType.SKILL_INVICIBLE);
    }

    public removeSkillThunderBuff() {
        this._buffList.clearBuff(Buff.BuffType.SKILL_THUNDER);
    }

    public addBlood(bloodValue) {
        let blood = Math.floor(this._allHp * bloodValue / 100);
        this._curHp += blood;
        Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.ResumeHp, blood);
        this._curHp = cc.misc.clampf(this._curHp, 1, this._allHp);
        this.hpBlood.progress = this._curHp / this._allHp;
        this.hpLabel.string = Util.numFormat1(this._curHp);
        if (this.bloodThirstyIndex >= 0) {
            this._skills[this.bloodThirstyIndex] && this._skills[this.bloodThirstyIndex].excute();
        }
        if (blood > 0) {
            Notifier.send(ListenID.Fight_SHOWEFFECT, 12, 5003, this.Pos);
        }
        Notifier.send(ListenID.Fight_SHOWEFFECT_NUM, blood, this.Pos, 0);
    }

    public setBloodBuff(blood: number) {
        this._buffList.addBuff(Buff.BuffType.BLOOD, { buffValue: blood });
    }

    public setSpeedBuff(speed: number, time: number) {
        if (this.IsInBuff(Buff.BuffType.SPEED)) return;
        this._buffList.addBuff(Buff.BuffType.SPEED, { buffTime: time, buffValue: speed });
    }
    public thunderNum: number = 0;
    public setThunderBuff(ratio: number, deltaTime: number, attackRange: number) {
        this.thunderNum++;
        this._buffList.addBuff(Buff.BuffType.SKILL_THUNDER, { buffTime: deltaTime, buffValue: ratio, range: attackRange, thunderNum: this.thunderNum });
    }

    public doThunderKill(ratio: number, range: number, num: number) {
        let extraAttack = this.gunObject.getBulletHurtRandom();

        RoleManager.getInstance.thunderAttack({ range, ratio, extraAttack, attack: this.property.getAttack(), gunRatio: this.gunObject.getHurtRatio(), thunderNum: num })
    }
}

