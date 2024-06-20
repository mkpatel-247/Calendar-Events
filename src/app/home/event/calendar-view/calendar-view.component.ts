import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  formatDate,
} from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ManageEventComponent } from '../manage-event/manage-event.component';
import { findObjectNIndex, formatDateTime, getEvents } from 'src/app/shared/common/function';
import { NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/shared/services/common.service';
import { Subscription } from 'rxjs';
import { L } from '@fullcalendar/list/internal-common';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, NgbModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent implements OnInit, OnDestroy {
  //Modal for Add Event.
  private modalService = inject(NgbModal);
  //Modal of Edit Event.
  private offCanvasService = inject(NgbOffcanvas);
  //Store all subscribe of this component.
  subscribed: Subscription[] = [];

  ngOnInit(): void {
    //Fetch events to show in view.
    const sub = this.common.updateEvent$.subscribe({
      next: () => {
        this.calendarOptions.events = getEvents();
        this.cdr.detectChanges();
      }
    });
    this.subscribed.push(sub);
  }

  ngOnDestroy(): void {
    // Unsubscribe all the subscription.
    this.subscribed.forEach((element: Subscription) => {
      return element.unsubscribe();
    })
  }

  constructor(private cdr: ChangeDetectorRef, private common: CommonService) { }

  /**
   * FullCalendar Plugin setup.
   */
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    eventColor: '#4154f1',
    timeZone: 'UTC',
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  /**
   * Trigger onClick date.
   * @param selectInfo clicked date.
   */
  handleDateSelect(selectInfo: DateSelectArg) {
    const addModalRef = this.modalService.open(ManageEventComponent);
    addModalRef.componentInstance.date = formatDateTime(selectInfo.start);
  }

  /**
   * When clicked on any event.
   * @param clickInfo event
   */
  handleEventClick(clickInfo: EventClickArg) {
    const ID = Number(clickInfo.event.id);
    const viewModalRef = this.modalService.open(ModalComponent, { size: 'md', centered: true });
    viewModalRef.componentInstance.eventDetails = findObjectNIndex(ID).object;
  }

}
