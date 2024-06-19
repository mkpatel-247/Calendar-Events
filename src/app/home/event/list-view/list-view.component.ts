import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.eventList = getLocalStorage(EVENT);
  }

  constructor(public modal: NgbModal) {}

  /**
   * Open Modal to add event
   */
  addEvent() {
    this.modal.open(ManageEventComponent);
  }
}
