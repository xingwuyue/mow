import { UIManager } from "../framework/UIManager";
import { Common_UIPath } from "../common/Common_Define";
import { MVC } from "../framework/MVC";

export class SceneManager {
    private static _instance = null;
    public constructor() {
        SceneManager._instance = this;
    }

    public static getInstance() {
        if (SceneManager._instance == null) {
            new SceneManager();
        }
        return SceneManager._instance;
    }

    changeToGameScene(loadingIn, loadingOut) {
        UIManager.Open(Common_UIPath.loadingUI, MVC.eTransition.Loading, MVC.eUILayer.Loading, { openCb: loadingIn, closeCb: loadingOut }, false);
    }

    closeLoading() {
        UIManager.Close(Common_UIPath.loadingUI);
    }
}
