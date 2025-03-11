import { MVC } from "../../framework/MVC";
import MapItem from "./MapItem";
import { Util } from "../../utils/Util";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";
import { Const } from "../../config/Const";
import { Cfg } from "../../config/Cfg";
import EcologicalItem from "./EcologicalItem";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, Guide } from "../../common/Common_Define";
import { Manager } from "../../manager/Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EcologicalView extends MVC.BaseView {

    @property(cc.Prefab)
    mapItem: cc.Prefab = null;
    @property(cc.Prefab)
    ecologicalItem: cc.Prefab = null;

    items: cc.Node[] = [];
    itemHeight = 211;           //item高
    spacing = 12;                //间距
    updateInterval = 0.1;       //刷新时间
    lastContentPosY = 0;        //上次刷新y位置
    maxLen = 12;                 //真实长度
    useNum = 6;                //使用到的item数量
    bufferZone: number = 600;
    isInit = false;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(true, ListenID.Life_On_Hide, this.refreshEcollogicalItem, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.MainView) {
            if (UIManager.getNodeByName(Common_UIPath.MenuUI)) {
                Notifier.send(ListenID.Menu_CloseMainView);
            }
        }
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.EcologicalView;
        this.maxLen = Object.keys(Cfg.Ecological.getAll()).length;
        this.initNode();
        this.initAddLabel();
        this.initMapItemScroll();
        this.initEcologicalItemScroll();
        this.fixUI();
    }

    public openCallBack(){
        this.rigisterGuideCheck();
    }

    private ecologicalTips: cc.Node = null;
    private btnclose: cc.Node = null;
    private title: cc.Node = null;
    private btn_help: cc.Node = null;
    private listNode: cc.Node = null;
    private lbcuradd: cc.Label = null;
    private mapItemScrollView: cc.ScrollView = null;
    private ecologicalItemScrollView: cc.ScrollView = null;
    private initNode() {
        this.title = this.node.getChildByName("title");
        this.btn_help = this.node.getChildByName("btn_help");
        this.ecologicalTips = this.node.getChildByName("ecologicalTips");
        this.btnclose = this.node.getChildByName("btnBack");
        this.listNode = this.node.getChildByName("listNode");
        this.lbcuradd = this.listNode.getChildByName("lbcuradd").getComponent(cc.Label);
        this.mapItemScrollView = this.listNode.getChildByName("scrollView").getComponent(cc.ScrollView);
        this.ecologicalItemScrollView = this.node.getChildByName("scrollView").getComponent(cc.ScrollView);
    }

    private initAddLabel() {
        let chapter = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let chapterId = (chapter[1] == chapter[2]) ? chapter[0] : chapter[0] - 1;
        let percent = 0;
        for (let i = 1; i < chapterId + 1; i++) {
            percent += Cfg.Chapter.get(i).ecologicAlawardAdd;
        }
        this.lbcuradd.string = `已收取资源加成+${percent}%`;
    }

    private initMapItemScroll() {
        for (let i = 0; i < 6; i++) {
            let mapNode = cc.instantiate(this.mapItem);
            mapNode.parent = this.mapItemScrollView.content;
            mapNode.getComponent(MapItem).initUI(i);
        }
    }

    private initEcologicalItemScroll() {
        this.ecologicalItemScrollView.content.height = this.maxLen * (this.itemHeight + this.spacing) + this.spacing;
        for (let i = 0; i < this.useNum; i++) {
            let item = cc.instantiate(this.ecologicalItem);
            item.parent = this.ecologicalItemScrollView.content;
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            let data = !GameVoManager.getInstance.myUserVo.ecologicalStudyList[i] ? null : GameVoManager.getInstance.myUserVo.ecologicalStudyList[i];
            item.getComponent(EcologicalItem).initUI(i, data);
            this.items.push(item);
            this.isInit = true;
        }
    }

    private refreshEcollogicalItem() {
        this.items.forEach(item => {
            let index = item.getComponent(EcologicalItem).index;
            let data = !GameVoManager.getInstance.myUserVo.ecologicalStudyList[index] ? null : GameVoManager.getInstance.myUserVo.ecologicalStudyList[index];
            item.getComponent(EcologicalItem).refreshTempTime(data);
        })
    }

    public fixUI() {
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.btnclose.y = -size.height * 0.5;
        console.log("fixUI", size.height, size.width, Const.designHeight)
        if (size.height > 1450) {
            this.ecologicalItemScrollView.node.height += 140;
            this.ecologicalItemScrollView.node.getChildByName("view").height += 140;
        } else {
            let offset = Number(((1450 - 1280) / 2).toFixed(0));
            this.title.y -= offset;
            this.btn_help.y -= offset;
            this.listNode.y -= offset;
            this.ecologicalItemScrollView.node.y -= offset;
            this.ecologicalItemScrollView.node.getChildByName("view").height -= offset;
        }
    }

    public rigisterGuideCheck(){
        let item = this.items[0];
        let Item = item.getComponent(EcologicalItem);
        /** 研究指引 */
        let btnYellow = Item.btnYellow;
        let guideData: Guide.GuideItemData = {
            node: btnYellow,
            tag: 11101,
            tagLayer: this.uiLayer,
            callBack: () => {
                Item.onBtnYellow();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);

        /** 领取指引 */
        let btnGreen = Item.btnGreen;
        let guideData1: Guide.GuideItemData = {
            node: btnGreen,
            tag: 11301,
            tagLayer: this.uiLayer,
            callBack: () => {
                Item.onBtnGreen();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, guideData1);

        /** 离开指引 */
        let btnBack = cc.find(`btnBack`, this.node);
        let guideData2: Guide.GuideItemData = {
            node: btnBack,
            tag: 11401,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onBtnClose();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, guideData2);
    }

    getPositionInView(item: cc.Node) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.ecologicalItemScrollView.node.parent.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    update(dt) {
        this.updateInterval -= dt;
        if (this.isInit && this.updateInterval <= 0) {
            this.adjustScrollData();
            this.updateInterval = 0.1;
        }
    }
    /**
     * 调整滚动物品位置
     */
    adjustScrollData() {
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.ecologicalItemScrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemHeight + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i];
                    let index = item.getComponent(EcologicalItem).index - items.length;
                    let data = !GameVoManager.getInstance.myUserVo.ecologicalStudyList[index] ? null : GameVoManager.getInstance.myUserVo.ecologicalStudyList[index];
                    item.getComponent(EcologicalItem).initUI(index, data);
                }
            } else {
                if (viewPos.y > buffer && items[i].y - offset > -this.ecologicalItemScrollView.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i];
                    let index = item.getComponent(EcologicalItem).index + items.length;
                    let data = !GameVoManager.getInstance.myUserVo.ecologicalStudyList[index] ? null : GameVoManager.getInstance.myUserVo.ecologicalStudyList[index];
                    item.getComponent(EcologicalItem).initUI(index, data);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.ecologicalItemScrollView.content.y;
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Close_EcologicalView);
    }

    public onBtnClose() {
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Close_EcologicalView);
        Notifier.send(ListenID.Menu_OpenMainView);
        Notifier.send(ListenID.Log_Event, { event_name: "ecological_leave" });
    }

    public btnHelpClick() {
        Manager.audio.playAudio(501);
        this.ecologicalTips.active = true;
    }

    public btnCloseTips() {
        Manager.audio.playAudio(501);
        this.ecologicalTips.active = false;
    }

}
