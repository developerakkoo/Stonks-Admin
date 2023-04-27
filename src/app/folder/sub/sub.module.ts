import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubPageRoutingModule } from './sub-routing.module';

import { SubPage } from './sub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SubPageRoutingModule
  ],
  declarations: [SubPage]
})
export class SubPageModule {}
