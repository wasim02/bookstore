import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {
  serverErrorMessages: string;
  username: string;
  constructor(private postService: PostService, private router: Router) { }

  goToRegistration() {
    this.router.navigateByUrl('register')
    .then(value => {
      console.log(value);
    })
    .catch (err => { console.log(err); });
  }
  onSubmit(form) {
    // this.user.firstName = form.value.
    console.log('Form ', form);
    this.postService.loginForm(form).subscribe(
      (res) => {
        // this.showSucessMessage = true;
        // setTimeout(() => this.showSucessMessage = false, 4000);
        // this.resetForm(form);
        console.log('Login Component res: ', res.result.response._id);
        this.username = res.result.response._id;
        console.log('Username is: ', this.username);
        this.router.navigate(['crud']);
      },
      err => {
        console.log('Login unsuccessful', err);
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else if (err.status === 401) {
          console.log('Invalid username or password ');
        }
        else {
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
          console.log(err);
      }
    },
    () => {
      console.log('Login successfull completed ');
    }
    );
  }

  ngOnInit() {
  }

}
