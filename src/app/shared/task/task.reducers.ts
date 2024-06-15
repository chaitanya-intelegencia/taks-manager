import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { Task } from '../../model/task.model';

export const taskFeatureKey = 'task';

export interface State {
  tasks: Task[];
  error: any;
}

export const initialState: State = {
  tasks: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(TaskActions.loadTasksuccess, (state, action) => ({ ...state, tasks: action.Tasklist })),
  on(TaskActions.loadTaskfailure, (state, action) => ({ ...state, error: action.ErrorText }))
);
