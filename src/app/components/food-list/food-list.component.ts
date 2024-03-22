import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/common/food';
import { Group } from 'src/app/common/group';
import { GroupService } from 'src/app/services/group.service';
import { FoodService } from 'src/app/services/food.service';
import { Card } from 'src/app/common/card';
import { CardService } from 'src/app/services/card.service';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list-grid.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  groups: Group[] = [];
  cards: Card[] = [];

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
    this.cardService.getCardList().subscribe((data) => {
      this.cards = data;
      this.cards.forEach((card) => {
        card.dateCreated = new Date(card.dateCreated); // Parse date string into Date object
      });
      this.cards.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());
      console.log(this.cards); // Check the sorted cards
    });
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
    const jalaliDate = moment(miladiDate).locale('fa');
    const jalaliDay = jalaliDate.format('dddd');
    const jalaliDateNumber = jalaliDate.format('YYYY/MM/DD');
    const jalaliDateString = jalaliDate.format('jYYYY/jMM/jDD dddd');
    console.log(
      moment
        .from(jalaliDateString, 'fa', 'dddd، jYYYY/jMM/jDD')
        .locale('en')
        .toDate()
    );

    return `${jalaliDateNumber} ${jalaliDay}`;
  }
}
