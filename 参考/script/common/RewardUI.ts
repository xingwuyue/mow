import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import ItemCell from "../component/itemscroll/ItemCell";
import { Util } from "../utils/Util";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardUI extends MVC.BaseView {

    @property(cc.Label)
    lb_name: cc.Label = null;

    @property(cc.Node)
    itemParent: cc.Node = null;

    @property(cc.Prefab)
    goodsItemPrefab: cc.Prefab = null;

    protected changeListener(enable: boolean): void {

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        if (this._args.goodsId <= 2) {
            Notifier.send(ListenID.Game_UpdateCurrencyEffect, this._args.goodsId, this._args.goodsNum);
        }
    }

    /**
     * 
     */
    private _args;
    public onOpen(args): void {
        this._args = args;
        super.onOpen(args);
        this.setInfo(args);
    }

    public setInfo(args) {
        if (args) {
            let equipid = args.goodsId;
            let equipdata = Cfg.Equip.get(equipid);
            let node = cc.instantiate(this.goodsItemPrefab);
            node.parent = this.itemParent;

            let name = equipdata.name;
            let level = equipdata.level;
            if (equipid == 1 || equipid == 2) {
                name = name + Util.goldFormat(args.goodsNum);
                level = 0;
            }
            node.getComponent(ItemCell).initItem({ index: -1, itemID: equipid, quality: equipdata.quality, step: level });
            this.lb_name.string = name;
        }
    }
}
