import EquipTipsCom from "../../component/equiptips/EquipTipsCom";
import { MVC } from "../../framework/MVC";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";
import { PropertyDefine, PropertyVO } from "./Property";
import { ListenID } from "../../ListenID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PropertyDetail extends MVC.BaseView {

    @property(cc.Node)
    propertyItem: cc.Node = null;

    @property(cc.Label)
    battleNum: cc.Label = null;

    changeListener() { }

    onLoad() {
    }

    public onOpen(param) {
        super.onOpen(param);
        this.setInfo(param);

    }

    public onClose() {
        super.onClose();
    }

    public setInfo(args) {
        this.battleNum.string = `${GameVoManager.getInstance.getBattle()}`;
        let property = Notifier.call(CallID.Equip_GetBodyEquipPro, 0);
        let tecproperty = Notifier.call(CallID.Techonlogy_GetAllProperty) as PropertyVO;
        let newpro = tecproperty.clone();
        newpro.addPropertySelf(property);
        for (let key in PropertyDefine.equipKeyToIndex) {
            let node = cc.instantiate(this.propertyItem);
            node.active = true;
            node.getChildByName("propertyName").getComponent(cc.Label).string = `${PropertyDefine.equipIndexToName[PropertyDefine.equipKeyToIndex[key]] || '未知'}:`;
            node.getChildByName("propertyNum").getComponent(cc.Label).string = `${newpro[key] || 0}${PropertyDefine.equipKeyIsRatio[key] ? "%" : ""}`;
            node.parent = this.propertyItem.parent;
        }
    }

    public goGetEquip() {
        this.onClose();
        Notifier.send(ListenID.Box_OpenBoxView);
        Notifier.send(ListenID.Equip_CloseEquipView);
    }

    public goUpgradeLevel() {
        // this.onClose();
        Notifier.send(ListenID.Equip_OpenIntensifyView);
        // Notifier.send(ListenID.Equip_CloseEquipView);
    }
}
