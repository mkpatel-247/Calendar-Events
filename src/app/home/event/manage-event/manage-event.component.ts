import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  findEventIndex,
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

  @Input() id = 0;
  @Input() editObject: any = '';
  @Input() date: any = '';
  profileImage: string | ArrayBuffer | undefined | null;

  ngOnInit(): void {
    this.initializeEventForm();

    if (this.id) {
      this.editObject = findEventIndex(this.id);
      this.eventForm.patchValue(this.editObject.object);
      this.profileImage = this.editObject.object.image;
      console.log('iausgduig');
    }
    if (this.date) {
      console.log('Formatted Date: ', this.date);

      this.eventForm.get('timing')?.get('startDateTime')?.setValue(this.date);
    }
    //Get event object from localStorage.
    this.allEvent = getLocalStorage(EVENT);
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public offcanvas: NgbOffcanvas,
    public modal: NgbModal
  ) {}

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

  /**
   * Convert the normal Image path to Base64.
   * @param event date of image field
   */
  onFileChange(event: any) {
    if (event.target.files[0].size > 2097152) {
      alert('File is too big!');
    } else {
      let reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * Add/Edit Event form data.
   */
  onSubmitEventForm() {
    const value = this.eventForm.value;
    if (this.eventForm.valid) {
      if (this.id) {
        value.image = this.profileImage;
        this.allEvent[this.editObject.index] = value;
      } else {
        //Store unique key and update value on id field
        value.id = this.generateUniqueEventId();
        value.image = this.profileImage;
        this.allEvent.push(value);
      }
      //Set into localStorage.
      setLocalStorage(EVENT, this.allEvent);
      this.profileImage = '';
      this.eventForm.reset();
      //Close component.
      this.id ? this.offcanvas.dismiss() : this.modal.dismissAll();
    } else {
      this.isSubmitted = true;
    }
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
