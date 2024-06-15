import { Component } from '@angular/core';
import { Task } from '../../model/task.model';
import { TaskService } from '../../service/task.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-show',
  standalone: true,
  imports: [CommonModule,MatIconModule,FormsModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatIconModule],
  templateUrl: './task-show.component.html',
  styleUrl: './task-show.component.css',
  providers:[TaskService]
})
export class TaskShowComponent {
  tasks: Task[] = [];
  showDetails: { [key: number]: boolean } = {};
  editMode: { [key: number]: boolean } = {}; // Track edit state for each task
  editedTask: Task | null = null; // Track the task being edited

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.GetAlltasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.tasks.forEach(task => {
        this.showDetails[task.id] = false;
      });
    });
  }

  public toggleDetails(taskId: number): void {
    this.showDetails[taskId] = !this.showDetails[taskId];
  }

  enterEditMode(task: Task): void {
    this.editMode[task.id] = true;
    this.editedTask = { ...task }; // Create a copy of the task to edit
  }

  saveTask(taskId: number): void {
    if (this.editedTask) {
      this.taskService.UpdateTask(this.editedTask).subscribe((updatedTask: Task) => {
        const index = this.tasks.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.editMode[taskId] = false;
          this.editedTask = null;
        }
      });
    }
  }

  cancelEdit(taskId: number): void {
    this.editMode[taskId] = false;
    this.editedTask = null;
  }

  public deleteTask(taskId: number): void {
    this.taskService.Deletetask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }
}
