import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageEventComponent } from '../manage-event/manage-event.component';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarViewComponent {
  constructor(public modal: NgbModal, private cdr: ChangeDetectorRef) {}
  // calendarOptions: CalendarOptions = {
  //   plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
  //   dateClick: (arg) => this.handleDateClick(arg),
  //   eventClick: (arg) => this.handleEventClick.bind(arg),
  //   initialView: 'dayGridMonth',
  //   weekends: true,
  //   events: [{ title: 'Meeting', start: new Date() }],
  // };
  // eventsPromise!: Promise<EventInput[]>;

  // handleDateClick(arg: DateClickArg) {
  //   this.modal.open(ManageEventComponent);
  // }

  // handleEventClick(arg: any) {
  //   console.log(arg);
  // }
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: [{ title: 'Meeting', start: new Date() }], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    this.modal.open(ManageEventComponent);
    const title = 'asd';
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // calendarApi.addEvent({
      //   id: '1',
      //   title,
      //   start: selectInfo.startStr,
      //   end: selectInfo.endStr,
      //   allDay: selectInfo.allDay,
      // });
    }
  }
  handleEventClick(clickInfo: EventClickArg) {
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.cdr.detectChanges();
  }
}
