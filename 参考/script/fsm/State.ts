import { BaseGameEntity } from "../component/BaseGameEntity";

export abstract class State<T extends BaseGameEntity>{
    public abstract Enter(entity:T);

    public abstract Execute(entity:T, dt);

    public abstract Exit(entity:T);
    
    public abstract OnMessage(entity:T, msg: any): boolean;
}