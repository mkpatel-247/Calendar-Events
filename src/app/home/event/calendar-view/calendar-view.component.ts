import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import { getEvents } from 'src/app/shared/common/function';
import { NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, NgbModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent implements OnInit {
  //Modal for Add Event.
  private modalService = inject(NgbModal);
  //Modal of Edit Event.
  private offCanvasService = inject(NgbOffcanvas);

  ngOnInit(): void {
    //Fetch events to show in view.
    this.calendarOptions.events = getEvents();
  }

  constructor(private cdr: ChangeDetectorRef) {}

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
    timeZone: 'UTC',
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  /**
   * Trigger onClick date.
   * @param selectInfo clicked date.
   */
  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    const addModalRef = this.modalService.open(ManageEventComponent);

    addModalRef.componentInstance.date = this.formatDateTime(selectInfo.start);
    addModalRef.dismissed.subscribe({
      next: (response: any) => {
        this.calendarOptions.events = getEvents();
        this.cdr.detectChanges();
      },
    });
    const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection
  }

  /**
   * When clicked on any event.
   * @param clickInfo event
   */
  handleEventClick(clickInfo: EventClickArg) {
    const ref = this.offCanvasService.open(ManageEventComponent, {
      position: 'end',
    });
    ref.componentInstance.id = clickInfo.event.id;
    ref.dismissed.subscribe({
      next: () => {
        this.calendarOptions.events = getEvents();
        this.cdr.detectChanges();
      },
    });
  }

  // handleEvents(events: EventApi[]) {
  //   // this.currentEvents = events;
  //   // this.cdr.detectChanges();
  // }

  /**
   * Format Date according to dateTimeLocal format.
   * Example of formatted date: 2024-06-08T04:23
   */
  formatDateTime(calendarDate: Date) {
    return calendarDate.toISOString().slice(0, 21);
  }
}
