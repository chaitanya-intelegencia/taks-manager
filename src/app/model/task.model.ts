export interface Task {
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Not Started' | 'In Progress' | 'Completed';
    assignee: string;
    category: string;
    comments: Comment[];
    createdDate: Date;
    updatedDate: Date;
    tags: string[];
    estimatedTime: number; // in hours
    actualTime: number; // in hours
  }
  
  export interface Comment {
    id: number;
    author: string;
    message: string;
    date: Date;
  }

  export interface Tasks{
    tasklist:Task[],
    Errormessage:string
}
  