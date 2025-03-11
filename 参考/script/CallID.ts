/// <summary>
/// 模块调用消息定义 >= 1000
/// 格式说明:模块名称_函数名称 = XXX, 首字母大写，最好加上函数参数说明
/// 每个模块id占用必须都是1000的整数倍
/// 例如 Game_Start = 1000,
/// </summary>
export enum CallID {
    _Start = 999,
    Game_IsStart,
    Setting_IsMuteMusic,
    Setting_IsMuteAudio,
    Setting_IsBlockShake,
    Setting_IsHurtShow,
    Setting_GetRealDesignSize,

    Shop_HaveUnLockGoods,

    //战斗
    Fight_GetMonCapacity,

    //装备
    Equip_GetBodyEquipPro,
    Equip_GetEquipIsLock,
    Equip_GetEquipBagNum,
    Equip_GetUnLockPart,
    //掉落
    Drop_GetDropPoolRewardById,

    Offline_GetReward,
    Offline_CanShow,
    Offline_GetRewardByTime,

    ResultIsCloseing,

    RewardTask_GetAllNumberReward,//悬赏
    Menu_GetChapterInfo,

    Event_GetNotiggerList,
    Get_EcologicalPoint,

    Techonlogy_GetAllProperty,
}


