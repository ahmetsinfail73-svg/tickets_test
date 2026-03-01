import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appearance', standalone: true })
export class AppearancePipe implements PipeTransform {
  transform(value: string, obj: Record<string, string>) {
    return obj[value];
  }
}
