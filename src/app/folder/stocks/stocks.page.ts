import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {

  stockForm!: FormGroup;

  stocks!:any[];
  constructor(private http: HttpClient,
              private loadingController: LoadingController,
              private modalController: ModalController,
              private toastController: ToastController) { }

  ngOnInit() {
  }


async openStockModal(){
    const modal = await this.modalController.create({
      component: StocksPage,
      componentProps: { value: 123 }
      });
    
      await modal.present();
  }


  onSubmit(){

  }

}
