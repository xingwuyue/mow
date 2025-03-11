import { MVC } from "../../framework/MVC";
import { Cfg } from "../../config/Cfg";
import ItemCell from "../../component/itemscroll/ItemCell";
import { Manager } from "../../manager/Manager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { EquipTipsData, EquipTipsType } from "../../common/Common_Define";
import { GameVoManager } from "../../manager/GameVoManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DropPreview extends MVC.BaseView {

    @property(cc.Prefab)
    goodsItemPrefab: cc.Prefab = null;

    @property(cc.Node)
    unlockItemNode: cc.Node = null;

    @property(cc.Node)
    highItemNode: cc.Node = null;

    public changeListener(enable) {

    }
    // public unlockPreview: any[] = [];
    // public dropPreview: any[] = [];
    public onOpen(args) {
        super.onOpen(args);
        this.setInfo(args);
    }

    public setInfo(args) {
        if (args) {
            let data = Cfg.DropPreview.get(args);
            if (!data) {
                console.error("can't find then droppreview id = ", args);
                return;
            }
            let len = data.unlockPreview.length;
            //分帧加载
            let i = 0;
            this.schedule(() => {
                let equipid = data.unlockPreview[i];
                let equipdata = Cfg.Equip.get(equipid);
                if (equipdata) {
                    let roleEquipID = GameVoManager.getInstance.getEquipID(equipdata.part - 1);

                    let node = cc.instantiate(this.goodsItemPrefab);
                    node.getComponent(ItemCell).initItem({
                        index: -1,
                        itemID: equipid,
                        step: equipdata.level,
                        quality: equipdata.quality,
                        clickHandler: () => {
                            let equipTipsData: EquipTipsData = {
                                type: EquipTipsType.Normal,
                                itemLeftID: equipid,
                                comparePosNode: node,
                                compareID: roleEquipID,
                                isHideAttach: true,
                            }
                            Notifier.send(ListenID.Equip_OpenTipsView, equipTipsData);
                        },
                    });
                    this.unlockItemNode.addChild(node);
                }
                i++;

            }, 0, len - 1, 0)
            len = data.dropPreview.length / 2;
            let j = 0;
            this.schedule(() => {
                let equipid = data.dropPreview[j * 2];
                let equipdata = Cfg.Equip.get(equipid);
                if (equipdata) {
                    let roleEquipID = GameVoManager.getInstance.getEquipID(equipdata.part - 1);

                    let node = cc.instantiate(this.goodsItemPrefab);
                    node.getComponent(ItemCell).initItem({
                        index: -1, itemID: equipid,
                        step: equipdata.level,
                        quality: equipdata.quality,
                        isStrongly: !!data.dropPreview[j * 2 + 1],
                        clickHandler: () => {
                            let equipTipsData: EquipTipsData = {
                                type: EquipTipsType.Normal,
                                itemLeftID: equipid,
                                comparePosNode: node,
                                compareID: roleEquipID,
                                isHideAttach: true,
                            }
                            Notifier.send(ListenID.Equip_OpenTipsView, equipTipsData);
                        },
                    });
                    this.highItemNode.addChild(node);
                }
                j++;
            }, 0, len - 1, 0);
        }
    }

    public onClose() {
        Manager.audio.playAudio(501);
        super.onClose();
    }
}
