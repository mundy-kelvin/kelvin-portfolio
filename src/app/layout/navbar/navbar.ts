import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService, ModalId } from '../../core/services/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-md fixed-top" id="navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <span>Kelvin Mundi</span>
        </a>

        <!-- Mobile hamburger -->
        <div class="navbar-menu" (click)="toggleMenu()" aria-label="Toggle navigation">
          <span class="btn-line"></span>
        </div>

        <!-- Nav links -->
        <div class="navbar-collapse" [class.show]="menuOpen()">
          <ul class="navbar-nav ms-auto">
            @for (item of navItems; track item.id) {
              <li class="nav-item">
                <button class="nav-link" (click)="openModal(item.id)">{{ item.label }}</button>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class Navbar {
  private modalService = inject(ModalService);
  menuOpen = signal(false);

  navItems: { id: ModalId; label: string }[] = [
    { id: 'about',     label: 'About'     },
    { id: 'resume',    label: 'Resume'    },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact',   label: 'Contact'   },
  ];

  openModal(id: ModalId): void {
    this.menuOpen.set(false);
    this.modalService.open(id);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.menuOpen() && !target.closest('.navbar-menu') && !target.closest('.navbar-collapse')) {
      this.menuOpen.set(false);
    }
  }
}
