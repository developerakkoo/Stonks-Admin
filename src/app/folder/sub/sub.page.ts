import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.page.html',
  styleUrls: ['./sub.page.scss'],
})
export class SubPage implements OnInit {

  subForm!: FormGroup;
  constructor(private modalController: ModalController,
              private http: HttpClient,
              private loadingController: LoadingController,
              private fb: FormBuilder) {
                this.subForm = this.fb.group({
                  name:[,[Validators.required]],
                  price:[,[Validators.required]],
                  duration:[,[Validators.required]],
                  description:[, [Validators.required]]
                })
               }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss();
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Adding...',
    });
    await loading.present();
  }
  onSubmit(){
    this.presentLoading();
    let obj = {
      ...this.subForm.value
    }
    this.http.post(environment.API + 'App/api/v1/createSubscription', obj)
    .subscribe({
      next:(value) =>{
        this.loadingController.dismiss();
        console.log(value);
        
      }
      ,error:(error) =>{
        this.loadingController.dismiss();
        console.log(error);
        
      }
    })


    console.log(obj);
    
  }
}
