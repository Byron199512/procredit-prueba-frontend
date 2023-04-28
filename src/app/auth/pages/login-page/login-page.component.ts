import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { basicAlert } from 'src/app/shared/alerts/toast';
import { TYPE_ALERT } from 'src/app/shared/alerts/values.config';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})

export class LoginPageComponent implements OnInit {


  loginForm: FormGroup = this.fb.group({
    UserName:['',Validators.required],
    Password:['',Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}


  ngOnInit(): void {

  }

  onLogin(){
    if(this.loginForm.valid){

      this.authService.login(this.loginForm.value).subscribe( user=>{
       if(user){
         this.router.navigate(['/advisor/list'])
       }else{
         basicAlert('usuario / contraseña incorrecta', TYPE_ALERT.ERROR)
       }
      });
    }
  }

}
