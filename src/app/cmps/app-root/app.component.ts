import { Component } from '@angular/core';
// import { contactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-project';
  currPage: string = 'home';

  toPage(pageName: string) {
    this.currPage = pageName;
  }
}
