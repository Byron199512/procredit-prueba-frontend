import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { optionsWithDetails } from 'src/app/shared/alerts/alert';
import { basicAlert } from 'src/app/shared/alerts/toast';
import { TYPE_ALERT } from 'src/app/shared/alerts/values.config';
import { ClientInsertResponse, ClientResponse } from 'src/app/shared/interfaces/client.interface';
import { RequestTypeResponse, ResquestInsertResponse } from 'src/app/shared/interfaces/request-type.interface';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-step-component',
  templateUrl: './step-component.component.html'
})
export class StepComponentComponent {

  public isValidClient: boolean = false;
  public isValidCredit: boolean = false;
  public client: ClientInsertResponse = {} as ClientInsertResponse;
  public request: ResquestInsertResponse = {} as ResquestInsertResponse;

  constructor(
    private requestService: RequestService
  ) { }

  goNextClient(form: FormGroup, steeper: MatStepper) {
    this.isValidClient = form.valid;
    if (!this.isValidClient) return;
    this.client = {
      client: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
      },
      document: {
        id: form.value.id,
        name: form.value.name,
        validFrom: form.value.validFrom,
        validUntil: form.value.validUntil,
      }
    }
    steeper.next()
  }

  goNextCredit(form: FormGroup, steeper: MatStepper) {
    this.isValidCredit = form.valid;
    if (!this.isValidCredit) return;
    this.request = { ...form.value }
    steeper.next()
  }

  async sendRequest() {

    const result = await optionsWithDetails('Al enviar la solicitud se le asignara un asesor', 'Enviar mi solicitud?', 400, 'Enviar', 'Cancelar')

    if (result) {

      this.request={...this.request,documentId:this.client.document.id}
      this.requestService.insertRequest(this.request).subscribe(
        resp => {
          if(resp){

            basicAlert('Se envio la solicitud correctamente')
            window.location.reload();
          }else{
            basicAlert('Error desconocido',TYPE_ALERT.ERROR)
          }
        }
      )


    }
  }

}

