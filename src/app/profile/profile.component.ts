import { Component, OnInit } from '@angular/core';
import { DEVSERVER } from '../service/serve';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InforSchool} from '../class/info-school';
import swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  urlGetInformartion = DEVSERVER + 'api/schools/profile';
  urlDescription = DEVSERVER + 'api/schools/description';
  profile;
  accessToken;
  refreshToken;
  Authorization;
  httpOptions;
  lat;
  lng;
  des;
  info;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }
  model = new InforSchool('', '', '', '',
    '', '', 21.029145, 105.851726);
  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    // console.log(this.accessToken);
    this.Authorization = 'Bearer ' + this.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization,
        'Access-Control-Allow-Origin': '*',
      })
    };
    this.http.get(this.urlGetInformartion, this.httpOptions)
      .subscribe(
        user => this.popup(user),
        err => this.popup(err.error)
      );
  }
  popup(user) {
    console.log(user);
    if (user.code === 200) {
      this.profile = user.data;
      console.log(this.profile);
      this.model.employerName = this.profile.employerName;
      this.model.email = this.profile.email;
      this.model.phone = this.profile.phone;
      this.model.logoUrl = this.profile.logoUrl;
      this.model.coverUrl = this.profile.coverUrl;
      this.model.lat = this.lat = this.profile.lat;
      this.model.lon = this.lng = this.profile.lon;
      this.des = this.profile.description;
      this.info = this.profile.address;
      console.log(this.info);
    }
    if (user.code === 400) {
      swal({
        type: 'error',
        title: 'Đăng nhập thất bại!',
        text: 'Vui lòng xác nhận email trước khi đăng nhập!',
      });    }
    if (user.code === 401) {
      swal({
        type: 'error',
        title: 'Đăng nhập thất bại!',
        text: 'Vui lòng xác nhận email trước khi đăng nhập!',
      });    }
  }
  InfoDescription() {
    // this.des = this.model.description;
    this.http.put(this.urlDescription, this.des, this.httpOptions)
      .subscribe(
        json => this.describe(json),
        err => this.describe(err)
      );
  }
  describe(json) {
    if (json.code === 200) {
      swal({
        type: 'success',
        title: 'Cập nhật thông tin miêu tả thành công!',
        showConfirmButton: false,
        timer: 3000
      });
    }
    if (json.code === 401) {
      swal({
        type: 'error',
        title: 'Cập nhật thông tin thất bại!',
        text: 'Phiên giao dịch đã hết, mời bạn đăng nhập lại!',
      });
    }
  }
  openModal() {}
}
