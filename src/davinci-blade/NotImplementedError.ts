function NotImplementedError(message: string) {
  this.name = 'NotImplementedError';
  this.message = (message || "")
}
NotImplementedError.prototype = new Error();

export = NotImplementedError;
