import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Ticket } from '../core/models/ticket.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private apiService: ApiService) {

  }

  saveTicketData(boxSelectedNumbers: string[], superzahl: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {
      boxSelectedNumbers,
      superzahl
    };
    return this.apiService.post("saveTicketData", body, httpOptions);
  }

  getTicketList(): Observable<Ticket[]>{
    return this.apiService.get("readTickets");
  }
}
