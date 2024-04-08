import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../../../api/ticket.service';
import { SwitchTicketService } from '../../../core/services/switch-ticket.service';
import { Ticket } from '../../../core/models/ticket.model';
import { Subscription } from 'rxjs';
import { TicketListUpdateService } from '../../../core/services/ticket-list-update.service';

@Component({
  selector: 'ticket-list-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy{
  tickets: Ticket[] = [];
  ticketSubscription: Subscription;
  constructor(private ticketService: TicketService, private switchTicketService: SwitchTicketService, private ticketListUpdateService: TicketListUpdateService) {

  }

  //In a real case situation it would be better to not save the entire tickets here with their boxes since we do not show them
  //Perhaps do a fetch request per uuid 
  //In this tiny app case it's fine
  ngOnInit(): void {
    this.ticketService.getTicketList().subscribe(ticketList => {
      console.log("UPDATING");
      this.tickets = ticketList;
    });
    
    this.ticketSubscription = this.ticketListUpdateService.ticketList$.subscribe(ticketList => {
      console.log("UPDATING");
      this.tickets = ticketList;
    });
  }

  ngOnDestroy(): void {
    if (this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }

  public onClickTicket(ticket: any): void {
    this.switchTicketService.setSelectedTicket(ticket);
  }
}
