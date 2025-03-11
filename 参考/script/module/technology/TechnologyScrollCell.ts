import BaseCell, { BaseCellData } from "../../component/itemscroll/BaseCell";
import { AlertManager } from "../../alert/AlertManager";
import TechAttrCom from "../../component/technology/TechAttrCom";
import { RemouldCfg } from "../../config/RemouldCfg";
import { GameVoManager } from "../../manager/GameVoManager";
import { PropertyDefine } from "../equip/Property";
import TechnologyModel from "./TechnologyModel";
import { Technology, Guide } from "../../common/Common_Define";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Util } from "../../utils/Util";
import { Manager } from "../../manager/Manager";
/**
 * 科技系统itemRender
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class TechnologyScrollCell extends BaseCell {
    /** 科技名字1 */
    @property(cc.Label)
    lblTechName1: cc.Label = null;

    // /** 科技名字2 */
    // @property(cc.Label)
    // lblTechName2: cc.Label = null;

    @property(cc.Sprite)
    spProbar1: cc.Sprite = null;

    // @property(cc.Sprite)
    // spProbar2: cc.Sprite = null;

    @property(cc.Label)
    lblProbarText1: cc.Label = null;

    // @property(cc.Label)
    // lblProbarText2: cc.Label = null;

    @property(cc.Label)
    lblAttrName1: cc.Label = null;

    // @property(cc.Label)
    // lblAttrName2: cc.Label = null;

    @property(TechAttrCom)
    techAttrCom1: TechAttrCom = null;

    // @property(TechAttrCom)
    // techAttrCom2: TechAttrCom = null;

    @property(cc.Button)
    btn1: cc.Button = null;

    // @property(cc.Button)
    // btn2: cc.Button = null;

    @property([cc.SpriteFrame])
    imgCostTypeSpFrameArr: cc.SpriteFrame[] = [];

    /** 未解锁遮罩 */
    @property(cc.Node)
    lockNode: cc.Node = null;

    @property(cc.Label)
    lblLockTipsText: cc.Label = null;

    /** 科技名字1 */
    private _techName1: string = `枪械改造1`;
    // /** 科技名字2 */
    // private _techName2: string = `枪械改造2`;
    /** 科技1当前等级 */
    private _curProNum1: number = 0;
    /** 科技1最大等级 */
    private _maxProNum1: number = 1;
    // /** 科技2当前等级 */
    // private _curProNum2: number = 0;
    // /** 科技2最大等级 */
    // private _maxProNum2: number = 1;
    /** 科技1属性名字 */
    private _attrName1: string = ``;
    // /** 科技2属性名字 */
    // private _attrName2: string = ``;
    /** 科技1消耗类型 */
    private _costTypeIndex1: number = 0;
    // /** 科技2消耗类型 */
    // private _costTypeIndex2: number = 0;
    /** 科技1属性基础值 */
    private _techBaseValue1: number = 0;
    // /** 科技2属性基础值 */
    // private _techBaseValue2: number = 0;
    /** 科技1属性变化值 */
    private _techDeltaValue1: number = 0;
    // /** 科技2属性变化值 */
    // private _techDeltaValue2: number = 0;
    /** 科技1消耗数量 */
    private _costNum1: number = 0;
    // /** 科技2消耗数量 */
    // private _costNum2: number = 0;
    /** 是否锁着的 */
    private _isLock: boolean = false;

    /** 配置信息 */
    private _cfgInfos: RemouldCfg[] = null;

    private _gameVo: GameVoManager = GameVoManager.getInstance;
    private _model: TechnologyModel = TechnologyModel.getInstance();

    start(){
        this.changeListener(true);
        // this._setPro2();
        if(this._index == 0){
            this.rigisterGuideCheck();
        }
    }

    changeListener(bool: boolean) {
        Notifier.changeListener(bool, ListenID.TechnologyLevel_Change, this.onTechLevelChange, this);
        Notifier.changeListener(bool, ListenID.TechnologyPoint_Change, this.onTechPointChange, this);
        Notifier.changeListener(bool, ListenID.Game_UpdateGold, this.onGoldChange, this);
    }

    setItemInfo(data: BaseCellData){
        if(!data) return;
        super.setItemInfo(data);
        this._cfgInfos = data.info;
        this.updateCell();
        this.onFlush(`lockNode`);
    }


    onBtn1Click(){
        this.onBuyUpgrade(0);
    }

    onBtn2Click(){
        this.onBuyUpgrade(1);
    }

    rigisterGuideCheck(){
        /** 启动按钮 */
        let data: Guide.GuideItemData = {
            node: cc.find(`btnCost1`, this.node),
            tag: 11601,
            callBack: () => {
                this.onBtn1Click();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, data);

        /** 升级按钮 */
        let data1: Guide.GuideItemData = {
            node: cc.find(`btnCost1`, this.node),
            tag: 11701,
            callBack: () => {
                this.onBtn1Click();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, data1);
    }

    onBuyUpgrade(btnIndex: number){
        Manager.audio.playAudio(501);
        let data = this._model.vo.data;
        if (data) {
            let info = data[this._index][btnIndex];
            let techLv = this._gameVo.myUserVo.tech[info.ID] || 0;
            let msg = `金币不足\n通过[重刷章节、生态研究]获得更多金币`;
            let canUpgrade = false;
            if (this._model.getLevelIsMax(this._index, btnIndex)) {
                msg = `科技等级已满`;
            }else{
                let costInfo = info.gradePrice[techLv];
                let costType = costInfo[0];
                let costNum = costInfo[1];
                switch (costType) {
                    case Technology.CostType.Gold: {
                        if (this._gameVo.myUserVo.gold >= costNum) {
                            canUpgrade = true;
                            this._gameVo.setGold(-costNum);
                        }
                        break;
                    }
                    case Technology.CostType.TechPoint: {
                        if (this._gameVo.myUserVo.techP >= costNum) {
                            canUpgrade = true;
                            this._gameVo.setTechPoint(this._gameVo.myUserVo.techP - costNum);
                        } else {
                            msg = `科技点不足\n通过[生态研究]获得更多科技点`;
                        }
                        break;
                    }
                }
            }
            if (canUpgrade) {
                this._gameVo.upgradeTechnology(info.ID);
                this._model.updateAllProperty();
                Notifier.send(ListenID.Log_Event, { event_name: `remould_${this._index * 2 + btnIndex + 1}_upgrade`, counter: 1 });
                let isMax = this._model.getLevelIsMax(this._index, btnIndex);
                if (isMax){
                    Notifier.send(ListenID.Log_Event, { event_name: `remould_${this._index * 2 + btnIndex + 1}_fullLevel`, counter: 1 });
                }
                this._model.updateCanUpgradeNum();
            } else {
                AlertManager.showNormalTips(msg);
            }
        }
    }

    /** 未解锁提示 */
    onLockTips(){
        AlertManager.showNormalTips(`通过第` + this._cfgInfos[0].unlockChapters + `章解锁`);
    }

    onTechLevelChange(data: {id: number}){
        if (!this._cfgInfos) return;
        for(let i = 0; i < this._cfgInfos.length; ++i){
            let info = this._cfgInfos[i];
            let id = info.ID;
            if(id == data.id){
                this.updateCellRow(i);
            }
        }
    }

    onTechPointChange(){
        this.onFlush(`lblCost1`);
    }

    onGoldChange(){
        this.onFlush(`lblCost1`);
    }

    updateCell(){
        for (let i = 0; i < this._cfgInfos.length; ++i) {
            this.updateCellRow(i);
        }
    }

    updateCellRow(row: number){
        if (!this._cfgInfos) return;
        let info = this._cfgInfos[row];
        let lv = this._gameVo.myUserVo.tech[info.ID];
        lv = lv ? lv : 0;
        this[`_curProNum${row + 1}`] = lv;
        this[`_techName${row + 1}`] = info.name;
        this[`_curProNum${row + 1}`] = lv;
        this[`_maxProNum${row + 1}`] = info.upgradeMax;
        if (info.gradePrice[lv]) {
            this[`_costTypeIndex${row + 1}`] = info.gradePrice[lv][0] - 1;
            this[`_costNum${row + 1}`] = info.gradePrice[lv][1];
        }
        if (info.attribute[lv]) {
            let type = info.attribute[lv][0];
            this[`_attrName${row + 1}`] = PropertyDefine.equipIndexToName[type];
            this[`_techBaseValue${row + 1}`] = this._model.getPropertyByScrollIndex(this._index)[row];
            this[`_techDeltaValue${row + 1}`] = info.attribute[lv + 1] ? info.attribute[lv + 1][1] : info.attribute[lv][1];
            this[`_techDeltaValue${row + 1}`] -= info.attribute[lv] ? info.attribute[lv][1] : 0;
        }
        this.onFlush(`row${row + 1}`);
    }

    onFlush(type: string = `all`){
        switch(type){
            case `all`: {
                this._updateLblTechName1();
                // this._updateLblTechName2();
                this._updatePro1();
                // this._updatePro2();
                this._updateAttr1();
                // this._updateAttr2();
                this._updateBtn1();
                // this._updateBtn2();
                this._updateLockNode();
                break;
            }
            case `techName`: {
                this._updateLblTechName1();
                // this._updateLblTechName2();
                break;
            }
            case `lockNode`: {
                this._updateLockNode();
                break;
            }
            case `row1`: {
                this._updateLblTechName1();
                this._updatePro1();
                this._updateAttr1();
                this._updateBtn1();
                this._setPro1();
                break;
            }
            case `row2`: {
                // this._updateLblTechName2();
                // this._updatePro2();
                // this._updateAttr2();
                // this._updateBtn2();
                break;
            }
            case `prog1`: {
                this._setPro1();
                break;
            }
            case `lblCost1`: {
                this._updateBtn1();
                break;
            }
        }
    }

    private _updateLblTechName1(){
        this.lblTechName1.string = this._techName1;
    }

    // private _updateLblTechName2(){
    //     this.lblTechName2.string = this._techName2;
    // }

    private _setPro1(){
        if(this._maxProNum1 > 0){
            this.spProbar1.fillRange = this._curProNum1 / this._maxProNum1;
        }
    }

    // private _setPro2(){
    //     if (this._maxProNum2 > 0) {
    //         this.spProbar2.fillRange = this._curProNum2 / this._maxProNum2;
    //     }
    // }

    private _updatePro1(){
        // if(this._maxProNum1 > 0){
            // this.spProbar1.fillRange = this._curProNum1 / this._maxProNum1;
            this.lblProbarText1.string = `Lv:` + this._curProNum1 + `/` + this._maxProNum1;
        // }
    }

    // private _updatePro2(){
    //     // if (this._maxProNum2 > 0) {
    //         // this.spProbar2.fillRange = this._curProNum2 / this._maxProNum2;
    //         this.lblProbarText2.string = `Lv:` + this._curProNum2 + `/` + this._maxProNum2;
    //     // }
    // }

    private _updateAttr1(){
        this.lblAttrName1.string = this._attrName1;
        let isMax = this._model.getLevelIsMax(this._index, 0);

        let str1 = `+` + this._techBaseValue1;
        let str2 = isMax ? `` : `+` + this._techDeltaValue1;
        this.techAttrCom1.setData({
            text1: str1,
            text2: str2,
            showArrow: !isMax,
        });
    }

    // private _updateAttr2() {
    //     this.lblAttrName2.string = this._attrName2;
    //     let isMax = this._model.getLevelIsMax(this._index, 1);
    //     let str1 = `+` + this._techBaseValue2;
    //     let str2 = isMax ? `` : `+` + this._techDeltaValue2;
    //     this.techAttrCom2.setData({
    //         text1: str1,
    //         text2: str2,
    //         showArrow: !isMax,
    //     });
    // }

    private _updateBtn1(){
        if (!this.btn1) return;
        let btnNode = this.btn1.node;
        if (btnNode)
            btnNode.active = !this._model.getLevelIsMax(this._index, 0);

        let lblText = cc.find(`lbl`, btnNode);
        if (lblText){
            let text = this._curProNum1 > 0 ? `提升` : `启动`;
            lblText.getComponent(cc.Label).string = text;
        }

        let imgCostType = cc.find(`layout/icon`, this.node).getComponent(cc.Sprite);
        if (imgCostType){
            let spFrame = this.imgCostTypeSpFrameArr[this._costTypeIndex1];
            if (spFrame)
                imgCostType.spriteFrame = spFrame;
        }

        let lblCostNum = cc.find(`layout/lblCost`, this.node).getComponent(cc.Label);
        if (lblCostNum) {
            lblCostNum.string = this._costNum1 + ``;
            let canBuy = this._model.getCanBuy(this._index, 0);
            lblCostNum.node.color = canBuy ? cc.Color.WHITE : cc.Color.RED;
        }

        let costLayout = cc.find(`layout`, this.node);
        if (costLayout)
            costLayout.active = !this._model.getLevelIsMax(this._index, 0);
    }

    // private _updateBtn2(){
    //     let btnNode = this.btn2.node;
    //     let imgCostType = cc.find(`layout/icon`, btnNode);
    //     let lblCostNum = cc.find(`layout/lblCost`, btnNode).getComponent(cc.Label);
    //     let lblText = cc.find(`lbl`, btnNode);

    //     let text = this._curProNum2 > 0 ? `提升` : `启动`;
    //     lblText.getComponent(cc.Label).string = text;

    //     let spFrame = this.imgCostTypeSpFrameArr[this._costTypeIndex2];
    //     if (spFrame)
    //         imgCostType.getComponent(cc.Sprite).spriteFrame = spFrame;

    //     lblCostNum.string = this._costNum2 + ``;
    //     let canBuy = this._model.getCanBuy(this._index, 1);
    //     lblCostNum.node.color = canBuy ? cc.Color.WHITE : cc.Color.RED;

    //     btnNode.active = !this._model.getLevelIsMax(this._index, 1);
    // }

    private _updateLockNode(){
        let chapters = Util.levelToPassChapter(GameVoManager.getInstance.myUserVo.topLevel);
        let chapter = chapters[0];
        this._isLock = chapter <= this._cfgInfos[0].unlockChapters;
        this.lockNode.active = this._isLock;
        this.lblLockTipsText.string = `通过第` + this._cfgInfos[0].unlockChapters + `章解锁`;
        this.btn1.interactable = !this._isLock;
    }

    update(dt){
        if (this._maxProNum1 > 0) {
            if (this.spProbar1.fillRange < this._curProNum1 / this._maxProNum1){
                this.spProbar1.fillRange += dt * 0.5;
            }
        }
        // if (this._maxProNum2 > 0) {
        //     if (this.spProbar2.fillRange < this._curProNum2 / this._maxProNum2) {
        //         this.spProbar2.fillRange += dt * 0.5;
        //     }
        // }
    }
}
