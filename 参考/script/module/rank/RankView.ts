import { MVC } from "../../framework/MVC";
import { Manager } from "../../manager/Manager";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { ShareCode, ShareScene } from "../../common/Common_Define";
import { WXSDK } from "../../sdk/WXSDK";
import { NotifyID } from "../../framework/NotifyID";
import { CallID } from "../../CallID";
import RankItem from "./item/RankItem";
import RankModel from "./RankModel";
import NetAdapter from "../../adpapter/NetAdapter";
import { Const } from "../../config/Const";

const { ccclass, property } = cc._decorator;
declare let wx;

@ccclass
export default class RankView extends MVC.BaseView {

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.SpriteAtlas)
    rankMaps: cc.SpriteAtlas = null;

    @property(cc.Node)
    myRankItem: cc.Node = null;

    @property(cc.Label)
    pageinfo: cc.Label = null;

    @property(cc.Node)
    rankLayout: cc.Node = null;

    @property(cc.Node)
    maskNode: cc.Node = null;

    public pageItemNum: number = 7;
    private items: cc.Node[] = [];

    private isneedRefresh: boolean = true;
    private isneedRefresh_1: boolean = true;
    private isneedRefresh_2: boolean = true;
    public curRankType: number = -1;//1战力排行榜 2关卡榜 3boss榜

    _curPage = 1;
    kMaxPage1 = 1;
    kMaxPage2 = 1;
    kMaxPage3 = 1;

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.resizeBtnPos, this);
    }

    /*
     * 打开界面回调，每次打开只调用一
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.RankView;
        this.fixUI();
        this.setInfo(args);
    }

    public setInfo(args) {
        this.initRankByType(1);
        this.onSelect(null, 1);
    }


    public fixUI() {
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.bg.width = size.width;
        this.bg.height = size.height;
        let close = this.node.getChildByName("btn_close");
        close.y = -size.height * 0.5;
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Log_Event, { event_name: "rankPage_leave" });
        super.onClose();
    }

    public onBack() {
        this.onClose();
        Notifier.send(ListenID.Menu_OpenMainView);
    }

    public initRankByType(type: number) {
        if (this.items.length <= 0) {
            for (let i = 0; i < this.pageItemNum; i++) {
                let item = cc.instantiate(this.myRankItem);
                this.items.push(item);
                item.getComponent(RankItem).registerTouch();
                item.parent = this.rankLayout;
            }
        }
        // if (type == 1) {
        //     this.initMyBattleRank();
        // } else if (type == 2) {
        //     this.initMyStageRank();
        // } else if (type == 3) {
        //     this.initMyBossRank();
        // }
    }

    // public initMyBattleRank() {
    //     this.myRankItem.getComponent(RankItem).updateMyData(RankModel.getInstance.myBattleRank, this.rankMaps, 1);
    // }

    // public initMyStageRank() {
    //     this.myRankItem.getComponent(RankItem).updateMyData(RankModel.getInstance.myStageRank, this.rankMaps, 2);
    // }

    // public initMyBossRank() {
    //     this.myRankItem.getComponent(RankItem).updateMyData(RankModel.getInstance.myBossRank, this.rankMaps, 3);
    // }

    onSelect(event, customdata) {
        // if(this.curRankType == custom)
        if (event) {
            Manager.audio.playAudio(501);
            if (customdata == 2) {
                Notifier.send(ListenID.Log_Event, { event_name: "rankPage_level" });
            } else if (customdata == 3) {
                Notifier.send(ListenID.Log_Event, { event_name: "rankPage_BOSS" });
            }
        }
        console.log("onSelect", customdata);
        if (customdata == 1) {
            this._curPage = 1;
            this.curRankType = 1;
            if (this.isneedRefresh) {
                this.maskNode.active = true;
                NetAdapter.getRankData({ type: 'newbattle', cycle: 'forever', page: 1, page_size: 100 }).then(res => {
                    RankModel.getInstance.setBattleRankList(res.data.page, res.data.ranking, res.data.self_rank, res.data.self_score);
                    this.isneedRefresh = false;
                    this.kMaxPage1 = Math.ceil(RankModel.getInstance.rankBattleList.length / this.pageItemNum);
                    if (this.kMaxPage1 <= 0) this.kMaxPage1 = 1;
                    this.maskNode.active = false;
                    this.updateBattleView();
                }).catch(err => {
                    this.maskNode.active = false;
                });
            } else {
                this.kMaxPage1 = Math.ceil(RankModel.getInstance.rankBattleList.length / this.pageItemNum);
                if (this.kMaxPage1 <= 0) this.kMaxPage1 = 1;
                this.updateBattleView();
            }
        } else if (customdata == 2) {
            this._curPage = 1;
            this.curRankType = 2;
            if (this.isneedRefresh_1) {
                this.maskNode.active = true;
                NetAdapter.getRankData({ type: 'newlevel', cycle: 'forever', page: 1, page_size: 100 }).then(res => {
                    RankModel.getInstance.setStageRankList(res.data.page, res.data.ranking, res.data.self_rank, res.data.self_score);
                    this.isneedRefresh_1 = false;
                    this.kMaxPage2 = Math.ceil(RankModel.getInstance.rankStageList.length / this.pageItemNum);
                    if (this.kMaxPage2 <= 0) this.kMaxPage2 = 1;
                    this.maskNode.active = false;
                    this.updateStageView();
                }).catch(err => {
                    this.maskNode.active = false;
                });
            } else {
                this.kMaxPage2 = Math.ceil(RankModel.getInstance.rankStageList.length / this.pageItemNum);
                if (this.kMaxPage2 <= 0) this.kMaxPage2 = 1;
                this.updateStageView();
            }
        } else if (customdata == 3) {
            this._curPage = 1;
            this.curRankType = 3;
            if (this.isneedRefresh_2) {
                this.maskNode.active = true;
                NetAdapter.getRankData({ type: 'bosslevel', cycle: 'forever', page: 1, page_size: 100 }).then(res => {
                    RankModel.getInstance.setBossRankList(res.data.page, res.data.ranking, res.data.self_rank, res.data.self_score);
                    this.isneedRefresh_2 = false;
                    this.kMaxPage3 = Math.ceil(RankModel.getInstance.rankBossList.length / this.pageItemNum);
                    if (this.kMaxPage3 <= 0) this.kMaxPage3 = 1;
                    this.maskNode.active = false;
                    this.updateBossView();
                }).catch(err => {
                    this.maskNode.active = false;
                })
            } else {
                this.kMaxPage3 = Math.ceil(RankModel.getInstance.rankBossList.length / this.pageItemNum);
                if (this.kMaxPage3 <= 0) this.kMaxPage3 = 1;
                this.updateBossView();
            }
        }
    }

    OnClickPrev() {
        Manager.audio.playAudio(501);
        this.updateRankByType(this.curRankType, -1);
    }

    OnClickNext() {
        Manager.audio.playAudio(501);
        this.updateRankByType(this.curRankType, 1);
    }

    public updateRankByType(type: number, v: number) {
        if (type == 1) {
            this._curPage += v;
            this._curPage = Math.floor(cc.misc.clampf(this._curPage, 1, this.kMaxPage1));
            this.updateBattleView();
        } else if (type == 2) {
            this._curPage += v;
            this._curPage = Math.floor(cc.misc.clampf(this._curPage, 1, this.kMaxPage2));
            this.updateStageView();
        } else if (type == 3) {
            this._curPage += v;
            this._curPage = Math.floor(cc.misc.clampf(this._curPage, 1, this.kMaxPage3));
            this.updateBossView();
        }
    }

    public updateBattleView() {
        let startlen = (this._curPage - 1) * this.pageItemNum;
        let endlen = startlen + this.pageItemNum;
        this.pageinfo.string = `${this._curPage}/${this.kMaxPage1}`;
        this.myRankItem.getComponent(RankItem).updateMyData(RankModel.getInstance.myBattleRank, this.rankMaps, this.curRankType);
        for (let i = startlen, j = 0; i < endlen; i++, j++) {
            this.items[j].active = i < 100;
            this.items[j].getComponent(RankItem).updateData(i, this.rankMaps, this.curRankType);
        }
    }

    public updateStageView() {
        let startlen = (this._curPage - 1) * this.pageItemNum;
        let endlen = startlen + this.pageItemNum;
        this.pageinfo.string = `${this._curPage}/${this.kMaxPage2}`;
        this.myRankItem.getComponent(RankItem).updateMyData(RankModel.getInstance.myStageRank, this.rankMaps, this.curRankType);
        for (let i = startlen, j = 0; i < endlen; i++, j++) {
            this.items[j].active = i < 100;
            this.items[j].getComponent(RankItem).updateData(i, this.rankMaps, this.curRankType);
        }
    }

    public updateBossView() {
        let startlen = (this._curPage - 1) * this.pageItemNum;
        let endlen = startlen + this.pageItemNum;
        this.pageinfo.string = `${this._curPage}/${this.kMaxPage3}`;
        this.myRankItem.getComponent(RankItem).updateMyData(RankModel.getInstance.myBossRank, this.rankMaps, this.curRankType);
        for (let i = startlen, j = 0; i < endlen; i++, j++) {
            this.items[j].active = i < 100;
            this.items[j].getComponent(RankItem).updateData(i, this.rankMaps, this.curRankType);
        }
    }
}
