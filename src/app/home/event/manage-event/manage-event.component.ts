import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbActiveModal,
  NgbModule,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  getLocalStorage,
  setLocalStorage,
} from 'src/app/shared/common/function';
import { EVENT } from 'src/app/shared/constant/keys.constant';

@Component({
  selector: 'app-manage-event',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageEventComponent implements OnInit {
  eventForm!: FormGroup;
  allEvent: any = '';

  ngOnInit(): void {
    this.initializeEventForm();
    //Get event object from localStorage.
    this.allEvent = getLocalStorage(EVENT);
  }

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public offcanvas: NgbOffcanvas,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Create Event Form controls
   */
  initializeEventForm() {
    this.eventForm = this.fb.group({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      timing: new FormGroup({
        startDateTime: new FormControl('', [Validators.required]),
        endDateTime: new FormControl('', [Validators.required]),
      }),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        pinCode: new FormControl('', [Validators.required]),
      }),
      image: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Add/Edit Event form data.
   */
  onSubmitEventForm() {
    const value = this.eventForm.value;
    if (this.eventForm.valid) {
      //Store unique key and update value on id field
      value.id = this.generateUniqueEventId();
      this.allEvent.push(value);
      setLocalStorage(EVENT, this.allEvent);
    }
    this.eventForm.markAllAsTouched();
  }

  /**
   * Generate Unique Event ID.
   * @returns Unique ID
   */
  generateUniqueEventId() {
    return this.allEvent.length ? this.allEvent.length + 1 : 1;
  }
}
