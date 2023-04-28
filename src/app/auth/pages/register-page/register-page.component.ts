import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { basicAlert } from 'src/app/shared/alerts/toast';
import { TYPE_ALERT } from 'src/app/shared/alerts/values.config';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ValidatorService } from 'src/app/shared/services/validators.service';
import { errorValidation } from 'src/app/validators/error-validator.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent {

  public myResgiterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required,Validators.maxLength(20)],),
    email: new FormControl('', [Validators.required,Validators.email,Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.min(6),Validators.maxLength(50)]),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private validatorService:ValidatorService
  ){}


  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myResgiterForm, field);
  }

  getFieldError(field: string): string | null {
    return errorValidation(this.myResgiterForm, field);
  }
  onRegister(){
    if(this.myResgiterForm.valid){
      this.authService.register({...this.myResgiterForm.value}).subscribe( user=>{
       if(user){
         this.router.navigate(['/advisor/list'])
       }else{
         basicAlert('El usuario ingresado ya existe!', TYPE_ALERT.ERROR)
       }
      });
    }
  }

}
