import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ContactResolverService implements Resolve<Promise<Contact>> {
  constructor(private contactService: ContactService) {}

  async resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    const contact = await this.contactService.getContactById(id).toPromise();
    return contact;
  }
}
