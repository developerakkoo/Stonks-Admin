import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.page.html',
  styleUrls: ['./edit-subscription.page.scss'],
})
export class EditSubscriptionPage implements OnInit {

  @Input() value:any;
  subForm!: FormGroup;

  constructor(private http: HttpClient,
              private modelCtrl: ModalController,
              private loadingController: LoadingController,
              private fb: FormBuilder,
              private toastController: ToastController) {
                
               }


               dismiss(){
                this.modelCtrl.dismiss();
               }


  ngOnInit() {
    console.log(this.value);
    this.subForm = this.fb.group({
      name:[this.value['name'],[Validators.required]],
      price:[this.value['price'],[Validators.required]],
      duration:[this.value['duration'],[Validators.required]],
      description:[this.value['description'], [Validators.required]]
    })
    
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

  deletePlan(){
    this.presentLoading();
    this.http.delete(environment.API + 'App/api/v1/deletePlan/'+ this.value['_id'])
    .subscribe({
      next:(value) =>{
        console.log(value);
        this.loadingController.dismiss();
        this.dismiss();
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        this.presentToast();
      }
    })
    
  }

  onSubmit(){
    this.presentLoading();
    console.log(this.subForm.value);
    let obj = {
      ...this.subForm.value
    }
    this.http.put(environment.API +'App/api/v1/updatePlan/'+ this.value['_id'], obj)
    .subscribe({
      next:(value) =>{
        console.log(value);
        this.loadingController.dismiss();

        
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        this.presentToast()
        
      }
    })
    
  }
}
