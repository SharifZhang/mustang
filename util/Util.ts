export default class Util{
    public static parseRequestPath(url: string) {
        return url.replace(/(\?(.*))|(\#(.*))/, "");
    };
    public static parseRequestParm(url: string , path :string) {
        return path.replace(url + '?' , "");
    };
    public static Headers = new Headers();
}
  