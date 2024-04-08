import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
    providedIn: 'root'
})
export class TicketListUpdateService {
    private ticketListSubject: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
    public ticketList$: Observable<Ticket[]> = this.ticketListSubject.asObservable();

    updateTicketList(tickets: Ticket[]): void {
        this.ticketListSubject.next(tickets);
    }
}