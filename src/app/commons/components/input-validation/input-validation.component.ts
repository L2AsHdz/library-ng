import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'app-input-validation',
  template: `
    <small *ngIf="hasError()" class="p-error">
      {{errorMessage}}
    </small>
  `,
  styles: [],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class InputValidationComponent {

  @Input() control!: NgModel;
  @Input() form!: NgForm;
  @Input() errDef: any;

  @Input() custom: any;

  errorMessages:any[] = [];
  errorMessage = '';

  hasError(): boolean {
    this.errorMessages = [];
    this.errorMessage = '';
    if ( this.errDef && ( this.control.errors || this.errDef['custom'] ) ) {
      Object.keys(this.errDef).some(key => {

        if ( this.control.errors && this.control.errors[key]) {
          this.errorMessages.push(this.errDef[key]);
        } else if ( key === 'custom' && !this.runCustom() ) {
          this.errorMessages.push(this.errDef[key]);
        }
        return false;
      });
    }

    for ( const m of this.errorMessages ){
      if ( this.errorMessage.length > 0 ) {
        this.errorMessage = this.errorMessage + '.  ';
      }
      this.errorMessage = this.errorMessage + m;
    }

    return this.errorMessages.length > 0  && (this.form.submitted || (this.control.dirty ?? false));

  }
  public runCustom(): boolean {
    return this.custom(this);
  }
}
