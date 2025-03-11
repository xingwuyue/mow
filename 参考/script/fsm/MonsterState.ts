import { State } from "./State";
import { Monster } from "../component/Monster";


export namespace MonsterState {
    export enum StateType {
        NONE = 0,
        PURSUIT,        //追踪
        STAND,
        ATTACk,
        BEHIT,
        DEAD,           //死亡
        SPURT,          //冲刺
    }

    export class NoneState extends State<Monster>{
        public Enter(entity: Monster) {

        }
        public Execute(entity: Monster, dt: any) {

        }
        public Exit(entity: Monster) {

        }
        public OnMessage(entity: Monster, msg: any): boolean {

            return true;
        }
    }

    export class PursuitState extends State<Monster>{
        public Enter(entity: Monster) {
            entity.pursuitEnterFunc();
        }
        public Execute(entity: Monster, dt: any) {
            entity.pursuitUpdate(dt);
            if (entity.checkOutInAttackRange() && !entity.isDead) {
                entity.GetFSM().ChangeState(StateType.ATTACk);
            }
        }
        public Exit(entity: Monster) {
            entity.pursuitExitFunc();
        }
        public OnMessage(entity: Monster, msg: any): boolean {
            return false;
        }
    }

    export class StandState extends State<Monster>{
        public Enter(entity: Monster) {

        }

        public Execute(entity: Monster, dt: any) {

        }
        public Exit(entity: Monster) {

        }
        public OnMessage(entity: Monster, msg: any): boolean {
            return true;
        }


    }

    export class AttackState extends State<Monster>{
        public Enter(entity: Monster) {
            entity.attackEnterFunc();
        }
        public Execute(entity: Monster, dt: any) {
            entity.attackUpdateFunc(dt);
        }
        public Exit(entity: Monster) {
            entity.attackExitFunc();
        }
        public OnMessage(entity: Monster, msg: any): boolean {
            return true;
        }


    }

    export class BeHitState extends State<Monster>{
        public Enter(entity: Monster) {
            entity.behitEnterFunc();
        }
        public Execute(entity: Monster, dt: any) {
            entity.behitUpdateFunc(dt);
        }
        public Exit(entity: Monster) {
            entity.behitExitFunc();
        }
        public OnMessage(entity: Monster, msg: any): boolean {
            return true;
        }


    }

    export class DeadState extends State<Monster>{
        public Enter(entity: Monster) {
            entity.deadEnterFunc();
        }
        public Execute(entity: Monster, dt: any) {
            entity.deadUpdateFunc(dt);
        }
        public Exit(entity: Monster) {
            entity.deadExitFunc();
        }
        public OnMessage(entity: Monster, msg: any): boolean {
            return true;
        }


    }

    export class SpurtState extends State<Monster>{
        public Enter(entity: Monster) {
            entity.spurtEnter();
        }
        public Execute(entity: Monster, dt: any) {
            let nofinish = entity.spurtUpdate(dt);
            if (!nofinish && !entity.isDead) {
                let inattack = entity.checkOutInAttackRange();
                if (inattack) entity.GetFSM().ChangeState(StateType.ATTACk); else entity.GetFSM().ChangeState(StateType.PURSUIT);
            }
        }
        public Exit(entity: Monster) {
            entity.spurtExit();
        }
        public OnMessage(entity: Monster, msg: any): boolean {
            return false;
        }


    }
}


