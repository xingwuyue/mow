
export class GameState {
    private _enterFuncId: Function = null;
    private _excuteFuncId: Function = null;
    private _exitFuncId: Function = null;
    public can_re_enter: boolean = false;

    public constructor() {

    }

    public enter() {
        if (this._enterFuncId) {
            this._enterFuncId();
        }
    }

    public excute(elapse_time) {
        if (this._excuteFuncId) {
            this._excuteFuncId(elapse_time);
        }
    }

    public exit() {
        if (this._exitFuncId) {
            this._exitFuncId();
        }
    }

    public setCallbackAsMultiFuctions(enterFuncId, excuteFuncId, exitFuncId) {
        this._enterFuncId = enterFuncId;
        this._excuteFuncId = excuteFuncId;
        this._exitFuncId = exitFuncId;
    }

    public isStateReEnter() {
        return this.can_re_enter;
    }
}
