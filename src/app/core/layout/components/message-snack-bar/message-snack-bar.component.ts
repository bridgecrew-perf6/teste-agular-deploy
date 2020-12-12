import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-snack-bar',
  templateUrl: './message-snack-bar.component.html',
  styleUrls: ['./message-snack-bar.component.scss'],
})
export class MessageSnackBarComponent {
  constructor(public snackBar: MatSnackBar) {}

  // this function will open up snackbar on top right position with custom background color (defined in css)
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [className],
    });
  }
}
