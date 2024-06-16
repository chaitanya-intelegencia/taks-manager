import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',

})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  GetAlltasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.tasksUrl)
  }
  CreateTask(taskinput: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, taskinput).pipe(
      tap((newTask: Task) => console.log(`Created task with id=${newTask.id}`))
    );
  }
  UpdateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }
  
  Deletetask(taskid:number){
    return this.http.delete("http://localhost:3000/tasks/"+taskid);
  }
}
