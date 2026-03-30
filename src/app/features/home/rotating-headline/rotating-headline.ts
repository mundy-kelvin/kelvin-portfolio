import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rotating-headline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h4 class="home-headline">
      I'm
      <span class="single-headline" #wrapper>
        @for (word of words; track word; let i = $index) {
          <b [class.is-visible]="currentIndex() === i">{{ word }}</b>
        }
      </span>
    </h4>
  `
})
export class RotatingHeadline implements OnInit, OnDestroy {
  @Input() words: string[] = ['a Developer', 'an Engineer', 'a Designer', 'a Freelancer'];
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef<HTMLSpanElement>;

  currentIndex = signal(0);

  private animationDelay    = 2500;
  private revealDuration    = 660;
  private revealHidingDelay = 1500;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private animating = false;

  ngOnInit(): void {
    this.setWrapperWidth();
    this.timer = setTimeout(() => this.cycle(), this.animationDelay);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private cycle(): void {
    if (this.animating) return;
    this.animating = true;
    const el = this.wrapper.nativeElement;

    // Collapse to 2px (hide current word)
    el.style.transition = `width ${this.revealDuration}ms ease-in-out`;
    el.style.width = '2px';

    setTimeout(() => {
      // Switch word
      const next = (this.currentIndex() + 1) % this.words.length;
      this.currentIndex.set(next);

      // Expand to new word width
      setTimeout(() => {
        el.style.transition = `width ${this.revealDuration}ms ease-in-out`;
        el.style.width = this.getWordWidth() + 'px';

        setTimeout(() => {
          this.animating = false;
          this.timer = setTimeout(() => this.cycle(), this.revealHidingDelay);
        }, this.revealDuration);
      }, 20);
    }, this.revealDuration);
  }

  private setWrapperWidth(): void {
    const el = this.wrapper.nativeElement;
    el.style.width = this.getWordWidth() + 'px';
  }

  private getWordWidth(): number {
    const el = this.wrapper.nativeElement;
    const visible = el.querySelector('b.is-visible') as HTMLElement;
    return visible ? visible.offsetWidth + 10 : 100;
  }
}
