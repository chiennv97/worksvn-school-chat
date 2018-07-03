import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {DEVSERVER} from '../service/serve';
import {Cooperate} from '../class/cooperate';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-cooperate',
  templateUrl: './cooperate.component.html',
  styleUrls: ['./cooperate.component.css']
})
export class CooperateComponent implements OnInit {
  formSignUp: FormGroup;
  httpOptions;
  cooperate: Cooperate;
  url = DEVSERVER + 'api/schools/preRegister';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.formSignUp = this.fb.group({
      schoolName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)
      ]],
      contactPersonName: ['', Validators.required],
    });
  }
  get email() {
    return this.formSignUp.get('email');
  }
  get phone() {
    return this.formSignUp.get('phone');
  }
  get address() {
    return this.formSignUp.get('address');
  }
  get schoolName() {
    return this.formSignUp.get('schoolName');
  }
  get contactPersonName() {
    return this.formSignUp.get('contactPersonName');
  }

  onSubmit() {
    this.cooperate = new Cooperate;
    this.cooperate.schoolName = this.formSignUp.value.schoolName;
    this.cooperate.phone = this.formSignUp.value.phone;
    this.cooperate.email = this.formSignUp.value.email;
    this.cooperate.address = this.formSignUp.value.address;
    this.cooperate.contactPersonName = this.formSignUp.value.contactPersonName;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.http.post(this.url, this.cooperate, this.httpOptions).subscribe(
      user => this.popup(user),
      err => this.popup(err.error));
    console.log(this.cooperate);
  }

  popup(user) {
    console.log(user);
    if (user.code === 200) {
      window.scroll({top: 0, left: 0, behavior: 'smooth'});
      swal({
        type: 'success',
        title: 'Đăng kí thành công, bạn vui lòng vào email để kích hoạt tài khoản!',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
          this.router.navigate(['/']);
        },
        3000);
    }
    if (user.code === 404) {
      swal({
        type: 'error',
        title: 'Đăng kí thất bại',
        text: 'Vùng miền không được hỗ trợ!',
      });
    }
    if (user.code === 409) {
      swal({
        type: 'error',
        title: 'Đăng kí thất bại',
        text: 'Email đã được sử dụng!',
      });
    }
  }


}
