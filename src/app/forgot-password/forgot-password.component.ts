import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DEVSERVER} from '../service/serve';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formForgotPassword: FormGroup;
  url = DEVSERVER + 'api/auth/passwordReset';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.formForgotPassword = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
    });
  }
  get email() {
    return this.formForgotPassword.get('email');
  }
  onSubmit() {
    this.http.post(this.url, this.formForgotPassword.value.email)
      .subscribe(
        user => this.popup(user, this.formForgotPassword.value.email),
        err => this.popup(err.error, null),
      );
  }
  popup(user, mail) {
    if (user.code === 200) {
      swal({
        type: 'success',
        title: 'Gửi email xác nhận thành công!',
        text: 'Bạn vui lòng đăng nhập email để đổi mật khẩu!',
      }).then((result) => {
        if (result.value) {
          window.open('https://mail.google.com',' _blank');
          this.router.navigate(['/']);
        }
      });
      this.router.navigate(['/']);
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
    if (user.code === 400) {
      swal({
        type: 'error',
        title: 'Gửi email thất bại!',
      });
    }
  }

}
