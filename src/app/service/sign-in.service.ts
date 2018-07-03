import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DEVSERVER} from '../service/serve';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class SignInService {
  userName = '';
  logined = false;
  private signin = new BehaviorSubject<boolean>(false);
  SignIn = this.signin.asObservable();
  private user = new BehaviorSubject<string>('');
  User = this.user.asObservable();
  private accessToken = new BehaviorSubject<string>('');
  AccessToken = this.accessToken.asObservable();
  urlNewToken = DEVSERVER + 'api/auth/accessToken';
  refreshToken = '';
  constructor(    private http: HttpClient,
                  private roter: Router,

  ) { }
  add(userName: string) {
    this.userName = userName;
    this.logined = true;
  }
  remove() {
    this.userName = '';
    this.logined = false;
  }
  changeStatuslogin(login: boolean) {
    this.signin.next(login);
  }
  changeStatusUser(user: string){
    this.user.next(user);
  }
  changeAccessToken(token: string) {
    this.accessToken.next(token);
  }
  newToken() {
    this.http.post(this.urlNewToken, sessionStorage.getItem('refreshToken'))
      .subscribe(resJson => this.token(resJson),
        err => this.token(err.error)
      );
  }
  token(resJson) {
    if (resJson.code === 200) {
      localStorage.setItem('accessToken', (resJson.data.accessToken));
      localStorage.setItem ('refreshToken', (resJson.data.refreshToken));
      console.log(resJson.data.accessToken);
    }
    if (resJson.code === 401) {
      setTimeout(() => {
          this.roter.navigate(['/']);
        },
        2500);
    }
  }

}
