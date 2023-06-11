import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSubscriptionPageRoutingModule } from './edit-subscription-routing.module';

import { EditSubscriptionPage } from './edit-subscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditSubscriptionPageRoutingModule
  ],
  declarations: [EditSubscriptionPage]
})
export class EditSubscriptionPageModule {}
