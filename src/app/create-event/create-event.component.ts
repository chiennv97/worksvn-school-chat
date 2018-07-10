import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Event} from '../class/event';
import {User} from '../class/user';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  event;
  newEvent = new Event('', 0, 0, '', '', '', '', '' );
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  isValidFormSubmitted = false;
  validateEmail = true;
  user = new User('', '', '', '');

  constructor(
  ) { }

  ngOnInit() {
  }
  onSubmit() {}
  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    // this.user = form.value;
    // this.userService.createUser(this.user);
    // this.user = new User();
    form.resetForm();
  }
}

