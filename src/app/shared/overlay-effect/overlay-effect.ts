import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../core/services/modal.service';

@Component({
  selector: 'app-overlay-effect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="overlay-effect"
         [class.animate-up]="isUp()"
         [class.animate-down]="isDown()">
    </div>
  `
})
export class OverlayEffect {
  private modal = inject(ModalService);

  isUp   = computed(() => this.modal.overlayState() === 'animate-up');
  isDown = computed(() => this.modal.overlayState() === 'animate-down');
}
