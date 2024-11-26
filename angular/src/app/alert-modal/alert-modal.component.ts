import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
  @Input() isVisible: boolean = false; // Controls the visibility of the modal
  @Input() content: string = ''; // Dynamic message

  /**
   * Method to open the modal with dynamic content.
   */
  openModal(content: string): void {
    this.content = content;
    this.isVisible = true;
  }

  /**
   * Method to close the modal.
   */
  closeModal(): void {
    this.isVisible = false;
  }
}
