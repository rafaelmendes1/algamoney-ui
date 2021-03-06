import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(private http: Http,
    private jwtHelper: JwtHelper) {
      this.carregarToken();
      this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1MWFy');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.armazenarToken(response.json().access_token);
    })
    .catch(response => {
      if(response.status === 400) {
        const responseJson = response.json();

        if(responseJson.error === 'invalid_grant') {
          return Promise.reject('Úsuario ou senha inválida!');
        }
      }

      return Promise.reject(response);
    });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1MWFy');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.armazenarToken(response.json().access_token);
      console.log("Novo token criado!")

      return Promise.resolve(null);
    })
    .catch(response => {
      console.error('Erro ao renovar token.', response);

      return Promise.resolve(null);
    });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token =  localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for(const role of roles) {
      if(this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if(token) {
      this.armazenarToken(token);
    }
  }
}
