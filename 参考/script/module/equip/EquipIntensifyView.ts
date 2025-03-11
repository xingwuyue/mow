import { MVC } from "../../framework/MVC";
import { UIRoleManager, UIRole } from "../../component/UIRole";
import ItemCell from "../../component/itemscroll/ItemCell";
import EquipModel from "./EquipModel";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { CallID } from "../../CallID";
import { Manager } from "../../manager/Manager";
import { Cfg } from "../../config/Cfg";
import { PropertyVO, PropertyDefine } from "./Property";
import { IntensifyCfg } from "../../config/IntensifyCfg";
import { Util } from "../../utils/Util";
import { Const } from "../../config/Const";
import { AlertManager } from "../../alert/AlertManager";
import { Guide, TaskSubType, Common_UIPath } from "../../common/Common_Define";
import GuideNewController from "../guide/GuideNewController";
import { UIManager } from "../../framework/UIManager";

const { ccclass, property } = cc._decorator;

let partIndexToName = [
    "text_bw",
    "text_qk",
    "text_hj",
    "text_gz",
]

@ccclass
export default class EquipIntensifyView extends MVC.BaseView {


    /** 角色展示 */
    @property(cc.Node)
    roleDisplay: cc.Node = null;

    /** 装备格子 */
    @property(cc.Prefab)
    itemCell: cc.Prefab = null;

    /** 装备类型精灵帧 */
    @property(cc.SpriteFrame)
    equipTypeSpFrameArr: cc.SpriteFrame[] = [];

    @property([cc.Label])
    levelInfos: cc.Label[] = [];

    @property([cc.Label])
    propertyInfos: cc.Label[] = [];

    @property(cc.Label)
    curCostText: cc.Label = null;

    @property(cc.Label)
    allCostText: cc.Label = null;

    @property([cc.Label])
    battleTextList: cc.Label[] = [];

    @property([cc.Label])
    upgradeTextLevel: cc.Label[] = [];

    @property(cc.Label)
    allBattleNum: cc.Label = null;

    @property([cc.Node])
    btnImgs: cc.Node[] = [];

    @property(cc.Button)
    btnUpgrade: cc.Button = null;

    @property(cc.Button)
    btnClose: cc.Button = null;

    /** 角色展示 */
    private _roleDisplay: UIRole = null;

    /** GameVoManager */
    private _gameVO: GameVoManager = GameVoManager.getInstance;
    /** 装备格子 */
    private _equipCellList: ItemCell[] = [];

    protected changeListener(enable) {
        Notifier.changeListener(enable, ListenID.Role_BattleChange, this.updateBattle, this);
    }

    public onOpen(args) {
        super.onOpen(args);
        if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.MainView) {
            if (UIManager.getNodeByName(Common_UIPath.MenuUI)) {
                Notifier.send(ListenID.Menu_CloseMainView);
            }
        }
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.EquipIntenView;
        this.initNode();
        this.fixUI();
        this.setInfo(args);
    }

    public setInfo(args) {
        this.initEquipCell();
        this.initRoleDisplay();
        this.updateBattle();
        this.selectPartIndex(0);
        Notifier.send(ListenID.On_Open_Upgrade);

    }

    public openCallBack() {
        this._rigisterGuideCheck();
    }

    private _rigisterGuideCheck() {
        /** 强化按钮指引 */
        // let guideData: Guide.GuideItemData = {
        //     node: this.btnUpgrade.node,
        //     tag: 10402,
        //     tagLayer: this.uiLayer,
        //     callBack: () => {
        //         this.onUpgradeClick(null, "1");
        //     }
        // }
        // Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);
        let guideData: Guide.GuideItemData = {
            node: cc.find(`partInfo/nodepartinfo/btnAllUpgrade`, this.node),
            tag: 10401,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onUpgradeClick(null, "2");
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);

        /** 强化页离开指引 */
        let closeData: Guide.GuideItemData = {
            node: this.btnClose.node,
            tag: 10501,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.backEquip(false);
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, closeData);

        Notifier.send(ListenID.Guide_Check_Condition);
    }

    public fixUI() {
        // let btnbottom = this.node.getChildByName("btnbottom");
        let roleDisplay = this.node.getChildByName("imgRoleDisplay");
        Util.adapterNodeY(roleDisplay);
        Util.adapterNodeY(this.infoNode);
        // Util.adapterNodeY(btnbottom);
    }

    private updateIcon: cc.Node = null;
    private partInfoNode: cc.Node = null;
    private partBg: cc.Node = null;
    private limittext: cc.Label = null;
    private equipCellParent: cc.Node = null;
    private infoTips: cc.Node = null;
    private partIndex: cc.Sprite = null;
    private effect: cc.Animation = null;
    private infoNode: cc.Node = null;
    public initNode() {
        let realsize = Notifier.call(CallID.Setting_GetRealDesignSize);
        let close = this.node.getChildByName("btnBack");
        close.y = -realsize.height * 0.5 + 42;
        this.updateIcon = this.node.getChildByName("updateIcon");
        this.partInfoNode = this.node.getChildByName("partInfo");
        this.infoNode = this.partInfoNode.getChildByName("nodepartinfo");
        this.partBg = this.partInfoNode.getChildByName("bg");
        this.partBg.width = realsize.width;
        this.limittext = this.infoNode.getChildByName("limittips").getComponent(cc.Label);
        this.equipCellParent = this.node.getChildByName("equipCellParent");
        this.infoTips = this.partInfoNode.getChildByName("infoTips");
        this.partIndex = this.infoNode.getChildByName("partIndex").getComponent(cc.Sprite);
        this.effect = this.node.getChildByName("iconeffect").getComponent(cc.Animation);
    }

    public onClose(closeGuide: boolean = true) {
        UIRoleManager.recycleUIRole(this._roleDisplay);
        super.onClose({ closeGuide: closeGuide });
        Notifier.send(ListenID.On_Close_Upgrade);

    }

    public backEquip(closeGuide: boolean = true) {
        this.onClose(closeGuide);
        // Manager.audio.playAudio(501);
        Notifier.send(ListenID.Equip_OpenEquipView);
        Notifier.send(ListenID.Log_Event, { event_name: "intensifyPage_leave" });
    }

    /** 初始化角色展示 */
    public initRoleDisplay() {
        UIRoleManager.getUIRole((node) => {
            if (this.roleDisplay && cc.isValid(this.roleDisplay)) {
                this._roleDisplay = new UIRole();
                this._roleDisplay.init(node);
                node.scale = 1;
                this.roleDisplay.addChild(node);
            }
        })
    }

    /** 初始化人物装备格子 */
    public initEquipCell() {
        if (this._equipCellList.length == 0) {
            let cellPos = EquipModel.cellUpgradePos;
            for (let i = 0; i < EquipModel.partNum; ++i) {
                let cell = cc.instantiate(this.itemCell);
                cell.parent = this.equipCellParent;
                cell.position = cellPos[i];
                Util.adapterNodeY(cell);
                let cellInstance = cell.getComponent(ItemCell);
                let partIndex = i;
                cellInstance.setClickHandler((itemCell: ItemCell) => {
                    // Notifier.send(ListenID.Equip_OpenTipsView, { itemLeftID: itemCell.getItemID() });
                    this.selectPartIndex(partIndex);
                });
                this._equipCellList[i] = cellInstance;
                this.updateEquipCell(i);
            }
        }
    }

    public updateAllCell() {
        for (let i = 0; i < 4; i++) {
            this.updateEquipCell(i);
        }
    }

    /** 刷新人物装备格子 */
    public updateEquipCell(index: number) {
        let cellInstance = this._equipCellList[index];
        if (cellInstance) {
            let equipID = this._gameVO.getEquipID(index);
            let equipLv = this._gameVO.getEquipPartLevel(index);
            cellInstance.initItem({
                index: index,
                itemID: equipID,
                level: equipLv,
                showItemBG: true,
                itemTypeSpFrame: this.equipTypeSpFrameArr[index],
            });
        }
        let canUpgrade = EquipModel.getInstance.getCanUpgradeByPart(index);
        // cc.log("***** canUpgrade", canUpgrade);
        cellInstance.setCanUpgrade(canUpgrade);
    }


    public updateBattle() {
        this.allBattleNum.string = `${EquipModel.getInstance.myAllPro.getBattle()}`;
    }

    public onUpgradeClick(event, custom_data) {
        let type = Number(custom_data);
        GuideNewController.getInstance().setGuideIsFinish(Guide.GuideModuleNum.Upgrade, true);
        if (this.curLevel >= this.canUpgradeLevel) {
            if (this.isCanUpgrade)
                AlertManager.showNormalTips("金币不足，无法强化");
            else {
                AlertManager.showNormalTips("升到指定等级后可继续强化");
            }
            return;
        }
        if (type == 1) {
            Notifier.send(ListenID.Log_Event, { event_name: "intensifyPage_intensify" });
            if (GameVoManager.getInstance.myUserVo.gold >= this.curCostNum) {
                let costnum = this.curCostNum;
                GameVoManager.getInstance.addEquipPartLevel(this.curPartIndex, 1);
                Notifier.send(ListenID.Equip_StrengthUpdate, this.curPartIndex, this.nextLevel);
                this.effect.play();
                this.updateIcon.getComponent(cc.Animation).play();
                Manager.audio.playAudio(516);
                Notifier.send(ListenID.Log_Event, { event_name: "intensify_expendGold", counter: costnum });
                GameVoManager.getInstance.setGold(-costnum);
                this.selectPartIndex(this.curPartIndex);
                this.updateAllCell();
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.StrengTarget,
                    [GameVoManager.getInstance.getEquipPartLevel(this.curPartIndex), 1, this.curPartIndex + 1]);
            } else {
                AlertManager.showNormalTips("金币不足，无法强化");
            }
        } else if (type == 2) {
            Notifier.send(ListenID.Log_Event, { event_name: "intensifyPage_intensifyMax" });
            if (GameVoManager.getInstance.myUserVo.gold >= this.allCostNum) {
                let costnum = this.allCostNum;
                GameVoManager.getInstance.addEquipPartLevel(this.curPartIndex, this.canUpgradeLevel - this.curLevel);
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.StrengTarget,
                    [GameVoManager.getInstance.getEquipPartLevel(this.curPartIndex), this.canUpgradeLevel - this.curLevel, this.curPartIndex + 1]);
                Notifier.send(ListenID.Equip_StrengthUpdate, this.curPartIndex, this.canUpgradeLevel);
                this.effect.play();
                this.updateIcon.getComponent(cc.Animation).play();

                Manager.audio.playAudio(516);
                Notifier.send(ListenID.Log_Event, { event_name: "intensify_expendGold", counter: costnum });
                GameVoManager.getInstance.setGold(-costnum);
                this.selectPartIndex(this.curPartIndex);
                this.updateAllCell();
            } else {
                AlertManager.showNormalTips("金币不足，无法强化");
            }
        }
    }

    private updateIconOffset: cc.Vec2 = cc.v2(111, 38);
    private proNowProlist: PropertyVO[] = [];
    private proNextProList: PropertyVO[] = [];
    private curLevel: number = 0;
    private nextLevel: number = 0;
    private curCostNum: number = 0;
    private allCostNum: number = 0;
    private canUpgradeLevel: number = 0;
    private isCanUpgrade: boolean = true;
    private curPartIndex: number = 0;
    public selectPartIndex(partIndex) {
        let cell = this._equipCellList[partIndex];
        let id = cell.getItemID();
        if (!id) return;
        this.curPartIndex = partIndex;
        this.effect.node.position = EquipModel.cellUpgradePos[partIndex];
        Util.adapterNodeY(this.effect.node);
        this.updateIcon.position = EquipModel.cellUpgradePos[partIndex];
        Util.adapterNodeY(this.updateIcon);
        this.updateIcon.position = this.updateIcon.position.add(this.updateIconOffset);
        Manager.spAtlas.getEquipPartIcon(partIndexToName[partIndex]).then(res => {
            this.partIndex && (this.partIndex.spriteFrame = res);
        })
        let equipPartLevel = GameVoManager.getInstance.getEquipPartLevel(partIndex);
        let cellInstance = this._equipCellList[partIndex];
        cellInstance.setLevel(equipPartLevel);
        let equipData = Cfg.Equip.get(id);
        if (!this.proNowProlist[partIndex]) {
            this.proNowProlist[partIndex] = new PropertyVO(equipData.property);
        }
        if (!this.proNextProList[partIndex]) {
            this.proNextProList[partIndex] = new PropertyVO(equipData.property);
        }
        let curLevel = equipPartLevel;
        let nextLevel = curLevel + 1;
        this.curLevel = curLevel;
        this.nextLevel = nextLevel;
        //等级信息
        this.levelInfos[0].string = `Lv.${curLevel}`;
        this.levelInfos[1].string = `Lv.${nextLevel}`;

        this.proNowProlist[partIndex].setPartAndLevel(partIndex, curLevel);
        this.proNextProList[partIndex].setPartAndLevel(partIndex, nextLevel);
        let proindexs = EquipModel.getInstance.getShowPropertyIndexs(nextLevel, partIndex);
        //设置属性暂时最多2个属性
        for (let i = 0; i < 2; i++) {
            this.propertyInfos[2 * i].node.active = !!proindexs[i];
            this.propertyInfos[2 * i + 1].node.active = !!proindexs[i];
            if (proindexs[i]) {
                let index = proindexs[i];
                this.propertyInfos[2 * i].string = `${PropertyDefine.equipIndexToName[index]}：${this.proNowProlist[partIndex][PropertyDefine.equipIndexToKey[index]]}`;
                let str = this.nextLevel > GameVoManager.getInstance.myUserVo.equipUpgradeMaxLevel ? "已上限" : this.proNextProList[partIndex][PropertyDefine.equipIndexToKey[index]];
                this.propertyInfos[2 * i + 1].string = `${PropertyDefine.equipIndexToName[index]}：${str}`;
            }
        }
        this.battleTextList[0].string = `战力：${this.proNowProlist[partIndex].getBattle()}`;
        this.battleTextList[1].string = `战力：${this.proNextProList[partIndex].getBattle()}`;
        this.curCostNum = EquipModel.getInstance.getUpgradeCost(nextLevel, partIndex);
        this.curCostText.string = Util.goldFormat(this.curCostNum);
        let equipIndex = EquipModel.getInstance.getCanUpgradeLevelAndCost(partIndex);
        this.upgradeTextLevel[1].string = `Lv.${equipIndex[0]}`;
        this.canUpgradeLevel = equipIndex[0];
        //一键升级
        this.upgradeTextLevel[0].string = `Lv.${curLevel}`;
        this.allCostNum = equipIndex[1];
        this.allCostText.string = Util.goldFormat(this.allCostNum);
        let level = EquipModel.getInstance.getCanUpgradeLevel(partIndex, this.nextLevel);
        if (level) {
            this.isCanUpgrade = false;
            this.limittext.node.active = true;
            this.infoTips.active = false;
            // let chapterlist = Util.levelToChapterId(level);
            // this.limittext.string = `通关${chapterlist[0]}章${chapterlist[1]}关可继续强化`;
            this.limittext.string = `角色达到${level}级后可继续强化`;
        } else {
            this.limittext.node.active = false;
            this.infoTips.active = true;
            this.isCanUpgrade = true;
        }
        this.btnImgs[0].color = this.curLevel < this.canUpgradeLevel ? cc.Color.WHITE : cc.Color.WHITE.fromHEX("#E25744");
        this.btnImgs[1].color = this.curLevel < this.canUpgradeLevel ? cc.Color.WHITE : cc.Color.WHITE.fromHEX("#E25744");
    }
}
