import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import ItemCell from "../component/itemscroll/ItemCell";
import { Util } from "../utils/Util";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { EquipTipsData, EquipTipsType } from "./Common_Define";
import { GameVoManager } from "../manager/GameVoManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardTaskUI extends MVC.BaseView {

    @property(cc.Node)
    itemParent: cc.Node = null;

    @property(cc.Node)
    goodsItemPrefab: cc.Node = null;

    protected changeListener(enable: boolean): void {

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
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

    start() {
        // this.itemParent.x = 58;
    }

    public setInfo(argslist) {
        let i = 0;
        let len = argslist.length;
        let col = Math.ceil(len / 4);
        let row = 4;

        this.itemParent.height = col * 88 + (col - 1) * 14;
        this.scheduleOnce(() => {
            if (len < 4) {
                this.itemParent.x = (row - len) * 44 + (len - 1) * 8;
            } else {
                this.itemParent.x = 0;
            }
        }, 0.1);

        this.schedule(() => {
            let args = argslist[i];
            if (args) {
                let equipid = args.goodsId;
                let equipdata = Cfg.Equip.get(equipid);
                let node = cc.instantiate(this.goodsItemPrefab);
                node.active = true;
                let goodsNum = 1;
                let level = equipdata.level;
                if (equipid == 1 || equipid == 2 || equipid == 3) {
                    goodsNum = args.goodsNum;
                    level = 0;
                }
                let roleEquipID = GameVoManager.getInstance.getEquipID(equipdata.part - 1);
                node.getComponent(ItemCell).initItem({
                    index: -1, itemID: equipid, quality: equipdata.quality, step: level, goodsNum: goodsNum,
                    clickHandler: () => {
                        let equipTipsData: EquipTipsData = {
                            type: EquipTipsType.Normal,
                            itemLeftID: equipid,
                            comparePosNode: node,
                            compareID: roleEquipID,
                        }
                        Notifier.send(ListenID.Equip_OpenTipsView, equipTipsData);
                    },
                });
                node.parent = this.itemParent;
            }
            i++;
        }, 0, argslist.length - 1, 0);
    }
}
