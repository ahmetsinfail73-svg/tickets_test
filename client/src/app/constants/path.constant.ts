export class Path {
  static readonly HOME = '/tickets';

  static readonly CREATE_TICKET = '/tickets/create';

  static TICKET(id: number) {
    return `/tickets/${id}`;
  }
}
