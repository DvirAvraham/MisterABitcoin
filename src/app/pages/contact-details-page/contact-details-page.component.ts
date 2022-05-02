import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Move } from 'src/app/models/move.model';
@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  contact: Contact;
  contactMoves: Move[];

  async ngOnInit() {
    this.route.data.subscribe((data: { contact }) => {
      this.contact = data.contact;
    });
    this.setContactMove();
  }

  setContactMove() {
    this.userService.getUser().subscribe((user) => {
      this.contactMoves = user.moves.filter(
        (move: Move) => this.contact._id === move.toId
      );
    });
  }

  onBack() {
    this.router.navigateByUrl('contact');
  }
}
// this.route.data.subscribe(data=>{
//   this.pet = data.pet
// })

