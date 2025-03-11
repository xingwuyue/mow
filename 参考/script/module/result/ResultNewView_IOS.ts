import { MVC } from "../../framework/MVC";
import { GameVoManager } from "../../manager/GameVoManager";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import { Notifier } from "../../framework/Notifier";
import { UIManager } from "../../framework/UIManager";
import { ListenID } from "../../ListenID";
import { Common_UIPath, EquipTipsData, EquipTipsType } from "../../common/Common_Define";
import { Util } from "../../utils/Util";
import { Const } from "../../config/Const";
import { ResultData } from "./ResultNewController";
import { Cfg } from "../../config/Cfg";
import ItemCell from "../../component/itemscroll/ItemCell";
import SkillCell from "../../component/itemscroll/SkillCell";
import { ChapterCfg } from "../../config/ChapterCfg";
import { SkillTipsData } from "../tips/skilltips/SkillTipsView";
import FightModel from "../fight/FightModel";

const { ccclass, property } = cc._decorator;
/**
 * @description 新结算视图
 * @author CaiLeSi
 * @data 2019-04-26
 */

@ccclass
export default class ResultNewView_IOS extends MVC.BaseView {

    @property(cc.Prefab)
    skillCell: cc.Prefab = null;

    @property(cc.Prefab)
    goodsItemPrefab: cc.Prefab = null;

    @property(cc.SpriteFrame)
    winSpriteFrameList: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    failSpriteFrameList: cc.SpriteFrame[] = [];

    private _args: ResultData = null;
    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Draw_AnimEnd, this.runGoldAnim, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: ResultData): void {
        super.onOpen(args);
        this._args = args;
        this.initNode();
        this.initUI();
    }

    private animaEnd: boolean = false;
    private runAnima: boolean = false;
    private isDraw: boolean = false;
    private animation: cc.Animation = null;
    private titleNode: cc.Node = null;
    private light: cc.Node = null;
    private title_bg1: cc.Sprite = null;
    private title_bg2: cc.Sprite = null;
    private title_text: cc.Sprite = null;
    private new: cc.Node = null;
    private levelNode: cc.Node = null;
    private skillPanel: cc.Node = null;
    private rewardPanel: cc.Node = null;
    private scrollView: cc.ScrollView = null;
    private killNode: cc.Node = null;
    private lbkill: cc.Label = null;
    private barSprite: cc.Sprite = null;
    private normalBtn: cc.Node = null;
    private multBtn: cc.Node = null;
    private sblq: cc.Node = null;
    private dblq: cc.Node = null;
    private lbnum: cc.Label = null;
    private lblastlevel: cc.Label = null;
    private lbcurlevel: cc.Label = null;
    private lbcoin_0: cc.Label = null;
    private lbcoin_1: cc.Label = null;
    private initNode() {
        this.animation = this.node.getComponent(cc.Animation);
        this.titleNode = this.node.getChildByName("titleNode");
        this.light = this.titleNode.getChildByName("light1");
        this.title_bg1 = this.titleNode.getChildByName("title_bg1").getComponent(cc.Sprite);
        this.title_bg2 = this.titleNode.getChildByName("title_bg2").getComponent(cc.Sprite);
        this.title_text = this.titleNode.getChildByName("wqgl").getComponent(cc.Sprite);
        this.new = this.node.getChildByName("new");
        this.levelNode = this.node.getChildByName("levelNode");
        this.skillPanel = this.node.getChildByName("skillPanel");
        this.rewardPanel = this.node.getChildByName("rewardPanel");
        this.scrollView = this.rewardPanel.getChildByName("scrollView").getComponent(cc.ScrollView);
        this.lbnum = this.node.getChildByName("lbnum").getComponent(cc.Label);
        this.lblastlevel = this.levelNode.getChildByName("mask").getChildByName("lblastlevel").getComponent(cc.Label);
        this.lbcurlevel = this.levelNode.getChildByName("mask").getChildByName("lbcurlevel").getComponent(cc.Label);
        this.killNode = this.node.getChildByName("killNode");
        this.barSprite = this.killNode.getChildByName("killProgress").getChildByName("bar").getComponent(cc.Sprite);
        this.lbkill = this.killNode.getChildByName("lblKill").getComponent(cc.Label);
        this.multBtn = this.node.getChildByName("multBtn");
        this.sblq = this.multBtn.getChildByName("bg").getChildByName("sblq");
        this.dblq = this.multBtn.getChildByName("bg").getChildByName("12blq");
        this.normalBtn = this.node.getChildByName("normalBtn");
        this.lbcoin_0 = this.normalBtn.getChildByName("bg").getChildByName("layout").getChildByName("lbcoin").getComponent(cc.Label);
        this.lbcoin_1 = this.multBtn.getChildByName("bg").getChildByName("layout").getChildByName("lbcoin").getComponent(cc.Label);
    }

    private initUI() {
        if (this._args) {
            let list = this._args.isFirst ? this.winSpriteFrameList : this.failSpriteFrameList;
            this.light.active = this._args.isFirst;
            this.new.active = this._args.isNew;
            this.title_bg1.spriteFrame = list[0];
            this.title_bg2.spriteFrame = list[1];
            this.title_text.spriteFrame = list[2];

            GameVoManager.getInstance.myUserVo.drawKill += this._args.killNum;
            if (GameVoManager.getInstance.myUserVo.drawKill >= Const.DrawKillNum) {
                GameVoManager.getInstance.myUserVo.drawKill = Const.DrawKillNum;
                this.isDraw = true;
            }
            this.lbkill.string = `${GameVoManager.getInstance.myUserVo.drawKill}/${Const.DrawKillNum}`;
            this.barSprite.fillStart = GameVoManager.getInstance.myUserVo.drawKill / Const.DrawKillNum;
            this.sblq.active = !this.isDraw;
            this.dblq.active = this.isDraw;
            this.lbcoin_0.string = Util.goldFormat(this._args.coin);
            this.lbcoin_1.string = this.isDraw ? Util.goldFormat(this._args.coin * 12) : Util.goldFormat(this._args.coin * 3);
            this.showPanel();
            if (this._args.levelUp) {
                this.lblastlevel.string = `${GameVoManager.getInstance.myUserVo.roleLv - 1}`;
                this.lbcurlevel.string = `${GameVoManager.getInstance.myUserVo.roleLv}`;
                this.animation.play("result_0");
            } else {
                this.animation.play("result_1");
            }
        }
        this.animation.on("finished", () => {
            console.log("====动画结束======")
            this.animaEnd = true;
        }, this)
    }

    private showPanel() {
        let chapterId = this._args.chapterId; //Util.levelToChapterId(this._args.curLevel)[0];
        let chapterData: ChapterCfg = Cfg.Chapter.get(chapterId);
        this.lbnum.string = `章节进度：${this._args.curLevel - chapterData.startLevel}/${chapterData.attackCount}`;
        if (this._args.isFirst) {
            if (chapterData.unlockSkillList.length == 0) {
                this.skillPanel.active = false;
                this.rewardPanel.active = true;
                this.initRewardList();
            } else {
                this.skillPanel.active = true;
                this.rewardPanel.active = false;
                this.initSkillList(chapterData.unlockSkillList);
            }
        } else {
            this.skillPanel.active = false;
            this.rewardPanel.active = true;
            this.initRewardList();
        }
    }

    private initSkillList(skillList: number[]) {
        for (let i = 0; i < skillList.length; i++) {
            let node = cc.instantiate(this.skillCell);
            node.parent = this.skillPanel.getChildByName("layout");
            node.y = 0;
            node.getComponent(SkillCell).setItemInfo({
                index: skillList[i],
                info: {
                    id: skillList[i],
                    clickHandler: () => {
                        Notifier.send(ListenID.SKillTips_Open, { id: skillList[i] } as SkillTipsData);
                    }
                },
            });
        }
    }

    private initRewardList() {
        let data = this._args.rewardList;
        if (!data || data.length <= 0) this.rewardPanel.active = false;
        let high = 143 * Math.ceil(data.length / 4);
        this.scrollView.content.height = high;
        let i = 0;
        this.schedule(() => {
            let equipdata = Cfg.Equip.get(data[i]);
            let roleEquipID = GameVoManager.getInstance.getEquipID(equipdata.part - 1);

            let node = cc.instantiate(this.goodsItemPrefab);
            node.parent = this.scrollView.content;
            node.getComponent(ItemCell).initItem({
                index: -1,
                itemID: equipdata.id,
                quality: equipdata.quality,
                step: equipdata.level,
                clickHandler: () => {
                    let equipTipsData: EquipTipsData = {
                        type: EquipTipsType.Normal,
                        itemLeftID: equipdata.id,
                        comparePosNode: node,
                        compareID: roleEquipID,
                    }
                    Notifier.send(ListenID.Equip_OpenTipsView, equipTipsData);
                },
            });
            i++;
        }, 0, data.length - 1, 2);
    }

    public runGoldAnim(mult: number = 1) {
        this.runAnima = true;
        Util.showGoldEffect(this.node, 0, cc.v2(0, 0), cc.v2(-317, 594), 0, 0.2);
        this.scheduleOnce(() => {
            let coin = this._args.coin * mult;
            GameVoManager.getInstance.setGold(coin);
            GameVoManager.getInstance.saveData();
            Notifier.send(ListenID.Result_BackHome);
        }, 1);
    }


    private onClickNormalBtn() {
        if (!this.animaEnd) return
        if (this.runAnima) return
        Manager.audio.playAudio(501, AudioType.UI);
        if (this._args.coin > 0) {
            this.runGoldAnim(1);
        } else {
            Notifier.send(ListenID.Result_BackHome);
        }
    }

    private onClickMultBtn() {
        if (!this.animaEnd) return
        if (this.runAnima) return
        if (!this.isDraw) {
            if (this._args.coin > 0) {
                this.runGoldAnim(3); this.runGoldAnim(3);
            } else {
                Notifier.send(ListenID.Result_BackHome);
            }
        } else {
            UIManager.Open(Common_UIPath.DrawUI, MVC.eTransition.Scale, MVC.eUILayer.Popup);
        }
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
    }
}
