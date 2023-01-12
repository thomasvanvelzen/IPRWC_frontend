import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from 'src/app/typings/user-profile.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  public profile: UserProfile = {
    userId: null,
    email: null,
    firstName: null,
    lastName: null,
    city: null,
    postalCode: null,
    phoneNumber: null,
    street: null,
    houseNumber: null,
  };

  public profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('[0-9]*'),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    houseNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9][0-9]{3}s?([a-zA-Z]{2})?$'),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
  });

  constructor(private http: HttpClient) {}

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  get street() {
    return this.profileForm.get('street');
  }

  get houseNumber() {
    return this.profileForm.get('houseNumber');
  }

  get postalCode() {
    return this.profileForm.get('postalCode');
  }

  get city() {
    return this.profileForm.get('city');
  }
}
