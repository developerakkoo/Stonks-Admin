import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {

  stockForm!: FormGroup;
  constructor(private modalController: ModalController,
              private fb: FormBuilder,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private http: HttpClient,
              private menuCtrL: MenuController,
              ) {
                this.menuCtrL.enable(true);
                this.stockForm = this.fb.group({
                  call:[],
                  put:[],
                  targetPrice:[,[Validators.required]],
                  stopLoss:[,[Validators.required]],
                  isCall:[false,[Validators.required]]
                })
               }

  ngOnInit() {
  }


 
  close(){
    this.modalController.dismiss();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  onSubmit(){
    

    let targetValue = this.stockForm.get('targetPrice')!.value;
    let stopValue = this.stockForm.get('stopLoss')!.value;
    if(targetValue > stopValue){
      this.presentLoading();
      let obj = {
        ...this.stockForm.value
      }
  
      console.log(obj);
      this.http.post(environment.API +'App/api/v1/createData', obj)
      .subscribe({
        next:(value) =>{
          console.log(value);
          this.loadingController.dismiss();
          
        },
        error:(error) =>{
          this.loadingController.dismiss();
          console.log(error);
          this.presentToast("Something Went Wrong.")
          
        }
      })
    }else{
      this.presentToast("Target value must be greater than stop loss")
    }
    
  }

}
