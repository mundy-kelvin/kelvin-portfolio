import { Component, inject, computed, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ModalService } from '../../core/services/modal.service';
import { ContactService } from '../../core/services/contact.service';

type SubmitState = 'idle' | 'wait' | 'success' | 'error';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="lightbox-wrapper" id="contact" [class.modal-open]="isActive()">
      <div class="lightbox-close">
        <div class="close-btn" (click)="close()" aria-label="Close Contact"></div>
      </div>

      <div class="container lightbox-content">
        <div class="section-heading page-heading single-section">
          <p class="section-description">Get in touch</p>
          <h2 class="section-title">Contact</h2>
          <div class="animated-bar"></div>
        </div>

        <div class="single-section contact-section">
          <div class="row">
            <!-- Contact Form -->
            <div class="col-12 col-lg-7">
              <form class="contact-form" id="contact-form" [formGroup]="form" (ngSubmit)="submit()">
                <h4 class="content-title">Message Me</h4>
                <div class="row">
                  <div class="col-12 col-md-6 form-group">
                    <input class="form-control"
                           id="contact-name"
                           type="text"
                           formControlName="name"
                           placeholder="Name"
                           required
                           aria-label="Your name">
                  </div>
                  <div class="col-12 col-md-6 form-group">
                    <input class="form-control"
                           id="contact-email"
                           type="email"
                           formControlName="email"
                           placeholder="Email"
                           required
                           aria-label="Your email">
                  </div>
                  <div class="col-12 form-group">
                    <input class="form-control"
                           id="contact-subject"
                           type="text"
                           formControlName="subject"
                           placeholder="Subject"
                           required
                           aria-label="Subject">
                  </div>
                  <div class="col-12 form-group form-message">
                    <textarea class="form-control"
                              id="contact-message"
                              formControlName="message"
                              placeholder="Message"
                              rows="5"
                              required
                              aria-label="Your message"></textarea>
                  </div>
                  <div class="col-12 form-submit">
                    <button class="btn button-main button-scheme"
                            id="contact-submit"
                            type="submit"
                            [class.wait]="submitState() === 'wait'"
                            [class.success]="submitState() === 'success'"
                            [class.error]="submitState() === 'error'"
                            [disabled]="submitState() === 'wait'">
                      {{ buttonLabel() }}
                    </button>
                    <p class="contact-feedback"
                       [class.success]="submitState() === 'success'"
                       [class.error]="submitState() === 'error'"
                       [style.display]="feedbackVisible() ? 'block' : 'none'">
                      {{ feedbackMessage() }}
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <!-- Contact Info -->
            <div class="col-12 col-lg-5">
              <div class="contact-info">
                <h4 class="content-title">Contact Info</h4>
                <p class="info-description">
                  Always available for freelance work if the right project comes along.
                  Feel free to contact me!
                </p>
                <ul class="list-unstyled list-info">
                  @for (info of contactInfo; track info.type) {
                    <li>
                      <div class="media align-items-center d-flex">
                        <span class="info-icon">
                          <i class="icon" [class]="info.icon" aria-hidden="true"></i>
                        </span>
                        <div class="media-body info-details">
                          <h6 class="info-type">{{ info.type }}</h6>
                          @if (info.link) {
                            <span class="info-value"><a [href]="info.link">{{ info.value }}</a></span>
                          } @else {
                            <span class="info-value">{{ info.value }}</span>
                          }
                        </div>
                      </div>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactModal {
  private modalService  = inject(ModalService);
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);

  isActive = computed(() => this.modalService.activeModal() === 'contact');
  submitState = signal<SubmitState>('idle');

  form = this.fb.nonNullable.group({
    name:    ['', Validators.required],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  buttonLabel = computed(() => {
    switch (this.submitState()) {
      case 'wait':    return 'Wait...';
      case 'success': return 'Success';
      case 'error':   return 'Error';
      default:        return 'Send Message';
    }
  });

  feedbackVisible = computed(() => this.submitState() === 'success' || this.submitState() === 'error');
  feedbackMessage = computed(() => {
    if (this.submitState() === 'success') return 'Thank you for your message. It has been sent.';
    if (this.submitState() === 'error')   return 'Server error! Please try again later.';
    return '';
  });

  contactInfo = [
    { type: 'Name',     value: 'Kelvin Mundi',                 icon: 'ion-logo-ionic',   link: null },
    { type: 'Email',    value: 'kevkmundy@gmail.com',           icon: 'ion-mail-outline', link: 'mailto:kevkmundy@gmail.com' },
    { type: 'Location', value: 'Atlanta, GA, USA',              icon: 'ion-location-outline', link: null },
    { type: 'Phone',    value: '+1 (404) 789 9005',             icon: 'ion-call-outline', link: 'tel:+14047899005' },
  ];

  submit(): void {
    if (this.form.invalid || this.submitState() === 'wait') return;
    this.submitState.set('wait');

    timer(1000).pipe(
      switchMap(() => this.contactService.sendMessage(this.form.getRawValue()))
    ).subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          this.submitState.set('success');
          this.form.reset();
        } else {
          this.submitState.set('error');
        }
        setTimeout(() => this.submitState.set('idle'), 6000);
      },
      error: () => {
        this.submitState.set('error');
        setTimeout(() => this.submitState.set('idle'), 6000);
      }
    });
  }

  close(): void { this.modalService.close(); }
}
