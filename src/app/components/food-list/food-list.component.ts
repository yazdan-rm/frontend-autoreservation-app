import { Component, OnInit } from '@angular/core';

import moment from 'jalali-moment';
import {Food} from "../../common/food";
import {Group} from "../../common/group";
import {Card} from "../../common/card";
import {FoodService} from "../../services/food.service";
import {GroupService} from "../../services/group.service";
import {CardService} from "../../services/card.service";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list-grid.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  groups: Group[] = [];
  cards: Card[] = [];

  // Pagination properties
  pageNumber: number = 1;
  pageSize: number =8;
  totalElements: number = 0;

  constructor(
    private foodService: FoodService,
    private groupService: GroupService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.listFood();
    this.listGroup();
    this.listCard();
  }

  listCard() {
    this.cardService
      .getCardListPagination(this.pageNumber - 1, this.pageSize)
      .subscribe((data) => {

        this.cards = data.content;
        this.pageNumber = data.pageNo + 1;
        this.pageSize = data.pageSize;
        this.totalElements = data.totalElements;

        // Parse date string into Date object and sort cards
        this.cards.forEach((card) => {
          card.dateCreated = new Date(card.dateCreated);
        });
        this.sortCards();
      });
  }

  sortCards() {
    this.cards.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());
    console.log(this.cards); // Check the sorted cards
  }

  updatePageSize(value: string) {
    this.pageSize = +value;
    this.pageNumber = 1;
    this.listCard();
  }

  listFood() {
    this.foodService.getFoodList().subscribe((data) => (this.foods = data));
  }

  listGroup() {
    this.groupService
      .getFoodGroupList()
      .subscribe((data) => (this.groups = data));
  }

  onSelected(foodName: string, tempCard: Card) {
    const selectedFood = this.foods.find((food) => food.foodName === foodName);
    if (selectedFood) {
      tempCard.tempFood = selectedFood.image;
    }
  }

  convertToJalaliWithWeekday(miladiDate: Date): string {
    const jalaliDate = moment(new Date(miladiDate)).locale('fa');
    const jalaliDay = jalaliDate.format('dddd');
    const jalaliDateNumber = jalaliDate.format('YYYY/MM/DD');
    const jalaliDateString = jalaliDate.format('HH:mm:ss');
    const jalaliDateTimeString = jalaliDate.format('YYYY/MM/DD dddd HH:mm:ss');
    console.log(
      moment
        .from(jalaliDateString, 'fa', 'dddd، jYYYY/jMM/jDD')
        .locale('en')
        .toDate()
    );

    return `تاریخ: ${jalaliDateNumber}  ${jalaliDay}   زمان: ${jalaliDateString}`;
  }
}
