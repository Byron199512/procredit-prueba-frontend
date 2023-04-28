import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.sass']
})
export class LayoutPageComponent {

  constructor(
    private authService:AuthService
  ){}

  logout(){
    this.authService.logout()
  }
}
