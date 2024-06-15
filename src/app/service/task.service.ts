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
  CreateTask(taskinput:Task){
    return this.http.post(this.tasksUrl,taskinput).pipe(
      tap(()=>{
        this.http.get<Task>(`${this.tasksUrl}/?_limit=1&_sort=id`);
      })
    )
  }

  UpdateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${task.id}`, task);
  }
  
  Deletetask(taskid:number){
    return this.http.delete("http://localhost:3000/tasks/"+taskid);
  }
}
