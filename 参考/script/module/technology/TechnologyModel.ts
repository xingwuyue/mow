import { MVC } from "../../framework/MVC";
import TechnologyVo from "./TechnologyVo";
import { GameVoManager } from "../../manager/GameVoManager";
import { PropertyDefine } from "../equip/Property";
import { Cfg } from "../../config/Cfg";
import { Manager } from "../../manager/Manager";
import { Util } from "../../utils/Util";
import { Technology } from "../../common/Common_Define";
import EquipModel from "../equip/EquipModel";

export default class TechnologyModel extends MVC.BaseModel {
    private static _instance: TechnologyModel = null;
    static getInstance(){
        if (!this._instance){
            this._instance = new TechnologyModel();
        }
        return this._instance;
    }

    private _canUpgradeNum: number = 0;
    get canUpgradeNum(){
        return this._canUpgradeNum;
    }
    set canUpgradeNum(value){
        this._canUpgradeNum = value;
    }

    get notFirstOpenView(){
        return Manager.storage.getBool(`notFirstOpenDay`);
    }
    set notFirstOpenView(value: boolean){
        Manager.storage.setBool(`notFirstOpenDay`, value);
    }

    private _vo: TechnologyVo = new TechnologyVo();
    private _gameVo: GameVoManager = GameVoManager.getInstance;

    constructor(){
        super();
        let techCfg = Cfg.Remould.getAll();
        if (techCfg) {
            for (let i in techCfg) {
                // let id = techCfg[i].sameTeam - 1;
                let id = Number(i) - 1;
                if (!this.vo.data[id]) {
                    this.vo.data[id] = [];
                }
                this.vo.data[id].push(techCfg[i]);
            }
        }
        this.updateCanUpgradeNum();
    }

    get vo(){
        return this._vo;
    }
    reset(){}

    /** 获取属性 */
    getPropertyByScrollIndex(index: number){
        let data = this.vo.data;
        let propertys: number[] = [0, 0];
        if(data){
            let infos = data[index];
            for (let i = 0; i < infos.length; ++i){
                let info = infos[i];
                let id = info.ID;
                let lv = this._gameVo.getTechLevel(id);
                if (lv > 0)
                    propertys[i] = info.attribute[lv][1];
            }
        }
        return propertys;
    }

    /** 获取等级是否满 */
    getLevelIsMax(scrollIndex: number, row: number){
        let data = this.vo.data;
        let isMax = false;
        if(data){
            let infos = data[scrollIndex];
            let info = infos[row];
            let id = info.ID;
            let lv = this._gameVo.getTechLevel(id);
            isMax = lv >= info.gradePrice.length;
        }
        return isMax;
    }

    /** 获取所有属性 */
    getAllProperty(){
        this.vo.allProperty.resetZero();
        let data = this.vo.data;
        if(data){
            for(let index = 0; index < data.length; ++index){
                let infos = data[index];
                for (let row = 0; row < infos.length; ++row){
                    let info = infos[row];
                    let id = info.ID;
                    let lv = this._gameVo.getTechLevel(id);
                    let property = info.attribute[lv];
                    let propName = PropertyDefine.equipIndexToKey[property[0]];
                    this.vo.allProperty[propName] += property[1];
                }
            }
        }
        return this.vo.allProperty;
    }

    updateAllProperty(){
        let allpro = this.getAllProperty();
        let newNum = allpro.getBattle() + EquipModel.getInstance.myAllPro.getBattle();
        this._gameVo.setBattle(newNum, true);
    }

    updateCanUpgradeNum(){
        this.canUpgradeNum = 0;
        if (!this.vo.data) return;
        let chapters = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let chapter = chapters[0];
        for (let index = 0; index < this.vo.data.length; ++index){
            let infos = this.vo.data[index];
            for (let row = 0; row < infos.length; ++row){
                let info = infos[row];
                let isLock = chapter < info.unlockChapters;
                if (!isLock){
                    let lv = this._gameVo.getTechLevel(info.ID);
                    let costInfo = info.gradePrice[lv];
                    if (costInfo){
                        let costType = costInfo[0];
                        let costNum = costInfo[1];
                        switch (costType) {
                            case Technology.CostType.Gold: {
                                if (this._gameVo.myUserVo.gold >= costNum) {
                                    this.canUpgradeNum++;
                                }
                                break;
                            }
                            case Technology.CostType.TechPoint: {
                                if (this._gameVo.myUserVo.techP >= costNum) {
                                    this.canUpgradeNum++;
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    getCanBuy(index: number, row: number){
        let chapters = Util.levelToPassChapter(GameVoManager.getInstance.myUserVo.topLevel);
        let chapter = chapters[0];
        let canBuy = false;
        if (this.vo.data){
            let info = this.vo.data[index][row];
            let id = info.ID;
            let lv = this._gameVo.getTechLevel(id);
            let isLock = chapter <= info.unlockChapters;
            if (!isLock){
                let costInfo = info.gradePrice[lv];
                if (costInfo) {
                    let costType = costInfo[0];
                    let costValue = costInfo[1];
                    switch (costType) {
                        case Technology.CostType.Gold: {
                            if (this._gameVo.myUserVo.gold >= costValue) {
                                canBuy = true;
                            }
                            break;
                        }
                        case Technology.CostType.TechPoint: {
                            if (this._gameVo.myUserVo.techP >= costValue) {
                                canBuy = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return canBuy;
    }
}
