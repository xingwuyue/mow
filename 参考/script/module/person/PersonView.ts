import { MVC } from "../../framework/MVC";
import { AlertManager } from "../../alert/AlertManager";
import { Util } from "../../utils/Util";
import { GameVoManager } from "../../manager/GameVoManager";
import { Manager } from "../../manager/Manager";
import NetAdapter from "../../adpapter/NetAdapter";
import { Cfg } from "../../config/Cfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonView extends MVC.BaseView {

    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Label)
    uidNum: cc.Label = null;

    @property(cc.Label)
    battleNum: cc.Label = null;

    @property(cc.Label)
    stageText: cc.Label = null;

    @property(cc.Label)
    battleRankNum: cc.Label = null;

    @property(cc.Label)
    stageRankNum: cc.Label = null;

    @property(cc.Label)
    bossRankNum: cc.Label = null;

    @property(cc.Sprite)
    spExpBar: cc.Sprite = null;

    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this.setInfo(args);
    }


    public setInfo(args) {
        this.uidNum.string = Util.normalName("123456", 2);
        this.battleNum.string = GameVoManager.getInstance.getBattle() + "";
        this.nickName.string = GameVoManager.getInstance.myUserVo.nickName;
        let chapterids = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        this.stageText.string = `第${chapterids[0]}章${chapterids[1]}波`;
        let param: string[] = ['newbattle.forever', 'newlevel.forever', 'bosslevel.forever'];
        let rankinfo: string[] = ['battleRankNum', 'stageRankNum', 'bossRankNum'];
        NetAdapter.getRankInfoByKey(param).then(res => {
            if (res.data) {
                for (let i = 0; i < param.length; i++) {
                    let battledata = res.data[param[i]];
                    if (battledata) {
                        if (battledata.self_rank) {
                            this[rankinfo[i]].string = `No.${battledata.self_rank}`;
                            this[rankinfo[i]].node.color = cc.Color.WHITE;
                        } else {
                            this[rankinfo[i]].string = '暂无排名';
                            this[rankinfo[i]].node.color = cc.Color.WHITE.fromHEX("#E25744");
                        }
                    } else {
                        this[rankinfo[i]].string = '暂无排名';
                        this[rankinfo[i]].node.color = cc.Color.WHITE.fromHEX("#E25744");
                    }
                }
            }
        })
        //test

        let roleVO = GameVoManager.getInstance.myUserVo;
        let curLv = roleVO.roleLv;
        let curExp = roleVO.curExp;
        let nextLvCfg = Cfg.RoleLevel.get(curLv + 1);
        let max = nextLvCfg ? nextLvCfg.exp : 1;
        max = max == 0 ? 1 : max;
        let prog = cc.find(`expProgressBar`, this.node);
        let lblLevel = cc.find(`imgPro6/lblLevel`, prog);
        max = max == 0 ? 1 : max;
        lblLevel.getComponent(cc.Label).string = curLv + ``;
        this.setExpBarPercent(curExp / max);
    }
    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
    }

    private _pasteBtnId: string = "";
    /** 复制到剪贴板(原生平台可用) */
    uiPasteBoard(e, d) {
        let str = '';
        Manager.audio.playAudio(501);
        if (this._pasteBtnId == d) return;
        str = "";
        this._pasteBtnId == d;//不能一重复点复制，会卡死
        AlertManager.showNormalTips("复制到剪贴板成功");
    }

    setExpBarPercent(value: number) {
        this.spExpBar.fillRange = value;
    }
}
