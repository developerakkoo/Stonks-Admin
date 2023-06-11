import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Stocks', url: '/folder/stocks', icon: 'mail' },
    { title: 'Users', url: '/folder/user', icon: 'person' },
    { title: 'Subscriptions', url: '/folder/sub', icon: 'heart' },
  ];
  constructor(private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }
}
