import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  excelLink: string= "";
  userLink: string= "";
  public appPages = [
    { title: 'Stocks', url: '/folder/stocks', icon: 'mail' },
    { title: 'Users', url: '/folder/user', icon: 'person' },
    { title: 'Subscriptions', url: '/folder/sub', icon: 'heart' },
    { title: 'Backtest Results', url: '/folder/chart', icon: 'podium' },
  ];
  constructor(private menuCtrl: MenuController,
              private http: HttpClient) {
    this.menuCtrl.enable(false);
    this.getStockExcel();
  }

  getStockExcel(){
    this.http.get(environment.API + 'export-To-Excel/CallData')
    .subscribe({
      next: (value:any) =>{
        console.log(value);
        this.excelLink = value['DownloadLink'];
        // this.getFile(value['DownloadLink']);
      },

      error:(error) =>{
        console.log(error);
        
      }
    })
  }

  getUserExcel(){
    this.http.get(environment.API + 'export-To-Excel/CallData')
    .subscribe({
      next: (value:any) =>{
        console.log(value);
        this.userLink = value['DownloadLink'];
        // this.getFile(value['DownloadLink']);
      },

      error:(error) =>{
        console.log(error);
        
      }
    })
  }

  getFile(link: string){
    this.http.get(link,{ responseType: 'blob' }).subscribe({
      next:(data: Blob) =>{
        const csvData = new Blob([data], { type: 'text/csv' });
        const csvUrl = window.URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvUrl;
        link.download = 'file.csv';
        link.click();
        window.URL.revokeObjectURL(csvUrl);
      }
    })
  }
}
