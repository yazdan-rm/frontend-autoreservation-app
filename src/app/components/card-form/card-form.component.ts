import {Component, Inject, OnInit} from '@angular/core';
import {IActiveDate, IDatepickerTheme} from "ng-persian-datepicker";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CardService} from "../../services/card.service";
import moment from "jalali-moment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})
export class CardFormComponent implements OnInit{
  private viaTimestampValue: Date;
  cardForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private  _cardService: CardService,
    private _dialogRef:MatDialogRef<CardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.cardForm = this._fb.group({
      id: -1,
      dateCreated:'',
      dateUpdated:''
    });

  }

  ngOnInit(): void {
    console.log(`this initial date this will be updated : ${this.data}`)
        this.cardForm.patchValue(this.data);
    }
  onSelect(event: IActiveDate): void {
    this.viaTimestampValue = new Date(event.timestamp);
    console.log(this.viaTimestampValue);

  }

  onInit(event: IActiveDate) {
    console.log(event.timestamp, event.shamsi, event.gregorian)
    this.viaTimestampValue = new Date(event.timestamp);
    console.log(this.viaTimestampValue);

  }

  customTheme: Partial<IDatepickerTheme> = {
    border: '#393939',
    timeBorder: '#393939',

    background: '#222222',
    text: '#FFFFFF',

    hoverBackground: '#393939',
    hoverText: '#FFFFFF',

    disabledBackground: '#393939',
    disabledText: '#CCCCCC',

    selectedBackground: '#D68E3A',
    selectedText: '#FFFFFF',

    todayBackground: '#FFFFFF',
    todayText: '#2D2D2D',

    otherMonthBackground: 'rgba(0, 0, 0, 0)',
    otherMonthText: '#CCCCCC'
  };


    shamsiToMiladi(shamsiDateString: string): string {
      const gregorianDate = moment.from(shamsiDateString, 'fa', 'YYYY-MM-DD HH:mm:ss').locale('en').format('YYYY-MM-DD HH:mm:ss');

    return gregorianDate;
  }
  onFormSubmit() {
    if(this.cardForm.valid){
      if(this.data){
        console.log('this is data for updating',this.data, this.data.id, this.data.value)


        this.data.dateCreated = this.shamsiToMiladi(this.data.dateCreated);
        console.log(` this is converted date : ${this.shamsiToMiladi(this.data.dateCreated)}`);
        console.log(this.data);

        this._cardService.updateCard(this.data.id, this.data).subscribe({
          next:(val:any)=>{
            alert('تاریخ روز با موفقیت بروز رسانی شد');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }else{
        const formData = this.cardForm.value;
        formData.dateCreated = this.viaTimestampValue;

        console.log(this.viaTimestampValue);
        formData.dateCreated = moment(new Date(this.viaTimestampValue)).format('YYYY-MM-DD HH:mm:ss');

        console.log(this.cardForm.value);

        this._cardService.addCard(this.cardForm.value).subscribe({
          next:(val:any)=>{
            alert('تاریخ روز با موفقیت ثبت شد');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }

    }
  }

}
