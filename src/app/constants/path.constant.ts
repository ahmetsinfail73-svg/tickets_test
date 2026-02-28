export class Path {
  static readonly HOME = '/';

  static readonly CREATE_TICKET = '/create';

  static TICKET(id: number) {
    return `/tickets/${id}`;
  }
}
