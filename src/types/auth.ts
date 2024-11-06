export interface authLogin {
  email: string
  password: string
}

export interface authRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface authUser {
  id: number;
  name: string;
  email: string;
  password: string;
  accountValueBrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


export interface LoginResponse {
  message: string;
  data: {
    user: authUser;
    token: string;
  };
}