import { GameVoManager } from "../../../manager/GameVoManager";
import { ShareCode, ShareScene, Common_UIPath } from "../../../common/Common_Define";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { UIManager } from "../../../framework/UIManager";
import { MVC } from "../../../framework/MVC";
import { Manager } from "../../../manager/Manager";
import InviteItem from "./InviteItem";
import { Cfg } from "../../../config/Cfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class invitePanel extends MVC.BaseView {

    @property(cc.Prefab)
    inviteItem: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    scrollView: cc.Node = null;

    _inviteCount: number;
    _inviteList: any;

    items: cc.Node[] = [];
    itemHeight = 117;           //item高
    spacing = 5;                //间距
    updateTimer = 0;
    updateInterval = 0.2;       //刷新时间
    lastContentPosY = 0;        //上次刷新y位置
    maxLen = 0;                 //真实长度
    useNum = 10;                //使用到的item数量

    _startUpdata: boolean = false;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Invite_Close, this.onClose, this);
    }

    /*
     * 打开界面回调，每次打开只调用一
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this.maxLen = 0;
        this.showInviteReward();
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        super.onClose();
        // HD_MODULE.getPlatform().setLoadingVisible(false);
    }

    addItem() {


    }

    onInvite() {

    }

    showInviteReward() {
        this.addItem();
        // HD_MODULE.getPlatform().setLoadingVisible(false);
        this._startUpdata = true;
    }


    getPositionInView(item: cc.Node) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.content.parent.parent.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }


    update(dt) {
        if (!this._startUpdata) return

    }
}
