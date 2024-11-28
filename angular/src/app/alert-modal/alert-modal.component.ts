import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent {
  isVisible: boolean = false;
  content: string = '';
  callback?: () => void; // Optional callback function

  openModal(message: string, callback?: () => void): void {
    this.content = message;
    this.callback = callback; // Store the callback
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
    if (this.callback) {
      this.callback(); // Execute the callback if provided
    }
  }
}
