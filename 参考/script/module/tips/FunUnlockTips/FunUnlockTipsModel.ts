import { MVC } from "../../../framework/MVC";
import FunUnlockTipsVO, { FunUnlockData } from "./FunUnlockTipsVO";
import { GameFunID, GameFunUnlockType, FunUnlockTipsData } from "../../../common/Common_Define";
import { GameVoManager } from "../../../manager/GameVoManager";

export default class FunUnlockTipsModel extends MVC.BaseModel {
    private static _instance: FunUnlockTipsModel = null;
    public static getInstance(): FunUnlockTipsModel {
        if (this._instance == null) {
            this._instance = new FunUnlockTipsModel();
        }
        return this._instance;
    }
    
    private _vo: FunUnlockTipsVO = new FunUnlockTipsVO();
    private _gameVO: GameVoManager = GameVoManager.getInstance;
    getFunUnlockInfoTable(){
        return this._vo.funOpenTaskTable;
    }
    setFunUnlockInfoTable(table: FunUnlockData){
        this._vo.funOpenTaskTable = table;
    }

    get funUnlockList(){
        return this._vo.funOpenList;
    }
    set funUnlocklist(value: FunUnlockTipsData[]){
        this._vo.funOpenList = value;
    }

    getFunIsUnlock(funID: GameFunID){
        let funCheckTable = this.getFunUnlockInfoTable();
        let checkInfo = funCheckTable[funID];
        let bool = false;
        if (checkInfo) {
            switch (checkInfo.unlockType) {
                case GameFunUnlockType.Level: {
                    let topLevel = this._gameVO.myUserVo.topLevel;
                    if (topLevel >= checkInfo.value) {
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
        }
        return bool;
    }

    reset(){}
}
