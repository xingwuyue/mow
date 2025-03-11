import { BaseGameEntity } from "../component/BaseGameEntity";
import { State } from "./State";

declare interface StateMap<T extends BaseGameEntity> {
    [key: number]: State<T>;
}

export class StateMachine<entityType extends BaseGameEntity>{
    private m_Owner: entityType;
    private m_GlobalState: State<entityType>;
    public _state_map: StateMap<entityType> = {};
    private _curStateId: number = -1111111;
    private _PreviousStateId: number = -1;
    public constructor(owner: entityType) {
        this.m_Owner = owner;
        this.m_GlobalState = null;
        this._curStateId = -1;
        this._PreviousStateId = -1;
    }

    public Update(dt) {
        // this.m_CurrentState && this.m_CurrentState.Execute(this.m_Owner);
        if (this._state_map[this._curStateId]) {
            this._state_map[this._curStateId].Execute(this.m_Owner, dt);
        }

        this.m_GlobalState && this.m_GlobalState.Execute(this.m_Owner, dt);
    }

    public HandleMessage(msg: any): boolean {
        if (this._curStateId && this._state_map[this._curStateId] && this._state_map[this._curStateId].OnMessage(this.m_Owner, msg)) {
            return true;
        }

        if (this.m_GlobalState && this.m_GlobalState.OnMessage(this.m_Owner, msg)) {
            return true;
        }
        return false;
    }

    public ChangeState(state_Id: number) {
        if (state_Id < 0) {
            console.error('<StateMachine::ChangeState>:trying to assign null state to current');
            return;
        }
        this._PreviousStateId = this._curStateId;
        if (this._state_map[this._curStateId]) {
            this._state_map[this._curStateId].Exit(this.m_Owner);
        }
        this._curStateId = state_Id;
        if (this._state_map[this._curStateId]) {
            this._state_map[this._curStateId].Enter(this.m_Owner);
        }
    }

    public RevertToPreviousState() {
        this.ChangeState(this._PreviousStateId);
    }

    public isInState(st: number): boolean {
        return st === this._curStateId;
    }

    public registerState(stateId: number, st: State<entityType>) {
        if (this._state_map[stateId]) { console.warn("<StateMachine.registerState repeated register ") };
        this._state_map[stateId] = st;
    }

    public registerGlobalState(st: State<entityType>) {
        this.m_GlobalState = st;
    }
}
