import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSubscriptionPage } from './edit-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: EditSubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSubscriptionPageRoutingModule {}
