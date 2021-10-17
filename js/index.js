import App from "./App.js";

import HttpLoader from "./HttpLoader.js";

import Tickets from "./Tickets/Tickets.js";
import RenderTickets from "./Tickets/RenderTickets.js";

import FormFilter from "./Filter/FormFilter.js";
import FilterTransfer from "./Filter/Transfer/FilterTransfer.js";
import FormSort from "./Sort/FormSort.js";

$("document").ready(function () {
  const httpLoader = new HttpLoader();
  const renderTickets = new RenderTickets("#content");

  const app = new App(renderTickets, httpLoader);

  const formFilter = new FormFilter();
  const filterTransfer = new FilterTransfer();

  const formSort = new FormSort();

  const tickets = new Tickets();

  tickets.sorting = formSort;

  httpLoader.addObserver(formFilter);

  formFilter.addObserver(filterTransfer);

  filterTransfer.addObserver(app);
  formSort.addObserver(app);

  app.init();

  $("#filter").delegate("input", "click", (e) => {
    formFilter.notify(e.target.dataset.type, e.target.name, e.target.checked);
  });

  $("#sort").delegate("input", "click", (e) => {
    formSort.notify(e.target.name, e.target.value, e.target.checked);
  });

  Object.keys(filterTransfer.transfer).forEach((transfer) => {
    $(`#${transfer}`).prop("checked", filterTransfer.transfer[transfer]);
  });
});
