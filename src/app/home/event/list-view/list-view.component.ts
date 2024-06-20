import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageEventComponent } from '../manage-event/manage-event.component';
import { IEvent } from 'src/app/shared/interface/interface';
import { getLocalStorage } from 'src/app/shared/common/function';
import { EVENT } from 'src/app/shared/constant/keys.constant';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, ManageEventComponent],
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent implements OnInit {
  eventList: IEvent[] = [];
  private modalService = inject(NgbModal);
  ngOnInit(): void {
    this.eventList = getLocalStorage(EVENT);
  }

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Open Modal to add event
   */
  addEvent() {
    this.modalService.open(ManageEventComponent);
    //Subscribe and detect any changes.
    this.modalService.activeInstances.subscribe({
      next: (response: any) => {
        this.eventList = getLocalStorage(EVENT);
        this.cdr.detectChanges();
      },
    });
  }

  /**
   * View event details in a modal.
   */
  viewEventDetails(event: IEvent) {
    const viewModalRef = this.modalService.open(ModalComponent);
    viewModalRef.componentInstance.eventDetails = event;
  }
}
