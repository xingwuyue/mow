import { Const } from "../config/Const";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { MovingEntity } from "./MovingEntity";
import { RoleManager } from "../manager/RoleManager";

export class GameWorld {
    private m_Clientx: number;
    private m_Clienty: number;
    private m_Paused: boolean = false;
    private m_BottomLeft: cc.Vec2;
    private m_TopRight: cc.Vec2;
    private isPause: number = 0;
    private static _instance: GameWorld;
    public constructor(topRight: cc.Vec2, bottomLeft: cc.Vec2) {
        this.m_BottomLeft = bottomLeft;
        this.m_TopRight = topRight;
        this.m_Clientx = topRight.x - bottomLeft.x;
        this.m_Clienty = topRight.y - bottomLeft.y;
        this.m_Paused = false;
        this.isPause = 0;
        this.changeListener(true);
    }

    public changeListener(enable: boolean) {
        Notifier.changeListener(enable, ListenID.Fight_Pause, this.gamePause, this);
    }

    public gamePause(boo: boolean) {
        if (boo) {
            this.isPause++;
        } else {
            this.isPause--;
        }
        if (this.isPause < 0) {
            this.isPause = 0;
        }
        this.m_Paused = this.isPause > 0;
    }

    public isGamePause() {
        return this.m_Paused;
    }

    public static get Instance() {
        if (!GameWorld._instance) {
            GameWorld._instance = new GameWorld(Const.MonsterBronRangeMin, Const.MonsterBronRangeMax);
        }
        return GameWorld._instance;
    }

    public get BottomLeft() {
        return this.m_BottomLeft;
    }

    public get TopRight() {
        return this.m_TopRight;
    }

    public setWorldRange(topRight: cc.Vec2, bottomLeft: cc.Vec2) {
        this.m_BottomLeft = bottomLeft;
        this.m_TopRight = topRight;
        this.m_Clientx = topRight.x - bottomLeft.x;
        this.m_Clienty = topRight.y - bottomLeft.y;
    }

    public TagVechiclesWithInViewRange(monster: MovingEntity, dis) {
        RoleManager.getInstance.tagNeighbors(monster, dis);
    }

    public getAgentList() {
        return RoleManager.getInstance._monsterList;
    }
}