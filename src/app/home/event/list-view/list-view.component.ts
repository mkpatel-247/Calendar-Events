import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
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
import { CommonService } from 'src/app/shared/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, ManageEventComponent],
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent implements OnInit, OnDestroy {
  eventList: IEvent[] = [];
  private modalService = inject(NgbModal);
  //Store all subscription.
  subscribed: Subscription[] = [];
  ngOnInit(): void {
    //Get event list from local storage.
    const sub = this.common.updateEvent$.subscribe({
      next: () => {
        this.eventList = getLocalStorage(EVENT);
        this.cdr.detectChanges();
      },
    })
    this.subscribed.push(sub);
  }

  ngOnDestroy(): void {
    this.subscribed.forEach((element: Subscription) => {
      return element.unsubscribe();
    })
  }
  constructor(private cdr: ChangeDetectorRef, private common: CommonService) {
  }

  /**
   * Open Modal to add event
   */
  addEvent() {
    this.modalService.open(ManageEventComponent);
  }

  /**
   * View event details in a modal.
   */
  viewEventDetails(event: IEvent) {
    const viewModalRef = this.modalService.open(ModalComponent, { size: 'lg', centered: true });
    viewModalRef.componentInstance.eventDetails = event;
  }
}
