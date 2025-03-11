import ScrollViewCom from "../../../component/itemscroll/ScrollViewCom";
import { Manager } from "../../../manager/Manager";
import ItemScrollCom from "../../../component/itemscroll/ItemScrollCom";
import ItemCell from "../../../component/itemscroll/ItemCell";
import { EquipTipsData, EquipTipsType } from "../../../common/Common_Define";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { MVC } from "../../../framework/MVC";
import { AudioType } from "../../../manager/AudioManager";
import { GameVoManager } from "../../../manager/GameVoManager";
import { CallID } from "../../../CallID";
import FightModel from "../FightModel";
import BaseCell from "../../../component/itemscroll/BaseCell";
import { SkillTipsData } from "../../tips/skilltips/SkillTipsView";
import { RoleManager } from "../../../manager/RoleManager";
import { Cfg } from "../../../config/Cfg";
import { Const } from "../../../config/Const";

enum eCheckBoxType {
    Vibrate = 0,
    Sound,
    Music
}

let CheckBoxName = {
    0: `Vibrate`,
    1: `Sound`,
    2: `Music`
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseNewView extends MVC.BaseView {
    @property(ScrollViewCom)
    skillScroll: ScrollViewCom = null;

    @property(ItemScrollCom)
    itemScroll: ItemScrollCom = null;

    @property(cc.Node)
    vibrateNode: cc.Node = null;

    @property(cc.Node)
    soundNode: cc.Node = null;

    @property(cc.Node)
    musicNode: cc.Node = null;

    @property(cc.Node)
    tips: cc.Node = null;

    changeListener() { }

    /** 震动开关 */
    private _switchVibrate: boolean = false;
    /** 音效开关 */
    private _switchSound: boolean = false;
    /** 音乐开关 */
    private _switchMusic: boolean = false;

    private _fightModel: FightModel = FightModel.getInstance;

    onOpen(param) {
        Notifier.send(ListenID.Fight_Pause, true);
        this.setInfo(param);
    }

    setInfo(param) {
        this.initScroll();
        this.initCheckBox();
        this.tips.active = false;
    }

    initScroll() {
        /** 初始化物技能滑动面板 */
        let skillList = [];
        let roleSkillList = RoleManager.getInstance.mainRole.skillIdList;
        for (let i = 0; i < roleSkillList.length; ++i) {
            let id = roleSkillList[i];
            let skill = Cfg.Skill.get(id);
            if (!!skill.show) {
                skillList.push({ id: id });
            }
        }
        this.skillScroll.setItemInfo(skillList);
        this.skillScroll.setClickItemHandler((celll: BaseCell) => {
            let skillTipsData: SkillTipsData = {
                id: celll.getItemID()
            }
            Notifier.send(ListenID.SKillTips_Open, skillTipsData);
        });

        /** 初始化物品掉落滑动面板 */
        let itemList = [];
        if (this._fightModel.goldInCome) {
            itemList.push({ itemID: 1, goodsNum: this._fightModel.goldInCome });
        }
        if (this._fightModel.diamondInCome) {
            itemList.push({ itemID: 2, goodsNum: this._fightModel.diamondInCome });
        }
        for (let i = 0; i < this._fightModel.rewardList.length; ++i) {
            itemList.push({ itemID: this._fightModel.rewardList[i] });
        }
        this.itemScroll.setItemList(itemList);
        this.itemScroll.setClickItemHandler((itemCell: ItemCell) => {
            let itemNum = itemCell.getItemNum();
            if (!itemNum) {
                let equipTipsData: EquipTipsData = {
                    type: EquipTipsType.Normal,
                    itemLeftID: itemCell.getItemID(),
                    comparePosNode: itemCell.node,
                    pos: cc.v2(0, 200)
                }
                Notifier.send(ListenID.Equip_OpenTipsView, equipTipsData);
            }
        });
    }

    initCheckBox() {
        let muteshake: boolean = Notifier.call(CallID.Setting_IsBlockShake);
        this.setCheckBoxState(eCheckBoxType.Vibrate, muteshake);

        let muteaudio: boolean = Notifier.call(CallID.Setting_IsMuteAudio);
        this.setCheckBoxState(eCheckBoxType.Sound, muteaudio);

        let muteMusic: boolean = Notifier.call(CallID.Setting_IsMuteMusic);
        this.setCheckBoxState(eCheckBoxType.Music, muteMusic);
    }

    onClickVibrate() {
        let state = !this[`_switch` + CheckBoxName[eCheckBoxType.Vibrate]];
        this.setCheckBoxState(eCheckBoxType.Vibrate, state);
        Notifier.send(ListenID.Setting_BlockShake, state);
    }

    onClickSound() {
        let state = !this[`_switch` + CheckBoxName[eCheckBoxType.Sound]];
        this.setCheckBoxState(eCheckBoxType.Sound, state);
        Notifier.send(ListenID.Setting_MuteAudio, state);
    }

    onClickMusic() {
        let state = !this[`_switch` + CheckBoxName[eCheckBoxType.Music]];
        this.setCheckBoxState(eCheckBoxType.Music, state);
        Notifier.send(ListenID.Setting_MuteMusic, state);
    }

    setCheckBoxState(type: eCheckBoxType, state: boolean) {
        this[`_switch` + CheckBoxName[type]] = state;
        this.onFlush(CheckBoxName[type]);
    }

    onClickBack() {
        this.tips.active = true;
    }

    onClickContinue() {
        Notifier.send(ListenID.Fight_Restart);
        Notifier.send(ListenID.Log_Event, { event_name: "continue" });
        this.onClose();
    }

    onClickTipsOK() {
        Manager.audio.stopAudio(AudioType.Laser);
        Manager.storage.delete(Const.STORAGE_CHAPTER_INFO);
        GameVoManager.getInstance.stateVo.levelFailTimes = 0;
        Notifier.send(ListenID.Game_FightBackToHome);
        this.onClose();
        Notifier.send(ListenID.Log_Event, { event_name: "stop_home" });
    }

    onClickTipsContinue() {
        this.tips.active = false;
    }

    public onClose(): void {
        if (this._isClosed) return;
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Fight_Pause, false);
    }

    update(dt) {
        // Manager.loader.Update(dt);
    }

    onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {
                this._updateVibrate();
                this._updateSound();
                this._updateMusic();
                break;
            }
            case CheckBoxName[0]: {
                this._updateVibrate();
                break;
            }
            case CheckBoxName[1]: {
                this._updateSound();
                break;
            }
            case CheckBoxName[2]: {
                this._updateMusic();
                break;
            }
        }
    }

    private _updateVibrate() {
        let imgCheck = cc.find(`imgCom2`, this.vibrateNode);
        if (imgCheck) {
            imgCheck.active = this._switchVibrate;
        }
    }

    private _updateSound() {
        let imgCheck = cc.find(`imgCom2`, this.soundNode);
        if (imgCheck) {
            imgCheck.active = this._switchSound;
        }
    }

    private _updateMusic() {
        let imgCheck = cc.find(`imgCom2`, this.musicNode);
        if (imgCheck) {
            imgCheck.active = this._switchMusic;
        }
    }
}
