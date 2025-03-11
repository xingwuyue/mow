import { GameState } from "./GameState";

/**简易版 无复合状态 */
export class GameStateMachine {
    public _state_map = {};
    public cur_state_id: number = -1111111;
    public previous_state_id: number = -1;

    public update(elapse_time) {
        if (this._state_map[this.cur_state_id]) {
            this._state_map[this.cur_state_id].excute(elapse_time);
        }
    }
    public changeState(state_id: number, ignore_state_lock: boolean = false) {
        let state = this._state_map[state_id];
        if (state) {
            if (this.isInState(state_id)) {
                if (state.isStateReEnter()) {
                    state.exit();
                    state.enter();
                    return true;
                } else {
                    return false;
                }
            }
            let curstate = this._state_map[this.cur_state_id];
            if (curstate) {
                curstate.exit();
            }
            state.enter();
            this.previous_state_id = this.cur_state_id;
            this.cur_state_id = state_id;

        }
    }

    /**
     * 判断当前状态是否在state_id的状态中
     * @param state_id 状态id
     */
    public isInState(state_id: number): boolean {
        return this.cur_state_id == state_id
    }

    public createState(state_id, statename?: string): GameState {
        let gameState = new GameState();
        this._state_map[state_id] = gameState;
        return gameState
    }

    /**改变状态回到前一个状态 */
    public revertToPreviousState() {
        this.changeState(this.previous_state_id);
    }
}
