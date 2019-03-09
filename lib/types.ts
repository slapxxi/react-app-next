import { app, auth } from 'firebase-admin';
import { IncomingMessage } from 'http';
import { NextContext } from 'next';

export type ID = string;

export type Color = string;

export type URL = string;

export type Maybe<T> = T | null;

export type FontFamily = string;

export type HttpClient = app.App;

export type SessionUser = auth.DecodedIdToken;

export type EpochTime = number;

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

export interface BaseStoreState {
  projects: Project[];
  settings: {
    useDarkMode: boolean;
  };
  lastUpdated: number;
}

export interface StoreState extends BaseStoreState {
  user: Maybe<User>;
}

export interface DB {
  projects: {
    [projectId: string]: DBProject;
  };
  settings: UserSettings;
  lastUpdated: number;
}

export interface DBProject {
  title: string;
  description: string;
  createdAt: EpochTime;
  updatedAt: Maybe<EpochTime>;
}

export interface Theme {
  type: 'dark' | 'light';
  color: {
    background: Color;
    backgroundActive: Color;
    text: Color;
    em: Color;
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
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Maybe<Date>;
}

export interface UserCreatedProject {
  id: ID;
  title: string;
  description: string;
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

export interface Session extends IncomingMessage {
  firebaseServer: HttpClient;
  session: {
    decodedToken: Maybe<SessionUser>;
  };
}

export interface SessionContext extends NextContext {
  req?: Session;
}
