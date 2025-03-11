import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { Manager } from "../../../manager/Manager";
import { HandbookCfg } from "../../../config/HandbookCfg";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopItem extends cc.Component {

    private _type: number = 0;//0武器  1道具item
    private _data: HandbookCfg;

    @property(cc.Label)
    itemName: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Node)
    iconBg: cc.Node = null;

    private _index: number = 0;
    start() {
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    init(index: number, type: number, weaponcfg: HandbookCfg) {
        this._index = index;
        this._type = type;
        // if (type == 0 || type == 1) {
        this._data = weaponcfg;
        this.itemName.string = this._data.name;
        Manager.spAtlas.getEquipIcon(this._data.icon).then((res) => {
            this.setPic(res);
        })
        // }
        this.updateInfo(type);
    }

    public setPic(res) {
        this.icon.spriteFrame = res;
        // let ratio = this.icon.node.height / this.icon.node.width;
        // this.icon.node.width = cc.misc.clampf(this.icon.node.width, 50, 150);
        // this.icon.node.height = this.icon.node.width * ratio;
    }

    public onClick() {
        // Notifier.send(ListenID.Shop_SelectItem, this._index, this._type);
        // Notifier.send(ListenID.Shop_ShowDetail, this._data.id);
        Manager.audio.playAudio(501);
    }

    /**
     * 
     * @param type 0 钻石 1普通武器 2道具
     */
    public updateInfo(type: number) {

    }

    public onBtnBuy() {
    }

    public get Id(): number {
        return this._data.id;
    }

    public updateState() {
        this.updateInfo(this._type);
    }
}
