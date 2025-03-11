import { MVC } from "../../framework/MVC";
import { BossRankItemVo } from "./BossRankItem";

export default class BossModel extends MVC.BaseModel {

    private static _instance: BossModel = null;
    public rankList: BossRankItemVo[] = [];
    public myRank: number = -1;
    public myScore: number = 0;
    public constructor() {
        super();
        if (BossModel._instance == null) {
            BossModel._instance = this;
        }
    }
    public reset(): void {

    }

    public setRankList(page: number, data: any, myrank: number = -1, myScore: number = 0): void {
        if (data && data.length >= 0) {
            let len = data.length;
            for (let i = 0; i < len; i++) {
                let customdata = JSON.parse(data[i].data);
                this.rankList[i * page] = { open_id:data[i].open_id, avatarUrl: customdata ? customdata.avatarUrl : "", score: data[i].score, nickName: customdata ? customdata.nickName : "" };
            }
        }
        // [{open_id:111,data:"",score:1}, ]
        this.myScore = myScore;
        this.myRank = myrank;
    }


    public static get getInstance(): BossModel {
        if (BossModel._instance == null) {
            BossModel._instance = new BossModel();
        }
        return BossModel._instance;
    }
}