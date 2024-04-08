import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lottery-box',
  templateUrl: './lottery-box.component.html',
  styleUrls: ['./lottery-box.component.css']
})
export class LotteryBoxComponent implements OnInit {
  @Input() rows: any[][] = [];

  ngOnInit(): void {
    console.log(this.rows);
  }
}