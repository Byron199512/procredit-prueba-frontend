import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AdvisorPageComponent } from './pages/advisor-page/advisor-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { canActivateTeam, canMatchTeam } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    canActivate:[canActivateTeam],
    canMatch:[canMatchTeam],
    children: [
      {
        path: 'home',
        component: AdvisorPageComponent
      },
      {
        path: 'list',
        component: ListPageComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdvisorRoutingModule { }
