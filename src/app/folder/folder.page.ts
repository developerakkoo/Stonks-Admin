import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StocksPage } from '../modal/stocks/stocks.page';
import { SubPage } from './sub/sub.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  isStocks: boolean = true;
  isUser: Boolean = false;
  isSub: boolean = false;
  isChart: boolean =false;
  constructor(private modalController: ModalController,
              private http: HttpClient) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if(this.folder === "stocks"){
      console.log("Stocks");
      this.isStocks = true;
      this.isChart = false;
      this.isSub = false;
      this.isUser = false;
      
    }

    else if(this.folder === "user"){
      console.log("Users");
      this.isStocks = false;
      this.isChart = false;
      this.isSub = false;
      this.isUser = true;
      

    }

    else if(this.folder === "sub"){
      console.log("Users");
      this.isStocks = false;
      this.isChart = false;
      this.isSub = true;
      this.isUser = false;
      

    }

    else if(this.folder === "chart"){
      console.log("Users");
      this.isStocks = false;
      this.isChart = true;
      this.isSub = false;
      this.isUser = false;
      

    }
  }

 

 async openStocks(){
    const modal = await this.modalController.create({
      component: StocksPage,
      componentProps: { value: 123 }
      });
    
      await modal.present();
  }


  async openSubscription(){
    const modal = await this.modalController.create({
      component: SubPage,
      componentProps:{value: 123}
    });

    await modal.present();
  }
}
