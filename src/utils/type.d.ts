interface RegisterUser {
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface CreateGroup {
  title: string;
  description: string;
}

interface CreateTask {
  todo_id: number;
  name: string;
  progress_percentage: number;
}

interface UpdateTask {
  todo_id: number;
  name: string | null | undefined;
  progress_percentage: number | null | undefined;
}
