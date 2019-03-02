export type ID = string;

export type Color = string;

export type URL = string;

export type Maybe<T> = T | null;

export type FontFamily = string;

export interface FirebaseConfiguration {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export interface User extends firebase.User {
  uid: ID;
  picture: URL;
}

export interface UserSettings {
  useDarkMode: boolean;
}

export interface Item {
  id: ID;
  title: string;
}

export interface Store {
  state: StoreState;
  isSyncing: boolean;
  dispatch: (action: any) => void;
}

export interface StoreState {
  user: Maybe<User>;
  settings: {
    useDarkMode: boolean;
  };
  lastUpdated: number;
}

export interface DB {
  settings: UserSettings;
  lastUpdated: number;
}

export interface Theme {
  color: {
    background: Color;
    text: Color;
    heading: Color;
    outline: Color;
    link: Color;
    linkActive: Color;
    selection: Color;
  };
  font: {
    text: FontFamily;
    heading: FontFamily;
  };
}

export interface Project {
  id: ID;
  author: User;
  members: User[];
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Maybe<Date>;
}

export interface Action<Type> {
  type: Type;
}

export interface PayloadAction<Type, Payload> {
  type: Type;
  payload: Payload;
}

export interface ValidationError {
  message: string;
}
