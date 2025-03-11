const {ccclass, property} = cc._decorator;

interface TechAttrData {
    text1: string,
    text2: string,
    showArrow: boolean
}

@ccclass
export default class TechAttrCom extends cc.Component {
    @property(cc.Label)
    lblText1: cc.Label = null;

    @property(cc.Label)
    lblText2: cc.Label = null;

    @property(cc.Sprite)
    imgArrow: cc.Sprite = null;

    /** 文本1 */
    private _text1: string = ``;
    /** 文本2 */
    private _text2: string = ``;
    /** 是否显示箭头 */
    private _showArrow: boolean = false;

    setData(data: TechAttrData){
        if (!data) return;
        this._text1 = data.text1;
        this._text2 = data.text2;
        this._showArrow = data.showArrow;
        this.onFlush();
    }

    onFlush(type: string = `all`){
        switch(type){
            case `all`: {
                this._updateLblText1();
                this._updateLblText2();
                this._updateImgArrow();
                break;
            }
        }
    }

    private _updateLblText1(){
        this.lblText1.string = this._text1;
    }

    private _updateLblText2(){
        this.lblText2.string = this._text2;
    }

    private _updateImgArrow(){
        this.imgArrow.node.active = this._showArrow;
    }
}
