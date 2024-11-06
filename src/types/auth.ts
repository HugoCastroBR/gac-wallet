export interface authLogin {
  email: string
  password: string
}

export interface LoginResponse {
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      password: string;
      accountValueBrl: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    };
    token: string;
  };
}