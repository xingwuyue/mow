import { MVC } from "../../framework/MVC";
import ScrollViewCom from "../../component/itemscroll/ScrollViewCom";
import { GameVoManager } from "../../manager/GameVoManager";
import TechnologyModel from "./TechnologyModel";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { PropertyDefine } from "../equip/Property";
import TechAttrCom from "../../component/technology/TechAttrCom";
import { Const } from "../../config/Const";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, Guide } from "../../common/Common_Define";
import { Manager } from "../../manager/Manager";

/** 
 * 科技系统
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class TechnologyView extends MVC.BaseView {
    @property(ScrollViewCom)
    scrollView: ScrollViewCom = null;

    @property(cc.Prefab)
    techAttrComPrefab: cc.Prefab = null;

    @property(cc.Label)
    lblTechnologyPoint: cc.Label = null;

    @property(cc.Node)
    techAttrLayout: cc.Node = null;

    @property(cc.Node)
    helpView: cc.Node = null;

    private _techAttrComList: TechAttrCom[] = [];
    private _techPoint: number = 0;

    private _model: TechnologyModel = TechnologyModel.getInstance();
    private _gameVo: GameVoManager = GameVoManager.getInstance;

    changeListener(bool: boolean){
        Notifier.changeListener(bool, ListenID.TechnologyPoint_Change, this.onTechPointChange, this);
        Notifier.changeListener(bool, ListenID.TechnologyLevel_Change, this.onTechLevelChange, this);
    }

    onOpen(params){
        this.changeListener(true);
        this.setInfo(params);
    }

    openCallBack(){
        if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.MainView) {
            if (UIManager.getNodeByName(Common_UIPath.MenuUI)) {
                Notifier.send(ListenID.Menu_CloseMainView);
            }
        }
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.TechnologyView;
        this.registerGuideCheck();
    }

    setInfo(params){
        let cfgData = this._model.vo.data;
        if (cfgData){
            this.scrollView.setItemInfo(this._model.vo.data);
            this.onFlush();
        }
        Notifier.send(ListenID.Log_Event, { event_name: `remouldPage_access`, counter: 1 });
    }

    registerGuideCheck(){
        /** 离开按钮 */
        let backData: Guide.GuideItemData = {
            node: cc.find(`btnBack`, this.node),
            tag: 11801,
            callBack: () => {
                // this.onBtn1Click();
                this.onBtnBack();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, backData);
    }

    /** 帮助 */
    onBtnHelp(){
        Manager.audio.playAudio(501);
        this.helpView.active = true;
    }

    onBtnBack(){
        this.onClose();
        Notifier.send(ListenID.Menu_OpenMainView);
    }

    onClose(){
        Manager.audio.playAudio(501);
        super.onClose();
        Notifier.send(ListenID.Log_Event, { event_name: `remouldPage_leave`, counter: 1 });
    }

    onCloseHelpView(){
        Manager.audio.playAudio(501);
        this.helpView.active = false;
    }

    onTechPointChange(){
        this.onFlush(`techPoint`);
    }

    onTechLevelChange(){
        this.onFlush(`property`);
    }

    onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {
                this._updateLblTechPoint();
                this._updateAllProperty();
                break;
            }
            case `techPoint`: {
                this._updateLblTechPoint();
                break;
            }
            case `property`: {
                this._updateAllProperty();
                break;
            }
        }
    }

    private _updateLblTechPoint() {
        this._techPoint = this._gameVo.myUserVo.techP;
        this.lblTechnologyPoint.string = this._techPoint + ``;
    }


    private _updateAllProperty() {
        let prop = this._model.getAllProperty();
        for(let i in PropertyDefine.equipIndexToKey){
            let name = PropertyDefine.equipIndexToKey[i];
            let value = prop[name];
            let attrCom = this._techAttrComList[i];
            if (!attrCom) {
                attrCom = cc.instantiate(this.techAttrComPrefab).getComponent(TechAttrCom);
                attrCom.node.parent = this.techAttrLayout;
                this._techAttrComList[i] = attrCom;
            }
            if (value > 0){
                (attrCom as TechAttrCom).setData({
                    text1: PropertyDefine.equipIndexToName[i],
                    text2: `+` + value,
                    showArrow: false
                });
            }
            attrCom.node.active = value > 0;
        }
    }
}
