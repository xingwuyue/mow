import { MVC } from "../../framework/MVC";
import GuideNewVO from "./GuideNewVO";
import { Cfg } from "../../config/Cfg";
import { GuideCfg, GuideCfgReader } from "../../config/GuideCfg";
import { GameVoManager } from "../../manager/GameVoManager";
import { Util } from "../../utils/Util";
import { Guide, GameFunID } from "../../common/Common_Define";
import EquipModel from "../equip/EquipModel";
import { PropertyVO } from "../equip/Property";
import FunUnlockTipsModel from "../tips/FunUnlockTips/FunUnlockTipsModel";
import { Const } from "../../config/Const";
import FightModel from "../fight/FightModel";

declare interface Map<T> {
    [key: string]: T;
}

export default class GuideNewModel extends MVC.BaseModel {
    private _vo: GuideNewVO = new GuideNewVO();
    private _config: Map<GuideCfg> = null;
    private _configByConfitionType: { [conditionType: number]: { [guideID: number]: GuideCfg } } = {};
    private _nodeList: { [tag: number]: { node: cc.Node, callBack: Function, checkOpenFunc: Function, tagLayer: number, } } = {};

    private _gameVO: GameVoManager = GameVoManager.getInstance;
    constructor() {
        super();
        this._config = Cfg.Guide.getAll();
        for (let i in this._config) {
            let info = this._config[i];
            let condition = info.condition;
            let type = "";
            for (let conditionType in condition) {
                if (conditionType) {
                    type = conditionType;
                    if (type) {
                        if (!this._configByConfitionType[type])
                            this._configByConfitionType[type] = {};
                        this._configByConfitionType[type][info.guideId] = info;
                    }
                }
            }
        }
    }
    reset() {

    }

    getGuideId() {
        return this._vo.guideId;
    }

    setGuideId(value: number) {
        this._vo.guideId = value;
    }

    getTriggerType() {
        return this._vo.triggerType;
    }

    setTriggerType(value: number) {
        this._vo.triggerType = value;
    }

    getEventId() {
        return this._vo.eventId;
    }

    setEventId(value: number) {
        this._vo.eventId = value;
    }

    getCurNodeTag() {
        return this._vo.nodeTag;
    }

    setCurNodeTag(value: number) {
        this._vo.nodeTag = value;
    }

    getShape() {
        return this._vo.shape;
    }

    setShape(value: number) {
        this._vo.shape = value;
    }

    getRectSize() {
        return this._vo.rectSize;
    }

    setRectSize(value: Array<number>) {
        this._vo.rectSize = value;
    }

    getLightSize() {
        return this._vo.lightSize;
    }

    setLightSize(value: Array<number>) {
        this._vo.lightSize = value;
    }

    getArrowPos() {
        return this._vo.arrowPos;
    }

    setArrowPos(value: number[]) {
        this._vo.arrowPos = value;
    }

    gettipsPos() {
        return this._vo.tipsPos;
    }

    settipsPos(value: number[]) {
        this._vo.tipsPos = value;
    }

    getPreId() {
        return this._vo.preId;
    }

    setPreId(value: number) {
        this._vo.preId = value;
    }

    getNextId() {
        return this._vo.nextId;
    }

    setNextId(value: number) {
        this._vo.nextId = value;
    }

    getTips() {
        return this._vo.tips;
    }

    setTips(value: string) {
        this._vo.tips = value;
    }

    getClickAnyClose() {
        return this._vo.clickAnyClose;
    }

    setClickAnyClose(value: boolean) {
        this._vo.clickAnyClose = value;
    }

    getCondition() {
        return this._vo.condition;
    }

    setCondition(value: { [key: string]: number }) {
        this._vo.condition = value;
    }

    getShowEff() {
        return this._vo.showEff;
    }

    setShowEff(value: boolean) {
        this._vo.showEff = value;
    }

    setArrowDir(value: number) {
        this._vo.arrowDir = value;
    }

    getArrowDir(): number {
        return this._vo.arrowDir;
    }

    setGuideType(type: number){
        this._vo.guideType = type;
    }

    getGuideType(){
        return this._vo.guideType;
    }

    setWaitTime(value: number) {
        this._vo.waitTime = value;
    }

    getWaitTime() {
        return this._vo.waitTime;
    }

    getGuideInfoByConditionType(data: { type: number, conditionType: number, condition: { [key: string]: number } }) {
        let info = null;
        let conditionType = data.conditionType;
        let list = this._configByConfitionType[conditionType];
        if (list) {
            for (let i in list) {
                let condition = data.condition;
                let isEnough = false;
                switch (conditionType) {
                    case Guide.GuideCondictionCheckType.Level: {
                        let userLv = this._gameVO.myUserVo.topLevel;
                        if (userLv >= condition[conditionType]) {
                            isEnough = true;
                        }
                        break;
                    }
                    case Guide.GuideCondictionCheckType.Stronger_Equip: {
                        let equipPart = condition[conditionType];
                        if (equipPart == list[i].condition[conditionType]) {
                            let bagEquipMaxBattle = EquipModel.getInstance.getMaxEquipBattleBuyPart(equipPart);
                            let roleEquipID = this._gameVO.myUserVo.equipPart[equipPart - 1];
                            let unlockLevel = EquipModel.getInstance.checkPartUnLock(equipPart);
                            if (bagEquipMaxBattle > 0 && !unlockLevel) {
                                let roleEquipInfo = Cfg.Equip.get(roleEquipID);
                                if (roleEquipInfo) {
                                    let rolePropertyVo = new PropertyVO(roleEquipInfo.property);
                                    let roleProBattle = rolePropertyVo.getBattle();
                                    if (bagEquipMaxBattle > roleProBattle) {
                                        isEnough = true;
                                    }
                                } else {
                                    isEnough = true;
                                }
                            }
                        }
                        break;
                    }
                    case Guide.GuideCondictionCheckType.Unlock_Upgrade: {
                        let isUnlock = FunUnlockTipsModel.getInstance().getFunIsUnlock(GameFunID.EquipUpgrade);
                        isEnough = isUnlock;
                        break;
                    }
                    case Guide.GuideCondictionCheckType.Unlock_Smelt: {
                        let isUnlock = FunUnlockTipsModel.getInstance().getFunIsUnlock(GameFunID.EquipSmelt);
                        isEnough = isUnlock;
                        break;
                    }
                }
                if (isEnough && !this.getGuideIsFinish(list[i].guideType)) {
                    info = list[i];
                    break;
                }
            }
        }
        return info;
    }

    getGuideInfoByGuideId(guideId: number) {
        return this._config[guideId];
    }

    getNodeInfoByTag(tag: number) {
        return this._nodeList[tag];
    }

    /** node: 节点，tag: 编号，callback：节点点击回调，checkOpenFunc：检查功能是否开启 */
    addTagInfo(data: Guide.GuideItemData) {
        this._nodeList[data.tag] = { node: data.node, callBack: data.callBack, tagLayer: data.tagLayer, checkOpenFunc: data.checkOpenFunc };
    }

    getCurGuideInfo() {
        return this._config[this._vo.guideId];
    }

    getCurGuideID() {
        return this._vo.curGuideId;
    }

    setCurGuideID(value: number) {
        this._vo.curGuideId = value;
    }

    getLastGuideID() {
        return this._vo.lastGuideId;
    }

    setLastGuideID(value: number) {
        this._vo.lastGuideId = value;
    }

    getGuideModule() {
        return this._vo.guideModule;
    }

    setGuideModule(value: number) {
        this._vo.guideModule = value;
    }

    getIsGuideing() {
        return this._vo.isGuideing;
    }

    setIsGuideing(value: boolean) {
        this._vo.isGuideing = value;
    }

    /** 获取指引是否完成 */
    getGuideIsFinish(guideInstanceID: number) {
        let guideFlag = this._gameVO.myUserVo.guideFlag;
        if(!guideFlag) guideFlag = 999;
        let binaryStr = Util.numberToBinary(guideFlag);
        let isFinish = false;
        if (binaryStr.length >= guideInstanceID) {
            isFinish = !!parseInt(binaryStr[binaryStr.length - guideInstanceID], 2);
        }
        return isFinish;
    }

    /** 设置指引完成 一个标记最多容纳53个任务 */
    setGuideIsFinish(guideInstanceID: Guide.GuideModuleNum, isFinish: boolean) {
        let guideFlag = this._gameVO.myUserVo.guideFlag;

        let binaryStr = "";
        if (isFinish) {
            for (let i = 1; i <= guideInstanceID; ++i) {
                if (i == guideInstanceID) {
                    binaryStr = "1" + binaryStr;
                } else {
                    binaryStr += "0";
                }
            }
            let flagBin = Util.numberToBinary(guideFlag);
            if (!(Number(guideFlag.toString(2)[flagBin.length - guideInstanceID]))) {
                let dt = parseInt(binaryStr, 2);
                guideFlag += dt;
                this._gameVO.myUserVo.guideFlag = guideFlag;
            }
        } else {
            binaryStr = Util.numberToBinary(guideFlag);
            if (binaryStr.length >= guideInstanceID) {
                let flagStr = Util.replacePosStr(binaryStr, guideInstanceID, "0");
                this._gameVO.myUserVo.guideFlag = parseInt(flagStr, 2);
            }
        }
    }

    /** 检查指引 */
    checkGuide(){
        // cc.log(`this._vo.guideId`, this._vo.guideId);
        if (this._vo.guideId != 0) return;
        let info: GuideCfg = null;
        let isFighting = FightModel.getInstance.isFighting;
        let isMenu = GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.MainView;
        let topLevel = this._gameVO.myUserVo.topLevel;
        this._vo.guideModule = 0;
        for (let conditionType in this._configByConfitionType){
            if (conditionType && conditionType != `0`){
                let guides = this._configByConfitionType[conditionType];
                for(let guideID in guides){
                    let enough = false;
                    let special = false;
                    switch (conditionType) {
                        case Const.GuideConditionType.FirstOpenMenu: {
                            // break;
                            if (isMenu && !isFighting) {
                                if (this._gameVO.myUserVo.firOpMenu) {
                                    if (topLevel == 0) {
                                        this._vo.guideModule = Guide.GuideModuleNum.FirstOpenMenu;
                                    }
                                }
                            }
                            break;
                        }
                        case Const.GuideConditionType.FirstEnterGame: {
                            // break;
                            if (isFighting) {
                                if (this._gameVO.myUserVo.topLevel == 0) {
                                    this._vo.guideModule = Guide.GuideModuleNum.FirstEnterGame;
                                }
                            }
                            break;
                        }
                        case Const.GuideConditionType.FirstGameResult: {
                            /** test */
                            // break;
                            // this._vo.guideModule = Guide.GuideModuleNum.FirstGameResult;

                            if (!isFighting && isMenu) {
                                if (GameVoManager.getInstance.myUserVo.resultNum == 1){
                                    this._vo.guideModule = Guide.GuideModuleNum.FirstGameResult;
                                    special = true;
                                }
                            }
                            break;
                        }
                        case Const.GuideConditionType.FitstPassOneChapter: {
                            // break;
                            if (isMenu && !isFighting){
                                if (GameVoManager.getInstance.myUserVo.topLevel == 20 &&
                                    GameVoManager.getInstance.getTechLevel(1) == 0){
                                    this._vo.guideModule = Guide.GuideModuleNum.FitstPassOneChapter;
                                    special = true;
                                }
                            }
                            break;
                        }
                    }
                    if (this._vo.guideModule != 0){
                        let isFinish = this.getGuideIsFinish(this._vo.guideModule);
                        if (!isFinish) {
                            enough = true;
                        }
                        if (enough) {
                            info = guides[guideID];
                            if (special){
                                this.setGuideIsFinish(this._vo.guideModule, true);
                            }
                            return info;
                        }
                    }
                }
            }
        }
        return info;
    }
}
