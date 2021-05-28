import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl ,FormBuilder, Validators } from '@angular/forms';
import { LiveService } from 'src/app/shared/service/live.service';
import * as moment from 'moment';

@Component({
  selector: 'app-live-delete-dialog',
  templateUrl: './live-delete-dialog.component.html',
  styleUrls: ['./live-delete-dialog.component.css']
})
export class LiveDeleteDialogComponent implements OnInit {
  postData: any;

  constructor(
    public dialogRef: MatDialogRef<LiveDeleteDialogComponent>,@Inject(MAT_DIALOG_DATA) public idLive: any,
    private fb: FormBuilder,
    private rest: LiveService,
    
    
  ) { }
  deleteLive(){
console.log("delete",this.idLive)
    this.rest.deleteLive(this.idLive).subscribe();
    this.dialogRef.close(true);
   window.location.reload();
}
cancel(){
  this.dialogRef.close(true);
}
  ngOnInit(): void {
  }

}
