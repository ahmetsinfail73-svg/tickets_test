import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { TuiPagination } from '@taiga-ui/kit';
import { IPaginationMeta } from '../../../models/ticket.model';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-tickets-pagination',
  imports: [TuiPagination],
  templateUrl: './tickets-pagination.html',
  styleUrl: './tickets-pagination.css',
})
export class TicketsPagination implements OnChanges {
  @Input() meta: IPaginationMeta | null = null;

  protected readonly length = signal<number>(0);

  protected readonly index = signal<number>(0);

  constructor(private routerService: RouterService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['meta'] && this.meta) {
      this.length.set(this.meta.pages);
      this.index.set(this.meta.page - 1);
    }
  }

  protected goToPage(index: number) {
    this.index.set(index);

    this.routerService.redirect({
      queryParams: {
        page: index + 1,
      },
    });

    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
