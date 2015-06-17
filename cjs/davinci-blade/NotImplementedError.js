function NotImplementedError(message) {
    this.name = 'NotImplementedError';
    this.message = (message || "");
}
NotImplementedError.prototype = new Error();
module.exports = NotImplementedError;
