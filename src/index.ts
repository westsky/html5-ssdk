/// <reference path="../node_modules/html5-plus/types/plus.bridge.d.ts" />
/// <reference path="../types/index.d.ts" />
/**
 * 这是SSDK-Impl的JS实现类
 * @author westsky
 * @description Html 5+ 是SSDK的库的声明文件
 */

// function isfn(fun: any): boolean{
// 	return typeof fun !== 'function';
// }
let _SERVICE = "SSDK";
// let B = window.plus.bridge as plus.bridge;
// let T = window.plus.tools as plus.tools;

class _RefObject {
  uuid: string;
  xs: string;

  destroy(): void {
    let B = (<any>window).plus.bridge as plus.bridge;
    let uuid = this.uuid;
    let xs = this.xs;
    B.execSync(_SERVICE, "destroy", [xs, uuid]);
  }
}

class _WebClient extends _RefObject {
  method?: string;
  blocksize?: number;
  priority?: number;
  timeout?: number;
  readTimeout?: number;
  retryCount?: number;
  retryInterval?: number;

  onStatechanged(stateCB: WebClientStateChangedCallback): void {
    let B = (<any>window).plus.bridge as plus.bridge;
    let uuid = this.uuid;
    let xs = this.xs;

    var _stateCB =
      typeof stateCB !== "function"
        ? null
        : function(state) {
            stateCB(state);
          };
    let callbackID = B.callbackId(_stateCB);
    B.exec(_SERVICE, "onStatechanged", [callbackID, xs, uuid]);
  }

  onProgressChanged(progressCB: WebClientProgressCallback): void {
    let B = (<any>window).plus.bridge as plus.bridge;
    let uuid = this.uuid;
    let xs = this.xs;

    var _progressCB =
      typeof progressCB !== "function"
        ? null
        : function(progress: number) {
            progressCB(progress);
          };

    let callbackID = B.callbackId(_progressCB);
    B.exec(_SERVICE, "onProgressChanged", [callbackID, xs, uuid]);
  }

  post(
    url: string,
    message: plus.ssdk.ProtocolMessage,
    successCB?: WebClientSuccessCallback,
    errorCB?: WebClientErrorCallback
  ) {
    let B = (<any>window).plus.bridge as plus.bridge;
    let uuid = this.uuid;
    let xs = this.xs;

    var success =
      typeof successCB !== "function"
        ? null
        : function(result) {
            successCB(result);
          };
    var fail =
      typeof errorCB !== "function"
        ? null
        : function(error) {
            errorCB(error);
          };

    var callbackID = B.callbackId(success, fail);

    return B.exec(_SERVICE, "post", [callbackID, xs, uuid, url, message]);
  }

  uploadFile(
    url: string,
    message: plus.ssdk.ProtocolMessage,
    successCB?: WebClientSuccessCallback,
    errorCB?: WebClientErrorCallback
  ) {
    let B = (<any>window).plus.bridge as plus.bridge;
    let uuid = this.uuid;
    let xs = this.xs;

    var success =
      typeof successCB !== "function"
        ? null
        : function(result) {
            successCB(result);
          };
    var fail =
      typeof errorCB !== "function"
        ? null
        : function(error) {
            errorCB(error);
          };

    var callbackID = B.callbackId(success, fail);

    return B.exec(_SERVICE, "uploadFile", [callbackID, xs, uuid, url, message]);
  }

  downloadFile(
    url: string,
    message: plus.ssdk.ProtocolMessage,
    fullFileName: string,
    successCB?: WebClientSuccessCallback,
    errorCB?: WebClientErrorCallback
  ) {
    let B = (<any>window).plus.bridge as plus.bridge;
    let uuid = this.uuid;
    let xs = this.xs;

    var success =
      typeof successCB !== "function"
        ? null
        : function(result) {
            successCB(result);
          };
    var fail =
      typeof errorCB !== "function"
        ? null
        : function(error) {
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
  }
}

class _SSDK {
  /**
   * 调试参数
   * @param arg
   */
  hello(args: string) {
    let B = (<any>window).plus.bridge as plus.bridge;
    let callbackID = B.callbackId(null, null);
    return B.exec(_SERVICE, "hello", [callbackID, args]);
  }

  //---------------------------------------------------------------
  captureImage(
    cameraParam: plus.ssdk.CameraParam,
    successCB: plus.camera.CameraSuccessCallback,
    errorCB: plus.camera.CameraErrorCallback
  ) {
    let B = (<any>window).plus.bridge as plus.bridge;
    var _successCB =
      typeof successCB !== "function"
        ? null
        : function(path) {
            successCB(path);
          };
    var _failCB =
      typeof errorCB !== "function"
        ? null
        : function(error) {
            errorCB(error);
          };

    var callbackID = B.callbackId(_successCB, _failCB);

    return B.exec(_SERVICE, "captureImage", [callbackID, cameraParam]);
  }

  captureVideo(
    cameraParam: plus.ssdk.CameraParam,
    successCB: plus.camera.CameraSuccessCallback,
    errorCB: plus.camera.CameraErrorCallback
  ) {
    let B = (<any>window).plus.bridge as plus.bridge;
    var _successCB =
      typeof successCB !== "function"
        ? null
        : function(path) {
            successCB(path);
          };
    var _failCB =
      typeof errorCB !== "function"
        ? null
        : function(error) {
            errorCB(error);
          };
    var callbackID = B.callbackId(_successCB, _failCB);
    return B.exec(_SERVICE, "captureVideo", [callbackID, cameraParam]);
  }

  //------------------------------------------------------
  httpPost(
    url: string,
    message: plus.ssdk.ProtocolMessage,
    successCB?: WebClientSuccessCallback,
    errorCB?: WebClientErrorCallback,
    options?: plus.ssdk.WebOptions
  ) {
    let B = (<any>window).plus.bridge as plus.bridge;
    var _successCB =
      typeof successCB !== "function"
        ? null
        : function(result) {
            successCB(result);
          };
    var _failCB =
      typeof errorCB !== "function"
        ? null
        : function(error) {
            errorCB(error);
          };

    var callbackID = B.callbackId(_successCB, _failCB);
    return B.exec(_SERVICE, "httpPost", [callbackID, url, message, options]);
  }

  //------------------------------------------------------
  createRef<K extends plus.ssdk.RefObject>(
    clazz: string,
    xs?: string,
    args?: any
  ): _WebClient | any {
    let B = (<any>window).plus.bridge as plus.bridge;
    let T = (<any>window).plus.tools as plus.tools;
    let uuid = T.UUID("ssdk");
    let ret = B.execSync(_SERVICE, "createRef", [
      clazz,
      uuid,
      xs,
      args
    ]) as plus.ssdk.WebClient;
    let wc = new _WebClient();

    wc.uuid = uuid;
    wc.xs = xs;
    wc.blocksize = ret.blocksize;
    wc.method = ret.method;
    wc.priority = ret.priority;
    wc.readTimeout = ret.readTimeout;
    wc.timeout = ret.timeout;
    return wc;
  }

  releaseRef<K extends plus.ssdk.RefObject>(obj: K): void {
    let B = (<any>window).plus.bridge as plus.bridge;
    B.execSync(_SERVICE, "releaseRef", [obj]);
  }

  getRef<T extends plus.ssdk.RefObject>(xs: string, uuid: string): T | any {
    let B = (<any>window).plus.bridge as plus.bridge;
    let ret = B.execSync(_SERVICE, "getObject", [xs, uuid]);
    if (ret) {
      let wc = new _WebClient();
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
  }

  getAllRef<K extends plus.ssdk.RefObject>(
    xs: string,
    resultsCB?: ResultsCallback<K>
  ): void {
    let B = (<any>window).plus.bridge as plus.bridge;

    let fuResultCB =
      typeof resultsCB !== "function"
        ? null
        : function(results) {
            resultsCB(results);
          };

    let callbackID = B.callbackId(fuResultCB);
    B.exec(_SERVICE, "getAllRef", [callbackID, xs]);
  }
}

//-------------------------------------------------
document.addEventListener(
  "plusready",
  function() {
    // let _SERVICE = 'SSDK';
    // let B = window.plus.bridge as plus.bridge;
    // let T = window.plus.tools as plus.tools;
    let ssdk = new _SSDK();
    (<any>window).plus.ssdk = ssdk;
  },
  true
);
