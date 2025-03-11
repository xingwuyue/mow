import { MVC } from "../../../framework/MVC";
import { UIManager } from "../../../framework/UIManager";
import { Common_UIPath, GameFunUnlockType, FunUnlockTipsData, GameFunID } from "../../../common/Common_Define";
import FunUnlockTipsModel from "./FunUnlockTipsModel";
import { GameVoManager } from "../../../manager/GameVoManager";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { Manager } from "../../../manager/Manager";
import FunOpen from "../../funopen/FunOpen";
import { Util } from "../../../utils/Util";

export default class FunUnlockTipsController extends MVC.BaseController {
    private static _instance: FunUnlockTipsController = null;
    public static getInstance(): FunUnlockTipsController {
        if (this._instance == null) {
            this._instance = new FunUnlockTipsController();
        }
        return this._instance;
    }
    public isUnlocking: boolean = false;
    constructor() {
        super('FunUnlockTipsController');
        this.changeListener(true);
        FunUnlockTipsController._instance = this;
    }

    private _data: FunUnlockTipsModel = FunUnlockTipsModel.getInstance();
    private _gameVO: GameVoManager = GameVoManager.getInstance;
    changeListener(enable: boolean){
        Notifier.changeListener(enable, ListenID.Rigister_FunUnlock, this.onRegisterFunUnlockCheck, this);
    }

    openFunUnlockView(checkInfo: FunUnlockTipsData){
        UIManager.Open(Common_UIPath.FunUnlockTipsView, MVC.eTransition.Scale, MVC.eUILayer.FunUnlock, checkInfo);
    }

    onRegisterFunUnlockCheck(checkInfo: FunUnlockTipsData){
        // return;
        if(!checkInfo) return;
        let funID = checkInfo.funID;
        let funIsOpen = true;
        let checkFunc = FunOpen.getInstance().getFunIsOpen.bind(FunOpen);
        switch(funID){
            case GameFunID.Boss: {
                funIsOpen = checkFunc(`Boss`);
                break;
            }
            case GameFunID.Box: {

                break;
            }
            case GameFunID.EquipSmelt: {
                funIsOpen = checkFunc(`Smelt`);
                break;
            }
            case GameFunID.EquipUpgrade: {
                funIsOpen = checkFunc(`Upgrade`);
                break;
            }
            case GameFunID.MainDraw: {
                funIsOpen = checkFunc(`MainDraw`);
                break;
            }
            case GameFunID.Rank: {
                funIsOpen = checkFunc(Common_UIPath.RankUI);
                break;
            }
            case GameFunID.RewardTask: {
                funIsOpen = checkFunc(Common_UIPath.RewardTaskView);
                break;
            }
            case GameFunID.Sign: {
                funIsOpen = checkFunc(`Sign`);
                break;
            }
        }
        if (funIsOpen)
            this.registerFunUnlockCheck(checkInfo);
    }

    registerFunUnlockCheck(checkInfo: FunUnlockTipsData){
        // return;
        if (!checkInfo) return;
        if (checkInfo.value === undefined) return;
        let funCheckTable = this._data.getFunUnlockInfoTable();
        // if (funCheckTable[checkInfo.funID]) return;
        let canRegister = false;
        switch (checkInfo.unlockType){
            case GameFunUnlockType.Level: {
                // let roleLevel = this._gameVO.myUserVo.topLevel;
                let chaptes = Util.levelToChapterId(this._gameVO.myUserVo.topLevel);
                if (chaptes[0] <= checkInfo.value && checkInfo.value != 0) {
                    canRegister = true;
                }
                break;
            }
            case GameFunUnlockType.RoleLevel: {
                if (this._gameVO.myUserVo.roleLv >= checkInfo.value && checkInfo.value > 0){
                    canRegister = true;
                }
                break;
            }
        }
        if (checkInfo.value > 0) {
            checkInfo.node.active = false;
        }
        if (!canRegister) {
            return;
        }
        funCheckTable[checkInfo.funID] = checkInfo;
        this._data.funUnlockList.push(checkInfo);
        // checkInfo.node.active = false;
        this._data.setFunUnlockInfoTable(funCheckTable);
        // this.checkFunUnlock();
        this.checkFunUnlock();
    }
    checkFunUnlock(){
        // let funCheckTable = this._data.getFunUnlockInfoTable();
        // let checkInfo = funCheckTable[funID];
        let check = () => {
            if (this.isUnlocking) return;
            if(this._data.funUnlockList.length <= 0) {
                setTimeout(() => {
                    Notifier.send(ListenID.Game_OpenUIList);
                    FunUnlockTipsController.getInstance().isUnlocking = false;
                }, 200);
                return;
            }
            let checkInfo = this._data.funUnlockList.pop();
            let bool = false;
            if (checkInfo) {
                switch (checkInfo.unlockType) {
                    case GameFunUnlockType.Level: {
                        let topLevel = this._gameVO.myUserVo.topLevel;
                        if (topLevel == checkInfo.value) {
                            bool = true;
                        }
                        break;
                    }
                    case GameFunUnlockType.RoleLevel: {
                        let roleLevel = this._gameVO.myUserVo.roleLv;
                        if (roleLevel >= checkInfo.value) {
                            bool = true;
                        }
                        break;
                    }
                }
                let isShow = Manager.storage.getBool("funUnlock_" + checkInfo.funID);
                if (bool) {
                    if (isShow){
                        checkInfo.node.active = true;
                        check();
                    }else{
                        this.isUnlocking = true;
                        this.openFunUnlockView(checkInfo);
                        Manager.storage.setBool("funUnlock_" + checkInfo.funID, true);
                    }
                }else{
                    check();
                }
            }
        }
        check();
    }
}
