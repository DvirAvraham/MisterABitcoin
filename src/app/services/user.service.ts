import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storageService: StorageServiceService) {}
  USER_KEY = 'user_db';
  private _user$ = new BehaviorSubject<User>(
    this.storageService.loadFromStorage(this.USER_KEY)
  );
  public user$ = this._user$.asObservable();
  
  public getUser() {
    return this.user$;
  }

  public getCurrUser() {
    const user = this.storageService.loadFromStorage(this.USER_KEY);
    return user || this.user$;
  }
  public login(username: string) {
    let user = this.storageService.loadFromStorage(this.USER_KEY);
    if (!user) {
      const name = username.charAt(0).toUpperCase() + username.slice(1);
      user = {
         name,
          coins: 100,
           moves: [],
           img: this.createUserImg()
           };
      this.storageService.saveToStorage(this.USER_KEY, user);
    }
    this._user$.next(user);
  }

  createUserImg(){
  const gender = Math.random() > 0.5 ? 'women' : 'men';
  const url = `https://randomuser.me/api/portraits/${gender}/3.jpg`;
   return url;
  }

  public transfer(amount: number, contact: Contact): void {
    let newMove = new Move(
      this._makeId(),
      contact._id,
      contact.name,
      Date.now(),
      amount
    );
    let updateUser = { ...this._user$.value };
    updateUser.coins -= amount;
    updateUser.moves.unshift(newMove);
    this._user$.next(updateUser);
    this.storageService.saveToStorage(this.USER_KEY, updateUser);
  }
  public createMove(amount: number, contact: Contact) {
    return {
      id: this._makeId(),
      at: Date.now(),
      to: contact.name,
      toId: contact._id,
      amount,
    };
  }
  
  public logout() {
    this._user$.next(null)
    localStorage.clear();
  }

  private _makeId(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}