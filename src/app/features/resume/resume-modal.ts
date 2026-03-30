import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../core/services/modal.service';
import { SkillBar } from './skill-bar/skill-bar';
import { EDUCATION, EXPERIENCE } from '../../core/models/resume.model';
import { SKILLS } from '../../core/models/skill.model';

@Component({
  selector: 'app-resume-modal',
  standalone: true,
  imports: [CommonModule, SkillBar],
  template: `
    <div class="lightbox-wrapper" id="resume" [class.modal-open]="isActive()">
      <div class="lightbox-close">
        <div class="close-btn" (click)="close()" aria-label="Close Resume"></div>
      </div>

      <div class="container lightbox-content">
        <!-- Section Heading -->
        <div class="section-heading page-heading single-section">
          <p class="section-description">My background</p>
          <h2 class="section-title">Resume</h2>
          <div class="animated-bar"></div>
        </div>

        <!-- Education + Experience -->
        <div class="single-section resume-section">
          <div class="row">
            <!-- Education -->
            <div class="col-12 col-lg-6">
              <div class="col-block education">
                <h3 class="col-title">Education</h3>
                @for (item of education; track item.degree) {
                  <div class="resume-item">
                    <span class="item-arrow"></span>
                    <h5 class="item-title">{{ item.degree }}</h5>
                    <span class="item-details">{{ item.institution }} / {{ item.period }}</span>
                    <p class="item-description">{{ item.description }}</p>
                  </div>
                }
              </div>
            </div>

            <!-- Experience -->
            <div class="col-12 col-lg-6">
              <div class="col-block experience">
                <h3 class="col-title">Experience</h3>
                @for (item of experience; track item.title) {
                  <div class="resume-item">
                    <span class="item-arrow"></span>
                    <h5 class="item-title">{{ item.title }}</h5>
                    <span class="item-details">{{ item.company }} / {{ item.period }}</span>
                    <p class="item-description">{{ item.description }}</p>
                    @if (item.bullets && item.bullets.length) {
                      <ul class="item-bullets">
                        @for (bullet of item.bullets; track bullet) {
                          <li>{{ bullet }}</li>
                        }
                      </ul>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="single-section skills-section">
          <div class="section-heading">
            <p class="section-description">My proficiency</p>
            <h3 class="section-title">Skills</h3>
          </div>
          <div class="row">
            @for (skill of skills; track skill.name) {
              <div class="col-12 col-md-6">
                <app-skill-bar [name]="skill.name" [percentage]="skill.percentage"></app-skill-bar>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  `
})
export class ResumeModal {
  private modalService = inject(ModalService);
  isActive   = computed(() => this.modalService.activeModal() === 'resume');
  education  = EDUCATION;
  experience = EXPERIENCE;
  skills     = SKILLS;

  close(): void { this.modalService.close(); }
}
