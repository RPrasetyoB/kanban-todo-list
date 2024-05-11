interface RegisterUser {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
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
  name: string;
  progress_percentage: number;
}
