import { MVC } from "../../framework/MVC";

export default class GroupModel extends MVC.BaseModel {

    private static _instance: GroupModel = null;

    public constructor() {
        super();
        if (GroupModel._instance == null) {
            GroupModel._instance = this;
        }
    }
    public reset(): void {

    }

    public static get getInstance(): GroupModel {
        if (GroupModel._instance == null) {
            GroupModel._instance = new GroupModel();
        }
        return GroupModel._instance;
    }

    private _unlockId:number = 0;
    public set unlockId(id){
        this._unlockId = id;
    }

    public get unlockId():number{
        let id = this._unlockId;
        this._unlockId = 0;
        return id;
    }
}