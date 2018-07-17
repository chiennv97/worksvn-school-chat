import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DEVSERVER} from '../service/serve';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {SignInService} from '../service/sign-in.service';
import {MapsAPILoader} from '@agm/core';
import {typeSourceSpan} from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Authorization: string;
  formSignIn: FormGroup;
  httpOptions;
  urlLogin = DEVSERVER + 'api/auth/schools/login';


  zoom = 8;
  lat = 21.029145;
  lng = 105.851726;
  location = false;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  latlng = {lat: this.lat, lng: this.lng};
  info = 'Địa chỉ';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public signInService: SignInService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.formSignIn = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.formSignIn.get('email');
  }
  onSubmit() {
    this.Authorization = this.formSignIn.value.email + ':' + this.formSignIn.value.password;
    this.Authorization = btoa(this.Authorization);
    this.Authorization = 'Basic ' + this.Authorization;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    // this.signInService.add('chiennv');
    this.http.post(this.urlLogin, null, this.httpOptions)
      .subscribe(
        user => this.popup(user),
        err => this.popup(err.error)
      );
  }
  popup(user) {
    console.log(user);
    if (user.code === 200) {
      localStorage.setItem('accessToken', (user.data.accessToken));
      localStorage.setItem ('refreshToken', (user.data.refreshToken));
      // localStorage.setItem('password', (this.formSignIn.value.password));
      localStorage.setItem ('id', (user.data.id));
      localStorage.setItem('login', 'true');
      this.signInService.changeStatuslogin(true);
      // this.signInService.changeStatusUser(email);
      this.signInService.changeAccessToken(user.data.accessToken);
      console.log(user.data.accessToken);
      swal({
        type: 'success',
        title: 'Đăng nhập thành công!',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
          this.router.navigate(['/manage/list-enrollments']);
        },
        3000);
    }
    if (user.code === 401) {
      swal({
        type: 'error',
        title: 'Đăng nhập thất bại!',
        text: 'Sai email hoặc mật khẩu, mời bạn đăng nhập lại!',
      });
    }
    if (user.code === 403) {
      swal({
        type: 'error',
        title: 'Đăng nhập thất bại!',
        text: 'Vui lòng xác nhận email trước khi đăng nhập!',
      });
    }
  }

}
