const {ccclass, property} = cc._decorator;

interface PropertyItemData {
    /** 属性名字 */
    name: string,
    /** 属性数值 */
    value: string,
    /** 属性变化 （0: 不显示， 大于0: 上升， 小于0: 下降） */
    delta?: number,
    /** 是否新增 */
    isNew?: boolean
}
/**
 * 通用属性条
 */
@ccclass
export default class PropertyItemCom extends cc.Component {
    /** 属性名字 */
    @property(cc.Label)
    lblPropertyName: cc.Label = null;

    /** 属性数值 */
    @property(cc.Label)
    lblPropertyValue: cc.Label = null;

    /** 属性变化 */
    @property(cc.Sprite)
    imgPropertyDelta: cc.Sprite = null;

    /** 属性变化精灵帧 */
    @property(cc.SpriteFrame)
    deltaSpFrameArr: cc.SpriteFrame[] = [];

    private _propertyName: string = "";
    private _propertyValue: string = "";
    private _propertyDelta: number = 0;
    private _propertyIsNew: boolean = false;

    initPropertyItem(param: PropertyItemData){
        this._propertyName = param.name;
        this._propertyValue = param.value;
        this._propertyDelta = param.delta;
        this._propertyIsNew = param.isNew;
        this.onFlush();
    }

    setActive(bool: boolean){
        this.node.active = bool;
    }

    setColor(color: string){
        this.lblPropertyName.node.color = new cc.Color().fromHEX(color);
    }

    onFlush(type: string = `all`){
        switch(type){
            case `all`: {
                this._updateLblPropertyName();
                this._updateLblPropertyValue();
                this._updateImgPropertyDelta();
                break;
            }
        }
    }

    private _updateLblPropertyName(){
        this._propertyName = this._propertyName ? this._propertyName + ":" : "";
        this.lblPropertyName.string = this._propertyName;
        this.lblPropertyName.node.active = !!this._propertyName;
    }

    private _updateLblPropertyValue(){
        this.lblPropertyValue.string = this._propertyValue + "";
    }

    private _updateImgPropertyDelta(){
        if (!this._propertyDelta){
            this.imgPropertyDelta.node.active = false;
        }else{
            let index = this._propertyDelta > 0 ? 1 : 0;
            index = this._propertyIsNew ? 2 : index;
            this.imgPropertyDelta.spriteFrame = this.deltaSpFrameArr[index];
            /** 没有属性名则不显示对比 */
            this.imgPropertyDelta.node.active = !!this._propertyName;
        }
    }
}
