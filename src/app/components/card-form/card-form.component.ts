import { Component } from '@angular/core';
import {IActiveDate, IDatepickerTheme} from "ng-persian-datepicker";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CardService} from "../../services/card.service";
import {DialogRef} from "@angular/cdk/dialog";
import moment from "jalali-moment";

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})
export class CardFormComponent {
  private viaTimestampValue: Date;
  cardForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private  _cardService: CardService,
    private _dialogRef:DialogRef<CardFormComponent>) {
    this.cardForm = this._fb.group({
      dateCreated:''
    });
  }
  onSelect(event: IActiveDate): void {
    this.viaTimestampValue = new Date(event.timestamp);
    console.log(this.viaTimestampValue);

  }

  onInit(event: IActiveDate) {
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



  onFormSubmit() {
    if(this.cardForm.valid){
      const formData = this.cardForm.value;
      formData.dateCreated = this.viaTimestampValue;
      console.log(this.viaTimestampValue);
      formData.dateCreated = moment(new Date(this.viaTimestampValue)).format('YYYY-MM-DD HH:mm:ss');
      console.log(this.cardForm.value);
      this._cardService.addCard(this.cardForm.value).subscribe({
        next:(val:any)=>{
          alert('تاریخ روز با موفقیت ثبت شد');
          this._dialogRef.close();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
