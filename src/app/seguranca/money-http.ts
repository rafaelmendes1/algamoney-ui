import { Injectable } from "@angular/core";
import { Http, RequestOptions, RequestOptionsArgs, Response } from "@angular/http";

import { AuthHttp, AuthConfig, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs/Observable";

import { AuthService } from "./auth.service";

export class NotAuthenticatedError {}

export class MoneyHttp extends AuthHttp {

    constructor(
        private auth: AuthService,
        options: AuthConfig,
        http: Http, defOpts?: RequestOptions
    ) {
        super(options, http, defOpts);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.delete(url, options));
    }

    public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.options(url, options));
    }
    
    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.get(url, options));
    }
    
    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.post(url, body, options));
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.put(url, body, options));
    }

    public fazerRequisicao(fn: Function): Observable<Response> {
        if (this.auth.isAccessTokenInvalido()) {
            console.log("Requisição HTTP com access token inválido. Obtendo novo token...");

            const chamadaNovoAcessToken = this.auth.obterNovoAccessToken()
                .then(() => {
                    if(this.auth.isAccessTokenInvalido()){
                        throw new NotAuthenticatedError();
                    }

                    return fn().toPromise();
                });

            return Observable.fromPromise(chamadaNovoAcessToken);
        }else {
            return fn();
        }
    }

}