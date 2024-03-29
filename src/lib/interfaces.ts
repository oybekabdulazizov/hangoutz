export interface ICategory {
  id: string;
  name: string;
}

export interface IUser_Simple {
  id: string;
  name: string;
  lastname: string;
  email: string;
  dateOfBirth: Date;
  profilePhotoUrl: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  startDateTime: Date;
  finishDateTime: Date;
  cancelled: boolean;
  url: string;
  thumbnailUrl: string;
  host: IUser_Simple;
  attendees: Array<IUser_Simple>;
  category: {
    id: string;
    name: string;
  };
}

export interface IEvent_RequestBody {
  title: string;
  description: string;
  location: string;
  category: string;
  startDateTime: string;
  finishDateTime: string;
  url: string;
  thumbnailUrl: string;
}

export interface ISignUp_Request {
  name: string;
  lastname: string;
  email: string;
  dateOfBirth: string;
  password: string;
}

export interface ILogIn_Request {
  email: string;
  password: string;
}

export interface IResetPassword_Request {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IAuth_Response {
  user: IUser_Simple;
  sessionToken: string;
  sessionTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}

export interface ICategory_Response {
  id: string;
  name: string;
  numberOfEvents: number;
}
