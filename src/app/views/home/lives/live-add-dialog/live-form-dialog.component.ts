import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LiveService } from 'src/app/shared/service/live.service';
import * as moment from 'moment';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {
  

  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,@Inject(MAT_DIALOG_DATA) public liveForm: FormGroup,
    private fb: FormBuilder,
    private rest: LiveService,
    
  ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', [Validators.required]]
    });


  
  
  }

  editLive(){
     let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
     this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD");
     console.log(this.liveForm.value.liveDate);
     if(this.liveForm.status == "VALID"){
      this.rest.postLives(this.liveForm.value).subscribe(result =>{});
     }
    
    this.dialogRef.close(true);
    this.liveForm.reset();
    window.location.reload();
  }
  createLive(){
    let newDate: moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD");
    console.log(this.liveForm.value.liveDate);
    if(this.liveForm.status == "VALID"){
     this.rest.postLives(this.liveForm.value).subscribe(result =>{});
    }
   
   this.dialogRef.close(true);
   this.liveForm.reset();
   window.location.reload();
 }
  cancel(){
    this.dialogRef.close(true);
    this.liveForm.reset();
  }

}
