import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {

  stockForm!: FormGroup;
  constructor(private modalController: ModalController,
              private fb: FormBuilder,
              private http: HttpClient
              ) {
                this.stockForm = this.fb.group({
                  call:[, [Validators.required]],
                  put:[, [Validators.required]],
                  targetPrice:[,[Validators.required]],
                  stopLoss:[,[Validators.required]]
                })
               }

  ngOnInit() {
  }


  close(){
    this.modalController.dismiss();
  }

  onSubmit(){
    let obj = {
      ...this.stockForm.value
    }

    console.log(obj);
    
  }

}
