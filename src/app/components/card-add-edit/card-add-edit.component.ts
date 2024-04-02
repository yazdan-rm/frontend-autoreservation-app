import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CardFormComponent} from "../card-form/card-form.component";
import {IActiveDate, IDatepickerTheme} from "ng-persian-datepicker";

@Component({
  selector: 'app-card-add-edit',
  templateUrl: './card-add-edit.component.html',
  styleUrl: './card-add-edit.component.scss'
})
export class CardAddEditComponent implements OnInit{

  constructor(private _dialog: MatDialog) {
  }
    ngOnInit(): void {

    }

  openAddEditCardForm(){
    this._dialog.open(CardFormComponent,{
      width:'400px'
    });
  }


}
