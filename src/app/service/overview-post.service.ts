import {Injectable} from '@angular/core';
import {ItemOverviewPost} from '../class/item-overview-post';
import {PendingOverviewPost} from '../class/PendingOverviewPost';
import {DEVSERVER} from './serve';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PaginationService} from './pagination.service';
import {ChoosePostTypeService} from './choose-post-type.service';
import {Router} from '@angular/router';


@Injectable()
export class OverviewPostService {
  activeJobs = new Array<ItemOverviewPost>();
  pendingJobs = new Array<PendingOverviewPost>();
  tempItemOverviewPost: ItemOverviewPost;
  tempItemPenOverviewPost: PendingOverviewPost;
  totalItem = 1;
  Authorization: string;
  httpOptions;
  index;
  indexPen;
  bodyDelete;
  hiddenJobUrl = DEVSERVER + 'api/schools/enrollmentJobs/';
  plusDateUrl = DEVSERVER + 'api/schools/enrollmentJobs/';
  deleteJobUrl = DEVSERVER + 'api/schools/enrollmentJobs/';
  deletePenJobUrl = DEVSERVER + 'api/schools/enrollmentJobs/pendingPosts/';
  constructor(
    private http: HttpClient,
    public paginationService: PaginationService,
    public choosePostTypeService: ChoosePostTypeService,
    private router: Router
  ) {
    this.Authorization = 'Bearer' + localStorage.getItem('accessToken');
  }
  add(rawObject) {
    // console.log(rawObject);
    this.setTotalView(rawObject.data.totalItem);
    // this.removes();
    this.index = 0;
    for (const obj of rawObject.data.results) {
      this.activeJobs.splice(this.index, 1, new ItemOverviewPost(obj.id, obj.jobTitle, obj.jobName.name, obj.createdDate,
        obj.expirationDate, obj.appliedCount, obj.suitableCount,
        obj.schoolBranchName, obj.timeLeft, obj.hidden, obj.address, obj.enableNotification));
      this.index++;
    }
    // xoa phan tu cu
    if ( this.index < 10) {
      this.activeJobs.splice(this.index, 10 - this.index);
    }
  }
  addPendingJob(rawObject) {
    this.setTotalView(rawObject.data.totalItem);
    this.indexPen = 0;
    for (const obj of rawObject.data.results) {
      this.pendingJobs.splice(this.indexPen, 1, new PendingOverviewPost(obj.id, obj.jobName.name,
        obj.schoolBranchName, obj.address, obj.jobTitle, obj.createdDate,
        obj.state, obj.repliedDate, obj.message, obj.enableNotification));
      this.indexPen++;
    }
    // xoa phan tu cu
    if ( this.indexPen < 10) {
      this.pendingJobs.splice(this.indexPen, 10 - this.indexPen);
    }
    // console.log(this.pendingJobs);
  }
  setTotalView(num) {
    this.totalItem = num;
  }
  hiddenJob(hidden, id, i) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.http.put(this.hiddenJobUrl + id + '/hidden/' + hidden , null, this.httpOptions)
      .subscribe(
        user => this.afterHidden(user, i, hidden),
        err => console.log(err)
      );
  }
  afterHidden(obj, i, hidden) {
    if (obj.code === 200 ) {
      console.log(hidden);
      this.activeJobs[i].hidden = hidden;
    }
  }
  plusDate(id, i) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      })
    };
    this.http.put(this.plusDateUrl + id + '/expirationDate/extend/' , null, this.httpOptions)
      .subscribe(
        user => this.afterPlusDate(user, i),
        err => console.log(err)
      );
  }
  afterPlusDate(obj, i) {
    if (obj.code === 200 ) {
      this.activeJobs[i].timeLeft = obj.data.timeLeft;
    }
  }
  deleteJob(id, i, type, swal) {
    this.bodyDelete = {
      'currentPageIndex': this.paginationService.pageIndex,
      'currentSortBy': this.paginationService.sortBy,
      'currentSortType': this.paginationService.sortType,
      'pageSize': this.paginationService.pageSize
    };
    if ( i !== -1) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.Authorization
        }),
        body: this.bodyDelete
      };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.Authorization
        })
      };
    }
    if ( type === 0 ) {
      this.http.delete(this.deleteJobUrl + id , this.httpOptions)
        .subscribe(
          user => this.affterDelete(user, i, type, swal),
          err => this.returnCode(err, swal)
        );
    } else {
      this.http.delete(this.deletePenJobUrl + id , this.httpOptions)
        .subscribe(
          user => this.affterDelete(user, i, type, swal),
          err => this.returnCode(err, swal)
        );
    }
  }
  affterDelete(obj, i, type, swal) {
    // console.log(obj);
    swal({
      type: 'success',
      title: 'Bài đăng đã được xóa',
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['manage/app-active-and-expired-jobs']);
    if ( obj.code === 200 && obj.data.length === 0) {
      // this.router.navigate(['/active-and-expired-jobs']);
      if (type === 0) {
        this.activeJobs.splice(i, 1);
      } else if (type === 1) {
        this.pendingJobs.splice(i, 1);
      }
    }
    if (obj.code === 200 && obj.data.length !== 0) {
      if ( type === 0 ) {
        this.activeJobs.splice(i, 1, new ItemOverviewPost(obj.data[0].id, obj.data[0].jobTitle, obj.data[0].jobName.name,
          obj.data[0].createdDate, obj.data[0].expirationDate, obj.data[0].appliedCount, obj.data[0].suitableCount,
          obj.data[0].schoolBranchName, obj.data[0].timeLeft, obj.data[0].hidden, obj.data[0].address, obj.data[0].enableNotification));
      }
      if ( type === 1 ) {
        this.tempItemPenOverviewPost = new PendingOverviewPost(obj.data[0].id, obj.data[0].jobName.name,
          obj.data[0].schoolBranchName, obj.data[0].address, obj.data[0].jobTitle, obj.data[0].createdDate,
          obj.data[0].state, obj.data[0].repliedDate, obj.data[0].message, obj.data[0].enableNotification);
        this.pendingJobs.splice(i, 1, this.tempItemPenOverviewPost);
      }
    }
  }
  returnCode(err, swal) {
    if (err.status === 403) {
      swal({
        type: 'error',
        title: 'Xóa không thành công',
        text: 'Không thể xóa do công việc đã có ứng viên ứng tuyển',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (err.status === 404) {
      swal({
        type: 'error',
        title: 'Xóa không thành công',
        text: 'Không tìm thấy job',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (err.status === 401) {
      swal({
        type: 'error',
        title: 'Xóa không thành công',
        text: 'Access token hết hạn',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  onSubmit(url: string, pageIndex: string, type: number) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
        // 'Access-Control-Request-Method': 'POST',
        // 'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }),
      params: new HttpParams()
        .set('sortBy', this.paginationService.sortBy)
        .set('sortType', this.paginationService.sortType)
        .set('pageIndex', pageIndex)
        .set('pageSize', this.paginationService.pageSize)
    };
    // console.log(url);
    if ( type === 0) {
      this.http.get(url , this.httpOptions)
        .subscribe(
          user => this.add(user),
          err => console.log(err)
        );
    }
    if ( type === 1) {
      this.http.get(url , this.httpOptions)
        .subscribe(
          user => this.addPendingJob(user),
          err => console.log(err)
        );
    }
  }
}
