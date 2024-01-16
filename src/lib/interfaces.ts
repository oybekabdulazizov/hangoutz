export interface ICategory {
  id: string;
  name: string;
}

interface IUser_Simple {
  id: string;
  name: string;
  lastname: string;
  email: string;
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
