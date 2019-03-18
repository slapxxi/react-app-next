import { ID, Maybe, StorageType } from '@self/lib/types';
import { useMemo, useRef } from 'react';
import storageAvailable from '../storageAvailable';

// Note that `data` has to be serializable
interface Config<Data> {
  id: ID;
  type: StorageType;
  data: Data;
}

function useStorage<Data>({
  id,
  data,
  type,
}: Config<Data>): [Data, (data: Data) => void, () => void] {
  let ref = useRef(data);
  let itemId = useMemo(() => `${id}:${hostname()}`, [id]);

  if (process.browser && storageAvailable(type)) {
    let item = get<Data>(type, itemId);

    if (!item) {
      set(type, itemId, data);
    } else {
      ref.current = item;
    }

    return [
      ref.current,
      (data) => {
        set(type, itemId, data);
        ref.current = data;
      },
      () => {
        clear(type, itemId);
      },
    ];
  } else {
    return [ref.current, (data) => (ref.current = data), () => null];
  }
}

function get<Data>(type: StorageType, key: string): Maybe<Data> {
  let storage = window[type];
  let item = storage.getItem(key);

  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
}

function set<Data>(type: StorageType, key: string, value: Data): void {
  window[type].setItem(key, JSON.stringify(value));
}

function clear(type: StorageType, key: string) {
  window[type].removeItem(key);
}

function hostname() {
  if (process.browser && document) {
    return document.location.hostname;
  }

  return 'localhost';
}

export default useStorage;
