
import { RouterListInterface } from "../interface/Interface.ts";
import { HTTPOptions } from "../std/std.ts";
export default class {
    public static ListerHttpPort : HTTPOptions = {
        port : 3030,
        hostname : undefined,
    };
    private static _routerList : Map <string , RouterListInterface> = new Map();
    public static registerEvent(method : string , path :string , event : Function) {
        if (path[0] !== "/") {
            path = `/${path}`;
        }
        this._routerList.forEach((value , key)=>{
            if(path === key){
                return new Error('Existing path')
            }
        })
        this._routerList.set(path , {
            method : method,
            path : path,
            event : event,
        })
    }
    public static get routerList() : Map <string , RouterListInterface> {
        return this._routerList;
    }
}