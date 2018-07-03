import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DEVSERVER} from '../service/serve';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  formPasswordReset: FormGroup;
  httpOptions;
  id: string;
  url = DEVSERVER + 'api/auth/passwordResetConfirm/';
  urlnewemail = DEVSERVER + 'api/auth/newPasswordResetEmail';
  newemail: string;
  constructor(
    private roter: Router,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log(this.id);
    this.url = DEVSERVER + 'api/auth/passwordResetConfirm/' + this.id;
    this.formPasswordReset = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      rePassword: ['', Validators.required]
    }, {
      validator: this.MatchPassword
    });

  }
  get password() {
    return this.formPasswordReset.get('password');
  }
  get rePassword() {
    return this.formPasswordReset.get('rePassword');
  }
  onSubmit() {
    this.httpOptions = {
      params: new HttpParams()
        .set('token', this.id)
    };
    this.http.post(this.url, this.formPasswordReset.value.password, this.httpOptions)
      .subscribe(
        user => this.popup(user, this.formPasswordReset.value.password),
        err => this.popup(err.error, null),
      );
  }

  popup(user, password) {
    if (user.code === 200) {
      swal({
        type: 'success',
        title: 'Đổi mật khẩu thành công!',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
          this.roter.navigate(['/']);
        },
        3000);
    }
    if (user.code === 401) {
      swal({
        title: 'Email đã hết hạn, mời bạn xác nhận lại email!',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (email === 'taken@example.com') {
                swal.showValidationError(
                  'Email không hợp lệ!'
                );
              }
              resolve();
            }, 2000);
          });
        },
        allowOutsideClick: () => !swal.isLoading()
      }).then((result) => {
        if (result.value) {
          this.newemail = result.value;
          console.log(result.value, this.newemail);
          this.http.post(this.urlnewemail, this.newemail)
            .subscribe(
              data => {
                console.log(data);
                swal({
                  type: 'success',
                  title: 'Gửi email thành công!',
                  html: 'Xác nhận email: ' + result.value
                });
              },
              errdata => {
                console.log(errdata );
                swal({
                  type: 'error',
                  title: 'Gửi email thất bại!',
                  html: 'Xác nhận email: ' + result.value
                });
              },
            );
        }
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
  candi() {
    window.open('https://candidate.works.vn/', '_blank');
  }
}
