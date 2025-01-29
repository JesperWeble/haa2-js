export default class Page {
  _observers = [];

  run() {
    throw new Error('Page not implemented');
  }

  disconnect() {
    this._observers.forEach(o => o.disconnect());
  }
}