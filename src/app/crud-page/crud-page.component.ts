import { PostService } from './../services/post.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Book } from './../user.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateBookComponent } from '../update-book/update-book.component';




@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.sass']
})
export class CrudPageComponent implements OnInit {
  // Structure to send books data to db
  book: Book = new Book();
  userInfo: any;
  firstName = '';

  // Array of all books in mongodb database
  displayedColumns: string[] = ['position', 'name', 'author1', 'category', 'author2', 'edition', 'language', 'cost', 'isbn', 'actions'];
  books: Book[] = [];

  onSubmit(book: NgForm) {
    console.log(book);
    this.postService.createBook(book).subscribe(
      res => {
        if (res.status === true) {
          this.router.navigate(['crud']);
        }
        else
        {
          console.log('If function not working');
        }
      },
      err => {
        console.log('onCreate Error: ', err);
      },
      () => {
        this.ngOnInit();
        console.log('Successfully added book');
      }
    );

  }
  // Update Book
  onUpdate(book) {
    // Passing data using data property
    console.log('Update: ', book);
    this.dialog.open(UpdateBookComponent, {
      data: book
    });
    console.log('After Dialog');
  }

  // Delete Book
  onDelete(event) {
    console.log(event._id);
    this.postService.deleteBook(event._id).subscribe(
      res => {
        console.log('Deleted Book ', res);
      },
      err => {
        console.log('onDelete Error: ', err);
      },
      () => {
        this.ngOnInit();
        console.log('Deleted');
      }
    );

  }

  // Update Book
  /* startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  } */

  onLogout() {
    this.postService.logout().subscribe(
      res => {
        if ( res.success === true) {
          console.log('Logged Out');
          this.router.navigate(['login']);
        }
      },
      err => {
        console.log('Error in logout ', err);
      },
      () => {
        console.log('Successfully Logged out');
      }
    );
  }


  constructor(private postService: PostService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.userInfo = this.postService.getUser();
    console.log(this.postService.getUser());
    this.firstName = this.userInfo.response.firstName;
    console.log('First Name ', this.firstName);
    this.postService.getBooks().subscribe(
      (res: any) => {
        console.log('Res ', res);
        this.books = res.response;
        console.log('Lenght: ', this.books.length);
      },

      error => {
        console.log('Error ', error);
      },

      () => {
        console.log('Fetched all the books ');
      }
    );
  }

}
