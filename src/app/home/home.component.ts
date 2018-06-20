import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DEVSERVER} from '../class/serve';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Authorization: string;
  formSignIn: FormGroup;
  httpOptions;
  urlLogin = DEVSERVER + '';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
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
  popup(json) {
    console.log('abc');
  }
}
