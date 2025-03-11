import { MVC } from "../../framework/MVC";

export default class ShopModel extends MVC.BaseModel {

    private static _instance: ShopModel = null;

    public constructor() {
        super();
        if (ShopModel._instance == null) {
            ShopModel._instance = this;
        }
    }
    public reset(): void {

    }

    public static get getInstance(): ShopModel {
        if (ShopModel._instance == null) {
            ShopModel._instance = new ShopModel();
        }
        return ShopModel._instance;
    }
}