import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { TUI_DARK_MODE, TUI_DARK_MODE_KEY, TuiButton, TuiIcon, TuiPopup } from '@taiga-ui/core';
import { TuiDrawer } from '@taiga-ui/kit';
import { Path } from '../../constants/path.constant';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiDrawer,
    TuiPopup,
    NgTemplateOutlet,
    TuiButton,
    TuiIcon,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly key = inject(TUI_DARK_MODE_KEY);

  private readonly storage = inject(WA_LOCAL_STORAGE);

  private readonly media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');

  protected readonly links = [
    { label: 'Заявки', path: Path.HOME },
    { label: 'Создать заявку', path: Path.CREATE_TICKET },
  ];

  protected readonly homePath = Path.HOME;

  protected readonly open = signal(false);

  protected onClick() {
    this.open.set(!this.open());
  }

  protected readonly darkMode = inject(TUI_DARK_MODE);

  protected reset() {
    this.darkMode.set(this.media.matches);
    this.storage?.removeItem(this.key);
  }
}
