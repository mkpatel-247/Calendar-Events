import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IEvent } from '../../interface/interface';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  public modalService = inject(NgbModal);
  @Input() eventDetails: IEvent = {
    id: 0,
    title: '',
    description: '',
    image: '',
    timing: { startDateTime: '', endDateTime: '' },
    address: undefined,
  };
}
