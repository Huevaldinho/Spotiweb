import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

/**
  ** Sets a key: value pair in local storage
    @param key - The key to store the value under
    @param value - The value to store (string[] or [])
    @returns The value stored under the key
  */
  setItem(key: string, value: string[]|[]): string[]|[] {
    localStorage.setItem(key, JSON.stringify(value));
    //When cant find the key, return an empty array
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  /**
     ** Gets a value from local storage by key
    * @param key - The key to get the value for
    * @returns The value stored under the key
  */
  getItem (key: string): string[]|[]{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
