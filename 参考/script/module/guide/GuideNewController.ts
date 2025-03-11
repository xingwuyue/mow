import { MVC } from "../../framework/MVC";
import GuideNewModel from "./GuideNewModel";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { GameVoManager } from "../../manager/GameVoManager";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, GameEventID, Guide, GameFunID } from "../../common/Common_Define";
import { Cfg } from "../../config/Cfg";

/**
 * 新手引导，最多53个guideId
 */
export default class GuideNewController extends MVC.BaseController {
    private static _instance: GuideNewController = null;
    static getInstance() {
        if (!this._instance) {
            this._instance = new GuideNewController();
        }
        return this._instance;
    }
    static get instance() {
        return this.getInstance();
    }
    _openView: boolean = false;
    private _guideIsEnd = true;
    private _data: GuideNewModel = new GuideNewModel();
    constructor() {
        super("GuideNewController");
        this.changeListener(true);
        GuideNewController._instance = this;
    }

    changeListener(enable: boolean) {
        Notifier.changeListener(enable, ListenID.On_Open_Menu, this.onOpenMenu, this);
        Notifier.changeListener(enable, ListenID.On_Open_SmeltView, this.onOpenSmeltView, this);
        Notifier.changeListener(enable, ListenID.Rank_showRank, this.onShowRank, this);
        Notifier.changeListener(enable, ListenID.On_Open_Upgrade, this.onOpenUpgrade, this);
        Notifier.changeListener(enable, ListenID.Guide_RigisterNodeTag, this._rigisterNodeTag, this);
        // Notifier.changeListener(enable, ListenID.On_Close_Menu, this.closeGuideView, this);
        Notifier.changeListener(enable, ListenID.Close_Guide, this.closeGuideView, this);
        Notifier.changeListener(enable, ListenID.Guide_Check_Condition, this.onCheckCondition, this);
        // Notifier.changeListener(enable, 445322, this.checkCondition, this);
        // Notifier.changeListener(enable, ListenID.UI_Close, this.updateFunc, this);        
    }

    getData() {
        return this._data;
    }

    checkCondition(conditionType: Guide.GuideCondictionCheckType, condition: { [key: string]: Guide.GuideCondictionCheckType }) {
        let data = {
            type: 1,
            conditionType: conditionType,
            condition: condition,
            showEff: true
        }
        let info = this._data.getGuideInfoByConditionType(data);
        let guideId = 0;

        if (info) {
            guideId = info.guideId;
            this.isCheckCondition = true;
        }
        this._checkGuide(guideId);
    }

    private _checkGuide(guideId?: number, froce: boolean = false) {
        let curGuideID = this._data.getCurGuideID();
        if (guideId || guideId === 0) {
            if (curGuideID <= 0 || froce) {
                if (curGuideID != guideId) {
                    this._data.setLastGuideID(this._data.getCurGuideID());
                    this._data.setCurGuideID(guideId);
                }
            }
        } else {
            this._checkGuide(curGuideID);
            return;
        }
        // if(data.type == 1){
        let info = this._data.getGuideInfoByGuideId(guideId);
        cc.log("info - ", info, guideId);
        if (info) {
            let isFinish = this._data.getGuideIsFinish(Cfg.Guide.get(guideId).guideType);
            if (!isFinish || true) {
                let nodeInfo = this._data.getNodeInfoByTag(info.nodeTag);
                let checkOpenFunc = nodeInfo ? nodeInfo.checkOpenFunc : null;
                let funIsOpen = checkOpenFunc ? checkOpenFunc() : true;
                if (funIsOpen) {
                    let guideId = info.guideId;
                    let type = info.type;                    //类型，1：瞬间触发。2：其他触发
                    let eventId = info.eventId;               //事件ID
                    let condition: {} = info.condition;          //条件数组
                    let tag = info.nodeTag;                //按钮编号
                    let shape = info.shape;                   //1:矩形，2：圆形
                    let rectSize = info.rectSize;//矩形大小
                    let lightSize = info.lightSize;//矩形光大小
                    let arrowPos = info.arrowPos;               //箭头方向
                    let tips = info.tipsContent;         //文本提示
                    let tipsPos = info.tipsPos;         //文本提示
                    let nextId = info.nextId;                //下一个指引ID
                    let clickAnyClose = info.clickAnyClose;        //0：必须点击按钮才能进行下一步 1：点击任意区域进行下一步
                    let arrowDir = info.arrowDir;
                    let guideType = info.guideType;
                    let waitTime = 1;
                    cc.log("guideId = ",guideId, info);
                    this._data.setGuideId(guideId);
                    this._data.setTriggerType(type);
                    this._data.setEventId(eventId);
                    this._data.setCondition(condition);
                    this._data.setCurNodeTag(tag);
                    this._data.setShape(shape);
                    this._data.setRectSize(rectSize);
                    this._data.setLightSize(lightSize);
                    this._data.setArrowPos(arrowPos);
                    this._data.setTips(tips);
                    this._data.setNextId(nextId);
                    this._data.settipsPos(tipsPos);
                    this._data.setClickAnyClose(!!clickAnyClose);
                    this._data.setShowEff(false);
                    this._data.setArrowDir(arrowDir);
                    this._data.setGuideType(guideType);
                    this._data.setWaitTime(waitTime);
                    this.openGuideView(nodeInfo && nodeInfo.tagLayer || MVC.eUILayer.Tips);
                    // this.closeGuideView();
                    return;
                }
            }
        }
        // if (!this._data.getCurGuideID() || this._data.getCurGuideID() <= 0){
        if (!this._guideIsEnd) return;
        this.closeGuideView();
        // }
        // }
    }

    private _rigisterNodeTag(data: Guide.GuideItemData) {
        // if (GameVoManager.getInstance.myUserVo.topLevel >= 30) return;
        this._data.addTagInfo(data);
        // this._checkGuide();
    }

    public _nextId: number;
    public onNextGuide() {
        let info = this._data.getCurGuideInfo();
        let nextId = 0;
        if (info) {
            if (info.nextId != 0){
                nextId = info.nextId ? info.nextId : nextId;
            }else{
                let guideInstID = this._data.getGuideModule();
                this._data.setGuideIsFinish(guideInstID, true);
                this._data.setGuideId(0);
            }
        }
        this._nextId = nextId;
        this._guideIsEnd = !nextId;
        this._checkGuide(nextId, true);
    }

    public openGuideView(eUILayer: number) {
        UIManager.Open(Common_UIPath.GuideNewView, MVC.eTransition.Default, MVC.eUILayer.Tips, null, false);
    }

    public closeGuideView() {
        let guideId = this._data.getLastGuideID();
        if (guideId > 0) {
            this._data.setCurGuideID(-1);
            this._data.setLastGuideID(-1);
        }
        UIManager.Close(Common_UIPath.GuideNewView);
    }

    private isCheckCondition: boolean = false;
    public onOpenMenu() {
        let userData = GameVoManager.getInstance.myUserVo;
        let conditionType = Guide.GuideCondictionCheckType.Stronger_Equip;
        this.isCheckCondition = false;
        let level = userData.topLevel;
        if (level >= 30) return;
        for (let i = 0; i < userData.equipPart.length; ++i) {
            if (!this.isCheckCondition) {
                this.checkCondition(conditionType, { [conditionType]: i + 1 });
            } else {
                break;
            }
        }
        if (!this.isCheckCondition) {
            conditionType = Guide.GuideCondictionCheckType.Level;
            this.checkCondition(conditionType, { [conditionType]: userData.topLevel });
        }
        if (!this.isCheckCondition) {
            conditionType = Guide.GuideCondictionCheckType.Unlock_Upgrade;
            this.checkCondition(conditionType, { [conditionType]: 0 });
        }
        if (!this.isCheckCondition) {
            conditionType = Guide.GuideCondictionCheckType.Unlock_Smelt;
            this.checkCondition(conditionType, { [conditionType]: 0 });
        }
    }

    public onOpenSmeltView() {
        let curGuideID = this._data.getCurGuideID();
        if (curGuideID < 16 || curGuideID > 18) {
            // this.closeGuideView();
        }
    }

    onOpenUpgrade() {
        let curGuideID = this._data.getCurGuideID();
        if (curGuideID < 13 || curGuideID > 15) {
            // this.closeGuideView();
        }
    }

    public onShowRank() {
        this.closeGuideView();
    }


    public setGuideIsFinish(GuideInstanceID: Guide.GuideModuleNum, isFinish: boolean) {
        this._data.setGuideIsFinish(GuideInstanceID, isFinish);
    }

    public onCheckCondition(){
        let info = this._data.checkGuide();
        if (info && info.guideId)
            this._checkGuide(info.guideId, true);
    }

    // public checkLastGuide(){
    //     if(!this._isClose){
    //         let guideId = this._data.getLastGuideID();
    //         if (guideId > 0)
    //             this._checkGuide(0, true);
    //     }
    // }
}
