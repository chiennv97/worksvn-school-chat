import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {Observable, BehaviorSubject} from 'rxjs-compat';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {VisitStates} from '../class/visit-states';
import * as firebase from 'firebase';
import {Messages} from '../class/messages';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataNotification} from '../class/data-notification';
import {DataEmojiNotification} from '../class/data-emoji-notification';
import {MessageEmoji} from '../class/message-emoji';
import {IdRoomChatService} from '../service/id-room-chat.service';
import {BodyNotification} from '../class/body-notification';
import {emojis} from '../class/emojis';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnDestroy, AfterViewChecked, OnInit {
  getRoomId = false;
  roomId;
  roomIndex = 0;
  chatEmojis = emojis;
  mobileQuery: MediaQueryList;
  sideNavOpened: boolean;
  myid: string;
  items$: Observable<any[]>;
  idFilter$: BehaviorSubject<string | null>;
  candidates;
  tasks;
  mapCandidate = new Map<string, string>();
  data;
  candidateCurrentRoom;
  noti;
  messUnseen: Observable<any[]>;
  startTyping = false;
  visitStatesEmployer;
  changeHeight = true;
  visitStates;
  messText;
  nycRef;
  urlCandidateAvatar = null;
  private userDoc: AngularFirestoreDocument<any>;
  stopLoadMess = false;
  roomInfo;
  messEmoji;
  lastMess;
  idUnseenFilter: BehaviorSubject<string | null>;
  candidateTyping;
  tasksArray = new Array();
  httpOptions;
  mapRoom = new Map<string, string>();
  private _mobileQueryListener: () => void;
  sendNoti = false;
  ownerName;
  ownerAvatarUrl;
  numShowDetailMess = -1;
  showDetailMess = false;
  tempStopLoadMess = false;
  loading = false;
  height;
  disableScrollDown = false;
  tasks2;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(
    public router: Router,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    public db: AngularFirestore,
    public idRoomChatService: IdRoomChatService,
    private http: HttpClient,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        if (val.snapshot.paramMap.get('roomid') !== null) {
          this.getRoomId = false;
          this.roomId = val.snapshot.paramMap.get('roomid');
          // this.changeRoom(this.roomId);
        }
      }
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.sideNavOpened = !this.mobileQuery.matches;
    // db.firestore.settings({ timestampsInSnapshots: true });
    // this.items = db.collection('/candidates').valueChanges();
    // console.log(this.items);
    // this.itemDoc = db.doc<any>('candidates/2a0d7517-84fa-40dc-b73c-298d1bf2f269');
    // this.item = this.itemDoc.valueChanges();
    this.myid = localStorage.getItem('id');
    // db.collection('chat_rooms', ref => ref.where('id', '==', '84a62d02-b340-4934-b4fe-7c91d2e95c2f'));
    // const size$ = new Subject<string>();
    // this.queryObservable = size$.switchMap(size =>
    //   db.collection('chat_rooms', ref => ref.where('id', '==', 'EF5krN9rMuDTC92wg7Vz')).valueChanges()
    // );
    // this.queryObservable.subscribe(queriedItems => {
    //   console.log(queriedItems);
    // });
    this.idFilter$ = new BehaviorSubject(null);
    this.idFilter$.next('4d52fab4-7110-48b1-a0ac-90dfaa8c6b52');
    this.items$ = Observable.combineLatest(
      this.idFilter$
    ).switchMap(([size]) =>
      db.collection<any>('chat_rooms_school_vs_candidate', ref => {
        let query: firebase.firestore.Query = ref;
        if (size) {
          query = query.where('employer.id', '==', size);
        }
        query = query.orderBy('lastMessage.createdDate', 'desc');
        return query;
      }).valueChanges()
    );
    this.candidates = db.collection('candidates').snapshotChanges().subscribe(actions => {
      actions.map(a => {
        this.data = a.payload.doc.data();
        this.mapCandidate.set(a.payload.doc.id, this.data.isOnline);
      });
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=AIzaSyA55QnSD4Xj6-zTyCbWUs8iKOyYyjmhv08',
      })
    };
  }
  changeRoom(id) {
    this.items$.subscribe(queriedItems => {
      console.log('thay doi danh sach room');
      for (let i = 0; i < queriedItems.length; i++) {
        if (queriedItems[i].id === this.roomId) {
          this.roomIndex = i;
        }
      }
      if (this.getRoomId === false) {
        this.getRoomId = true;
        for (const item of queriedItems) {
          this.mapRoom.set(item.id, item.candidate.id);
        }
        for (let i = 0; i < queriedItems.length; i++) {
          if (queriedItems[i].id === id) {
            if (this.tasks !== undefined) {
              console.log('da unsub changeRoom');
              this.tasks.unsubscribe();
            }
            this.stopLoadMess = false;
            this.noti = queriedItems[i].employer.enableNotification;
            this.visitStatesEmployer = new VisitStates();
            this.visitStatesEmployer.lastVisited = firebase.firestore.FieldValue.serverTimestamp();
            this.visitStatesEmployer.state = 'left_room';
            if (this.userDoc !== undefined) {
              this.userDoc.collection('visitStates').doc('employer').set(Object.assign({}, this.visitStatesEmployer));
              this.startTyping = false;
              this.userDoc.collection('typingStates').doc('employer').set({isTyping: false});
            }
            this.roomId = id;
            this.candidateCurrentRoom = queriedItems[i].candidate.id;
            this.userDoc = this.db.doc('chat_rooms/' + this.roomId);
            this.visitStatesEmployer.lastVisited = firebase.firestore.FieldValue.serverTimestamp();
            this.visitStatesEmployer.state = 'in_room';
            this.userDoc.collection('visitStates').doc('employer').set(Object.assign({}, this.visitStatesEmployer));
            this.roomInfo = this.userDoc.valueChanges();
            this.visitStates = this.userDoc.collection('visitStates').doc('candidate').valueChanges();
            // this.tasks = this.userDoc.collection<Messages>('messages',
            // ref => ref.orderBy('createdDate', 'desc').limit(10)).valueChanges();
            // this.tasks.subscribe(value => {
            //   // console.log(value);
            //   this.tasksArray = value;
            // });
            this.tasks = this.userDoc.collection<Messages>('messages', ref => ref.orderBy('createdDate', 'desc')
              .limit(20)).snapshotChanges().subscribe(actions => {
              console.log('da sub changeRoom');
              this.changeHeight = true;
              this.tasksArray = [];
              this.urlCandidateAvatar = queriedItems[i].candidate.avatarUrl;
              actions.map(a => {
                this.tasksArray.push(a.payload.doc.data());
                this.lastMess = a.payload.doc;
              });
            });
            this.candidateTyping = this.userDoc.collection('typingStates').doc('candidate').valueChanges();
            this.roomIndex = i;
            this.nycRef = this.db.firestore.collection('chat_rooms').doc(this.roomId);
            this.idUnseenFilter = new BehaviorSubject(null);
            this.idUnseenFilter.next(this.candidateCurrentRoom);
            this.messUnseen = Observable.combineLatest(
              this.idUnseenFilter
            ).switchMap(([newid]) =>
              this.db.collection<any>('chat_rooms/' + this.roomId + '/messages', ref => {
                let query: firebase.firestore.Query = ref;
                if (newid) {
                  query = query.where('ownerID', '==', newid);
                }
                {
                  query = query.where('seen', '==', false);
                }
                return query;
              }).snapshotChanges()
            );
            this.messUnseen.subscribe(m => {
              const batch = firebase.firestore().batch();
              for (const mess of m) {
                batch.update(this.nycRef.collection('messages').doc(mess.payload.doc.id), {seen: true});
              }
              batch.commit();
            });
          }
        }
      }
    });
  }
  addMessText(messText) {
    this.sendNoti = true;
    this.roomInfo.subscribe(val => {
      if (val.candidate.enableNotification === true) {
        this.visitStates.subscribe(newval => {
          if (newval.state === 'left_room' && this.sendNoti === true) {
            const data = new DataNotification('new_message', this.roomId, this.ownerName, this.ownerAvatarUrl, 'text', messText);
            const body = new BodyNotification();
            body.to = '/topics/' + val.candidate.id;
            body.data = data;
            this.sendNoti = false;
            this.http.post('https://fcm.googleapis.com/fcm/send',
              body,
              this.httpOptions)
              .subscribe(
                rawObject => console.log(rawObject),
                err => console.log(err)
              );
          } else {
            this.sendNoti = false;
          }
        });
      } else {
        this.sendNoti = false;
      }
    });
    this.changeHeight = true;
    this.messText = new Messages();
    this.messText.createdDate = firebase.firestore.FieldValue.serverTimestamp();
    this.messText.message = messText;
    this.messText.ownerID = this.myid;
    this.messText.seen = false;
    this.messText.type = 'text';
    const id = this.db.createId();
    // this.userDoc.collection<Messages>('messages').doc(id).set(Object.assign({}, this.messText));
    const batch = firebase.firestore().batch();
    batch.set(this.nycRef.collection('messages').doc(id), Object.assign({}, this.messText));
    batch.update(this.nycRef, {lastMessage: Object.assign({}, this.messText)});
    batch.commit();
    this.roomIndex = 0;
  }
  addMessEmoji(emojiGroup, emojiID) {
    this.sendNoti = true;
    this.roomInfo.subscribe(val => {
      if (val.candidate.enableNotification === true) {
        this.visitStates.subscribe(newval => {
          if (newval.state === 'left_room' && this.sendNoti === true) {
            const data = new DataEmojiNotification('new_message', this.roomId, this.ownerName,
              this.ownerAvatarUrl, 'emoji', emojiGroup, emojiID);
            const body = new BodyNotification();
            body.to = '/topics/' + val.candidate.id;
            body.data = data;
            this.sendNoti = false;
            this.http.post('https://fcm.googleapis.com/fcm/send',
              body,
              this.httpOptions)
              .subscribe(
                rawObject => console.log(rawObject),
                err => console.log(err)
              );
          } else {
            this.sendNoti = false;
          }
        });
      } else {
        this.sendNoti = false;
      }
    });
    this.changeHeight = true;
    this.messEmoji = new MessageEmoji();
    this.messEmoji.createdDate = firebase.firestore.FieldValue.serverTimestamp();
    this.messEmoji.ownerID = this.myid;
    this.messEmoji.emojiGroup = emojiGroup;
    this.messEmoji.emojiID = emojiID;
    this.messEmoji.seen = false;
    this.messEmoji.type = 'emoji';
    const id = this.db.createId();
    // this.userDoc.collection<Messages>('messages').doc(id).set(Object.assign({}, this.messEmoji));
    const batch = firebase.firestore().batch();
    batch.set(this.nycRef.collection('messages').doc(id), Object.assign({}, this.messEmoji));
    batch.update(this.nycRef, {lastMessage: Object.assign({}, this.messEmoji)});
    batch.commit();
    const options = {
      title: 'hello world',
      body: 'this is a notification body',
      dir: 'ltr',
      icon: '../assets/ng-shield.png',
      tag: 'notice',
      closeDelay: 2000
    };
    // this._service.notify(options);
  }
  typing(value) {
    if (value !== '' && this.startTyping === false) {
      this.startTyping = true;
      this.userDoc.collection('typingStates').doc('employer').set({isTyping: true});
    }
    if (value === '') {
      this.startTyping = false;
      this.userDoc.collection('typingStates').doc('employer').set({isTyping: false});
    }
  }
  showDetail(i) {
    if (i !== this.numShowDetailMess) {
      this.numShowDetailMess = i;
      this.showDetailMess = true;
    } else {
      this.showDetailMess = !this.showDetailMess;
    }
    this.changeHeight = false;
  }
  ngAfterViewChecked() {
    // this.scrollToBottom();
    if (this.changeHeight === true) {
      this.height = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }
  public thisScroll() {
    // const element = this.myScrollContainer.nativeElement;
    // const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    // if (this.disableScrollDown && atBottom) {
    //   this.disableScrollDown = false;
    // } else {
    //   this.disableScrollDown = true;
    // }
    if (this.myScrollContainer.nativeElement.scrollTop === 0 && this.stopLoadMess === false && this.tempStopLoadMess === false) {
      // Observable.merge(this.tasks);
      console.log('vao scroll');
      this.changeHeight = false;
      this.tempStopLoadMess = true;
      // this.userDoc.collection<Messages>('messages', ref => ref.orderBy('createdDate', 'desc').limit(10)
      //   .startAt(this.lastMess)).valueChanges().subscribe(mess => {
      //     console.log(mess);
      //   if ( mess.length < 10 && mess.length > 1) {
      //     this.stopLoadMess = true;
      //   }
      //   if (mess.length > 1 && this.stopLoadMess === false) {
      //     for (let i = 1; i < mess.length; i++ ) {
      //        this.tasksArray.push(mess[i]);
      //     }
      //   }
      // });
      this.loading = true;
      if (this.tasks2 !== undefined) {
        this.tasks2.unsubscribe();
        console.log('da unsub thisScroll');
      }
      this.tasks2 = this.userDoc.collection<Messages>('messages', ref => ref.orderBy('createdDate', 'desc').limit(20)
        .startAfter(this.lastMess)).snapshotChanges().subscribe(actions => {
        console.log('da sub thisScroll');
        if (actions.length === 0) {
          this.stopLoadMess = true;
          this.loading = false;
        }
        actions.map(a => {
          this.tasksArray.push(a.payload.doc.data());
          this.lastMess = a.payload.doc;
          this.loading = false;
        });
        this.tempStopLoadMess = false;
      });
      // this.myScrollContainer.nativeElement.scrollTop = 1;
    }
    if (this.myScrollContainer.nativeElement.scrollTop === 0) {
      this.myScrollContainer.nativeElement.scrollTop = 1;
    }
    // console.log(this.myScrollContainer.nativeElement.scrollTop);
  }
  private scrollToBottom(): void {
    if (this.disableScrollDown) {
      return;
    }
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
  clickTextbox() {
    console.log('click textbox');
  }
  redirectToRoom(id, i, candidateCurrentRoom) {
    this.idRoomChatService.id = i;
    this.idRoomChatService.candidateCurrentRoom = candidateCurrentRoom;
    this.router.navigate(['/manage/chat/' + id]);
    // this.idRoomChatService.id = id;
    // console.log(this.idRoomChatService.id);
    // this.router.navigate(['/manage/chat']);
  }
  enableOrDisNoti(state) {
    console.log(state);
    this.db.collection('chat_rooms').doc(this.roomId).update({'employer.enableNotification': state});
    this.noti = state;
  }
  showProfileCan() {
    // this.candidateIdService.idCandidate = this.candidateCurrentRoom;
    // this.profileApplyCandidateService.onSubmit(3);
  }
}
