import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../employee';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  @Input() initialState: Employee | undefined; 

  @Output() formValuesChanged = new EventEmitter<Employee>();
  @Output() formSubmitted = new EventEmitter<Employee>();

  employeeForm: any; 

  constructor(private formBuilder: FormBuilder) {
   
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required, Validators.minLength(5)]],
      level: ['junior', [Validators.required]],
    });

    this.setInitialValues(); 
  }

  private setInitialValues() {
    if (this.initialState) {
      this.employeeForm.setValue({
        name: this.initialState.name || '',
        position: this.initialState.position || '',
        level: this.initialState.level || 'junior',
      });
    }
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get position() {
    return this.employeeForm.get('position');
  }

  get level() {
    return this.employeeForm.get('level');
  }

  submitForm() {
    if (this.employeeForm.valid) {
      this.formSubmitted.emit(this.employeeForm.value as Employee);
    }
  }
}