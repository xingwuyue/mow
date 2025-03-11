import { GameVoManager } from "../../../manager/GameVoManager";
import { Manager } from "../../../manager/Manager";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { WeaponCfg } from "../../../config/WeaponCfg";
import { Cfg } from "../../../config/Cfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GroupItem_IOS extends cc.Component {

    @property(cc.Sprite)
    itemSprite: cc.Sprite = null;

    @property(cc.Label)
    lb_name: cc.Label = null;

    @property(cc.Node)
    lockMask: cc.Node = null;

    @property(cc.Node)
    newIcon: cc.Node = null;

    @property(cc.Node)
    fullLevelNode: cc.Node = null;

    @property(cc.Node)
    shownode: cc.Node = null;

    @property(cc.Node)
    bgmore: cc.Node = null;

    @property(cc.Node)
    bglist: cc.Node[] = [];

    _weaponObj: WeaponCfg;

    private itemAnim: cc.Animation = null;

    start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchend, this);
    }

    public touchend() {
        Notifier.send(ListenID.Group_UpdateSelected, this._idx, this._index);
    }

    public _idx: number | string = 0;
    public _index: number = 0;
    public memberState: number = 0;
    public initInfo(id: number | string, index: number, weaponObj: WeaponCfg) {
        if (!Manager.storage.getBool(String(GameVoManager.getInstance.myUserVo.defaultGunId))) {
            Manager.storage.setBool(String(GameVoManager.getInstance.myUserVo.defaultGunId), true);
        }

        this._weaponObj = weaponObj;
        this._idx = id;
        this._index = index;
        this.updateSelected();
        // if (GameVoManager.getInstance.myUserVo.weaponList[id] && !Manager.storage.getBool(String(id)) && this.memberState < 2) {
        //     this.newIcon.active = true;
        // } else {
        //     this.newIcon.active = false;
        // }

        // this.lockMask.active = !GameVoManager.getInstance.myUserVo.weaponList[id] || this.memberState == 2;
        // if (GameVoManager.getInstance.myUserVo.defaultGunId == id) {
        //     this.bglist[2].active = true;
        //     this.bglist[1].active = false;
        //     this.bglist[0].active = false;
        // } else {
        //     if (weaponObj.unlockWay[0] == 7) {
        //         this.bglist[1].active = true;
        //         this.bglist[2].active = false;
        //         this.bglist[0].active = false;
        //     } else {
        //         this.bglist[0].active = true;
        //         this.bglist[1].active = false;
        //         this.bglist[2].active = false;
        //     }
        // }
        // this.fullLevelNode.active = GameVoManager.getInstance.myUserVo.fullWeapon == id;

        this.lb_name.string = weaponObj.name;
        Manager.spAtlas.getWeaponIcon(this._idx).then((res) => {
            this.itemSprite.spriteFrame = res;
            let ratio = this.itemSprite.node.height / this.itemSprite.node.width;
            this.itemSprite.node.width = cc.misc.clampf(this.itemSprite.node.width, 50, 130);
            this.itemSprite.node.height = this.itemSprite.node.width * ratio;
            if (this.itemSprite.node.height > 62) {
                this.itemSprite.node.height = 62;
                this.itemSprite.node.width = this.itemSprite.node.height / ratio;
            }
        });
    }

    public updateSelected() {
        this.memberState = 0;//不是会员枪
        let weaponData = Cfg.Weapon.get(this._idx);
        if (weaponData && weaponData.unlockWay[0] == 8) {
            this.memberState = GameVoManager.getInstance.getIsMember() ? 1 : 2;
        }
        if (GameVoManager.getInstance.myUserVo.weaponList[this._idx] && !Manager.storage.getBool(String(this._idx)) && this.memberState < 2) {
            this.newIcon.active = true;
        } else {
            this.newIcon.active = false;
        }
        this.lockMask.active = !GameVoManager.getInstance.myUserVo.weaponList[this._idx] || this.memberState == 2;
        let type = 0;
        if (GameVoManager.getInstance.myUserVo.defaultGunId == this._idx) {
            type = 2;
        } else {
            let way = this._weaponObj.unlockWay[0]
            if (way == 7 || way == 8 || way == 11) {
                type = 1;
            }
        }
        this.bglist[0].active = type == 0;
        this.bglist[1].active = type == 1;
        this.bglist[2].active = type == 2;
        this.fullLevelNode.active = GameVoManager.getInstance.myUserVo.fullWeapon == this._idx;
        // this.fullLevelNode.active = true;
    }

    updateUnLock(id) {
        this.updateSelected();
        if (this._idx == id) {
            // let itemAnim = this.shownode.getChildByName("iconeffect").getComponent(cc.Animation);
            // if (itemAnim) {
            //     itemAnim.node.active = true;
            //     itemAnim.play();
            //     itemAnim.on("finished", () => {
            //         itemAnim.node.active = false;
            //         itemAnim.off("finished");
            //     })
            // }
        }
    }

    showNode(vis) {
        this.shownode.active = vis;
        this.bgmore.active = vis;
    }

    // update (dt) {}
}
