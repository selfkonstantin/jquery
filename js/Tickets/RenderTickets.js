import Tickets from "./Tickets.js";

export default class RenderTickets {
  constructor(selector) {
    this.$el = document.querySelector(selector);
  }
  update() {
    const tickets = paginationTickets(new Tickets().getRenderTickets(), 5, 1);
    this.$el.innerHTML = "";
    tickets.forEach((ticket) => {
      this.$el.innerHTML += `
          <div class="card p-2 mb-2">
          <div>price: ${JSON.stringify(ticket.price)}</div>
          <div>carrier: ${JSON.stringify(ticket.carrier)}</div>
          <div>stops: ${JSON.stringify(ticket.total_stops)}</div>
          <div>total_duration: ${JSON.stringify(ticket.total_duration)}</div>
          <div>optimal_variable: ${JSON.stringify(
            ticket.optimal_variable
          )}</div>
        </div>
`;
    });
  }
}

function paginationTickets(tickets, limit, page) {
  return tickets.slice((page - 1) * limit, page * limit);
}
