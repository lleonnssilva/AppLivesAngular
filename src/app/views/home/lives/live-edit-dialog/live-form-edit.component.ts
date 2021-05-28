import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl ,FormBuilder, Validators } from '@angular/forms';
import { LiveService } from 'src/app/shared/service/live.service';
import * as moment from 'moment';


@Component({
  selector: 'app-live-form-edit',
  templateUrl: './live-form-edit.component.html',
  styleUrls: ['./live-form-edit.component.css']
})
export class LiveFormEditComponent implements OnInit {
  liveEditForm: FormGroup;
  postData: any;
  


  
  constructor(
    public dialogRef: MatDialogRef<LiveFormEditComponent>,@Inject(MAT_DIALOG_DATA) public idLive: any,
    private fb: FormBuilder,
    private rest: LiveService,
    
    
  ) { 
    this.liveEditForm = this.fb.group({

      id: new FormControl('',[]),
      liveName:new FormControl('',[]),
      channelName: new FormControl('',[]),
      liveLink: new FormControl('',[]),
      liveDate: new FormControl('',[]),
      liveTime: new FormControl('',[]),
      statusLive: new FormControl(false,[]),
    });
    this.rest.getLive(this.idLive).subscribe(data => {
        this.postData = data;
        this.liveEditForm.controls['id'].setValue(this.postData.id);
        this.liveEditForm.controls['liveName'].setValue(this.postData.liveName);
        this.liveEditForm.controls['channelName'].setValue(this.postData.channelName);
        this.liveEditForm.controls['liveLink'].setValue(this.postData.liveLink);
        this.liveEditForm.controls['liveDate'].setValue(this.postData.liveDate);
        this.liveEditForm.controls['liveTime'].setValue(this.postData.liveTime);
        this.liveEditForm.controls['statusLive'].setValue(this.postData.statusLive);
});
  
  }

  ngOnInit(): void {
console.log(this.idLive);
  }

  editLive(){
      let newDate: moment.Moment = moment.utc(this.liveEditForm.value.liveDate).local();
      this.liveEditForm.value.liveDate = newDate.format("YYYY-MM-DD");
  
    if(this.liveEditForm.status == "VALID"){
     console.log(this.liveEditForm);
      this.rest.putEditLive(this.liveEditForm.value).subscribe();
      this.dialogRef.close(true);
      this.liveEditForm.reset();
      window.location.reload();
     }
    
  }
  
  cancel(){
    this.dialogRef.close(true);
  }

}
