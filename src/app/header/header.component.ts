import { Component, OnInit } from '@angular/core';
import {DEVSERVER} from '../service/serve';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SignInService} from '../service/sign-in.service';
import {ChangeTabService} from '../service/change-tab.service';
import {PaginationService} from '../service/pagination.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: boolean;
  key;
  urlnotiEmployer = DEVSERVER + '/api/schools/notifications';
  urlNoti = DEVSERVER + '/api/schools/notifications';
  accessToken: string;
  Authorization = null;
  httpOptions;
  listNotiCandidate;
  listNotiEmployer;
  notificationCandidate = false;
  notificationEmployer = true;
  clickcountNotiEmployer = 0;
  clickcountNotiCandidate = 0;
  totalPageNotiEmployer = 0;
  totalPageNotiCandidate = 0;
  Login: boolean;
  bo = true;
  idFilter$: BehaviorSubject<string|null>;
  myid;
  items$: Observable<any[]>;
  showDropdownChat = false;
  constructor(
    private signInService: SignInService,
    private router: Router,
    private http: HttpClient,
    public paginationService: PaginationService,
    public changeTabService: ChangeTabService,
    public db: AngularFirestore
  ) {
    this.myid = localStorage.getItem('id');
    this.idFilter$ = new BehaviorSubject(null);
    this.idFilter$.next(this.myid);
    this.items$ = Observable.combineLatest(
      this.idFilter$
    ).switchMap(([size]) =>
      db.collection<any>('chat_rooms', ref => {
        let query: firebase.firestore.Query = ref;
        if (size) { query = query.where('employer.id', '==', size)}
        query = query.orderBy('lastMessage.createdDate', 'desc');
        return query;
      }).valueChanges()
    );
  }

  ngOnInit() {
    if (true) {
      this.login = true;
    } else {
      // this.login = false;
    }
    this.signInService.SignIn.subscribe(login => this.Login = login);
    this.signInService.AccessToken.subscribe(accessToken => this.saveToken(accessToken));
    // console.log(this.accessToken, this.Login);
    if (localStorage.getItem('login') === 'true') {
      this.Login = true;
      this.accessToken = localStorage.getItem('accessToken');
      this.Authorization = 'Bearer ' + this.accessToken;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.Authorization,
          'Access-Control-Allow-Origin': '*',
        })
      };
    } else if (localStorage.getItem('login') === null) {
      this.Login = false;
    }
  }
  saveToken(accessToken) {
    this.accessToken = accessToken;
    // this.authorizationService.changeAccessTokenAuth(accessToken);
    this.loadNoti();
  }

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('logoUrl');
    // this.authorizationService.remove();
    // this.signInService.changeStatuslogin(false);
    // this.signInService.changeStatusUser(null);
    this.router.navigate(['/']);
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
  }

  changeNotiEmployer() {
    this.notificationCandidate = false;
    this.notificationEmployer = true;
  }

  changeNotiCandidate() {
    this.notificationCandidate = true;
    this.notificationEmployer = false;
  }

  loadNoti() {
    // this.Login = login;
    // this.signInService.changeStatuslogin(this.Login);
    this.accessToken = localStorage.getItem('accessToken');
    this.Authorization = 'Bearer ' + this.accessToken;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.Authorization
      }),
      params: new HttpParams()
        .set('sortBy', this.paginationService.sortBy)
        .set('sortType', this.paginationService.sortType)
        .set('pageIndex', this.paginationService.pageIndex)
        .set('pageSize', this.paginationService.pageSize)
    };
    this.http.get(this.urlNoti, this.httpOptions)
      .subscribe(
        user => this.notifiEmployer(user),
        err => this.notifiEmployer(err.error)
      );
    // this.http.get(this.urlnotiEmployer, this.httpOptions)
    //   .subscribe(
    //     json => this.notiCandidate(json),
    //     err => this.notiCandidate(err)
    //   );
  }

  notifiEmployer(json) {
    console.log(json);
    if (json.code === 200) {
      this.listNotiEmployer = json.data.results;
      this.totalPageNotiEmployer = json.data.totalPage;
    }
  }

  notiCandidate(json) {
    console.log(json);
    if (json.code === 200) {
      this.listNotiCandidate = json.data.results;
      this.totalPageNotiCandidate = json.data.totalPage;

    }
  }
  loadMoreEmployer() {
    this.clickcountNotiEmployer++;
    console.log(this.clickcountNotiEmployer, this.notificationEmployer);
    if (this.totalPageNotiEmployer > this.clickcountNotiEmployer) {
      this.accessToken = localStorage.getItem('accessToken');
      this.Authorization = 'Bearer ' + this.accessToken;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.Authorization
        }),
        params: new HttpParams()
          .set('sortBy', this.paginationService.sortBy)
          .set('sortType', this.paginationService.sortType)
          .set('pageIndex', this.clickcountNotiEmployer.toString())
          .set('pageSize', this.paginationService.pageSize)
      };
      this.http.get(this.urlNoti, this.httpOptions)
        .subscribe(
          user => this.loadMorenotifiEmployer(user),
          err => this.loadMorenotifiEmployer(err.error)
        );
      // this.http.get(this.urlnotiEmployer, this.httpOptions)
      //   .subscribe(
      //     json => this.notifiEmployer(json),
      //     err => this.notifiEmployer(err)
      //   );
    } else if (localStorage.getItem('login') === null) {
      this.Login = false;
    }
  }

  loadMorenotifiEmployer(json) {
    console.log(json);
    if (json.code === 200) {
      for (const noti of json.data.results) {
        this.listNotiEmployer.push(noti);
      }
      console.log(this.listNotiEmployer);
    }
  }

  loadMoreCandidate() {
    this.clickcountNotiCandidate++;
    if (this.totalPageNotiCandidate > this.clickcountNotiCandidate) {
      this.accessToken = localStorage.getItem('accessToken');
      this.Authorization = 'Bearer ' + this.accessToken;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.Authorization
        }),
        params: new HttpParams()
          .set('sortBy', this.paginationService.sortBy)
          .set('sortType', this.paginationService.sortType)
          .set('pageIndex', this.clickcountNotiCandidate.toString())
          .set('pageSize', this.paginationService.pageSize)
      };
      this.http.get(this.urlnotiEmployer, this.httpOptions)
        .subscribe(
          json => this.loadMorenotiCandidate(json),
          err => this.loadMorenotiCandidate(err)
        );
    }
  }

  loadMorenotiCandidate(json) {
    if (json.code === 200) {
      for (const noti of json.data.results) {
        this.listNotiCandidate.push(noti);
      }
      console.log(this.listNotiCandidate);
    }
  }


  but() {
    this.bo = !this.bo;
  }
  redirectToPend(id) {
    this.changeTabService.tabChange = 1;
    this.router.navigate(['/manage/manage-cooperation']);
    window.scroll({top: 0, left: 0});
    console.log(id);
  }

  redirectToAccept(id) {
    this.changeTabService.tabChange = 0;
    this.router.navigate(['/manage/manage-cooperation/' + id]);
    window.scroll({top: 0, left: 0});
  }

}
