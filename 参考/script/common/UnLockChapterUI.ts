import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import ItemCell from "../component/itemscroll/ItemCell";
import { Util } from "../utils/Util";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { GameVoManager } from "../manager/GameVoManager";
import { EquipController } from "../module/equip/EquipController";
import FunUnlockTipsController from "../module/tips/FunUnlockTips/FunUnlockTipsController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UnLockRewardUI extends MVC.BaseView {

    @property(cc.Sprite)
    itemParent: cc.Sprite = null;

    @property([cc.SpriteFrame])
    itemSprites: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    partIcons: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    partIcon: cc.Sprite = null;

    @property(cc.Prefab)
    goodsItemPrefab: cc.Prefab = null;

    @property(cc.Node)
    equipLayouer: cc.Node = null;

    protected changeListener(enable: boolean): void {

    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        setTimeout(() => {
            Notifier.send(ListenID.Game_OpenUIList);
            FunUnlockTipsController.getInstance().isUnlocking = false;
        }, 200);
    }

    /**
     * 
     */
    public onOpen(args): void {
        super.onOpen(args);
        this.setInfo(args);
    }

    public setInfo(args) {
        if (args) {
            this.itemParent.spriteFrame = this.itemSprites[args - 2];
            this.partIcon.spriteFrame = this.partIcons[args - 2];
            let data = Cfg.DropPreview.get(args);
            if (data) {
                let len = data.dropPreview.length / 2;
                let j = 0;
                this.schedule(() => {
                    let equipid = data.dropPreview[j * 2];
                    let equipdata = Cfg.Equip.get(equipid);
                    if (equipdata) {
                        let node = cc.instantiate(this.goodsItemPrefab);
                        node.getComponent(ItemCell).initItem({ index: -1, itemID: equipid, step: equipdata.level, quality: equipdata.quality, isStrongly: !!data.dropPreview[j * 2 + 1] });
                        this.equipLayouer.addChild(node);
                    }
                    j++;
                }, 0, len - 1, 0);
            }
        }
    }
}
