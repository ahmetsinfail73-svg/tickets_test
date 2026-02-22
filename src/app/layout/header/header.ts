import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TuiButton, TuiPopup } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';

@Component({
  selector: 'app-header',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TuiDrawer,
    TuiPopup,
    NgTemplateOutlet,
    TuiButton,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly links = [
    { label: 'Заявки', path: '/' },
    { label: 'Создать заявку', path: '/create' },
  ];

  protected readonly open = signal(false);

  protected onClick() {
    this.open.set(!this.open());
  }
}
