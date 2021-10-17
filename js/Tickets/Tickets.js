export default class Tickets {
  constructor() {
    if (Tickets.exists) {
      return Tickets.instance;
    }
    Tickets.exists = true;
    Tickets.instance = this;
    this.tickets = [];
    this.displayTickets = [];
    this.sorting = null;
  }
  getTickets() {
    return this.tickets;
  }
  getDisplayTickets() {
    return this.displayTickets;
  }
  getRenderTickets() {
    return this.sorting.sortingTickets();
  }
  setDisplayTickets(tickets) {
    this.displayTickets = [...new Set([...tickets])];
  }
  addDisplayTickets(tickets) {
    this.displayTickets = [...new Set([...this.displayTickets, ...tickets])];
  }
  addTickets(tickets) {
    this.tickets = [...this.tickets, ...tickets];
  }
}
