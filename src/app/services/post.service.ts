import { User } from './../user.model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RENDER_FLAGS } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  uri = 'http://localhost:3000';
  private isAuthenticated = false;
  private user: any;
  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(this.uri + '/books', { withCredentials: true })
    .pipe(
      map((res: any) => {
        console.log('Books: ', res);
        console.log('First Name: ');
        return { success: true, response: res };
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteBook(bookId: number): Observable<any> {
    // const result: Observable<any> = this.http.delete<any>(this.uri + id);
    // return result;
    return this.http.delete(this.uri + '/books/' + bookId, { withCredentials: true } )
    .pipe(
      map((res: Response) => {
        return { status: true };
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  createBook(book) {
    return this.http.post(this.uri + '/books/', book, { withCredentials: true })
    .pipe(
      map((res: Response) => {
        console.log('Response: ', res);
        return { status: true };
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateBook(book) {
    console.log('Post Service updateBook: ', book);
    return this.http.put(this.uri + '/books/' + book._id, book, { withCredentials: true })
    .pipe(
      map((res: Response) => {
        return { status: true };
      }),
      catchError((error) => {
        return throwError(error);
      })
    )
  }

  postUser(user: User): Observable<any> {
    console.log('User available', user);
    const authData: User = {
      firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username, gender: user.gender,
      password: user.password, contactNumber: user.contactNumber, dateOfBirth: user.dateOfBirth, city: user.city,
      state: user.state, pinCode: user.pinCode };
    return this.http.post(this.uri + '/register', authData)
    .pipe(
      map((res: Response) => {
        console.log('Response: ', res);
        return { status: res.status };
      }),
      catchError(error => {
        console.log('Error in catchError: ', error);
        return throwError(error);
      })
    );
  }

  //
  getIsAuth() {
    return this.isAuthenticated;
  }

  // Login Form Service
  loginForm(form): Observable<any> {
    console.log('Form value: ', form);
    return this.http.post(this.uri + '/register/login', form, {
      withCredentials: true
    })
    .pipe(
      map(
        (res: Response) => {
          // Do not use res.json(). It wil give error. Please Don't
          console.log('Login Request ', res);
          console.log('Inside Post Service ');

          // Getting user's data
          this.user = res;
          console.log('this.user is', this.user);
          // withCredentials: true;
          this.isAuthenticated = true;
          return { success: true, result: res };
        }
      ),
      catchError(err => {
        console.error('Unauthorized user ', err.message);
        return throwError(err);
      })
    );
  }

  getUser() {
    return this.user;
  }

  logout(): Observable<any> {
    console.log('H');
    return this.http.get(this.uri + '/register/logout', { withCredentials: true })
    .pipe(
      map(
        res => {
          this.isAuthenticated = false;
          console.log('Logout ', res);
          return { success: true };
        }
      ),
      catchError(err => {
        console.error('Unable to logout ', err.message);
        return throwError(err);
      })
    );
  }
}

