//import  {HTTPOptions , serve , Server ,ServerRequest, decode}  from "../std/std.ts"
import Register from "../register/register.ts";
import { RouterListInterface } from "../interface/Interface.ts";
import Util from "../util/Util.ts";
import { HTTPOptions, Server, serve, ServerRequest, decode } from "../std/std.ts";
const {readAll} = Deno;
export default class {
    
    /**
     * 
     * @param prot 服务端口号
     */
    public constructor(prot : HTTPOptions ){
        Register.ListerHttpPort = prot;
        this.acceptRequest(serve(Register.ListerHttpPort));
    }
    private async acceptRequest(serve : Server){
        for await (const req  of serve) {
            this.findPath(req)
        }
    }
    public get(path :string , event : Function){
        Register.registerEvent('GET' , path , event);
    }
    public post(path :string , event : Function){
        Register.registerEvent('POST' , path , event);
    }
    public Cros(){
        this.setCros()
    }
    private setCros(){
        Util.Headers.set("Access-Control-Allow-Origin", "*");
        Util.Headers.set('content-type','text/html')
    }
    private async findPath(req : ServerRequest){
        let url = Util.parseRequestPath(req.url);
        let event : RouterListInterface | undefined = Register.routerList.get(url);
        if(!event){
            req.respond({
                headers : Util.Headers,
                status : 404,
                body : 'not found!3'
            }).then((res : any)=>{

            }).catch((err : any)=>{

            }).finally(()=>{
            });
        }else{
            if(event.method === 'POST'){
                event.event(JSON.parse(decode(await readAll(req.body)))); 
                req.respond({
                    headers : Util.Headers,
                    status : 200,
                }).then((res : any)=>{
                    
                }).catch((err : any)=>{

                }).finally(()=>{
                });
            }else if(event.method === 'GET'){
                let body = decodeURI(Util.parseRequestParm(url , req.url));
                let message = null;
                message = event.event(JSON.parse(body)); 
                req.respond({
                    headers : Util.Headers,
                    status : 200,
                    body : JSON.stringify(message),
                }).then((res : any)=>{
                    
                }).catch((err :any)=>{
                    
                }).finally(()=>{
                });;
            }
        }
    }
}