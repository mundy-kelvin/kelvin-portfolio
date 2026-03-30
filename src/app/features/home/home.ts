import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotatingHeadline } from './rotating-headline/rotating-headline';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RotatingHeadline],
  template: `
    <section class="home-area element-cover-bg" id="home">
      <div class="container h-100">
        <div class="row h-100 align-items-center justify-content-center text-center">
          <div class="col-12">
            <img class="home-img mb-4"
                 src="img/botica.jpeg"
                 alt="Kelvin Mundi profile photo"
                 width="180" height="180">
            <div class="home-content">
              <h1 class="home-name">Kelvin <span class="color-scheme">Mundi</span></h1>
              <app-rotating-headline
                [words]="['a Developer', 'an Engineer', 'a Designer', 'a Freelancer']">
              </app-rotating-headline>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed social icons -->
      <div class="fixed-wrapper">
        <div class="fixed-block block-right">
          <ul class="list-unstyled social-icons">
            <li>
              <a href="https://www.linkedin.com/in/kelvin-mundi" target="_blank" rel="noopener" aria-label="LinkedIn">
                <i class="icon ion-logo-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/Wizkym" target="_blank" rel="noopener" aria-label="GitHub">
                <i class="icon ion-logo-github"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/kymosabe_/" target="_blank" rel="noopener" aria-label="Instagram">
                <i class="icon ion-logo-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `
})
export class Home {}
