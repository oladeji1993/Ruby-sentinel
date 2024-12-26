import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent {

  @Input() cardContent! : any;

  getKeys(obj: any): string[] {
    return Object.keys(obj).filter(key => key !== 'cardName');
  }
  
  formatKey(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
