import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientInsertResponse, ClientResponse } from 'src/app/shared/interfaces/client.interface';
import { RequestService } from 'src/app/shared/services/request.service';
import { ValidatorService } from 'src/app/shared/services/validators.service';
import { errorValidation } from 'src/app/validators/error-validator.validator';

@Component({
  selector: 'app-form-credit',
  templateUrl: './form-credit.component.html'
})
export class FormCreditComponent  {



  @Output()
  onMyForm: EventEmitter<FormGroup> = new EventEmitter();

  public myForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(20)], []),
    lastName: new FormControl('', [Validators.required,Validators.maxLength(20)], []),
    id: new FormControl('',
      [Validators.required, Validators.pattern(this.validatorService.patternNumber), Validators.minLength(10)]
    ),
    name: new FormControl('Ruc', [Validators.required]),
    validFrom: new FormControl('', [Validators.required], []),
    validUntil: new FormControl('', [Validators.required], []),
  })

  public isValid: Boolean = false;

  constructor(
    private validatorService: ValidatorService,
    private requestService: RequestService
  ) { }


  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return errorValidation(this.myForm, field);
  }

  searchClient() {
    let dni: string = this.myForm.value.id;
    if (dni.length > 9) {
      this.requestService.getClientByDocument(dni).subscribe(
        (request) => {
          if (request) {
            this.myForm.reset({
              firstName: request.firstName,
              lastName: request.lastName,
              id: request.document.id,
              name: request.document.name,
              validFrom: request.document.validFrom,
              validUntil: request.document.validUntil,
            })
          }
        }
      )
    }

  }

  onSave(): void {
    this.isValid = this.myForm.valid;
    this.onMyForm.emit(this.myForm);
    if( this.myForm.valid){
      const client:ClientInsertResponse={
        client: {
          firstName: this.myForm.value.firstName,
          lastName: this.myForm.value.lastName,
        },
        document: {
          id: this.myForm.value.id,
          name: this.myForm.value.name,
          validFrom: this.myForm.value.validFrom,
          validUntil: this.myForm.value.validUntil,
        }
      }
      this.requestService.insertClient(client).subscribe()
    }

  }
}
