// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-lives',
//   templateUrl: './lives.component.html',
//   styleUrls: ['./lives.component.css']
// })
// export class LivesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit ,Inject} from '@angular/core';
import { LiveService } from 'src/app/shared/service/live.service';
import { Live } from 'src/app/shared/model/live.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LiveFormDialogComponent } from './live-add-dialog/live-form-dialog.component';
import { LiveFormEditComponent } from './live-edit-dialog/live-form-edit.component';
import { LiveDeleteDialogComponent } from './live-delete-dialog/live-delete-dialog.component';

@Component({
  selector: 'app-live-list',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.css']
})

export class LivesComponent implements OnInit {
  livesToday: Live[]  = [];
  livesPrevious: Live[]  = [];
  livesNext: Live[] = [];
  livesNextReady: boolean = false;
  livesPreviousReady: boolean = false;
  livesTodayReady:boolean=false;
  url: string = '';


  constructor(
    private rest: LiveService,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

   this.getLives();
  }

  getLives(){
    this.rest.getLivesWithFlag('next').subscribe(data => {
      console.log("this.livesNext",data);
      this.livesNext = data.content;
     
      this.livesNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.livesNextReady = true;
    });

    this.rest.getLivesWithFlag('previous').subscribe(data => {
      console.log("this.livesNext",data);
      this.livesPrevious = data.content;
    
      this.livesPrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.livesPreviousReady = true;
    });

    this.rest.getLivesWithFlag('today').subscribe(data => {
      console.log("this.livesToday",data);
      this.livesToday = data.content;
    
      this.livesToday.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.livesTodayReady = true;
    });
  }
  EdiLive(id:any): void {
    const dialogRef = this.dialog.open(LiveFormEditComponent, {
      minWidth: '400px',
      maxWidth: '80%',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  DeleteLive(id:any): void {
    const dialogRef = this.dialog.open(LiveDeleteDialogComponent, {
      minWidth: '400px',
      maxWidth: '80%',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addLive(): void {
    const dialogRef = this.dialog.open(LiveFormDialogComponent, {
      minWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // window.location.reload();
    });
  }
  
}
