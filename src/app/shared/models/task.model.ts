export interface Task {
  id: string;
  name: string;
  details: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
}
