import Tickets from "../Tickets/Tickets.js";

export default class FormFilter {
  constructor() {
    this._observers = [];
  }
  addObserver(observer) {
    this._observers.push(observer);
  }
  removeObserver(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
  }
  notify(type, value, state) {
    new Tickets().setDisplayTickets([]);
    this._observers.forEach((observer) => {
      observer.updateState(type, value, state);
    });
  }
  update() {
    this._observers.forEach((observer) => {
      observer.update();
    });
  }
}
