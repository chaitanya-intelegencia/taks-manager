import { Task } from '../../model/task.model';
import { TaskService } from '../../service/task.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-show',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './task-show.component.html',
  styleUrl: './task-show.component.css',
  providers:[TaskService]
})
export class TaskShowComponent implements OnInit {
  tasks: Task[] = [];
  showDetails: { [key: number]: boolean } = {};
  editMode: { [key: number]: boolean } = {};
  editedTask: Task | null = null;

  constructor(private taskService: TaskService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.taskService.GetAlltasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.tasks.forEach(task => {
        this.showDetails[task.id] = false;
        this.editMode[task.id] = false;
      });
    });
  }

  toggleDetails(taskId: number): void {
    this.showDetails[taskId] = !this.showDetails[taskId];
  }

  enterEditMode(task: Task): void {
    this.editMode[task.id] = true;
    this.showDetails[task.id] = !this.showDetails[task.id];
    this.editedTask = { ...task };
  }

  saveTask(taskId: number): void {
    if (this.editedTask) {
      this.taskService.UpdateTask(this.editedTask).subscribe(
        (updatedTask) => {
          const index = this.tasks.findIndex(task => task.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.editMode[taskId] = false;
            this.editedTask = null;
            this.snackBar.open('Task updated successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        },
        (error) => {
          this.snackBar.open('Failed to update task', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  cancelEdit(taskId: number): void {
    this.editMode[taskId] = false;
    this.editedTask = null;
  }

  deleteTask(taskId: number): void {
    this.taskService.Deletetask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }
}
