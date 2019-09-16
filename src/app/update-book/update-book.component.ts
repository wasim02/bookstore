import { Component, OnInit, Inject } from '@angular/core';
import { Book } from './../user.model';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.sass']
})
export class UpdateBookComponent implements OnInit {

  // Here I am using MAT_DIALOG_DATA to access data property(book details) from crud-component

  constructor(private postService: PostService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) { }

  book: Book = new Book();
  newBook: Book = new Book();
  onSubmit(updateInfo) {
    console.log('OnSubmit Inside Dialog: ', updateInfo);
    this.newBook = updateInfo;
    this.newBook._id = this.book._id;
    this.postService.updateBook(this.newBook).subscribe(
      response => {
        console.log('Updated Response ', response);
      },
      error => {
        console.log('Error in Dialog: ', error);
      },
      () => {
        console.log('Updated');
      }
    )
  }

  ngOnInit() {
    // Data coming from crud-component using data property
    console.log('Data using data property ', this.data);
    // Assigning it
    this.book = this.data;
    console.log('ngOnInit in update-book: ', this.book);
  }
}
