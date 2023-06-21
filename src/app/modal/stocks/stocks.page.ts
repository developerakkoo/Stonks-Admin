import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  MenuController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {
  stockForm!: FormGroup;
  type!: string;
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private http: HttpClient,
    private menuCtrL: MenuController
  ) {
    this.menuCtrL.enable(true);
    this.stockForm = this.fb.group({
      call: [],
      targetPrice: [
        ,
        Validators.required
      ],
      entryPrice: [
        ,
        [Validators.required, Validators.minLength(5), Validators.min(5)],
      ],
      stopLoss: [
        ,
        [Validators.required, Validators.minLength(5), Validators.min(5)],
      ],
      isCall: [
        false,
        [Validators.required, Validators.minLength(5), Validators.min(5)],
      ],
    });
  }

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  typeSelect(ev: any) {
    console.log(ev.detail.value);
    this.type = ev.detail.value;
    if (ev.detail.value == 'BUY-NOW') {
      this.presentToast('Target Price will auto filled here');
      this.getNiftyPrice();
    }

    if (ev.detail.value == 'SELL-NOW') {
      this.presentToast('Target Price will auto filled here');
      this.getNiftyPrice();
    }
    if (ev.detail.value == 'B-IF-NIFTY-TOUCHES-ONLY-AT') {
      this.stockForm.controls['entryPrice'].setValue('');
      this.stockForm.controls['targetPrice'].setValue('');
      this.stockForm.controls['stopLoss'].setValue('');
    }
    if (ev.detail.value == 'S-IF-NIFTY-TOUCHES-ONLY-AT') {
      this.stockForm.controls['entryPrice'].setValue('');
      this.stockForm.controls['targetPrice'].setValue('');
      this.stockForm.controls['stopLoss'].setValue('');
    } else {
      return;
    }
  }

  getNiftyPrice() {
    this.http.get(environment.API + 'App/api/live/index').subscribe({
      next: (value: any) => {
        console.log(value[0]['LTP']);
        let price = value[0]['LTP'];
        let target = price + 120;
        let stoploss = price - 120;
        this.stockForm.controls['entryPrice'].setValue(value[0]['LTP']);
        this.stockForm.controls['targetPrice'].setValue(target);
        this.stockForm.controls['stopLoss'].setValue(stoploss);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    let targetValue = this.stockForm.get('targetPrice')!.value;
    let entryValue = this.stockForm.get('entryPrice')!.value;
    let stopValue = this.stockForm.get('stopLoss')!.value;

    if (this.type == 'BUY-NOW') {
      if (entryValue > stopValue && targetValue > stopValue) {
        this.presentToast('Entry value must be greater than Stop Loss');
        return;
      }
    }
    if (this.type == 'SELL-NOW') {
      if (entryValue < stopValue && targetValue < stopValue) {
        this.presentToast('Entry value must be smaller than Stop Loss');
        return;
      }
    }

    if (this.type == 'B-IF-NIFTY-TOUCHES-ONLY-AT' || this.type == 'BUY-NOW') {
      if (targetValue > entryValue && targetValue > stopValue) {
        this.presentToast('Target Price must be greater than entry price');
      }
    }
    if (this.type == 'S-IF-NIFTY-TOUCHES-ONLY-AT' || this.type == 'SELL-NOW') {
      if (targetValue < entryValue && targetValue < stopValue) {
        this.presentToast('Target Price must be smaller than entry price');
      }
    }

    console.log(targetValue.toString().length);
    console.log(entryValue.toString().length);
    console.log(stopValue.toString().length);

    if (targetValue.toString().length != 5) {
      this.presentToast('Target value is not 5');
      return;
    }
    if (entryValue.toString().length != 5) {
      this.presentToast('Entry value is not 5');
      return;
    }
    if (stopValue.toString().length != 5) {
      this.presentToast('Stop Loss value is not 5');
      return;
    }

      this.presentLoading();
      let obj = {
        ...this.stockForm.value,
      };

      console.log(obj);
      this.http.post(environment.API + 'App/api/v1/createData', obj).subscribe({
        next: (value) => {
          console.log(value);
          this.loadingController.dismiss();
        },
        error: (error) => {
          this.loadingController.dismiss();
          console.log(error);
          this.presentToast('Something Went Wrong.');
        },
      });
    
  }
}
