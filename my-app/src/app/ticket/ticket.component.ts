import { Component } from '@angular/core';
import { Box } from './box.model';
import { TicketService } from '../../../api/ticket.service';
import { SwitchTicketService } from '../../../core/services/switch-ticket.service';
import { switchMap } from 'rxjs';
import { Ticket } from '../../../core/models/ticket.model';
import { TicketListUpdateService } from '../../../core/services/ticket-list-update.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TicketComponent {
  numberOfBoxes: number = 10;
  boxes: Box[] = []
  superzahl: number;

  constructor(
    private ticketService: TicketService,
    private switchTicketService: SwitchTicketService,
    private ticketListUpdateService: TicketListUpdateService
    ) {

    this.switchTicketService.selectedTicket$.subscribe(selectedTicket => {
      if (!selectedTicket) {
        return;
      }
      //Boxes all have the array of selected numbers as a string, coming from db
      //We will parse it back first
      this.boxes = selectedTicket.boxes.map(box => {
        const parsedSelections: number[] = this.parseNumbersFromString(box.selectedNumbers);
        console.log(parsedSelections);
        return {
          ...box,
          selectedNumbers: parsedSelections
        };
      });
      console.log(this.boxes);
      this.updateBoxes();
      this.superzahl = selectedTicket.superzahl;
    });
  }

  parseNumbersFromString(input: string): number[] {
    const substrings = input.split(';');

    const numbers = substrings.map(substring => parseInt(substring.trim(), 10));

    return numbers;
  }

  updateBoxes() {
    for (let i = 0; i < this.boxes.length; i++) {
      const rows: number[][] = [];
      let count: number = 1;
      for (let j = 0; j < 7; j++) {
        const row = [];
        for (let k = 0; k < 7; k++) {
          if (this.boxes[i].selectedNumbers.includes(count)) {
            row.push('x');      //todo do animation
          } else {
            row.push(count);
          }
          count++
        }
        rows.push(row);
      }
      this.boxes[i].rows = rows;
    }
  }

  createBoxes() {
    this.boxes = [];
    for (let i = 0; i < this.numberOfBoxes; i++) {
      this.boxes[i] = new Box();
      const rows: number[][] = [];
      this.boxes[i].selectedNumbers = this.getSixRandomNumbers();

      let count: number = 1;
      for (let j = 0; j < 7; j++) {
        const row = [];
        for (let k = 0; k < 7; k++) {
          if (this.boxes[i].selectedNumbers.includes(count)) {
            row.push('x');      //todo do animation
          } else {
            row.push(count);
          }
          count++
        }
        rows.push(row);
      }
      this.boxes[i].rows = rows;
    }

    const randomNumber = Math.random();
    this.superzahl = Math.floor(randomNumber * 9) + 1;

    this.saveTicketData(this.boxes, this.superzahl);
  }

  getSixRandomNumbers(): number[] {
    const numbers: number[] = [];

    // Fill array with numbers from 1 to 49
    for (let i = 1; i <= 49; i++) {
      numbers.push(i);
    }

    // Shuffle the array
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Select the first 6 numbers
    const selectedNumbers = numbers.slice(0, 6);
    return selectedNumbers;
  }

  saveTicketData(boxes: Box[], superzahl: number): void {
    const boxSelectedNumbers: string[] = [];
    boxes.forEach(box => {
      boxSelectedNumbers.push(box.selectedNumbers.join(';'));
    });

    //We want to see the tickets updated in the footer. Proceed then to get the new ticket list and update it in next
    this.ticketService.saveTicketData(boxSelectedNumbers, superzahl).pipe(
      switchMap(
        () => this.ticketService.getTicketList()
      )
    ).subscribe({
      next: (readTickets: Ticket[]) => {
        console.log("finished save");
        this.ticketListUpdateService.updateTicketList(readTickets);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
