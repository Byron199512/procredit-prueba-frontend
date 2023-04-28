import { Component } from '@angular/core';
import { LoginResponse } from 'src/app/shared/interfaces/login.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'list', url: './list' },
    { label: 'Inicio', icon: 'home', url: './home' }
  ]

  public user = this.getUser()?.user;
  constructor(
    private authService: AuthService
  ){}

  getUser():LoginResponse | undefined {
  return  this.authService.currentUser;
  }

  logout(){
    this.authService.logout()
  }
}
