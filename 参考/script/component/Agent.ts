import { MovingEntity } from "./MovingEntity";
import { StateMachine } from "../fsm/StateMachine";
import { SteeringBehavior } from "./SteeringBehaviors";
import { Buff } from "./Buff";
import { PropertyVO } from "../module/equip/Property";
import { BaseSkill } from "../module/skill/SkillModule";
import { AttackVo } from "../common/Common_Define";

interface SkillComposeMap {
    [key: number]: { cur: number, all: number };
}

export class Agent extends MovingEntity {
    protected attackNum: number = 0;   //伤害值
    protected _GameState: StateMachine<Agent>;
    protected m_Steering: SteeringBehavior<Agent>;
    protected _typeId: number = 0;
    protected _buffList: Buff.BuffManager<Agent>;
    public property: PropertyVO;
    public capacity: number = 0;     //能力比例

    public skillIdList: number[];
    public skillIdDoubleList:boolean[];
    public skillComposeType: SkillComposeMap;
    public movespeed:number = 0;
    public constructor() {
        super();
        this.skillIdList = [];
        this.skillIdDoubleList = [];
        this.skillComposeType = {};
        this.changeListener(true);
        this.registerFSM();
        this.property = new PropertyVO();
    }

    public registerFSM() {
        this._GameState = new StateMachine<Agent>(this);
    }

    public GetFSM() {
        return this._GameState;
    }

    public get Steering() { return this.m_Steering; };

    public get typeId() { return this._typeId; }

    /**初始化血量 */
    public initHp(hp: number) { }

    public setCurHp(hp:number){
        this._curHp = cc.misc.clampf(hp,0, this._allHp);
    }

    public addSkill(skillId: number, isdouble: boolean = false) {

    }

    public clearSkill(skillId: number = 0) {

    }

    public behit(vo: AttackVo, type: number = 0) {}

    public invincibleBuffEnter() { }
    public setInvicibleVisible(boo) { }
    public getInvicibleBuffInfo() { }

    public setInvicibleBuff() { };
    public setSpeedBuff(speed: number, time: number) { }
    public setIceBuff(time: number) { }
    public setSkillSpeedBuff(skillParam: any) { }
    public setSkillBloodBuff(skillParam: any) { }
    public setThunderBuff(ratio: number, deltaTime: number, attackRange: number) { }
    public setSkillPoisionBuff(attack: number, time: number) { }
    public setSkillFireBuff(attack: number, time: number) { }
    public setSkillIceBuff(speed: number, time: number) { }
    public setSkillRaduisDamageBuff(hurtRatio:number, deltaTime:number){}
    public clearRaduisDamageBuff(){}
    public doAddSpeedExcute(range: number, buffValue: number, buffTime: number) { }

    public doAddBloodExcute(range: number, buffValue: number) { }

    public doThunderKill(ratio: number, range: number, num:number) { }

    public addBlood(bloodValue: number) { }
    public showIce() { }
    public hideIce() { }
    public showPoisionEffect(){}
    public hidePoisionEffect(){}
    public showFireEffect(){}
    public hideFireEffect(){}

}