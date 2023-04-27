import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

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
      password: [, [Validators.required,Validators.min(5)]]
    })
   }

  ngOnInit() {
  }



  async onSubmit(){

   signInWithEmailAndPassword(this.auth,this.loginForm.value.email, this.loginForm.value.password)
   .then((user) =>{

     
     if(user.user.uid){
       this.router.navigate(['folder/stocks']);
      }
    }).catch((error) =>{
      console.log(error);
      
    })
    
  }
}
