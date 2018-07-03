import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import swal from 'sweetalert2';
import {DEVSERVER} from '../service/serve';
import {Token} from '../class/token';

class Body {
  oldPassword: 'string';
  newPassword: 'string';
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private matchOldPassword = false;
  id: string;
  url = DEVSERVER + 'api/auth/newPassword';
  urlRefreshToken = DEVSERVER + 'api/auth/accessToken/refresh';
  token = new Token('', '');
  formPasswordReset: FormGroup;
  httpOptions;
  currentPassword = '';
  accessToken = '';
  Authorization: string;
  body = new Body();
  refreshToken = '';
  constructor(
    private roter: Router,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    // this.currentPassword = localStorage.getItem('password');
    this.token.accessToken = localStorage.getItem('accessToken');
    this.token.refreshToken = localStorage.getItem('refreshToken');
    this.http.post(this.urlRefreshToken, this.token)
      .subscribe(resJson => this.newToken(resJson),
        err => this.newToken(err.error)
      );
    this.formPasswordReset = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      rePassword: ['', Validators.required],
    }, {
      validator: this.MatchPassword,
    });
  }
  newToken(resJson) {
    if (resJson.code === 200) {
      localStorage.setItem('newAccessToken', (resJson.data.accessToken));
      localStorage.setItem ('newRefreshToken', (resJson.data.refreshToken));
      console.log(resJson.data.accessToken);
    }
    if (resJson.code === 401) {
      swal({
        type: 'error',
        title: 'Đổi mật khẩu thất bại!',
        text: 'Phiên sử dụng của bạn đã hết, mời bạn đăng nhập lại!',
      });
      setTimeout(() => {
          this.roter.navigate(['/']);
        },
        2500);
    }
  }
  get oldPassword() {
    return this.formPasswordReset.get('oldPassword');
  }
  get password() {
    return this.formPasswordReset.get('password');
  }
  get rePassword() {
    return this.formPasswordReset.get('rePassword');
  }
  onSubmit() {
    // if (this.currentPassword !== this.formPasswordReset.value.oldPassword) {
    //   this.matchOldPassword = true;
    // } else {
    //   this.matchOldPassword = false;
    this.accessToken = localStorage.getItem('newAccessToken');
    this.refreshToken = localStorage.getItem('newRefreshToken');
    this.Authorization = 'Bearer ' + this.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
    this.body.oldPassword = this.formPasswordReset.value.oldPassword;
    this.body.newPassword = this.formPasswordReset.value.password;
    this.http.post(this.url, this.body, this.httpOptions)
      .subscribe(
        user => this.popup(user, this.formPasswordReset.value.password),
        err => this.popup(err.error, null),
      );
    // }
  }
  popup(user, password) {
    if (user.code === 200) {
      swal({
        type: 'success',
        title: 'Đổi mật khẩu thành công, mời bạn đăng nhập lại!',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
          this.roter.navigate(['/']);
        },
        2500);
    }
    if (user.code === 401) {
      swal({
        type: 'error',
        title: 'Đổi mật khẩu thất bại!',
        text: 'Phiên sử dụng của bạn đã hết, mời bạn đăng nhập lại!',
      });
      setTimeout(() => {
          this.roter.navigate(['/']);
        },
        2500);
    }
    if (user.code === 409) {
      swal({
        type: 'error',
        title: 'Đổi mật khẩu thất bại!',
        text: 'Mật khẩu cũ chưa đúng!',
      });
    }
  }
  redirectToPage() {
    this.roter.navigate(['/']);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  MatchPassword(AC: AbstractControl) {
    if (AC.get('password').value !== AC.get('rePassword').value) {
      console.log('false');
      AC.get('rePassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

}
