import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasErrorValidar(control:AbstractControl, errorName:string):boolean{
    if((control.touched || control.dirty)&&this.hasError(control,errorName)) return true;
    else return false;
  }

  hasError(control:AbstractControl, errorName:string):boolean{
    return control.hasError(errorName);
  }

  lengthValidar(control:AbstractControl, errorName:string):number{
    const error=control.errors[errorName]
    return error.requiredLength || error.min || error.max || 0;
  }

}
