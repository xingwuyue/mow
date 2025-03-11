
class _Config {
    /*
    * 游戏服地址
    */
    public get gameUrl(): string {
        return this._gameUrl;
    }

    private _gameUrl: string = "https://xyx.kuaiyugo.com/node3/t1/p29/";
    public setGameUrl(gameUrl: string): void {
        this._gameUrl = gameUrl;
    }

    private _CommonUrl: string = "https://xyx.kuaiyugo.com/node3/t1/public/p2/";
    public setCommonUrl(commonUrl: string): void {
        this._CommonUrl = commonUrl;
    }
    public get CommonUrl(): string {
        return this._CommonUrl;
    }
    public get token(): string {
        return this._token;
    }

    private _token: string = "";
    public setToken(token: string): void {
        this._token = token;
    }
}

export const Config = new _Config();