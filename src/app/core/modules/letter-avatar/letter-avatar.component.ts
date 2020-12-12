import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter-avatar',
  templateUrl: './letter-avatar.component.html',
  styleUrls: ['./letter-avatar.component.scss'],
})
export class LetterAvatarComponent implements OnInit {
  @Input() text: string;
  @Input() letterQty: '1' | '2' = '2'; // letter quantity for example (Patricio Cordeiro => one = P, two = PC)
  @Input() color: string;
  @Input() size: 'normal' | 'large' = 'normal';
  letterAvatar: string;
  constructor() {}

  ngOnInit() {
    if (this.letterQty === '2') {
      const temp = this.text.trim().split(' ');
      this.letterAvatar = temp[1]
        ? temp[0][0] + temp[temp.length - 1][0]
        : temp[0][0];
    } else {
      this.letterAvatar = this.text[0];
    }
  }
}
