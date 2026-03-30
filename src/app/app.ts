import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Preloader }        from './shared/preloader/preloader';
import { OverlayEffect }    from './shared/overlay-effect/overlay-effect';
import { Navbar }           from './layout/navbar/navbar';
import { Home }             from './features/home/home';
import { AboutModal }       from './features/about/about-modal';
import { ResumeModal }      from './features/resume/resume-modal';
import { PortfolioModal }   from './features/portfolio/portfolio-modal';
import { ContactModal }     from './features/contact/contact-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    Preloader,
    OverlayEffect,
    Navbar,
    Home,
    AboutModal,
    ResumeModal,
    PortfolioModal,
    ContactModal,
  ],
  template: `
    <app-preloader></app-preloader>
    <app-overlay-effect></app-overlay-effect>
    <app-navbar></app-navbar>
    <app-home></app-home>
    <app-about-modal></app-about-modal>
    <app-resume-modal></app-resume-modal>
    <app-portfolio-modal></app-portfolio-modal>
    <app-contact-modal></app-contact-modal>
  `
})
export class App {}
