import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CardFormComponent} from "../card-form/card-form.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CardService} from "../../services/card.service";
import {Card} from "../../common/card";
import moment from "jalali-moment";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-card-add-edit',
  templateUrl: './card-add-edit.component.html',
  styleUrl: './card-add-edit.component.scss'
})


export class CardAddEditComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'dateCreated',
    'dateUpdated',
    'action'
  ];
  dataSource: MatTableDataSource<Card>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _dialog: MatDialog,
              private _cardService: CardService,
              private toastr : ToastrService) {
  }

  ngOnInit(): void {
    this.getCardList();
  }

  openAddEditCardForm() {
    const dialogRef = this._dialog.open(CardFormComponent, {
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getCardList();
        console.log('this work perfectly')
      }
    });
  }

  openEditCardForm(data: any) {
    console.log(data);
    let map: any = {
      id: data.id,
      dateCreated: this.mapMiladiToShamsi(data.dateCreated),
      dateUpdated: data.dateUpdated
    };
    const dialogRef = this._dialog.open(CardFormComponent, {
      width: '700px',
      data: map
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getCardList();
        console.log('this work perfectly')
      }
    });

  }

  mapMiladiToShamsi(miladi: string): string {
    return moment(new Date(miladi)).locale('fa').format('YYYY-MM-DD HH:MM:SS').toString();
  }

  getCardList() {
    this._cardService.getAllCards().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<Card>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error
    })
  }


  convertToJalaliWithWeekday(miladiDate: Date): string {
    const jalaliDate = moment(new Date(miladiDate)).locale('fa');
    const jalaliDay = jalaliDate.format('dddd');
    const jalaliDateNumber = jalaliDate.format('YYYY/MM/DD');
    const jalaliDateString = jalaliDate.format('HH:mm');
    const jalaliDateTimeString = jalaliDate.format('YYYY/MM/DD dddd HH:mm:ss');
    // console.log(
    //   moment
    //     .from(jalaliDateString, 'fa', 'dddd، jYYYY/jMM/jDD')
    //     .locale('en')
    //     .toDate()
    // );

    return `تاریخ: ${jalaliDateNumber}  ${jalaliDay}   زمان: ${jalaliDateString}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCard(id: number) {
    if(confirm("آیا اطمینان دارید؟")){
      this._cardService.deleteCard(id).subscribe({
        next: () => {
          this.toastr.success('آیتم با موفقیت حذف شد','عملبات موفق')
          this.getCardList();
        },
        error: console.error
      });
    }
  }

}
