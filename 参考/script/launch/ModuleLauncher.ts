import { LoginController } from "../module/login/LoginController";
import { FightController } from "../module/fight/FightController";
import { SettingController } from "../module/setting/SettingController";
import { MenuController } from "../module/menu/MenuController";
import { ShopController } from "../module/shop/ShopController";
import { MoreGoldController } from "../module/moregold/MoreGoldController";
import { GroupController } from "../module/group/GroupController";
import CheatController from "../module/cheat/CheatController";
import ResultNewController from "../module/result/ResultNewController";
import FunOpen from "../module/funopen/FunOpen";
import MemberController from "../module/member/MemberController";
import { BannerController } from "../common/BannerController";
import TipsLoadingController from "../module/tips/TipsLoadingController";
import { BtnController } from "../common/BtnController";
import { BossController } from "../module/boss/BossController";
import RemindController from "../module/tips/RemindController";
import GameLogManager from "../manager/gamelogmanager/GameLogManager";
import { EquipController } from "../module/equip/EquipController";
import { BoxController } from "../module/box/BoxController";
import DropController from "../module/drop/DropController";
import EquipTipsController from "../module/equip/EquipTipsController";
import { OffLineController } from "../module/offline/OffLineController";
import FunUnlockTipsController from "../module/tips/FunUnlockTips/FunUnlockTipsController";
import GuideNewController from "../module/guide/GuideNewController";
import { PersonController } from "../module/person/PersonController";
import { RankController } from "../module/rank/RankController";
import { AnnounceController } from "../module/announce/AnnounceController";
import { RewardTaskController } from "../module/rewardtask/RewardTaskController";
import { SkillController } from "../module/skill/SkillController";
import SkillTipsController from "../module/tips/skilltips/SkillTipsController";
import { EventController } from "../module/event/EventController";
import TechnologyController from "../module/technology/TechnologyController";
import { EcologicalController } from "../module/ecologicalview/EcologicalController";

//模块启动器
export class ModuleLauncher {
    public constructor() {
        new LoginController();
        new FightController();
        new OffLineController();
        new EquipController();
        new SettingController();
        new MenuController();
        new ShopController();
        new MoreGoldController();
        new GroupController();
        new CheatController();
        new ResultNewController();
        new DropController();
        new FunOpen();
        new MemberController();
        new BannerController();
        new TipsLoadingController();
        new BtnController();
        new BossController();
        new RemindController();
        new GameLogManager();
        new BoxController();
        new EquipTipsController();
        new FunUnlockTipsController();
        new GuideNewController();
        new PersonController();
        new RankController();
        new AnnounceController();
        new RewardTaskController();
        new SkillController();
        new SkillTipsController();
        new EventController();
        new TechnologyController();
        new EcologicalController();
    }
}