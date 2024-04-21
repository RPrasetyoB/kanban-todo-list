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
