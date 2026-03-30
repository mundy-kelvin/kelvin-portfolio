import { Component, Input } from '@angular/core';
import { ProjectItem } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <div class="single-item col-12 col-md-6 col-lg-4">
      <a class="portfolio-item" [href]="project.link" target="_blank" rel="noopener"
         [attr.aria-label]="project.title + ' - ' + project.description">
        <div class="portfolio-wrapper">
          <img class="img-fluid portfolio-img"
               [src]="project.image"
               [alt]="project.title + ' screenshot'"
               loading="lazy">
          <div class="item-content">
            <h6 class="content-title">{{ project.title }}</h6>
            <span class="content-more">{{ project.description }}</span>
          </div>
        </div>
      </a>
    </div>
  `
})
export class ProjectCard {
  @Input() project!: ProjectItem;
}
