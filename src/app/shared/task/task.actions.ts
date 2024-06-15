import { createAction, props } from "@ngrx/store";
import { Task } from '../../model/task.model';

export const LOAD_Task = '[Task] Load Task';
export const LOAD_Task_SUCCESS = '[Task] Load Task Success';
export const LOAD_Task_FAILURE = '[Task] Load Task Failure';

export const ADD_Task_SUCCESS = '[Task] add Task Success';
export const ADD_Task = '[Task] add Task';

export const UPDATE_Task_SUCCESS = '[Task] update Task Success';
export const UPDATE_Task = '[Task] update Task';

export const DELETE_Task_SUCCESS = '[Task] delete Task Success';
export const DELETE_Task = '[Task] delete Task';

export const loadTask = createAction(LOAD_Task);
export const loadTasksuccess = createAction(LOAD_Task_SUCCESS, props<{ Tasklist: Task[] }>());

export const loadTaskfailure = createAction(LOAD_Task_FAILURE, props<{ ErrorText: any }>());

export const addTask =createAction('addTask', props<{Taskinput:Task}>());

export const addTasksuccess = createAction(ADD_Task_SUCCESS, props<{ Taskinput: Task }>());

export const updateTask =createAction(UPDATE_Task, props<{Taskinput:Task}>());

export const updateTasksuccess =createAction(UPDATE_Task_SUCCESS, props<{Taskinput:Task}>());

export const deleteTask =createAction(DELETE_Task, props<{id:number}>());

export const deleteTasksuccess =createAction(DELETE_Task_SUCCESS, props<{id:number}>());