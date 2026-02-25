import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiPagination } from '@taiga-ui/kit';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-tickets-pagination',
  imports: [TuiPagination],
  templateUrl: './tickets-pagination.html',
  styleUrl: './tickets-pagination.css',
})
export class TicketsPagination {
  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['page']) {
        const p = Number(params['page']);

        if (isNaN(p)) {
          this.routerService.redirect({
            queryParams: {
              page: 1,
            },
          });

          return;
        }

        if (p <= 1) {
          this.routerService.redirect({
            queryParams: {
              page: 1,
            },
          });

          return;
        }

        if (p > this.length) {
          const currentPage = this.length;

          this.routerService.redirect({
            queryParams: {
              page: currentPage,
            },
          });

          this.page = currentPage;
        } else {
          this.page = p - 1;
        }
      }
    });
  }

  protected length = 64;

  protected page = 0;

  protected goToPage(index: number): void {
    this.page = index;

    this.routerService.redirect({
      queryParams: {
        page: this.page + 1,
      },
    });
  }
}
