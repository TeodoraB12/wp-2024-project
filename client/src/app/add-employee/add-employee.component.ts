import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [EmployeeFormComponent, MatCardModule],
  templateUrl: './add-employee.component.html', 
  styleUrls: ['./add-employee.component.css'], 
})
export class AddEmployeeComponent {
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar 
  ) {}

  addEmployee(employee: Employee) {
    const createEmployee$ = this.employeeService.createEmployee(employee);
    this.subscriptions.add(
      createEmployee$.subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.snackBar.open('Employee added successfully!', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.snackBar.open('Failed to create employee', 'Close', {
            duration: 3000,
          });
          console.error(error);
        },
      })
    );

    this.employeeService.getEmployees(); 
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

