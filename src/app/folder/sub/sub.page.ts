import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.page.html',
  styleUrls: ['./sub.page.scss'],
})
export class SubPage implements OnInit {

  subForm!: FormGroup;
  constructor(private modalController: ModalController,
              private http: HttpClient,
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

  onSubmit(){

    let obj = {
      ...this.subForm.value
    }


    console.log(obj);
    
  }
}
