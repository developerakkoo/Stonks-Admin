import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { StocksPage } from '../modal/stocks/stocks.page';
import { SubPage } from './sub/sub.page';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { EditSubscriptionPage } from '../edit-subscription/edit-subscription.page';

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

  subscriptionPlansList:any[] = [];
  usersList:any[] = [];
  stocksList:any[] = [];

  getSubscriptionSub!: Subscription;
  getUserSub!: Subscription;
  getStocksSub!: Subscription;


  constructor(private modalController: ModalController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private menuController: MenuController,
              private router: Router,
              private http: HttpClient) {
                this.menuController.enable(true);
                this.loadingController.dismiss();
              }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if(this.folder === "stocks"){
      console.log("Stocks");
      this.isStocks = true;
      this.isChart = false;
      this.isSub = false;
      this.isUser = false;
      this.getStockList();
    }

    else if(this.folder === "user"){
      console.log("Users");
      this.isStocks = false;
      this.isChart = false;
      this.isSub = false;
      this.isUser = true;
      this.getUsersList();

    }

    else if(this.folder === "sub"){
      console.log("Users");
      this.isStocks = false;
      this.isChart = false;
      this.isSub = true;
      this.isUser = false;
      this.getSubscriptionList();
      

    }

    else if(this.folder === "chart"){
      console.log("Users");
      this.isStocks = false;
      this.isChart = true;
      this.isSub = false;
      this.isUser = false;
      

    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Something went Wrong! Please try again later.',
      duration: 2000
    });
    toast.present();
  }
  getSubscriptionList(){
    this.presentLoading();
    this.http.get(environment.API +'App/api/v1/getAllPlans')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.subscriptionPlansList = value['plans'];
        this.loadingController.dismiss();
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        
      }
    })
  }

  getUsersList(){
    this.presentLoading();
    this.http.get(environment.API +'App/api/v1/getAll')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.usersList = value['user'];
        this.loadingController.dismiss();
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        
      }
    })
  }

  getStockList(){
    this.presentLoading();
    this.http.get(environment.API +'App/api/v1/getData')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.stocksList = value['calls'];
        this.loadingController.dismiss();
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        
      }
    })
  }
 async openEditPage(sub:any){
    console.log(sub);
    const modal = await this.modalController.create({
      component: EditSubscriptionPage,
      componentProps: { value: sub }
      });
    modal.present();
      await modal.onWillDismiss().then(() =>{
        this.getSubscriptionList();
      })

   
    
    
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
