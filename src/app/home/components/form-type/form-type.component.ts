import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { basicAlert } from 'src/app/shared/alerts/toast';
import { TYPE_ALERT } from 'src/app/shared/alerts/values.config';
import { MonthDiff } from 'src/app/shared/helpers/month';
import { RequestTypeResponse } from 'src/app/shared/interfaces/request-type.interface';
import { RequestService } from 'src/app/shared/services/request.service';
import { ValidatorService } from 'src/app/shared/services/validators.service';
import { errorValidation } from 'src/app/validators/error-validator.validator';

@Component({
  selector: 'app-form-type',
  templateUrl: './form-type.component.html',
  styleUrls: ['./form-type.component.scss']
})
export class FormTypeComponent {

  @Output()
  onMyForm: EventEmitter<FormGroup> = new EventEmitter();
  public types: RequestTypeResponse[] = [];
  public isValid: Boolean = false;
  public type: RequestTypeResponse | undefined = undefined;


  public myForm: FormGroup = new FormGroup({
    requestTypeId: new FormControl(0,
      [Validators.required, Validators.pattern(this.validatorService.patternNumber), Validators.minLength(10)]
    ),
    description: new FormControl('Autos Transporte', [Validators.required], []),
    plazo: new FormControl(0, [Validators.required, Validators.min(10)], []),
    startDate: new FormControl('', [Validators.required], []),
    amount: new FormControl(0, [Validators.required, Validators.min(10)], []),
    endDate: new FormControl('', [Validators.required], []),
  })

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private requestService: RequestService
  ) { }


  ngOnInit(): void {
    this.requestService.getRequestTypes().subscribe(
      requests => this.types = requests
    );
  }

  onSave(): void {

    if (this.myForm.value.amount > Number(this.type?.maxAmount) || this.myForm.value.amount < Number(this.type?.minAmount)) {
      return basicAlert('El monto debe estar entre los rangos maximos y minos', TYPE_ALERT.ERROR)
    }
    this.isValid = this.myForm.valid;
    this.onMyForm.emit(this.myForm);

  }

  onRequiesType(item: number) {
    this.requestService.getRequestTypeById(item).subscribe(
      (request) => {

        if (request) {
          this.type = request;

        } else {
          this.type = undefined;
        }
      }

    )
  }

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    return errorValidation(this.myForm, field);
  }

  calculatePlazo() {
    const request = this.myForm.value;
    if (request.startDate && request.endDate)
      this.myForm.reset({ ...request, plazo: MonthDiff(request.startDate, request.endDate) })
  }
}
