import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  contact: Contact;

  ngOnInit(): void {
    this.route.data.subscribe(async ({ contact }) => {
      this.contact = contact?._id
        ? contact
        : (this.contactService.getEmptyContact() as Contact);
    });
  }
  async onSaveContact() {
    this.router.navigateByUrl('contact');
    await this.contactService.saveContact({ ...this.contact });
  }
}
