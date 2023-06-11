import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'folder/stocks',
    redirectTo: 'folder/stocks',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'stocks',
    loadChildren: () => import('./modal/stocks/stocks.module').then( m => m.StocksPageModule)
  },
  {
    path: 'edit-subscription',
    loadChildren: () => import('./edit-subscription/edit-subscription.module').then( m => m.EditSubscriptionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
