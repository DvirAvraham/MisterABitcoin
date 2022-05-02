import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactFilter } from '../models/contact-filter.model';
import { StorageServiceService } from 'src/app/services/storage-service.service';

const CONTACTS = [
  {
    _id: '5a56640269f443a5d64b32ca',
    name: 'Ochoa Hyde',
    email: 'ochoahyde@renovize.com',
    phone: '+1 (968) 593-3824',
    img: '',
  },
  {
    _id: '5a5664025f6ae9aa24a99fde',
    name: 'Hallie Mclean',
    email: 'halliemclean@renovize.com',
    phone: '+1 (948) 464-2888',
    img: '',
  },
  {
    _id: '5a56640252d6acddd183d319',
    name: 'Parsons Norris',
    email: 'parsonsnorris@renovize.com',
    phone: '+1 (958) 502-3495',
    img: '',
  },
  {
    _id: '5a566402ed1cf349f0b47b4d',
    name: 'Rachel Lowe',
    email: 'rachellowe@renovize.com',
    phone: '+1 (911) 475-2312',
    img: '',
  },
  {
    _id: '5a566402abce24c6bfe4699d',
    name: 'Dominique Soto',
    email: 'dominiquesoto@renovize.com',
    phone: '+1 (807) 551-3258',
    img: '',
  },
  {
    _id: '5a566402a6499c1d4da9220a',
    name: 'Shana Pope',
    email: 'shanapope@renovize.com',
    phone: '+1 (970) 527-3082',
    img: '',
  },
  {
    _id: '5a566402f90ae30e97f990db',
    name: 'Faulkner Flores',
    email: 'faulknerflores@renovize.com',
    phone: '+1 (952) 501-2678',
    img: '',
  },
  {
    _id: '5a5664027bae84ef280ffbdf',
    name: 'Holder Bean',
    email: 'holderbean@renovize.com',
    phone: '+1 (989) 503-2663',
    img: '',
  },
  {
    _id: '5a566402e3b846c5f6aec652',
    name: 'Rosanne Shelton',
    email: 'rosanneshelton@renovize.com',
    phone: '+1 (968) 454-3851',
    img: '',
  },
  {
    _id: '5a56640272c7dcdf59c3d411',
    name: 'Pamela Nolan',
    email: 'pamelanolan@renovize.com',
    phone: '+1 (986) 545-2166',
    img: '',
  },
  {
    _id: '5a5664029a8dd82a6178b15f',
    name: 'Roy Cantu',
    email: 'roycantu@renovize.com',
    phone: '+1 (929) 571-2295',
    img: '',
  },
  {
    _id: '5a5664028c096d08eeb13a8a',
    name: 'Ollie Christian',
    email: 'olliechristian@renovize.com',
    phone: '+1 (977) 419-3550',
    img: '',
  },
  {
    _id: '5a5664026c53582bb9ebe9d1',
    name: 'Nguyen Walls',
    email: 'nguyenwalls@renovize.com',
    phone: '+1 (963) 471-3181',
    img: '',
  },
  {
    _id: '5a56640298ab77236845b82b',

    name: 'Glenna Santana',
    email: 'glennasantana@renovize.com',
    phone: '+1 (860) 467-2376',
    img: '',
  },
  {
    _id: '5a56640208fba3e8ecb97305',
    name: 'Malone Clark',
    email: 'maloneclark@renovize.com',
    phone: '+1 (818) 565-2557',
    img: '',
  },
  {
    _id: '5a566402abb3146207bc4ec5',
    name: 'Floyd Rutledge',
    email: 'floydrutledge@renovize.com',
    phone: '+1 (807) 597-3629',
    img: '',
  },
  {
    _id: '5a56640298500fead8cb1ee5',
    name: 'Grace James',
    email: 'gracejames@renovize.com',
    phone: '+1 (959) 525-2529',
    img: '',
  },
  {
    _id: '5a56640243427b8f8445231e',
    name: 'Tanner Gates',
    email: 'tannergates@renovize.com',
    phone: '+1 (978) 591-2291',
    img: '',
  },
  {
    _id: '5a5664025c3abdad6f5e098c',
    name: 'Lilly Conner',
    email: 'lillyconner@renovize.com',
    phone: '+1 (842) 587-3812',
    img: '',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private storageService: StorageServiceService) {}
  CONTACT_KEY = 'contact_db';

  private _contactsDb: Contact[] = CONTACTS;

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable();

  private _filterBy$ = new BehaviorSubject<ContactFilter>({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();

  public loadContacts(filterBy = null): void {
    let contacts = this.storageService.loadFromStorage(this.CONTACT_KEY);

    if (!contacts?.length || !contacts) {
      contacts = this._contactsDb;
      contacts = contacts.map(contact => this.setContactImg(contact))
    }

    if (filterBy && filterBy.term) {
      contacts = this._filter(contacts, filterBy.term);      
    }

    this._contactsDb = contacts
    this._contacts$.next(this._sort(contacts));
    if (!filterBy) this.storageService.saveToStorage(this.CONTACT_KEY, contacts);
  }

  public getContactById(id: string): Observable<Contact> {
    const contact = this._contactsDb.find((contact) => contact._id === id);
    return of(contact);
  }

  public deleteContact(id: string) {
    this._contactsDb = this._contactsDb.filter((contact) => contact._id !== id);
    this._contacts$.next(this._sort(this._contactsDb));
    
    this.storageService.saveToStorage(this.CONTACT_KEY, this._contactsDb);
  }
  
  public saveContact(contact: Contact) {
    return contact._id
    ? this._updateContact(contact)
    : this._addContact(contact);
  }
  
  public setContactImg(contact) {
    const gender = Math.random() > 0.5 ? 'women' : 'men';
    const num = this.getRandomInt(1, 50);
    const url = `https://randomuser.me/api/portraits/${gender}/${num}.jpg`;
    contact.img = url;
    return contact;
  }
  
  private _updateContact(contact: Contact) {
    this._contactsDb = this._contactsDb.map((c) =>
    contact._id === c._id ? contact : c
    );
    this._contacts$.next(this._sort(this._contactsDb));
    this.storageService.saveToStorage(this.CONTACT_KEY, this._contactsDb);
  }

  private _addContact(contact: Contact) {
    const newContact = new Contact(
      contact._id,
      contact.name,
      contact.email,
      contact.phone,
      );
    contact.img = this.setContactImg(contact)
    let randomId: string = this._makeId();
    newContact.setId(randomId);

    this._contactsDb.push(newContact);
    this._contacts$.next(this._sort(this._contactsDb));
  }

  public getEmptyContact() {
    return {
      name: '',
      email: '',
      phone: '',
      img: '',
    };
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    });
  }

  private _filter(contacts, term) {
    if (!term) return this._contactsDb
    term = term.toLocaleLowerCase() 
    
    return contacts.filter((contact) => {
      return (
        contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
      );
    });
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
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
}

