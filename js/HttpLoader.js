import Tickets from "./Tickets/Tickets.js";

export default class HttpLoader {
  constructor() {
    this._observers = [];
    this.searchId = "";
    this.tickets = new Tickets();
    this.stopLoading = false;
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
  customSuccessPromise() {
    if (!this.searchId) {
      this.getSearchId();
      return;
    }
    if (!this.stopLoading) {
      this.loadTickets();
    }
    this.notify();
  }
  getSearchId() {
    const th = this;
    const jqxhr = $.get("https://front-test.beta.aviasales.ru/search");
    jqxhr.done(function (data) {
      th.searchId = data.searchId;
      th.customSuccessPromise();
    });
    jqxhr.fail(function () {
      setTimeout(function () {
        th.getSearchId();
      }, 500);
    });
  }
  loadTickets() {
    const th = this;
    const jqxhr = $.get("https://front-test.beta.aviasales.ru/tickets", {
      searchId: this.searchId
    });
    jqxhr.done(function (data) {
      data.tickets.forEach((ticket) => {
        ticket["total_duration"] =
          ticket.segments[0].duration + ticket.segments[1].duration;
        ticket["optimal_variable"] = ticket["total_duration"] * ticket.price;
        ticket["total_stops"] =
          ticket.segments[0].stops.length + ticket.segments[1].stops.length;
      });
      th.tickets.addTickets(data.tickets);
      th.stopLoading = data.stop;
      th.customSuccessPromise();
    });
    jqxhr.fail(function () {
      setTimeout(function () {
        th.loadTickets();
      }, 500);
    });
  }
}
