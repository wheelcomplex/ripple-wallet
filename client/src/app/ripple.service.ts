import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class RippleService {
    constructor(private http: Http) { }
    ///////////////////////
    getWallet(address):Observable<any>{
        return this.httpget('api/getwallet/'+address);
    }
    getWallets():Observable<any> {
        return this.httpget('api/getwallets');
    }
    brainWallet(phrase): Observable<any> {
        return this.httpget('api/brainwallet/'+phrase);
    }
    newWallet(): Observable<any> {
        return this.httpget('api/newwallet');
    }
    importWallet(seed): Observable<any> {
        return this.httpget('api/importwallet/'+seed);
    }
    saveWallet():Observable<any>{
        return this.httpget('api/savewallet');
    }
    encryptWallet(address,password){
        return this.httpget('api/encryptwallet/'+address+"/"+password);
    }
    decryptWallet(address,password){
        return this.httpget('api/decryptwallet/'+address+"/"+password);
    }
    //////////////////////////////////
    accountinfo(address){
        return this.httpget("api/accountinfo/"+address);
    }
    private httpget(url){
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let data = res.json();
        return data || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}