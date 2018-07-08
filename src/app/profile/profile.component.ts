import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { DEVSERVER } from '../service/serve';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InforSchool} from '../class/info-school';
import swal from 'sweetalert2';
import {MapsAPILoader} from '@agm/core';
import { UploadFileService} from '../service/upload-file.service';
import {FileUpload} from '../class/fileupload';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  urlGetInformartion = DEVSERVER + 'api/schools/profile';
  urlDescription = DEVSERVER + 'api/schools/description';
  urlUpdate = DEVSERVER + 'api/schools/information';
  profile;
  accessToken;
  refreshToken;
  Authorization;
  httpOptions;
  profileUpdate = null;
  uploadSuccess = false;
  zoom = 8;
  lat = 21.029145;
  lng = 105.851726;
  latlng = {lat: this.lat, lng: this.lng};
  info = '';
  des;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  fileUploads: any[];
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private mapsAPILoader: MapsAPILoader,
    private uploadService: UploadFileService,
  ) { }
  model = new InforSchool('', '', '', '',
    '', '', 21.029145, 105.851726);
  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    console.log(this.accessToken);
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
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {type: 'address'});
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;
          this.geocode(this.lat, this.lng);
        });
      });
    });
    this.uploadService.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }
  popup(user) {
    console.log(user);
    if (user.code === 200) {
      this.profile = user.data;
      console.log(this.profile);
      this.model.schoolName = this.profile.schoolName;
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
  public geocode(latitude, longitude) {
    this.latlng = {lat: latitude, lng: longitude};
    const self = this;
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
    geocoder.geocode({'location': this.latlng}, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.zoom = 14;
          self.info = results[0].formatted_address;
          infowindow.setContent(results[0].formatted_address);
          self.ref.detectChanges();
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  mapClicked(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.geocode(this.lat, this.lng);
  }
  onSubmit() {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
    if (this.model.email !== '') {
      this.model.lat = this.lat;
      this.model.lon = this.lng;
      this.profileUpdate = this.model;
      console.log(this.profileUpdate);
      this.http.put(this.urlUpdate, this.profileUpdate, this.httpOptions)
        .subscribe(
          user => this.update(user),
          err => this.update(err.error)
        );
    } else {
      swal({
        type: 'error',
        title: 'Cập nhật thông tin thất bại!',
        text: ' Bạn không được để trống phần email!',
      });
    }
  }
  update(user) {
    console.log(user);
    if (user.code === 200) {
      swal({
        type: 'success',
        title: 'Cập nhật thông tin thành công!',
        showConfirmButton: false,
        timer: 3000
      });
      // this.http.get(this.url, this.httpOptions)
      //   .subscribe(
      //     user => this.popup(user),
      //     err => this.popup(err.error)
      //   );
    }
    if (user.code === 400) {
      swal({
        type: 'error',
        title: 'Cập nhật thông tin thất bại!',
        text: ' Số điện thoại không tồn tại, mời bạn sửa lại!',
      });
    }
    if (user.code === 401) {
      swal({
        type: 'error',
        title: 'Cập nhật thông tin thất bại!',
        text: 'Phiên giao dịch đã hết, mời bạn đăng nhập lại!',
      });
    }
  }
  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    // this.upload2();
  }

  upload2() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
    // this.currentFileUpload = null;
  }
  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
  openModal() {}
}
