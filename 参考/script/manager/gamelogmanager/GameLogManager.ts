
import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";

export default class GameLogManager extends MVC.BaseController {
    constructor() {
        super("GameLogManager");
        this.changeListener(true);
    }

    changeListener(enable: boolean) {
        Notifier.changeListener(enable, ListenID.Shop_Box_Video_Success, () => this.onShopBoxVideoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Relive_Video_Success, () => this.onReliveVideoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Free_Weapon_Video_Success, () => this.onFreeWeaponVodeoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Main_Draw_Video_Success, () => this.onMainDrawVideoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Result_Draw_Video_Success, () => this.onResultDrawVideoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Result_Reward_Video_Success, () => this.onResultRewardVideoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Sign_Welfare_Video_Success, () => this.onSignWelfareVideoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Time_Gold_Video_Success, () => this.onTimeGoldVideoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Bubble_Weapon_Video_Success, () => this.onBubbleWeaponVideoSuccess(), this);
        Notifier.changeListener(enable, ListenID.Role_Level_Up, () => this.onRoleLevelUp(), this);
        Notifier.changeListener(enable, ListenID.Role_Baoji_Up, () => this.onRoleBaojiUp(), this);
        Notifier.changeListener(enable, ListenID.Role_Speed_Up, () => this.onRoleSpeedUp(), this);
        Notifier.changeListener(enable, ListenID.Role_Power_Up, () => this.onRolePowerUp(), this);
        Notifier.changeListener(enable, ListenID.Role_TimeGold_Up, () => this.onRoleTimeGoldUp(), this);
        Notifier.changeListener(enable, ListenID.Role_KillGold_Up, () => this.onRoleKillGoldUp(), this);
        Notifier.changeListener(enable, ListenID.Role_KillGold_Up, () => this.onRoleKillGoldUp(), this);
        Notifier.changeListener(enable, ListenID.Log_Event, this.onLogEvent, this);
    }

    postEvent(eventName: string) {

    }

    onLogEvent(data: { event_name: string, counter: number }) {
        // let eventName = data.name || '';
        // let count = data.count || 1;
        data.counter = data.counter || 1;

    }

    /** 枪械库视频宝箱 */
    onShopBoxVideoSuccess() {

    }

    /** 复活视频 */
    onReliveVideoSuccess() {

    }

    /** 免费试用视频 */
    onFreeWeaponVodeoSuccess() {

    }

    /** 主界面抽奖视频 */
    onMainDrawVideoSuccess() {

    }

    /** 结算页抽奖视频 */
    onResultDrawVideoSuccess() {

    }

    /** 结算页3倍领取 */
    onResultRewardVideoSuccess() {
    }

    /** 签到双倍视频 */
    onSignWelfareVideoSuccess() {

    }

    /** 计时3倍视频 */
    onTimeGoldVideoSuccess() {

    }

    /** 气泡武器视频 */
    onBubbleWeaponVideoSuccess() {

    }

    /** 角色升级 */
    onRoleLevelUp() {

    }

    /** 角色暴击 */
    onRoleBaojiUp() {

    }

    /** 武器射速 */
    onRoleSpeedUp() {

    }

    /** 武器加成 */
    onRolePowerUp() {

    }

    /** 计时加成 */
    onRoleTimeGoldUp() {

    }

    /** 狩猎加成 */
    onRoleKillGoldUp() {

    }
}