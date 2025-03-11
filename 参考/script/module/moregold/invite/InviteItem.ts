


const { ccclass, property } = cc._decorator;

@ccclass
export default class InviteItem extends cc.Component {

    // @property(cc.Node)
    // yellow_bg: cc.Node = null;

    // @property(cc.Node)
    // icon_gun: cc.Node = null;

    // @property(cc.Label)
    // lb_id: cc.Label = null;
    // @property(cc.Label)
    // lb_text: cc.Label = null;
    // @property(cc.Label)
    // lb_num: cc.Label = null;

    // @property(cc.Sprite)
    // head: cc.Sprite = null;
    // @property(cc.Node)
    // isget: cc.Node = null;
    // @property(cc.Node)
    // notinvite: cc.Node = null;
    // @property(cc.Node)
    // btn_getreward: cc.Node = null;
    // @property(cc.Node)
    // mark: cc.Node = null;

    // @property(cc.Node)
    // goldIcon: cc.Node = null;
    // @property(cc.Node)
    // diamondIcon: cc.Node = null;

    // _invite: boolean;
    // _args: InviteCfg;

    // initItem(args: InviteCfg, invite: boolean = false, headUrl?: string){
    //     this.lb_id.string = `${args.id}`;
    //     this.lb_text.string = `邀请1位好友`;
    //     this.lb_num.string = `+${args.awardCount}`;
    //     this._invite = invite;
    //     this._args = args;
    //     if(args.awardType == 2){
    //         this.goldIcon.active = false;
    //         this.diamondIcon.active = true;
    //     }else{
    //         this.goldIcon.active = true;
    //         this.diamondIcon.active = false;
    //     }

    //     if(headUrl && headUrl != ""){
    //         cc.loader.load(headUrl + "?a=a.jpg", (err, tex)=>{
    //             this.head.spriteFrame = new cc.SpriteFrame(tex);
    //         })
    //     }else{
    //         this.head.spriteFrame = null;
    //     }
    //     this.updateStatus();
    //     // this.yellow_bg.active = args.id == 3 ? true : false;
    //     // this.diamondIcon.active = args.id == 3 ? false : true;
    //     // this.lb_num.node.active = args.id == 3 ? false : true;
    //     // this.icon_gun.active = args.id == 3 ? true : false;
    // }

    // updateStatus(){
    //     if(GameVoManager.getInstance.myUserVo.inviteGetRewardList.indexOf(this._args.id) > -1){
    //         this.isget.active = true;
    //         this.notinvite.active = false;
    //         this.btn_getreward.active = false;
    //         // this.mark.active = true;
    //     }else{
    //         if(this._invite){
    //             this.isget.active = false;
    //             this.notinvite.active = false;
    //             this.btn_getreward.active = true;
    //         }else{
    //             this.isget.active = false;
    //             this.notinvite.active = true;
    //             this.btn_getreward.active = false;
    //         }
    //     }
    // }

    // onGetReward(){
    //     if(this._args.awardType == 2){
    //         GameVoManager.getInstance.setDiamond(this._args.awardCount);
    //         AlertManager.showNormalTips(`成功领取${this._args.awardCount}钻石!`);
    //         Notifier.send(ListenID.GetInviteReward);
    //         HD_MODULE.getNet().postGameEvent({ event_name: 'diamond_invite', counter: 1 });
    //     }else{
    //         GameVoManager.getInstance.setGold(this._args.awardCount);
    //         AlertManager.showNormalTips(`成功领取${this._args.awardCount}金币!`);
    //     }
    //     GameVoManager.getInstance.myUserVo.inviteGetRewardList.push(this._args.id);
    //     GameVoManager.getInstance.saveData();
    //     this.updateStatus();
    // }

    // showNode(show: boolean){
    //     this.node.active = show;
    // }

}
