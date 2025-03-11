import { RemouldCfg } from "../../config/RemouldCfg";
import { PropertyVO } from "../equip/Property";

export default class TechnologyVo {
    public data: Array<Array<RemouldCfg>> = [];
    public allProperty: PropertyVO = new PropertyVO();
}