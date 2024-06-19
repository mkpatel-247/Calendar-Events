import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListViewComponent } from './list-view/list-view.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, ListViewComponent, CalendarViewComponent],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {
  viewMode: boolean = false;

  /**
   * Toggle view list/calendar.
   */
  toggleViewButton() {
    this.viewMode = !this.viewMode;
  }
}
