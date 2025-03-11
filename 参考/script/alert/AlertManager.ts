import { MVC } from "../framework/MVC";
import { Util } from "../utils/Util";
import { UIManager } from "../framework/UIManager";
import NormalTips from "./NormalTips";

export enum AlertType {
    COMMON = 0, //普通
    SELECT = 1,   //帮助提示框
}

let _alertInstance: AlertManager;
export class AlertManager {
    private static _canShow: boolean = true;
    public static showNormalTips(text: string, uilayer: MVC.eUILayer = MVC.eUILayer.Tips, time: number = 1, ydis: number = 70): void {
        // if(this._canShow){
        let self = this;
        Util.loadPrefab("common/alert/tip_IOS").then((node) => {
            self._canShow = false;
            node.getComponent(NormalTips).setText(text);
            var action1 = cc.moveBy(time, cc.v2(0, ydis));
            var action2 = cc.fadeOut(1)
            node.group = "UI";
            node.setParent(UIManager.layerRoots(uilayer));
            node.runAction(cc.sequence(action1, action2, cc.callFunc(() => {
                node.stopAllActions();
                node.destroy();
                self._canShow = true;
            })));
        })
        // }
    }

    /**
     * @description 根据不同弹窗类型显示弹窗显示弹窗
     * @author 吴建奋
     * @date 2019-03-09
     * @static
     * @param {AlertType} alertType
     * @param {*} args
     * reasonDesc: "大描述",
     * wayDesc: "小描述",
     * confirmText: "确认按钮文字",
     * cancelText: "取消按钮文字",
     * @memberof AlertManager
     */
    public static showAlert(alertType: AlertType, args: any) {
        if (alertType == AlertType.COMMON) {
            UIManager.Open("common/alert/CommonAlert", MVC.eTransition.Default, MVC.eUILayer.Popup, args);
        } else if (alertType == AlertType.SELECT) {
            /**
             * args
             * reasonDesc: "大描述",
             * wayDesc: "小描述",
             * confirmText: "确认按钮文字",
             * cancelText: "取消按钮文字",
             */
            UIManager.Open("common/alert/SelectAlert", MVC.eTransition.Default, MVC.eUILayer.Tips, args);
        }
    }

    public static showBattleTips(oldBattleNum, newBattleNum) {
        UIManager.Open("common/alert/battleTips", MVC.eTransition.Default, MVC.eUILayer.Tips, { oldBattleNum, newBattleNum }, false);
    }
}
