import { State } from "./State";
import { BaseGameEntity } from "../component/BaseGameEntity";
import { MainRole } from "../component/MainRole";
import { Monster } from "../component/Monster";
import { Agent } from "../component/Agent";

export namespace SkillState {
    export enum StateType {
        NONE = 0,
        ADD_SPEED,        //移动
        ADD_BLOOD,
        INVICIBLE_FIRST,
        INVICIBLE_LOOP,
    }

    export class NoneState extends State<MainRole | Monster>{
        public Enter(entity: MainRole | Monster) {
            // throw new Error("Method not implemented.");
        }
        public Execute(entity: MainRole | Monster, dt: any) {
            // throw new Error("Method not implemented.");
        }
        public Exit(entity: MainRole | Monster) {
            // throw new Error("Method not implemented.");
        }
        public OnMessage(entity: MainRole | Monster, msg: any): boolean {
            // throw new Error("Method not implemented.");
            return true;
        }
    }

    export class SpeedSkillState extends State<Agent>{
        public Enter(entity: Agent) {

        }
        public Execute(entity: Agent, dt: any) {

        }
        public Exit(entity: Agent) {

        }
        public OnMessage(entity: Agent, msg: any): boolean {
            return true;
        }


    }

    export class AddBloodState extends State<MainRole | Monster>{
        public Enter(entity: MainRole | Monster) {

        }
        public Execute(entity: MainRole | Monster, dt: any) {

        }
        public Exit(entity: MainRole | Monster) {

        }
        public OnMessage(entity: MainRole | Monster, msg: any): boolean {
            return true;
        }
    }
}