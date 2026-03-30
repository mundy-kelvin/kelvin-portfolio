import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="preloader" [class.fadeOut]="hiding()" [style.animation-duration]="'0.5s'">
        <div class="preloader-block">
          <div class="preloader-icon">
            <span class="loading-dot loading-dot-1"></span>
            <span class="loading-dot loading-dot-2"></span>
            <span class="loading-dot loading-dot-3"></span>
          </div>
        </div>
      </div>
    }
  `
})
export class Preloader implements OnInit {
  visible = signal(true);
  hiding  = signal(false);

  ngOnInit(): void {
    setTimeout(() => this.hiding.set(true), 400);
    setTimeout(() => this.visible.set(false), 900);
  }
}
