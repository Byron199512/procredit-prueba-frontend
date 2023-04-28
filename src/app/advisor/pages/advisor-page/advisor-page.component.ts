import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { basicAlert } from 'src/app/shared/alerts/toast';
import { TYPE_ALERT } from 'src/app/shared/alerts/values.config';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-advisor-page',
  templateUrl: './advisor-page.component.html',
  styleUrls: ['./advisor-page.component.sass']
})
export class AdvisorPageComponent {

  public myTypeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    minAmount: new FormControl('', [Validators.required]),
    maxAmount: new FormControl('', [Validators.required]),
    term: new FormControl('', [Validators.required]),
  })

  constructor(
    private requestService: RequestService,
    private router: Router
  ){}

  onRegister(){
    if(this.myTypeForm.valid){
      this.requestService.insertType({...this.myTypeForm.value}).subscribe( type=>{
       if(type){
        basicAlert('Se creo correctamente el tipo de solicitud!')
         this.router.navigate(['/advisor/list'])
       }else{
         basicAlert('Error al crear un tipo!', TYPE_ALERT.ERROR)
       }
      });
    }
  }

}
