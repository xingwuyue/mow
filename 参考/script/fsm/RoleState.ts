import { MainRole } from "../component/MainRole";
import { State } from "./State";

export namespace MainRoleState {
    export enum StateType {
        NONE = 0,
        MOVE,        //移动
        STAND,
        ATTACk,
        BEHIT,
        DEAD,           //死亡
    }
    export class NoneState extends State<MainRole>{
        public Enter(entity: MainRole) {
            // throw new Error("Method not implemented.");
        }
        public Execute(entity: MainRole, dt: any) {
            // throw new Error("Method not implemented.");
        }
        public Exit(entity: MainRole) {
            // throw new Error("Method not implemented.");
        }
        public OnMessage(entity: MainRole, msg: any): boolean {
            // throw new Error("Method not implemented.");
            return true;
        }
    }

    export class MoveState extends State<MainRole>{
        public Enter(entity: MainRole) {
            // throw new Error("Method not implemented.");
            entity.moveEnterFunc();
        }
        public Execute(entity: MainRole, dt: any) {
            // throw new Error("Method not implemented.");
            entity.moveUpdateFunc(dt);
        }
        public Exit(entity: MainRole) {
            entity.moveExitFunc();
        }
        public OnMessage(entity: MainRole, msg: any): boolean {
            return false;
        }
    }

    export class StandState extends State<MainRole>{
        public Enter(entity: MainRole) {
            entity.standEnterFunc();
        }

        public Execute(entity: MainRole, dt: any) {
            entity.standUpdateFunc(dt);
        }
        public Exit(entity: MainRole) {
            entity.standExitFunc();
        }
        public OnMessage(entity: MainRole, msg: any): boolean {
            return true;
        }


    }

    /**
     * 攻击为全局状态，往后调整
     */
    export class AttackState extends State<MainRole>{
        public Enter(entity: MainRole) {

        }
        public Execute(entity: MainRole, dt: any) {

        }
        public Exit(entity: MainRole) {

        }
        public OnMessage(entity: MainRole, msg: any): boolean {
            return true;
        }


    }

    export class BeHitState extends State<MainRole>{
        public Enter(entity: MainRole) {
            entity.behitEnterFunc();
        } 
        public Execute(entity: MainRole, dt: any) {
            entity.behitUpdateFunc(dt);
        }
        public Exit(entity: MainRole) {
            entity.behitExitFunc();
        }
        public OnMessage(entity: MainRole, msg: any): boolean {
            return true;
        }


    }

    export class DeadState extends State<MainRole>{
        public Enter(entity: MainRole) {
            entity.deadEnterFunc();
        }
        public Execute(entity: MainRole, dt: any) {
            entity.deadUpdateFunc(dt);
        }
        public Exit(entity: MainRole) {
            entity.deadExitFunc();
        }
        public OnMessage(entity: MainRole, msg: any): boolean {
            return true;
        }


    }
}