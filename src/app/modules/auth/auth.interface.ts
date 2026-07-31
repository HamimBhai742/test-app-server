export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IRefreshToken {
  token: string;
}

export interface IGoogleLogin {
  idToken?: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export interface IVerifyOTP {
  email: string;
  otp: string;
}

export interface IResendOTP {
  email: string;
}
