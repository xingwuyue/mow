import { MVC } from "../../framework/MVC";

export default class EventModel extends MVC.BaseModel {

    private static _instance: EventModel = null;

    public constructor() {
        super();
        if (EventModel._instance == null) {
            EventModel._instance = this;
        }
    }
    public reset(): void {

    }

    private _eventIdList = {};//已触发事件列表
    public static get getInstance(): EventModel {
        if (EventModel._instance == null) {
            EventModel._instance = new EventModel();
        }
        return EventModel._instance;
    }

    public getNoTiggerIdList(list) {
        let a = [];
        for (let i = 0; i < list.length; i++) {
            if (!this._eventIdList[list[i]]) {
                a.push(list[i]);
            }
        }
        return a;
    }

    public setTiggerId(id: number) {
        this._eventIdList[id] = 1;
    }

    public clearTiggerIdList() {
        this._eventIdList = {};
    }
}