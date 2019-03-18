import storageAvailable from './storageAvailable';

interface MockWindow {
  sessionStorage?: Storage;
  localStorage?: Storage;
}

let localStorage = window.localStorage;
let sessionStorage = window.sessionStorage;

beforeEach(() => {
  (window as MockWindow).localStorage = localStorage;
  (window as MockWindow).sessionStorage = sessionStorage;
});

it('returns true if session storage available', () => {
  let result = storageAvailable('sessionStorage');
  expect(result).toEqual(true);
});

it('returns false if session storage not available', () => {
  delete (window as MockWindow).sessionStorage;
  let result = storageAvailable('sessionStorage');
  expect(result).toEqual(false);
});

it('returns true if local storage available', () => {
  let result = storageAvailable('localStorage');
  expect(result).toEqual(true);
});

it('returns false if local storage not available', () => {
  delete (window as MockWindow).localStorage;
  let result = storageAvailable('localStorage');
  expect(result).toEqual(false);
});
