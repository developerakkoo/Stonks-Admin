import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  loginForm!: FormGroup;
  constructor(private menuCtrl: MenuController,
              private fb: FormBuilder,
              private auth: Auth,
              private router: Router,
              private toastController: ToastController,
              private loadingController: LoadingController) {
    this.menuCtrl.enable(false);
    this.loginForm = this.fb.group({
      email:[, [Validators.required, Validators.email]],
    })
   }

  ngOnInit() {
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message:msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Sending link...',
    });
    await loading.present();
  }
  onSubmit(){
    this.presentLoading();
    sendPasswordResetEmail(this.auth, this.loginForm.value.email).then((success) =>{
      console.log(success);
      this.loadingController.dismiss();
      this.presentToast("check your email for reset email");
    }).catch((error) =>{
      console.log(error);
      this.loadingController.dismiss();
      this.presentToast(error.message);
      
    })
  }
}
