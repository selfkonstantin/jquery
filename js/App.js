export default class App {
  constructor(render, httpLoader) {
    this.render = render;
    this.httpLoader = httpLoader;
  }
  throttle(callback, timeout, context) {
    clearTimeout(callback.timeout);
    callback.timeout = setTimeout(function () {
      callback.call(context);
    }, timeout);
  }
  init() {
    this.httpLoader.customSuccessPromise();
  }
  update() {
    this.throttle(this.render.update, 100, this.render);
  }
}
