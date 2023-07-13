import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { StocksPage } from '../modal/stocks/stocks.page';
import { SubPage } from './sub/sub.page';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { EditSubscriptionPage } from '../edit-subscription/edit-subscription.page';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public chart :any;
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  isStocks: boolean = true;
  isUser: Boolean = false;
  isSub: boolean = false;
  isChart: boolean =false;

  label:any;
  profitData:any;
  lossData:any;
  isToggleChecked!:boolean;
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
              private alertController: AlertController,
              private http: HttpClient) {
                this.menuController.enable(true);
                this.loadingController.dismiss();
                setTimeout(() =>{
    this.createChart();

                },2000)
              }

  ngOnInit() {
    
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if(this.folder === "stocks"){
      console.log("Stocks");
      this.isStocks = true;
      this.isChart = false;
      this.isSub = false;
      this.isUser = false;
      this.getCallStatus();
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
      this.getchartDate();
      

    }
  }


  ToggleEvent(ev:any){
    console.log(ev.detail);
    
  }
  getCallStatus(){
    this.http.get(environment.API+ "api/get/noCall/6494098da741612bc7797121")
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.isToggleChecked = value['data']['isNoCall'];
        
      },
      error:(error:any) =>{
        console.log(error);
        
      }
    })
  }
  updateCall(ev:any){
    this.http.put(environment.API + "api/update/noCall/6494098da741612bc7797121",{
      "isNoCall": ev.detail.checked
    }).subscribe({
      next:(value:any) =>{
        console.log(value);
        
      },
      error:(error:any) =>{
        console.log(error);
        
      }
    })
  }


  async presentAlertConfirm(user:any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message to Send to user!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: (value) => {
            console.log('Confirm Okay');
            console.log(value.msg);
            

            this.notifyUser(user, value.msg);
          }
        }
      ],
      inputs:[
        {
          placeholder:"Message...",
          max: 100,
          name:"msg",
          type:'text',
          handler:(value) =>{
            console.log(value);
            
          }
        }
      ]
    });
  
    await alert.present();
  }
  notifyUser(user:any, msg:any){
    console.log(msg);
    
    console.log(user.firebaseToken);
    this.http.post(environment.API +'firebase/notification',{
      registrationToken: user.firebaseToken,
      title:"Nifty Level Tracker",
      message:{
        notification: {
              title: "Nifty Level Tracker",
              body: msg
          }
        }
    }).subscribe({
      next:(value:any) =>{
        console.log(value);
        
      },
      error:(error:any) =>{
        console.log(error);
        
      }
    })
    
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration:2000
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

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.label, 
	       datasets: [
          {
            label: "Profit",
            data: this.profitData,
            backgroundColor: 'limegreen'
          },
          {
            label: "Loss",
            data:this.lossData,
            backgroundColor: 'red'
          }  
        ]
      },
      options: {
        aspectRatio:1
      }
      
    });
  }

  getchartDate(){
    this.http.get(environment.API +'getChart/data')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.label = value['label'];
        this.profitData = value['Profit']['dataSet'];
        this.lossData = value['loss']['data'];
        
      },
      error:(error:any) =>{
        console.log(error);
        
      }
    })
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
    this.http.get(environment.API +'App/api/v1/getAll/user')
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
