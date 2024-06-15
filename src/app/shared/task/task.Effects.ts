import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from './../../service/task.service';
import * as TaskActions from './task.actions';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Task } from '../../model/task.model';

@Injectable()
export class TaskEffects {
    constructor(private action$: Actions, private service: TaskService) { }

    _task = createEffect(() =>
        this.action$.pipe(
            ofType(TaskActions.LOAD_Task),
            exhaustMap(() =>
                this.service.GetAlltasks().pipe(
                    map(data => TaskActions.loadTasksuccess({ Tasklist: data })),
                    catchError(error => of(TaskActions.loadTaskfailure({ ErrorText: error })))
                )
            )
        )
    );

    _Addtask = createEffect(() =>
        this.action$.pipe(
            ofType(TaskActions.addTask),
            exhaustMap((action) => {
                return this.service.CreateTask(action.Taskinput).pipe(
                    map((data) => {
                        return TaskActions.addTasksuccess({ Taskinput: data as Task })
                    }),
                    catchError(error => of(TaskActions.loadTaskfailure({ ErrorText: error })))
                )
            })
        )
    );

    _Updatetask = createEffect(() =>
        this.action$.pipe(
            ofType(TaskActions.UPDATE_Task),
            exhaustMap((action) => {
                return this.service.UpdateTask(action).pipe(
                    map((data) => {
                        return TaskActions.updateTasksuccess({ Taskinput: data as Task })
                    }),
                    catchError(error => of(TaskActions.loadTaskfailure({ ErrorText: error })))
                )
            })
        )
    );

    _Deletetask = createEffect(() =>
        this.action$.pipe(
            ofType(TaskActions.deleteTask),
            exhaustMap((action) => {
                return this.service.Deletetask(action.id).pipe(
                    map((data) => {
                        return TaskActions.deleteTasksuccess({ id: action.id })
                    }),
                    catchError(error => of(TaskActions.loadTaskfailure({ ErrorText: error })))
                )
            })
        )
    );

}
