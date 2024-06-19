import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
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
  isSubmitted: boolean = false;

  @Input() data = '';
  @Input() date: any = '';
  ngOnInit(): void {
    this.initializeEventForm();

    if (this.date) {
      this.eventForm.get('timing')?.get('startDateTime')?.setValue(this.date);
      // console.log(this.eventForm.get('timing')?.get('startDateTime').value);
    }
    //Get event object from localStorage.
    this.allEvent = getLocalStorage(EVENT);
  }

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public offcanvas: NgbOffcanvas,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * Create Event Form controls
   */
  initializeEventForm() {
    this.eventForm = this.fb.group({
      id: new FormControl(''), //Hidden field
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      timing: new FormGroup({
        startDateTime: new FormControl('', [Validators.required]),
        endDateTime: new FormControl('', [Validators.required]),
      }),
      address: new FormGroup({
        city: new FormControl('', [Validators.required]),
        area: new FormControl('', [Validators.required]),
      }),
      image: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * Get easy access of controls in HTML file.
   */
  get fc() {
    return this.eventForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(event.target.files);

    if (file) {
      const reader = new FileReader();
      // this.cdr.detach();
      reader.onload = (e: any) => {
        const imageBase64 = e.target?.result as string;
        console.log(imageBase64);
        this.eventForm.value.image = imageBase64;
        // this.eventForm.patchValue({ image: imageBase64 });
        // localStorage.setItem('uploadedImage', imageBase64);
        // this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
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
      //Set into localStorage.
      setLocalStorage(EVENT, this.allEvent);
      this.modal.close();
    }
    this.isSubmitted = true;
    this.cdr.detectChanges();
  }

  /**
   * Generate Unique Event ID.
   * @returns Unique ID
   */
  generateUniqueEventId() {
    return this.allEvent.length ? this.allEvent.length + 1 : 1;
  }
}
