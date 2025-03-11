import { MVC } from "../../framework/MVC";

export default class MoreGoldModel extends MVC.BaseModel {

    private static _instance: MoreGoldModel = null;

    public constructor() {
        super();
        if (MoreGoldModel._instance == null) {
            MoreGoldModel._instance = this;
        }
    }
    public reset(): void {

    }

    public static get getInstance(): MoreGoldModel {
        if (MoreGoldModel._instance == null) {
            MoreGoldModel._instance = new MoreGoldModel();
        }
        return MoreGoldModel._instance;
    }
}