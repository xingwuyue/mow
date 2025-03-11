import { MVC } from "../../framework/MVC";
import { Cfg } from "../../config/Cfg";
import ShopItem from "./item/ShopItem";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { WeaponCfg } from "../../config/WeaponCfg";
import { Manager } from "../../manager/Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopView_IOS extends MVC.BaseView {

    @property(cc.Prefab)
    shopItemPrefab: cc.Prefab = null;

    @property(cc.Node)
    otherWeaponContent: cc.Node = null;

    @property(cc.Node)
    otherWeaponPanel: cc.Node = null;

    private otherWeaponList: cc.Node[] = [];
    private toolList: cc.Node[] = [];
    // private curPanel: number = 0;//默认武器
    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Shop_SelectItem, this.updateSelect, this);
        Notifier.changeListener(enable, ListenID.Shop_Close, this.shopClose, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        if (!Manager.storage.getNumber("newWeapon")) {
            Manager.storage.setNumber("newWeapon", 1);
        }
        let needscroll = false;
        if (args && args == 3) {
            needscroll = true;
            args = 1;
        }
        this.otherWeaponPanel.active = args == 1;
        // this.curPanel = args;
        if (args == 1) {
            this.initShopOtherWeapon();
        }
        if (needscroll) {
            cc.find("otherWeaponPanel/scrollVew", this.node).getComponent(cc.ScrollView).scrollToBottom();
        }
    }


    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501);
        super.onClose();
        Notifier.send(ListenID.Log_Event, { event_name: "gunPage_leave" });
        Notifier.send(ListenID.HideBanner);
    }

    public shopClose(args: number = 0) {
        Notifier.send(ListenID.Log_Event, { event_name: "gunPage_leave" });
        super.onClose();
    }

    public onClickTab(toggle: cc.Toggle, customData: any) {
        Manager.audio.playAudio(501);
        this.otherWeaponPanel.active = toggle.node.name == "toggle1";
        if (toggle.node.name == "toggle1") {
            // this.curPanel = 1;
            this.initShopOtherWeapon();
        }
    }

    public initShopOtherWeapon() {
        let data = Cfg.Handbook.filter({});
        this.otherWeaponList = [];
        let i = 0;
        this.schedule(() => {
            let node = cc.instantiate(this.shopItemPrefab);
            node.getComponent(ShopItem).init(i, 1, data[i]);
            node.setParent(this.otherWeaponContent);
            this.otherWeaponList.push(node);
            i++;
        }, 0, data.length - 1);
    }

    public updateSelect(index, type) {
        let id: number = 0;
        if (type == 0) {

        } else if (type == 1) {
            id = this.otherWeaponList[index].getComponent(ShopItem).Id;
        } else if (type == 2) {
            id = this.toolList[index].getComponent(ShopItem).Id;
        }
    }

    public scrollEvent(sender: cc.ScrollView, event: cc.ScrollView.EventType) {
        switch (event) {
            case cc.ScrollView.EventType.SCROLL_TO_BOTTOM:
                break;
        }
    }
}
