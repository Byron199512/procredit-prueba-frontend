import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { basicAlert } from 'src/app/shared/alerts/toast';
import { TYPE_ALERT } from 'src/app/shared/alerts/values.config';
import { RequestResponse } from 'src/app/shared/interfaces/request.interface';
import { StatusResponse } from 'src/app/shared/interfaces/status.interface';
import { RequestService } from 'src/app/shared/services/request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advisor-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  requestForm: FormGroup = new FormGroup({
    statusId: new FormControl(0, [Validators.required])
  })
  types: StatusResponse[] = [{} as StatusResponse];

  suscription: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestResponse,
    private requestService: RequestService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.requestService.getStatus().subscribe(
      response => this.types = response
    )
    this.requestForm.reset({
      statusId: this.data.statusId
    })
  }



  save() {

    if (!this.requestForm.valid) {
      return basicAlert('El estado seleccionado es inválido', TYPE_ALERT.ERROR)
    }
    this.requestService.updateStatusRequest(this.data.id.toString(), this.requestForm.value["statusId"]).subscribe(
      (request) => {
        if (request) {
          basicAlert('El estado de la solicitud se actualizo correctamente!')
          this.dialogRef.close();
        }else{
          basicAlert('Erro desconocido', TYPE_ALERT.ERROR)
        }
      }

    )
  }

  close() {
    this.dialogRef.close();
  }


}
