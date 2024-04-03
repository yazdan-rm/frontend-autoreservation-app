import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GroupService } from './services/group.service';
import { AppComponent } from './app.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FoodService } from './services/food.service';
import { ReportComponent } from './components/report/report.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CardService} from "./services/card.service";
import { CardAddEditComponent } from './components/card-add-edit/card-add-edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { CardFormComponent } from './components/card-form/card-form.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatInputModule} from '@angular/material/input';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";




const routes: Routes = [
  {path:'card', component: CardAddEditComponent},
  { path: 'report', component: ReportComponent },
  { path: 'home', component: FoodListComponent, },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchBoxComponent,
    FoodListComponent,
    ReportComponent,
    CardAddEditComponent,
    CardFormComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormField,
    FormsModule,
    MatInput,
    MatInputModule,
    MatFormFieldModule,
    NgPersianDatepickerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginator,
    MatSortModule
  ],
  providers: [FoodService, GroupService, CardService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
