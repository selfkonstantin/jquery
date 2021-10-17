import Tickets from "../../Tickets/Tickets.js";

export default class FilteredTransferTickets {
  constructor(transfer) {
    this.tickets = new Tickets().getTickets();
    this.transfer = transfer;
    this.transferEnum = {
      transfer_0: 0,
      transfer_1: 1,
      transfer_2: 2,
      transfer_3: 3
    };
    this.filteredTickets = [];
  }
  filteringTickets(transfer) {
    if (transfer === "transfer_all") {
      return this.tickets;
    }
    return this.tickets.filter((ticket) => {
      const ticketStops =
        ticket.segments[0].stops.length + ticket.segments[1].stops.length;
      const currentStops = this.transferEnum[transfer];
      return ticketStops === currentStops;
    });
  }
  do() {
    const selectedTransfer = Object.keys(this.transfer).filter(
      (t) => this.transfer[t]
    );

    selectedTransfer.forEach((transfer) => {
      this.filteredTickets = [
        ...new Set([
          ...this.filteredTickets,
          ...this.filteringTickets(transfer)
        ])
      ];
    });

    return this.filteredTickets;
  }
}
