import { MVC } from "../../framework/MVC";
import { AlertManager, } from "../../alert/AlertManager";
import { GameVoManager } from "../../manager/GameVoManager";
import { UserVo } from "../../shareData/UserVo";
import NetAdapter from "../../adpapter/NetAdapter";
import FightModel from "../fight/FightModel";
import { DropCfg } from "../../config/DropCfg";
import { Cfg } from "../../config/Cfg";
import { RoleManager } from "../../manager/RoleManager";
import { ListenID } from "../../ListenID";
import { Notifier } from "../../framework/Notifier";
import { Manager } from "../../manager/Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CheatView extends MVC.BaseView {
    public onOpen(args: any): void {
        super.onOpen(args);
        try {
            let label = this.node.getChildByName("checkinGame");
            label.getComponent(cc.Label).string = `诀窍记录:${GameVoManager.getInstance.myUserVo.successTips}`;
        } catch (error) {
            console.error(error)
        }

    }

    public onClose(): void {
        super.onClose();
    }

    protected changeListener(enable: boolean): void {

    }
    public resetUserVo() {
        GameVoManager.getInstance.myUserVo = new UserVo();
        GameVoManager.getInstance.saveAllData();
    }

    public addDay() {
        GameVoManager.getInstance.myUserVo.lastSignDay = 0;
    }

    public addGold() {
        GameVoManager.getInstance.setGold(100000000000000);
    }

    public addDiamond() {
        GameVoManager.getInstance.setDiamond(10000);
    }

    public selectLevel() {
        let editbox = this.node.getChildByName("editLevelBox").getComponent(cc.EditBox);
        let num = Number(editbox.string);
        if (num) {
            GameVoManager.getInstance.myUserVo.topLevel = num;
            GameVoManager.getInstance.stateVo.curLevel = GameVoManager.getInstance.myUserVo.topLevel + 1;
            // Manager.map.setMapByChapterId(Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel))
            FightModel.getInstance.initLevelCfg(GameVoManager.getInstance.stateVo.curLevel);
            AlertManager.showNormalTips("选择" + num + "关卡成功");
        } else {
            AlertManager.showNormalTips("关卡数出错");
        }
    }

    public copyOpenId() {
        let str = "";
        GameVoManager.getInstance.saveData();
        if (window["wx"]) {
            wx.setClipboardData({
                data: str,
                success: () => {
                    AlertManager.showNormalTips("成功");
                },
                fail: () => {
                    AlertManager.showNormalTips("失败");
                }
            })
        }
    }
    private toolCfg: DropCfg = null;
    private hurt: number = 0;
    public toolIcon(evet, curstomdata) {
        if (!FightModel.getInstance.isFighting) { AlertManager.showNormalTips("不在战斗中，别乱按哈"); return };
        this.toolCfg = Cfg.Drop.get(curstomdata);


    }
    public switchRoleFire() {
        RoleManager.getInstance.mainRole.cheat = !RoleManager.getInstance.mainRole.cheat;
    }

    public clearToken() {

    }

    public addChest() {
        // GameVoManager.getInstance.myUserVo.treasureBox++;
        Notifier.send(ListenID.Fight_GetExpAnimation, 100);
    }

    public cleanFunUnlockFlag() {
        for (let i = 1; i <= 50; ++i) {
            Manager.storage.setBool("funUnlock_" + i, false);
        }
        AlertManager.showNormalTips("清除成功");
    }

    public showRandomAnnounce() {
        Notifier.send(ListenID.Announce_LogStartNum, 2);
        Notifier.send(ListenID.MainDrawClose);
    }

    /**
     * 攻击模式切换
     */

    public switchFireMode(event, curstomdata) {
        FightModel.getInstance.fireMode = !FightModel.getInstance.fireMode;
        console.log("FightMode firemode", FightModel.getInstance.fireMode);
    }

    public addSkill(event) {
        let editbox = this.node.getChildByName("editSkillBox").getComponent(cc.EditBox);
        let num = Number(editbox.string);
        if (num) {
            Notifier.send(ListenID.Fight_AddSkill, num);
        }
    }

    public addRoleExp() {
        GameVoManager.getInstance.addExp(100);
    }

    public addEquip() {
        GameVoManager.getInstance.addEquip(10001);
    }
}
