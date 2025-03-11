import { MVC } from "../../framework/MVC";
import ResultNewVO from "./ResultNewVO";
import { Cfg } from "../../config/Cfg";
import { StrikeCfg } from "../../config/StrikeCfg";
/**
 * @description 新结算界面数据
 * @author CaiLeSi
 * @data 2019-04-26
 */
export default class ResultNewModel extends MVC.BaseModel {
    private static _instance: ResultNewModel = null;
    static getInstance() {
        if (this._instance == null) {
            this._instance = new ResultNewModel();
        }
        return this._instance;
    }

    reset() { }
}
