import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../interface/interface';
import { ManageEventComponent } from 'src/app/home/event/manage-event/manage-event.component';
import { HeaderComponent } from '../header/header.component';
import { Error404Component } from '../error404/error404.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  // private modalService = inject(NgbModal);
  private offCanvasService = inject(NgbOffcanvas);

  @Input() eventDetails: IEvent = {
    id: 0,
    title: '',
    description: '',
    image: '',
    timing: { startDateTime: '', endDateTime: '' },
    address: undefined,
  };

  openEditForm() {
    const ref = this.offCanvasService.open(Error404Component, {
      position: 'end',
    });
    ref.componentInstance.id = this.eventDetails.id;
  }
}
