import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-autoreservation-app';

  onActive(event: any) {
    window.scroll(0,0);

  }
}
