import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import EquipTipsView from "./EquipTipsView";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, EquipTipsData } from "../../common/Common_Define";
import { GameVoManager } from "../../manager/GameVoManager";
import { Const } from "../../config/Const";


export default class EquipTipsController extends MVC.BaseController {
    private static _instance: EquipTipsController = null;
    public static get getInstance(): EquipTipsController {
        if (EquipTipsController._instance == null) {
            EquipTipsController._instance = new EquipTipsController();
        }
        return EquipTipsController._instance;
    }

    public constructor() {
        super("EquipTipsController");
        this.changeListener(true);
        // this._model = EquipModel.getInstance;
        // if (EquipController._instance == null) {
        //     EquipController._instance = this;
        // }
    }

    changeListener(enable: boolean){
        Notifier.changeListener(enable, ListenID.Equip_OpenTipsView, this.onOpenTipsView, this);
        Notifier.changeListener(enable, ListenID.Equip_CloseTipsView, this.onCloseTipsView, this);
    }

    onOpenTipsView(data: EquipTipsData){
        if (!data) return;
        if(!data.itemLeftID && !data.itemRightID) return;
        // if (GameVoManager.getInstance.stateVo.viewIndex != Const.ViewMap.EquipView) return;
        UIManager.Open(Common_UIPath.EquipTipsView, MVC.eTransition.Default, MVC.eUILayer.Popup, data);
    }

    onCloseTipsView(){
        UIManager.Close(Common_UIPath.EquipTipsView);
    }

    // getView(): EquipTipsView {
    //     let node = UIManager.getNodeByName(Common_UIPath.EquipTipsView);
    //     if (node && cc.isValid(node)) {
    //         return node.getComponent(EquipTipsView);
    //     }
    //     return null;
    // }
}
