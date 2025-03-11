import { Guide } from "../../common/Common_Define";

export default class GuideNewVO {
    /** 引导ID */
    guideId: number = 0;
    /** 当前在执行的指引ID */
    curGuideId: number = -1;
    /** 上一次执行的指引ID */
    lastGuideId: number = -1;
    /** 触发类型 */
    triggerType: number = 1;
    /** 事件Id */
    eventId: number = 1;
    /** 触发条件ID */
    condition: {[key: string]: number} = null;
    /** 节点对象的tag */
    nodeTag: number = 800;
    /** 非遮罩形状 */
    shape: number = 1;
    /** 框的宽高和偏移 */
    rectSize: number[] = [100, 200, 0, 0];
    /** 光框宽高和偏移 */
    lightSize: number[] = [100, 200, 0, 0];
    /** 箭头位置 */
    arrowPos: number[] = [0, 0];
    /** 箭头方向 */
    arrowDir: number = 1;       //1 上 2下 3左 4右
    /** 上一步引导ID */
    preId: number = 1;
    /** 下一步引导ID */
    nextId: number = 2;
    /** 提示 */
    tips: string = "";
    /** tipsPos */
    tipsPos: number[] = [0, 0];
    /** 是否点击任意区域进入下一步 */
    clickAnyClose: boolean = false;
    /** 是否显示特效 */
    showEff: boolean = false;
    /** 指引类型 */
    guideType: number = 1;
    /** */
    guideModule: Guide.GuideModuleNum = 0;
    /** 是否正在指引 */
    isGuideing: boolean = false;
    /** 等待时间 */
    waitTime: number = 0;
}
