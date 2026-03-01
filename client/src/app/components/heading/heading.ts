import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [],
  templateUrl: './heading.html',
  styleUrl: './heading.css',
})
export class Heading {
  @Input() title: string = '';

  @Input() description?: string = '';
}
