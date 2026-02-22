import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  redirect({ path, queryParams }: { path?: string | any[]; queryParams?: Object } = {}) {
    this.router.navigate(path ? (typeof path === 'string' ? [path] : path) : [], {
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
