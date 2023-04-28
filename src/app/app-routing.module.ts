import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then( m => m.AuthModule),

  },
  {
    path:'advisor',
    loadChildren: () => import('./advisor/advisor.module').then( m => m.AdvisorModule)
  },
  {
    path:'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
