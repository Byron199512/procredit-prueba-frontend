import { FormGroup } from "@angular/forms";


export const errorValidation = (myForm: FormGroup, field: string) => {

  if (!myForm.controls[field]) return null;

  const errors = myForm.controls[field].errors || {};


  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'Este campo es requerido';
      case 'email':
        return 'Este campo no es email';
      case 'pattern':
        return 'Ingrese solo numeros';
      case 'min':
        return `Ingrese mas ${errors['min'].min}.`;
      case 'minlength':
        return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
      case 'maxlength':
        return `Máximo ${errors['maxlength'].requiredLength} caracters.`;
    }
  }

  return null;
}
