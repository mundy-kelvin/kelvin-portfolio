import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../core/services/modal.service';
import { ProjectCard } from './project-card/project-card';
import { PROJECTS } from '../../core/models/project.model';

@Component({
  selector: 'app-portfolio-modal',
  standalone: true,
  imports: [CommonModule, ProjectCard],
  template: `
    <div class="lightbox-wrapper" id="portfolio" [class.modal-open]="isActive()">
      <div class="lightbox-close">
        <div class="close-btn" (click)="close()" aria-label="Close Portfolio"></div>
      </div>

      <div class="container lightbox-content">
        <div class="section-heading page-heading single-section">
          <p class="section-description">My work</p>
          <h2 class="section-title">Portfolio</h2>
          <div class="animated-bar"></div>
        </div>

        <div class="single-section portfolio-section">
          <div class="portfolio-grid row">
            @for (project of projects; track project.title) {
              <app-project-card [project]="project"></app-project-card>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class PortfolioModal {
  private modalService = inject(ModalService);
  isActive = computed(() => this.modalService.activeModal() === 'portfolio');
  projects = PROJECTS;

  close(): void { this.modalService.close(); }
}
