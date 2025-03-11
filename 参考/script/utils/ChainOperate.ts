/**
 * 链操作,完成一个操作才出现下一个
 * 多操作同时出现则按优先级高低进行缓存
 */
export default class RuanChainOperate {
    private _instance: RuanChainOperate = null;
    public getInstance(){
        if(!this.getInstance()){
            this._instance = new RuanChainOperate();
        }
        return this._instance;
    }

    public rigisterChainOperate(name: string, callBack: Function){

    }
}
