import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageServiceService {
  constructor() {}
  saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value) || null);
  }

  loadFromStorage(key: string) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  }
}
