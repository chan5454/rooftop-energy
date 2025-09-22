export interface TaskList{
  title: string,
  description: string,
  due_date: string,
  id: number,
  state: string,
  completed_at: string,
  created_at: string,
  updated_at: string,
  blockers: number[],
  dependents: number[]
}

export interface TaskForm{
    title: string;
    description: string
    state: string;
    due_date: string;
}