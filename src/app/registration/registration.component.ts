import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// Importing User class to store form values
import { User } from './../user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  constructor(private postService: PostService, private router: Router) { }

  user: User = new User();

  // Creating Form Control and Form Group instance
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    gender: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    contactNumber: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl('')
  });

  // Email Validation from Angular Material
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  showSucessMessage: boolean;
  serverErrorMessages: string;

  onSubmit(form) {
    console.log('Form value ', form);
  }

  /* onSubmit(form) {
    console.log('My this.user: ', this.user);
    console.log('My form: ', form);
    // this.user.firstName = form.value.
    this.postService.postUser(form).subscribe(
      res => {
        this.showSucessMessage = true;
        // setTimeout(() => this.showSucessMessage = false, 4000);
        // this.resetForm(form);
        console.log('Registration Component res: ', res);
        if (res.status === true) {
          this.router.navigate(['login']);
        }
        else
        {
          console.log('If function not working');
        }

      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else {
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    },
    () => {
      console.log('completed');
    }
    );
  } */

  ngOnInit() {
  }

}
