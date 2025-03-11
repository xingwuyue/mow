import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import ItemCell from "../component/itemscroll/ItemCell";
import { Util } from "../utils/Util";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { GameVoManager } from "../manager/GameVoManager";
import { EquipController } from "../module/equip/EquipController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UnLockRewardUI extends MVC.BaseView {

    @property(cc.Label)
    lb_name: cc.Label = null;

    @property(cc.Node)
    itemParent: cc.Node = null;

    @property(cc.Prefab)
    goodsItemPrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    partIcons: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    partIcon: cc.Sprite = null;

    protected changeListener(enable: boolean): void {

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        if (this.instanceid)
            EquipController.getInstance.holdsEquip({ itemID: this.itemId, itemInstanceID: this.instanceid });
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

    private instanceid: number = 0;
    private itemId: number = 0;
    public setInfo(args) {
        if (args) {
            let partIndex = args;
            let unlockdata = Cfg.EquipUnlock.get(partIndex);
            this.partIcon.spriteFrame = this.partIcons[partIndex - 1];
            // this.
            if (unlockdata.unlockAward.length > 0) {
                let equipid = unlockdata.unlockAward[0];
                this.itemId = equipid;
                let equipdata = Cfg.Equip.get(equipid);
                let node = cc.instantiate(this.goodsItemPrefab);
                node.parent = this.itemParent;
                let name = equipdata.name;
                if (equipid == 1 || equipid == 2) {
                    name = name + Util.goldFormat(args.goodsNum);
                }
                node.getComponent(ItemCell).initItem({ index: -1, itemID: equipid });
                this.lb_name.string = name;
                this.instanceid = GameVoManager.getInstance.addEquip(equipid);
                GameVoManager.getInstance.saveData();
            } else {
                this.onClose();
            }
        }
    }
}
