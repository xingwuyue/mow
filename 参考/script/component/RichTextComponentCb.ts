import { GameFunID } from "../common/Common_Define";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RichTextComponentCb extends cc.Component {


    start() {

    }

    clickme(event, customdata) {
        let number = Number(customdata);
        Notifier.send(ListenID.Menu_AnnounceClick, number);
    }
}
