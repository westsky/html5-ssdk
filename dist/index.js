var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _SERVICE = "SSDK";
var _RefObject = (function () {
    function _RefObject() {
    }
    _RefObject.prototype.destroy = function () {
        var B = window.plus.bridge;
        var uuid = this.uuid;
        var xs = this.xs;
        B.execSync(_SERVICE, "destroy", [xs, uuid]);
    };
    return _RefObject;
}());
var _WebClient = (function (_super) {
    __extends(_WebClient, _super);
    function _WebClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _WebClient.prototype.onStatechanged = function (stateCB) {
        var B = window.plus.bridge;
        var uuid = this.uuid;
        var xs = this.xs;
        var _stateCB = typeof stateCB !== "function"
            ? null
            : function (state) {
                stateCB(state);
            };
        var callbackID = B.callbackId(_stateCB);
        B.exec(_SERVICE, "onStatechanged", [callbackID, xs, uuid]);
    };
    _WebClient.prototype.onProgressChanged = function (progressCB) {
        var B = window.plus.bridge;
        var uuid = this.uuid;
        var xs = this.xs;
        var _progressCB = typeof progressCB !== "function"
            ? null
            : function (progress) {
                progressCB(progress);
            };
        var callbackID = B.callbackId(_progressCB);
        B.exec(_SERVICE, "onProgressChanged", [callbackID, xs, uuid]);
    };
    _WebClient.prototype.post = function (url, message, successCB, errorCB) {
        var B = window.plus.bridge;
        var uuid = this.uuid;
        var xs = this.xs;
        var success = typeof successCB !== "function"
            ? null
            : function (result) {
                successCB(result);
            };
        var fail = typeof errorCB !== "function"
            ? null
            : function (error) {
                errorCB(error);
            };
        var callbackID = B.callbackId(success, fail);
        return B.exec(_SERVICE, "post", [callbackID, xs, uuid, url, message]);
    };
    _WebClient.prototype.uploadFile = function (url, message, successCB, errorCB) {
        var B = window.plus.bridge;
        var uuid = this.uuid;
        var xs = this.xs;
        var success = typeof successCB !== "function"
            ? null
            : function (result) {
                successCB(result);
            };
        var fail = typeof errorCB !== "function"
            ? null
            : function (error) {
                errorCB(error);
            };
        var callbackID = B.callbackId(success, fail);
        return B.exec(_SERVICE, "uploadFile", [callbackID, xs, uuid, url, message]);
    };
    _WebClient.prototype.downloadFile = function (url, message, fullFileName, successCB, errorCB) {
        var B = window.plus.bridge;
        var uuid = this.uuid;
        var xs = this.xs;
        var success = typeof successCB !== "function"
            ? null
            : function (result) {
                successCB(result);
            };
        var fail = typeof errorCB !== "function"
            ? null
            : function (error) {
                errorCB(error);
            };
        var callbackID = B.callbackId(success, fail);
        return B.exec(_SERVICE, "downloadFile", [
            callbackID,
            xs,
            uuid,
            url,
            message
        ]);
    };
    return _WebClient;
}(_RefObject));
var _SSDK = (function () {
    function _SSDK() {
    }
    _SSDK.prototype.hello = function (args) {
        var B = window.plus.bridge;
        var callbackID = B.callbackId(null, null);
        return B.exec(_SERVICE, "hello", [callbackID, args]);
    };
    _SSDK.prototype.captureImage = function (cameraParam, successCB, errorCB) {
        var B = window.plus.bridge;
        var _successCB = typeof successCB !== "function"
            ? null
            : function (path) {
                successCB(path);
            };
        var _failCB = typeof errorCB !== "function"
            ? null
            : function (error) {
                errorCB(error);
            };
        var callbackID = B.callbackId(_successCB, _failCB);
        return B.exec(_SERVICE, "captureImage", [callbackID, cameraParam]);
    };
    _SSDK.prototype.captureVideo = function (cameraParam, successCB, errorCB) {
        var B = window.plus.bridge;
        var _successCB = typeof successCB !== "function"
            ? null
            : function (path) {
                successCB(path);
            };
        var _failCB = typeof errorCB !== "function"
            ? null
            : function (error) {
                errorCB(error);
            };
        var callbackID = B.callbackId(_successCB, _failCB);
        return B.exec(_SERVICE, "captureVideo", [callbackID, cameraParam]);
    };
    _SSDK.prototype.httpPost = function (url, message, successCB, errorCB, options) {
        var B = window.plus.bridge;
        var _successCB = typeof successCB !== "function"
            ? null
            : function (result) {
                successCB(result);
            };
        var _failCB = typeof errorCB !== "function"
            ? null
            : function (error) {
                errorCB(error);
            };
        var callbackID = B.callbackId(_successCB, _failCB);
        return B.exec(_SERVICE, "httpPost", [callbackID, url, message, options]);
    };
    _SSDK.prototype.createRef = function (clazz, xs, args) {
        var B = window.plus.bridge;
        var T = window.plus.tools;
        var uuid = T.UUID("ssdk");
        var ret = B.execSync(_SERVICE, "createRef", [
            clazz,
            uuid,
            xs,
            args
        ]);
        var wc = new _WebClient();
        wc.uuid = uuid;
        wc.xs = xs;
        wc.blocksize = ret.blocksize;
        wc.method = ret.method;
        wc.priority = ret.priority;
        wc.readTimeout = ret.readTimeout;
        wc.timeout = ret.timeout;
        return wc;
    };
    _SSDK.prototype.releaseRef = function (obj) {
        var B = window.plus.bridge;
        B.execSync(_SERVICE, "releaseRef", [obj]);
    };
    _SSDK.prototype.getRef = function (xs, uuid) {
        var B = window.plus.bridge;
        var ret = B.execSync(_SERVICE, "getObject", [xs, uuid]);
        if (ret) {
            var wc = new _WebClient();
            wc.uuid = uuid;
            wc.xs = xs;
            wc.blocksize = ret.blocksize;
            wc.method = ret.method;
            wc.priority = ret.priority;
            wc.readTimeout = ret.readTimeout;
            wc.timeout = ret.timeout;
            return wc;
        }
        return null;
    };
    _SSDK.prototype.getAllRef = function (xs, resultsCB) {
        var B = window.plus.bridge;
        var fuResultCB = typeof resultsCB !== "function"
            ? null
            : function (results) {
                resultsCB(results);
            };
        var callbackID = B.callbackId(fuResultCB);
        B.exec(_SERVICE, "getAllRef", [callbackID, xs]);
    };
    return _SSDK;
}());
document.addEventListener("plusready", function () {
    var ssdk = new _SSDK();
    window.plus.ssdk = ssdk;
}, true);
