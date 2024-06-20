import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../interface/interface';
import { ManageEventComponent } from 'src/app/home/event/manage-event/manage-event.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  public modalService = inject(NgbModal);
  private offCanvasService = inject(NgbOffcanvas);

  @Input() eventDetails: IEvent = {
    id: 0,
    title: '',
    description: '',
    image: '',
    timing: { start: '', end: '' },
    address: undefined,
  };

  openEditForm() {
    const ref = this.offCanvasService.open(ManageEventComponent, {
      position: 'end',
      animation: true,
      backdrop: true
    });
    ref.componentInstance.id = this.eventDetails.id;
    // Close the modal view.
    this.modalService.dismissAll();
    // When offcanvas is dismissed then subscribe and get the value.
    ref.dismissed.subscribe({
      next: (response: any) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.eventDetails = response || this.eventDetails;
      }
    })
  }
}
