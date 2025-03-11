import RankModel, { RankItemVo } from "../RankModel";
import { Util } from "../../../utils/Util";
import { GameVoManager } from "../../../manager/GameVoManager";
import { AlertManager } from "../../../alert/AlertManager";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import FightModel from "../../fight/FightModel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {

    @property(cc.Sprite)
    bgSp: cc.Sprite = null;

    @property(cc.Sprite)
    rankIcon: cc.Sprite = null;

    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Label)
    scoreText: cc.Label = null;

    @property(cc.Label)
    rankText: cc.Label = null;


    private _data: RankItemVo;
    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.resizeBtnPos, this);
    }

    private _itemId: number = 0;

    updateItem(index: number, realindex: number, stageMap: cc.SpriteAtlas) {
        this._itemId = realindex;
        this.updateData(realindex, stageMap);
    }

    public get itemID(): number {
        return this._itemId;
    }

    updateData(rank: number, stageMap: cc.SpriteAtlas, page: number = 2) {
        if (rank > 2) {
            this.rankText.string = `${rank + 1}`;
            this.rankText.node.active = true;
            this.rankIcon.node.active = false;
            this.bgSp.spriteFrame = stageMap.getSpriteFrame("img_board4");
        } else {
            this.rankIcon.node.active = true;
            this.rankText.node.active = false;
            this.rankIcon.spriteFrame = stageMap.getSpriteFrame('img_medal' + (rank + 1));
            this.bgSp.spriteFrame = stageMap.getSpriteFrame("img_board" + (rank + 1));
        }
        let rankdata = RankModel.getInstance.rankBattleList[rank];
        if (page == 2) {
            rankdata = RankModel.getInstance.rankStageList[rank];
        } else if (page == 3) {
            rankdata = RankModel.getInstance.rankBossList[rank];
        }
        this._data = rankdata;
        if (rankdata) {
            if (rankdata.data) {
                let userinfo = JSON.parse(rankdata.data)
                let playName = userinfo.nickName;
                this.nickName.string = playName;
            } else {
                this.nickName.string = '匿名' + rank;
            }
            this.setStageInfo(rankdata, stageMap, page);
        } else {
            this.nickName.string = "虚位以待";
            this.scoreText.string = `--`;
            // if (page == 2) {
            //     this.scoreText.string = `--`;
            // } else if (page == 3) {
            //     this.scoreText.string = `--`;
            // }
        }
    }

    updateMyData(rank: number = -1, stageMap: cc.SpriteAtlas, page: number = 2): void {

        let rankdata = RankModel.getInstance.rankBattleList[rank - 1];
        if (page == 2) {
            rankdata = RankModel.getInstance.rankStageList[rank - 1];
        } else if (page == 3) {
            rankdata = RankModel.getInstance.rankBossList[rank - 1];
        }
        this.nickName.string = GameVoManager.getInstance.myUserVo.nickName;
        this.scoreText.string = `${RankModel.getInstance.myBattleScore}`;
        if (page == 2) {
            let chaptes = Util.levelToChapterId(RankModel.getInstance.myStageScore);
            this.scoreText.string = `第${chaptes[0]}章${chaptes[1]}波`;
        } else if (page == 3) {
            this.scoreText.string = `${RankModel.getInstance.myBossScore}层`;
        }
        if (rankdata) {
            if (rank > 2) {
                this.rankText.node.active = true;
                this.rankIcon.node.active = false;
                if (rank > 10000) {
                    this.rankText.string = '10000+';
                } else {
                    this.rankText.string = `${rank}`;
                }
                this.bgSp.spriteFrame = stageMap.getSpriteFrame("img_board4");
            } else {
                this.rankIcon.node.active = true;
                this.rankText.node.active = false;
                this.rankIcon.spriteFrame = stageMap.getSpriteFrame('img_medal' + (rank));
                this.bgSp.spriteFrame = stageMap.getSpriteFrame("img_board" + (rank));
            }
        } else {
            this.rankText.node.active = true;
            this.rankIcon.node.active = false;
            this.rankText.string = "--";
            // this.bgSp.spriteFrame = stageMap.getSpriteFrame("img_board4");
        }
    }


    setStageInfo(rankdata: RankItemVo, stageMap: cc.SpriteAtlas, page: number = 2) {
        let score = rankdata.score;
        this.scoreText.string = `${score}`;
        if (page == 2) {
            let chaptes = Util.levelToChapterId(score);
            let stepNum = FightModel.getInstance.curStep;
            // this.scoreText.string = `第${chaptes[0]}章${chaptes[1]}关`;
            this.scoreText.string = `第${chaptes[0]}章${chaptes[1]}波`;
        } else if (page == 3) {
            this.scoreText.string = `${score}层`;
        }
    }

    registerTouch() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchstart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchend, this);
    }

    public touchstart() {

    }

    public touchend() {
        if (this._data && this._data.data) {
            try {
                let userinfo = JSON.parse(this._data.data);
                if(userinfo && userinfo.equipPart){
                    Notifier.send(ListenID.Log_Event, { event_name: "rankPage_details" });
                    Notifier.send(ListenID.Person_OpenOtherInfoView, userinfo);
                }else{
                    AlertManager.showNormalTips("数据暂未更新，无法查看详情");
                }
            } catch (error) {
                
            }
        }
    }
}
