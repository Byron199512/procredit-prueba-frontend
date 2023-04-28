import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorRoutingModule } from './advisor-routing.module';
import { AdvisorPageComponent } from './pages/advisor-page/advisor-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MaterialModule } from '../material/material.module';
import { MonthPipe } from '../shared/pipe/month.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';




@NgModule({
  declarations: [
    AdvisorPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    MonthPipe,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AdvisorRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})
export class AdvisorModule { }
