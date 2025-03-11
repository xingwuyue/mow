import { Const } from "../config/Const";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";

export declare interface BombVo {
    hurt: number,   //伤害值
    radius: number,//伤害半径
    insId?: number,
    toolType?: number,
    showDamage?:number,
}

export class Bomb {
    private _node: cc.Node;
    private _insId: number = 0;
    private _hurt: number = 0;   //伤害值
    private _radius: number = 0;//伤害范围半径
    private _isDead: boolean = false; //是否已死亡
    private _pauseCount: number = 0;
    private anim: cc.Animation = null;
    public toolType: number = 0;
    private animName: string = "";
    public showDamage:number = 0;
    public init(insId: number, node: cc.Node, bombvo: BombVo) {
        this._insId = insId;
        this._node = node;
        this._hurt = bombvo.hurt;
        this._radius = bombvo.radius;
        this._node.group = Const.GroupBomb;
        this._isDead = false;
        this._node.colliderComponent = this;
        this.toolType = bombvo.toolType;
        this.showDamage = bombvo.showDamage || this._hurt;
        this._pauseCount = 0;
        this.anim = this._node.getComponent(cc.Animation);
        this.animName = `toolEffect${this.toolType}`;
        this.changeListener(true);
    }

    public get node(): cc.Node {
        return this._node;
    }

    public get hurt(): number {
        return this._hurt;
    }

    public startAttack() {
        this.anim.setCurrentTime(0, this.animName);
        this.anim.on('finished', this.finish, this);
        this.anim.play(this.animName);
        if (this.anim.getAnimationState(`toolEffect${this.toolType}_1`)) {
            this.anim.playAdditive(`toolEffect${this.toolType}_1`);
        }
    }

    public changeListener(enable) {
        Notifier.changeListener(enable, ListenID.Fight_Pause, this.pauseGame, this);
    }

    public pauseGame(boo) {
        if (this._isDead) return;
        if (boo) {
            this._pauseCount++;
        } else {
            this._pauseCount--;
        }
        // console.log("pauseGame", this._pauseCount, this.toolType)
        let state = this.anim.getAnimationState(this.animName);
        if (this._pauseCount <= 0 && state) {
            if (state.isPaused) {
                state.resume();
            }
        } else if (this._pauseCount > 0 && state) {
            if (state.isPlaying) {
                state.pause();
            }
        }
    }

    private finish() {
        try {
            this.anim.off('finished', this.finish, this);
        } catch (error) {
            console.error(error)
        }
        this.changeListener(false);
        this._isDead = true;
        if (this.toolType == 5005)
            this._node.destroy();
        else {
            Notifier.send(ListenID.Fight_RecycleBomb, this._insId, this.toolType)
        }
    }
}
