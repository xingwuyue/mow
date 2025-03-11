import { MVC } from "../../framework/MVC";
import { GameVoManager } from "../../manager/GameVoManager";

export interface RankItemVo {
    score: number,
    data: any,
    open_id: string,
}

export default class RankModel extends MVC.BaseModel {

    private static _instance: RankModel = null;
    private _rankBattleList: RankItemVo[] = [

    ];
    private _rankStageList: RankItemVo[] = [

    ];
    private _rankBossList: RankItemVo[] = [

    ];
    private _myBattleRank: number = 2;
    private _myBattleScore: number = 100;
    private _myStageRank: number = 3;
    private _myStageScore: number = 2;
    private _myBossRank: number = 10001;
    private _myBossScore: number = 1;

    public constructor() {
        super();
        if (RankModel._instance == null) {
            RankModel._instance = this;
        }
    }
    public reset(): void {

    }

    public static get getInstance(): RankModel {
        if (RankModel._instance == null) {
            RankModel._instance = new RankModel();
        }
        return RankModel._instance;
    }

    public setBattleRankList(page: number, data: RankItemVo[], myrank: number = -1, myscore: number = 0): void {
        if (data && data.length >= 0) {
            let len = data.length;
            for (let i = 0; i < len; i++) {
                this._rankBattleList[i * page] = data[i];
            }
        }
        this._myBattleRank = myrank;
        this._myBattleScore = myscore;
    }

    public get rankBattleList() {
        return this._rankBattleList;
    }

    public get myBattleScore() {
        return this._myBattleScore;
    }

    public get myBattleRank() {
        return this._myBattleRank;
    }

    public setStageRankList(page: number, data: RankItemVo[], myrank: number = -1, myscore: number = 0): void {
        if (data && data.length >= 0) {
            let len = data.length;
            for (let i = 0; i < len; i++) {
                this._rankStageList[i * page] = data[i];
            }
        }
        this._myStageRank = myrank;
        this._myStageScore = myscore;
    }

    public get rankStageList() {
        return this._rankStageList;
    }

    public get myStageScore() {
        return this._myStageScore;
    }

    public get myStageRank() {
        return this._myStageRank;
    }

    public setBossRankList(page: number, data: RankItemVo[], myrank: number = -1, myscore: number = 0): void {
        if (data && data.length >= 0) {
            let len = data.length;
            for (let i = 0; i < len; i++) {
                this._rankBossList[i * page] = data[i];
            }
        }
        this._myBossRank = myrank;
        this._myBossScore = myscore;
    }

    public get rankBossList() {
        return this._rankBossList;
    }

    public get myBossScore() {
        return this._myBossScore;
    }

    public get myBossRank() {
        return this._myBossRank;
    }
}