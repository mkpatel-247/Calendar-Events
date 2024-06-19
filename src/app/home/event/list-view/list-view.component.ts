import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageEventComponent } from '../manage-event/manage-event.component';
import { IEvent } from 'src/app/shared/interface/interface';
import { getLocalStorage } from 'src/app/shared/common/function';
import { EVENT } from 'src/app/shared/constant/keys.constant';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private cdr: ChangeDetectorRef) { }

  /**
   * Open Modal to add event
   */
  addEvent() {
    const modalRef = this.modalService.open(ManageEventComponent);
    // modalRef.componentInstance.data = "Test";
    this.modalService.activeInstances.subscribe({
      next: (response: any) => {
        this.eventList = getLocalStorage(EVENT);
        this.cdr.detectChanges();
      }
    })
  }
}
