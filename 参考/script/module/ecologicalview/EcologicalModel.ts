import { MVC } from "../../framework/MVC";

export default class EcologicalModel extends MVC.BaseModel {

    private static _instance: EcologicalModel = null;

    public constructor() {
        super();
        if (EcologicalModel._instance == null) {
            EcologicalModel._instance = this;
        }
    }
    public reset(): void {

    }

    public static get getInstance(): EcologicalModel {
        if (EcologicalModel._instance == null) {
            EcologicalModel._instance = new EcologicalModel();
        }
        return EcologicalModel._instance;
    }
}