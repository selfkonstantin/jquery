import FilteredTransferTickets from "./FilteredTransferTickets.js";
import Tickets from "../../Tickets/Tickets.js";

export default class FilterTransfer {
  constructor() {
    this._observers = [];
    this.transfer = {
      transfer_all: false,
      transfer_0: false,
      transfer_1: true,
      transfer_2: true,
      transfer_3: false
    };
  }
  updateState(type, value, state) {
    if (type === "transfer") {
      this.transfer[value] = state;
      this.filterTickets();
      this.notify();
    }
  }
  update() {
    this.filterTickets();
    this.notify();
  }
  filterTickets() {
    const filteredTickets = new FilteredTransferTickets(this.transfer).do();
    new Tickets().addDisplayTickets([...filteredTickets]);
  }
  addObserver(observer) {
    this._observers.push(observer);
  }
  removeObserver(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }
  notify() {
    this._observers.forEach((observer) => {
      observer.update();
    });
  }
}
