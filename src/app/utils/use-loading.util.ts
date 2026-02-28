import { signal } from '@angular/core';
import { Observable, finalize } from 'rxjs';

export const useLoading = () => {
  const loading = signal<boolean>(false);

  const wrap = <T>(action$: Observable<T>) => {
    loading.set(true);

    return action$.pipe(finalize(() => loading.set(false)));
  };

  return { loading, wrap };
};
