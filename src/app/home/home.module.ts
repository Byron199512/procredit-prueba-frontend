import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { StepComponentComponent } from './components/step-component/step-component.component';
import { FormCreditComponent } from './components/form-credit/form-credit.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormTypeComponent } from './components/form-type/form-type.component';


@NgModule({
  declarations: [
    HomePageComponent,
    StepComponentComponent,
    FormCreditComponent,
    SidebarComponent,
    FormTypeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports:[HomePageComponent]
})
export class HomeModule { }
