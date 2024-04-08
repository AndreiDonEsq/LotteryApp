import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchTicketService {
    private selectedTicket = new BehaviorSubject(null);
    public selectedTicket$ = this.selectedTicket.asObservable();

    setSelectedTicket(ticket: any): void {
        this.selectedTicket.next(ticket);
    }
}
