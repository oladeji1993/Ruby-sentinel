import { Component } from '@angular/core';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent {
  items = [
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'monie point',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
  ];

}
