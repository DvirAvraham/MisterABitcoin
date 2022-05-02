import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
})
export class ContactPreviewComponent implements OnInit {
  constructor(private contactService: ContactService) {}
  @Input() contact: Contact;
  @Output('remove') onRemove = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onRemoveContact(ev: MouseEvent, contactId: string) {
    ev.stopPropagation();
    this.onRemove.emit(contactId);
  }

}
