import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GroupService } from './services/group.service';
import { AppComponent } from './app.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FoodService } from './services/food.service';
import { ReportComponent } from './components/report/report.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const routes: Routes = [
  { path: 'report', component: ReportComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];



@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    ReportComponent,
    HomeComponent,
    NavigationComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [FoodService, GroupService],
  bootstrap: [AppComponent],
})
export class AppModule {}
