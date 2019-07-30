import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RecordService } from './record.service';
import { Record } from './record';


@Component({
   selector: 'app-record',
   templateUrl: './record.component.html',
   styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
   //Component properties
   allRecords: Record[];
   statusCode: number;
   requestProcessing = false;
   recordIdToUpdate = null;
   resultToEdit = false;
   processValidation = false;
   //employee_id="123";
   //Create form
   recordForm = new FormGroup({
    // id: new FormControl('', Validators.required),
     period: new FormControl('', Validators.required)
    // rating: new FormControl('', Validators.required)
   });
   //Create constructor to get service instance
   constructor(private recordService: RecordService) {
   }
   //Create ngOnInit() and and load records
   ngOnInit(): void {
	   //this.getAllRecords();
   }
   //Fetch all records


   getAllRecords() {
		this.recordService.getAllRecords()
		  .subscribe(
                data => this.allRecords = data,
				errorCode =>  this.statusCode = errorCode);

   }
   //Handle create and update record
   onRecordFormSubmit() {
     //let id = this.employee_id;
    //debugger;
	  this.processValidation = true;
	  if (this.recordForm.invalid) {
	       return; //Validation failed, exit from method.
	  }
	  //Form is valid, now perform create or update
      this.preProcessConfigurations();
      let period = this.recordForm.value.period;
      //console.log(id, period, 'id and period')
      this.loadRecordByPeriod(period);

	  /*if (this.recordIdToUpdate === null) {
	    //Generate record id then create record
        this.recordService.getAllRecords()
	     .subscribe(records => {

		   //Generate record id
		   //let maxIndex = records.length - 1;
		   //let recordWithMaxIndex = records[maxIndex];
		   //let recordId = recordWithMaxIndex.id + 1;
		   //record.id = recordId;
		   //console.log(record,'this is form data---');
		   //Create record
     	   this.recordService.createRecord(record)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllRecords();
					this.backToCreateRecord();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });
   } */
    //else {
   	    //Handle update record
      //  record.id = this.recordIdToUpdate;
	    //this.recordService.updateRecord(record)
	    //  .subscribe(successCode => {
		  //          this.statusCode = successCode;
      //this.getAllRecords();
		//			this.backToCreateRecord();
		//	    },
		 //       errorCode => this.statusCode = errorCode);
	  //}
   }
   //Load record by id to edit
   loadRecordToEdit(recordId: string) {
      this.preProcessConfigurations();
      this.recordService.getRecordById(recordId)
	      .subscribe(record => {
			console.log(record,'poiuytre');
		            this.recordIdToUpdate = record.id;
					this.recordForm.setValue({ period: record.period, rating: record.rating });
					this.processValidation = true;
					this.requestProcessing = false;
		        },
		        errorCode =>  this.statusCode = errorCode);
   }

   //CNN Load record by priod to edit
   loadRecordByPeriod(recordPeriod: string) {
      this.preProcessConfigurations();
      this.resultToEdit = true;
      this.recordService.getRecordByPeriod(recordPeriod).subscribe (
          data => this.allRecords = data,
          errorCode =>  this.statusCode = errorCode
   )
 }


   //Delete record
   deleteRecord(recordId: string) {
      this.preProcessConfigurations();
      this.recordService.deleteRecordById(recordId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllRecords();
				    this.backToCreateRecord();
			    },
		        errorCode => this.statusCode = errorCode);
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;
   }
   //Go back from update to create
   backToCreateRecord() {
      this.recordIdToUpdate = null;
      this.recordForm.reset();
	  this.processValidation = false;
   }
}
