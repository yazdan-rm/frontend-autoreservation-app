import {Component, Inject, OnInit} from '@angular/core';
import {IActiveDate, IDatepickerTheme} from "ng-persian-datepicker";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../services/card.service";
import moment from "jalali-moment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {of} from "rxjs";


@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})


export class CardFormComponent implements OnInit {

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


  cardForm: FormGroup;
  private viaTimestampValue: Date;


  constructor(
    private toastr: ToastrService,
    private _fb: FormBuilder,
    private _cardService: CardService,
    private _dialogRef: MatDialogRef<CardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cardForm = this._fb.group({
      id: -1,
      dateCreated: this._fb.control('', Validators.required),
      dateUpdated: ''
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



  onFormSubmit() {
    if (this.cardForm.valid) {

      const formData = this.cardForm.value;

      formData.dateCreated = this.viaTimestampValue;

      formData.dateCreated = moment(new Date(this.viaTimestampValue)).format('YYYY-MM-DD HH:mm:ss');

      if (this.data) {

        this._cardService.updateCard(this.data.id, this.cardForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('تاریخ روز با موفقیت بروز رسانی شد','عملبات موفق');
            this._dialogRef.close(true);
          },
          error: (err) => {
            this.toastr.error('خطا در ارسال داده دوباره تلاش کنید', `عملیات ناموفق`);
          }
        });

      } else {

        this._cardService.addCard(this.cardForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('تاریخ روز با موفقیت ثبت شد','عملبات موفق');
            this._dialogRef.close(true);
          },
          error: (err) => {
            this.toastr.error('خطا در ارسال داده دوباره تلاش کنید', `عملیات ناموفق`);
          }
        });

      }

    }
  }

}
