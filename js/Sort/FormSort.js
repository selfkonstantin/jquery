import Tickets from "../Tickets/Tickets.js";

export default class FormSort {
  constructor() {
    this._observers = [];
    this.sort = "price";
  }
  addObserver(observer) {
    this._observers.push(observer);
  }
  removeObserver(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }

  notify(type, value) {
    if (type === "sort") {
      this.sort = value;
      this.sortingTickets();
      this._observers.forEach((observer) => {
        observer.update();
      });
    }
  }
  update() {
    this.sortingTickets();
    this._observers.forEach((observer) => {
      observer.update();
    });
  }

  sortingTickets() {
    const tickets = new Tickets().getDisplayTickets();
    switch (this.sort) {
      case "price":
        return tickets.sort((a, b) => a["price"] - b["price"]);
      case "duration":
        return tickets.sort(
          (a, b) => a["total_duration"] - b["total_duration"]
        );
      case "optimal":
        return tickets.sort(
          (a, b) => a["optimal_variable"] - b["optimal_variable"]
        );
      default:
        return tickets;
    }
  }
}
