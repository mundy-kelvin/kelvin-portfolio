import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="single-skill">
      <div class="skill-info">
        <span class="skill-name">{{ name }}</span>
        <span class="skill-percentage" #percentageEl></span>
      </div>
      <div class="progress skill-progress" #progressEl>
        <div class="progress-bar"
             role="progressbar"
             [style.width.%]="percentage"
             [attr.aria-valuenow]="percentage"
             aria-valuemin="0"
             aria-valuemax="100">
        </div>
      </div>
    </div>
  `
})
export class SkillBar implements AfterViewInit, OnDestroy {
  @Input() name = '';
  @Input() percentage = 0;

  @ViewChild('percentageEl') percentageEl!: ElementRef<HTMLSpanElement>;
  @ViewChild('progressEl')   progressEl!:   ElementRef<HTMLDivElement>;

  private observer: ResizeObserver | null = null;

  ngAfterViewInit(): void {
    this.updateLabel();
    this.observer = new ResizeObserver(() => this.updateLabel());
    this.observer.observe(this.progressEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private updateLabel(): void {
    const pct = Math.min(100, Math.max(0, this.percentage));
    const barWidth = this.progressEl.nativeElement.offsetWidth;
    const offset = barWidth - (barWidth * (pct / 100));
    this.percentageEl.nativeElement.textContent = `${pct}%`;
    this.percentageEl.nativeElement.style.marginRight = `${offset}px`;
  }
}
