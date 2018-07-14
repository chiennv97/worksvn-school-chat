import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MapsAPILoader} from '@agm/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DEVSERVER} from '../service/serve';
import {InforBranch} from '../class/information-branch';
import {} from '@types/googlemaps';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  urlBranch = DEVSERVER + 'api/schools/schoolBranchs';
  urlAddBranch = DEVSERVER + 'api/schools/schoolBranchs';
  urlDeleteBranch = DEVSERVER + 'api/schools/schoolBranchs/';
  urlEditBranch = DEVSERVER + 'api/schools/schoolBranchs/';
  @ViewChild('scrollCmt') private myScrollCmt: ElementRef;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  openMdEdit = false;
  invalid_token = false;
  serveError = false;
  addOrsave: boolean;
  editBranchFaile = false;
  Authorization: string;
  httpOptions;
  profile = null;
  accessToken = '';
  zoom = 8;
  lat = 21.029145;
  lng = 105.851726;
  location = false;
  currentBranchEdit = '';
  latlng = {lat: this.lat, lng: this.lng};
  info = '';
  index: number;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private ref: ChangeDetectorRef,
              private http: HttpClient, ) {
  }

  newBranch = new InforBranch('', '', '', this.lat, this.lng);
  heroForm: FormGroup;

  ngOnInit() {
    this.heroForm = new FormGroup({
      'newName': new FormControl(this.newBranch.branchName, [
        Validators.required,
      ]),
      'email': new FormControl(this.newBranch.contactEmail, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]),
      'phone': new FormControl(this.newBranch.contactPhone, [
        Validators.required,
        Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)
      ]),
    });

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
    this.http.get(this.urlBranch, this.httpOptions)
      .subscribe(
        user => this.popup(user),
        err => this.popup(err.error)
      );
    // lay vi tri hien tai
    this.setCurrentPosition();
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        type: 'address'});
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
  }

  popup(user) {
    console.log(user);
    if (user.code === 200) {
      this.profile = user.data;
      console.log(this.profile);
      this.lat = this.profile[0].lat;
      this.lng = this.profile[0].lon;
      // this.geocode(this.lat, this.lng);
    }
    if (user.code === 400) {
      this.serveError = true;
    }
    if (user.code === 401) {
      this.invalid_token = true;
    }
  }

  openModal() {
    this.openMdEdit = true;
    this.addOrsave = true;
    const self = this;
    this.geocode(this.lat, this.lng);
    self.ref.detectChanges();
    self.heroForm.patchValue({newName: ''});
    self.heroForm.patchValue({email: ''});
    self.heroForm.patchValue({phone: ''});
  }

  openModalEdit(i, branchid: string, lat, lon, newName, email, phone) {
    const self = this;
    this.index = i;
    this.currentBranchEdit = branchid;
    console.log(this.currentBranchEdit);
    this.openMdEdit = true;
    this.addOrsave = false;
    this.geocode(lat, lon);
    self.ref.detectChanges();
    self.heroForm.patchValue({newName: newName});
    self.heroForm.patchValue({email: email});
    self.heroForm.patchValue({phone: phone});
  }

  mapClicked(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.location = true;
    this.geocode(this.lat, this.lng);
  }

  // truyen lat,lng show dia chi
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

  // lay vi tri hien tai
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
        console.log(position.coords);
        this.geocode(this.lat, this.lng);
      });
    }
  }

  addBranch() {
    this.newBranch.branchName = this.heroForm.value.newName;
    this.newBranch.contactEmail = this.heroForm.value.email;
    this.newBranch.contactPhone = this.heroForm.value.phone;
    this.newBranch.lat = this.lat;
    this.newBranch.lon = this.lng;
    this.http.post(this.urlAddBranch, this.newBranch, this.httpOptions)
      .subscribe(
        branch => this.addNewBranch(branch),
        err => this.addNewBranch(err.error)
      );
    // this.openMd = false;
  }

  addNewBranch(branch) {
    console.log(branch);
    if (branch.code === 200) {
      swal({
        type: 'success',
        title: 'Thêm chi nhánh thành công!',
        showConfirmButton: false,
        timer: 3000
      });
      this.profile.push(branch.data);
    }
    if (branch.code === 401) {
      swal({
        type: 'error',
        title: 'Thêm chi nhánh thất bại!',
        text: 'Phiên giao dịch đã hết hạn, mời bạn đăng nhập lại!',
      });
    }
    if (branch.code === 404) {
      swal({
        type: 'error',
        title: 'Thêm chi nhánh thất bại!',
        text: 'Vùng miền không được hỗ trợ!',
      });
    }
  }

  askDelete(branchid: string) {
    swal({
      title: 'Bạn có chắc chắn muốn xóa?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.value) {
        this.urlDeleteBranch = this.urlDeleteBranch + branchid;
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.Authorization,
            'Access-Control-Allow-Origin': '*',
          }),
          params: new HttpParams()
            .set('id', branchid)
        };
        this.http.delete(this.urlDeleteBranch, this.httpOptions)
          .subscribe(
            json => this.delete(json),
            err => this.delete(err.error)
          );
        this.urlDeleteBranch = DEVSERVER + 'api/schools/schoolBranchs/';
      }
    });

  }
  delete(json) {
    console.log(json);
    if (json.code === 200) {
      this.profile = json.data;
      swal({
        title: 'Đã xóa!',
        text: 'Chi nhánh đã được xóa.',
        type: 'success',
        showConfirmButton: false,
        timer: 3000
      });
    }
    if (json.code === 401) {
      swal({
        type: 'error',
        title: 'Xóa chi nhánh thất bại!',
        text: 'Phiên giao dịch đã hết hạn, mời bạn đăng nhập lại!',
      });
    }
    if (json.code === 400) {
      if (json.msg === 'cannot delete, this branch is headquarter') {
        swal({
          type: 'error',
          title: 'Xóa chi nhánh thất bại!',
          text: 'Bạn không thể xóa trụ sỏ chính!',
        });
      }
      if (json.msg === 'cannot delete, some jobs are referencing to this branch') {
        swal({
          type: 'error',
          title: 'Xóa chi nhánh thất bại!',
          text: 'Không thể xóa chi nhánh này, xin mời kiểm tra lại thông tin bài đăng của chi nhánh!',
        });
      }
    }
  }

  saveBranch() {
    this.urlEditBranch = this.urlEditBranch + this.currentBranchEdit;
    this.newBranch.branchName = this.heroForm.value.newName;
    this.newBranch.contactEmail = this.heroForm.value.email;
    this.newBranch.contactPhone = this.heroForm.value.phone;
    this.newBranch.lat = this.lat;
    this.newBranch.lon = this.lng;
    this.http.put(this.urlEditBranch, this.newBranch, this.httpOptions)
      .subscribe(
        branch => this.editBranch(branch),
        err => this.editBranch(err.error)
      );
    this.urlEditBranch = DEVSERVER + 'api/schools/schoolBranchs/';
  }

  editBranch(branch) {
    console.log(branch);
    if (branch.code === 200) {
      swal({
        type: 'success',
        title: 'Cập nhật thông tin thành công!',
        showConfirmButton: false,
        timer: 3000
      });
      this.profile[this.index] = branch.data;
    }
    if (branch.code === 404) {
      this.editBranchFaile = true;
      setTimeout(() => {
          this.editBranchFaile = false;
        },
        5000);
    }
    if (branch.code === 401) {
      this.invalid_token = true;
      setTimeout(() => {
          this.invalid_token = false;
        },
        5000);
    }
  }

  setMyStyles(branchid) {
    const styles = {
      'position': (this.openMdEdit === true && branchid === this.currentBranchEdit) ? '' : 'absolute',
      'top': (this.openMdEdit === true && branchid === this.currentBranchEdit) ? '0%' : '-1000%'
    };
    return styles;
  }

  scrollToBottom(): void {
    try {
      this.myScrollCmt.nativeElement.scrollTop = this.myScrollCmt.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  get newName() {
    return this.heroForm.get('newName');
  }

  get email() {
    return this.heroForm.get('email');
  }

  get phone() {
    return this.heroForm.get('phone');
  }

}
