define(["require", "exports"], function (require, exports) {
    function NotImplementedError(message) {
        this.name = 'NotImplementedError';
        this.message = (message || "");
    }
    NotImplementedError.prototype = new Error();
    return NotImplementedError;
});
