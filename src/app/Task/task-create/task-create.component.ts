import { Task } from '../../model/task.model';
import { TaskService } from '../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar ,MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,MatSnackBarModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
  providers:[TaskService]
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder,private taskService: TaskService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      priority: ['Medium', Validators.required],
      status: ['Not Started', Validators.required],
      assignee: ['', Validators.required],
      category: ['', Validators.required],
      estimatedTime: [0, [Validators.required, Validators.min(0)]],
      actualTime: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: Date.now(),
        ...this.taskForm.value,
        comments: [],
        createdDate: new Date(),
        updatedDate: new Date(),
        tags: [],
      };
      console.log('New Task:', newTask);
      // Here, we have to call a service to save the task
      this.taskService.CreateTask(newTask).subscribe(
        (createdTask: Task) => {
          this.showSuccessMessage('Task created successfully');
          this.taskForm.reset({
            priority: 'Medium',
            status: 'Not Started'
          });
        },
        (error) => {
          this.showErrorMessage('Failed to create task');
        }
      );
    }
  }

  public showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get priority() { return this.taskForm.get('priority'); }
  get status() { return this.taskForm.get('status'); }
  get assignee() { return this.taskForm.get('assignee'); }
  get category() { return this.taskForm.get('category'); }
  get estimatedTime() { return this.taskForm.get('estimatedTime'); }
  get actualTime() { return this.taskForm.get('actualTime'); }

  public getErrorMessage(controlName: string): string {
    const control = this.taskForm.get(controlName);
  
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
  
    if (control?.hasError('minlength')) {
      return 'The value is too short';
    }
  
    if (control?.hasError('min')) {
      return 'The value must be positive';
    }
  
    return '';
  }

}



