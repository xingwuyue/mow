import { WeaponCfg } from "../../../config/WeaponCfg";
import { DropCfg } from "../../../config/DropCfg";
import { Cfg } from "../../../config/Cfg";
import { GameVoManager } from "../../../manager/GameVoManager";
import { AlertManager } from "../../../alert/AlertManager";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { ShareCode, Common_UIPath } from "../../../common/Common_Define";
import { Manager } from "../../../manager/Manager";
import { Const } from "../../../config/Const";
import { UIManager } from "../../../framework/UIManager";
import { MVC } from "../../../framework/MVC";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DetialPanel extends cc.Component {

    @property([cc.Node])
    getWays: cc.Node[] = [];

    @property(cc.Node)
    bg: cc.Node = null;

    @property([cc.Node])
    weaponInfoMasks: cc.Node[] = [];

    @property(cc.Label)
    toolDesc: cc.Label = null;

    @property(cc.Label)
    goodsName: cc.Label = null;

    @property(cc.Sprite)
    itemSprite: cc.Sprite = null;

    @property(cc.Node)
    btnUp: cc.Node = null;

    @property(cc.Node)
    starList: cc.Node = null;

    private showType: number = 0;
    private id: number = 0;
    private _data: WeaponCfg | DropCfg;
    private _index: number = 0;

    start() {

    }

    /**
     * 
     * @param type 0 武器 1道具
     * @param id 
     */
    showInfo(type: number, id: number, index: number) {
        this.showType = type;
        this.id = id;
        this._index = index;
        if (type == 0) {
            this._data = Cfg.Weapon.get(id);
            this.weaponInfoMasks[0].parent.active = true;
            this.starList.active = false;
            if (this._data) {
                Manager.spAtlas.getWeaponIcon(this._data.id).then((res) => {
                    this.itemSprite.spriteFrame = res;
                    let ratio = this.itemSprite.node.height / this.itemSprite.node.width;
                    this.itemSprite.node.width = cc.misc.clampf(this.itemSprite.node.width, 50, 150);
                    this.itemSprite.node.height = this.itemSprite.node.width * ratio;
                })
                this.goodsName.string = this._data.name;
                let weaponinfo = GameVoManager.getInstance.myUserVo.weaponList[id];
                let childlen = this.starList.childrenCount;
                if (!weaponinfo) {
                    for (let i = 0; i < childlen; i++) {
                        this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
                    }
                } else {
                    for (let i = 0; i < childlen; i++) {
                        if (i < weaponinfo[2])
                            this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL);
                        else
                            this.starList.children[i].getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
                    }
                }
                if (GameVoManager.getInstance.myUserVo.weaponList[this._data.id]) {
                    this.showTheWay(-1);
                    this.showWeaponDesc(id);
                    let speed = GameVoManager.getInstance.myUserVo.weaponList[id][0] + 1;
                    let bullet = GameVoManager.getInstance.myUserVo.weaponList[id][0] + 1;
                    if (speed >= Const.maxShootSpeedLv) {
                        speed = Const.maxShootSpeedLv;
                    }
                    if (bullet >= Const.fireHotLv) {
                        bullet = Const.fireHotLv;
                    }
                    this.weaponInfoMasks[0].getComponent(cc.Label).string = `${speed}`;
                    this.weaponInfoMasks[1].getComponent(cc.Label).string = `${bullet}`;
                } else {
                    this.showWeaponDesc(id);
                    this.weaponInfoMasks[0].getComponent(cc.Label).string = "1";
                    this.weaponInfoMasks[1].getComponent(cc.Label).string = "1";
                    this.showTheWay(this._data.unlockWay[0] - 1, this._data.unlockWay[1]);
                }
            }
        } else if (type == 1) {
            this._data = Cfg.Drop.get(id);
            this.toolDesc.node.parent.active = true;
            this.weaponInfoMasks[0].parent.active = false;
            this.starList.active = false;
            if (this._data) {
                if (this._data.toolType == 2) {
                    Manager.spAtlas.getWeaponIcon(this._data.weaponId).then((res) => {
                        this.itemSprite.spriteFrame = res;
                        let ratio = this.itemSprite.node.height / this.itemSprite.node.width;
                        this.itemSprite.node.width = cc.misc.clampf(this.itemSprite.node.width, 50, 150);
                        this.itemSprite.node.height = this.itemSprite.node.width * ratio;
                    })
                } else {
                    Manager.spAtlas.getToolIcon(this._data.id).then((res) => {
                        this.itemSprite.spriteFrame = res;
                        let ratio = this.itemSprite.node.height / this.itemSprite.node.width;
                        this.itemSprite.node.width = cc.misc.clampf(this.itemSprite.node.width, 50, 150);
                        this.itemSprite.node.height = this.itemSprite.node.width * ratio;
                    })
                }
                this.toolDesc.node.position = cc.v2(0, 0);
                this.toolDesc.string = this._data.desc;
                this.goodsName.string = this._data.name
                if (GameVoManager.getInstance.myUserVo.dropList[this._data.id]) {
                    this.showTheWay(-1);
                } else {
                    this.showTheWay(this._data.unlockWay[0] - 1, this._data.unlockWay[1]);
                }
            }
        }
    }

    onClose() {
        this.node.active = false;
    }


    private cost: number = 0;
    /**
     * 
     * @param way -1 全部不显示 
     */
    public showTheWay(way: number, num: number = 0) {
        for (let i = 0; i < this.getWays.length; i++) {
            this.getWays[i].active = way == i;
        }
        if ((way >= 0 && this.getWays[way]) || way == 6) {
            let numLabel = this.getWays[way != 6 ? way : 4].getChildByName("num").getComponent(cc.Label);
            numLabel.string = `${num}`;
            this.cost = num;
        }
        let boo = true;
        if (way == 3 && !GameVoManager.getInstance.gameSwitchVo.shop) {
            this.getWays[3].active = false;
            boo = false;
        }
        if (this.btnUp)
            this.btnUp.active = false;
        this.getWays[4].active = way == 6 ? true : false;
        this.bg.height = way != -1 && boo ? 600 : 500;
    }

    public showWeaponDesc(id: number) {
        if (!this.toolDesc) return;
        let drop = Cfg.Drop.get(Cfg.Weapon.get(id).dropId);
        // this.toolDesc.node.position = cc.v2(0, -110);
        this.toolDesc.node.parent.active = true;
        this.toolDesc.string = drop.desc;
        if (this.btnUp)
            this.btnUp.active = true;
        this.bg.height = 600;
    }

    public onClickUpgrade() {
        this.onClose();
        GameVoManager.getInstance.myUserVo.defaultGunId = this._data.id;
        Notifier.send(ListenID.Shop_Close);
    }

    public onClickDiamondbBuy() {
        if (GameVoManager.getInstance.myUserVo.diamond >= this.cost) {
            this.unlockSuccess(1);
        } else {
            UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, 2);
        }
    }

    // type = 1 钻石解锁
    public unlockSuccess(type?: number) {
        if (this.showType == 0) {
            GameVoManager.getInstance.myUserVo.weaponList[this.id] = [0, 0];
            let data = Cfg.Weapon.get(this.id);
            GameVoManager.getInstance.myUserVo.dropList[data.dropId] = 1;
            // GameVoManager.getInstance.myUserVo.defaultGunId = this.id;
        } else if (this.showType == 1) {
            GameVoManager.getInstance.myUserVo.dropList[this.id] = 1;
        }
        if (type == 1) {
            GameVoManager.getInstance.setDiamond(-this.cost);
        } else {
            GameVoManager.getInstance.setGold(-this.cost);
        }
        AlertManager.showNormalTips("解锁成功！");
        Notifier.send(ListenID.Shop_UnLock, [this._index], [this.id]);
        Manager.audio.playAudio(509);
        this.onClose();
    }

    public onBuy() {
        if (GameVoManager.getInstance.myUserVo.gold >= this.cost) {
            this.unlockSuccess();
        } else {
            AlertManager.showNormalTips("金币不足");
        }
    }

    public onShare() {
        this.unlockSuccess();
    }

    public onVideo() {

    }
    // update (dt) {}
}
