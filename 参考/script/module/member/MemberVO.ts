export default class MemberVO {
    /** 是否是会员 */
    isMember: boolean = false;
    /** 会员起始时间 */
    memberStartTime: number = 0;
    /** 会员结束时间 */
    memberEndTime: number = 0;
    /** 每天可领取钻石 */
    diamond: number = 0;
    /** 视频再翻倍次数 */
    videoDoubleNum: number = 0;
    /** 复活面广告次数 */
    reliveNoAdventNum: number = 0;
}