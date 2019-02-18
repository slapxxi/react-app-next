export type ID = string;

export type Color = string;

export type FontFamily = string;

export interface FirebaseConfiguration {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
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
  dispatch: () => void;
}

export interface StoreState {
  items: Item[];
  settings: {
    useDarkMode: boolean;
  };
  lastUpdated: number;
}

export interface DB {
  items: { [id: string]: Item };
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

export interface UserSettings {
  useDarkMode: boolean;
}
