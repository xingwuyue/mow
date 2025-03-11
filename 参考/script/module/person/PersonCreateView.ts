import { MVC } from "../../framework/MVC";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { Util } from "../../utils/Util";
import PersonModel from "./PersonModel";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import NetAdapter from "../../adpapter/NetAdapter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonView extends MVC.BaseView {

    @property(cc.EditBox)
    nameBox: cc.EditBox = null;

    @property(cc.Node)
    maskNode: cc.Node = null;

    private callback: Function = null;
    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this.callback = args;
        this.onRandomName();
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        this.callback && (this.callback());
    }

    /**
     * 验证
     */
    public validName() {
        let str = this.nameBox.string;
        if (str == "") {
            AlertManager.showNormalTips("昵称不能为空!");
            return;
        } else {
            const regexp = /^[\u4e00-\u9fa5A-Za-z0-9_]*$/;
            if (!regexp.test(str)) {
                AlertManager.showNormalTips("昵称无效，请重新输入");
                return;
            }
            let len = Util.getStringByteNum(str);
            if (len <= 0 || len > 16) {
                AlertManager.showNormalTips("昵称过长，请重新输入");
                return;
            }
            let info = PersonModel.getInstance.isSensitive(str);
            if (!info.isok) {
                AlertManager.showNormalTips(`'${info.shieldName}'为无效，请重新输入`);
                return;
            }

            AlertManager.showAlert(AlertType.SELECT, {
                reasonDesc: "昵称确定后将无法修改请慎重考虑！",
                wayDesc: "是否确定使用该昵称",
                confirmText: "确定",
                cancelText: "否",
                confirm: () => {
                    this.maskNode.active = true;

                    GameVoManager.getInstance.myUserVo.isSetName = 1;
                    GameVoManager.getInstance.myUserVo.nickName = str;
                    this.maskNode.active = false;
                    this.onClose();

                },
            });
        }
    }

    public onRandomName() {
        let str = PersonModel.getInstance.getRandomNickName();
        this.nameBox.string = str + "adfasdf".substr(-3, 3);
    }
}   
