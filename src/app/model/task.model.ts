export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Not Started' | 'In Progress' | 'Completed';
    assignee: string;
    category: string;
    subtasks: Subtask[];
    attachments: Attachment[];
    comments: Comment[];
    createdDate: Date;
    updatedDate: Date;
    tags: string[];
    estimatedTime: number; // in hours
    actualTime: number; // in hours
  }
  
  export interface Subtask {
    id: number;
    title: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }
  
  export interface Attachment {
    id: number;
    fileName: string;
    fileUrl: string;
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
  