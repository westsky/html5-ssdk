/**
 * Typescript 声明文件
 * @author westsky
 * @description Html 5+ 是SSDK的库的声明文件
 * <p>
 *    注意：
 *    1）使用时需要引用ssdk.js文件。
 *    2）android:必须使用原生编译，需要引用ssdk.aar库。
 *    3) Ios：必须使用原生编译（暂时支持XCODE)。需要引用SSDK.Framework库。
 * </p>
 */
/// <reference path="../node_modules/html5-plus/types/plus.camera.d.ts" />

declare namespace plus.ssdk {
  /**
   * 初始化
   * @param 配置
   */
  function init(config?: ApiConfig): void;
  /**
   * 反初始化，重置
   */
  function unInit(): void;

  /**
   * 获得config信息
   */
  function getConfig(): ApiConfig;

  /**
   * 调试使用的
   * @param s
   */
  function hello(args?: string): void;

  //--------------------------------------------
  //兼容：给文件做MD5加密，原生的，比较快。
  function md5File(path: string): string;

  //--------------------------------------------
  /**
   * 拍摄图像：支持水印
   * @param cameraParam
   * @param successCB
   * @param errorCB
   */
  function captureImage(
    cameraParam: CameraParam,
    successCB?: plus.camera.CameraSuccessCallback,
    errorCB?: plus.camera.CameraErrorCallback
  ): void;

  /**
   * 拍摄视频：支持水印
   * @param cameraParam
   * @param successCB
   * @param errorCB
   */
  function captureVideo(
    cameraParam: CameraParam,
    successCB?: plus.camera.CameraSuccessCallback,
    errorCB?: plus.camera.CameraErrorCallback
  ): void;

  //-------------------------------------------
  /**
   * 异步HTTPPOST请求
   * @param url
   * @param message
   * @param successCB
   * @param errorCB
   * @param options 构造传输参数的可配置项目
   */
  function httpPost(
    url: string,
    message: ProtocolMessage,
    successCB?: WebClientSuccessCallback,
    errorCB?: WebClientErrorCallback,
    options?: WebOptions
  ): void;
  //---------------------------------------
  /**
   * 构建引用对象计数
   * @param clazz
   * @param xs  名称空间，可以将对象进行分组。
   * @param args
   */
  function createRef<T extends RefObject>(
    clazz: string,
    xs?: string,
    args?: any
  ): T;

  /**
   * 释放管理计数，释放后，JS对象不能再使用
   * @param obj
   */
  function releaseRef<T extends RefObject>(obj: T): void;

  /**
   * 获得对象的引用JS句柄，如果对象为空。
   * @param xs
   * @param uuid
   */
  function getRef<T extends RefObject>(uuid: string): T;

  /**
   * 列举所有引用计数
   * @param xs
   */
  function getAllRef<T extends RefObject>(
    xs?: string,
    resultsCB?: ResultsCallback<T>
  ): void;

  /**
   * 清空所有引用计数
   * @param xs
   */
  function clearAllRef(xs?: string): string;

  //--------------------------------------------
  interface ApiConfig {
    readonly version: string;
    readonly description: string;

    apiKey: string;
    apiSecret: string;
    debug: boolean;
  }

  //-----------------------------------------------------------------------------------------
  interface CameraParam {
    /**
     * 缓存的文件路径
     * 图像文件：/path/IMG201811231321.jpg
     * 视频文件：/path/VID201811212313.mp4
     */
    path?: string;
    //文件的格式，暂时不需要设置
    format?: string;
    /**水印对象，为空标识不适用此水印 */
    watermark?: Watermark;
    /**相机的分辨率 */
    resolution?: Size;
    /**是否使用手电筒 */
    useLight?: boolean;
    /**是否闪光灯 */
    useFlash?: boolean;
    /**是否支持切换镜头 */
    useSwitchCam?: boolean;
    /**拍摄视频是否支持静音录制 */
    useMuted?: boolean;
    /**是否支持暂停录制 */
    useSuspendRec?: boolean;
    //是否使用GPU
    useOpengl?: boolean;
    //是否允许重拍：
    useRetake?: boolean;

    /**默认的打开镜头Id，默认为0,前置镜头 */
    cameraId?: number;
    /**录制的最长时间 */
    maxTime?: number;
    /**录制的最短时间 */
    minTime?: number;
  }

  /**
   * 水印定义
   */
  interface Watermark extends Layout {
    //水印的文字，使用"\n"支持换行
    text?: string;
    //水印的文字大小,默认24
    textSize?: number;
    //水印文字的布局，默认是left
    textAlign?: string;
    //水印的文字颜色：默认红色"#FF0000";
    textColor?: string;
  }

  /**
   * 布局参数
   */
  interface Layout {
    /**
     * 布局方式：支持绝对布局和相对布局。
     * absolute或者relative
     */
    position?: string;
    //相对布局：尺寸定义的取值为Paddiing;
    margin?: string;
    //相对布局的对其方式：默认是leftTop；左上角
    alignment?: string;

    //绝对布局的X,Y坐标
    x?: number;
    y?: number;
    //当前尺寸,W-H
    width?: number;
    height?: number;
    //旋转变换：暂时不支持
    angle?: number;
    //缩放变换：展示不支持
    scale?: number;
    //不透明度颜色变换：暂时不支持
    opacity?: number;
  }

  /**
   * 布局填充
   */
  interface Padding {
    all?: number;
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  }

  /**
   * 尺寸
   */
  interface Size {
    width: number;
    height: number;
  }

  //-----------------------------------
  /**
   * WebClient初始化参数
   */
  interface WebOptions {
    method?: string;
    blocksize?: number;
    priority?: number;
    timeout?: number;
    readTimeout?: number;
    retryCount?: number;
    retryInterval?: number;
  }

  /**
   * 协议的键值对
   */
  interface ProtocolHeader {
    //----------------------
    /**
     * 登录令牌，由登录派发，至少17位。
     * 注意：不能为空，
     */
    token: string;
    /**
     * SSDK的令牌，由后台统一颁发的固定值
     */
    apiKey: string;
    /**
     * 请求的ACTION
     */
    action: string;
    /**
     * 绑定ID，程序的绑定空间名，例如：com.xxx.。
     * 作为客户端的标记。
     */
    client: string;

    /**
     * 传输的等级。字符串： (None,Low,Medium,High,Special)五个等级。
     */
    level?: string;
    /**
     * //字符集，默认UTF-8，可以不配置值
     */
    charset?: string;

    /**
     * 是否使用multi-part进行发送
     */
    multipart?: boolean;
  }

  /**
   * 协议报文
   */
  interface ProtocolMessage extends ProtocolHeader {
    /**
     * 自定义的头集合，暂时不支持
     */
    headers?: Array<KeyValuePair>;
    /**
     * 表单参数。可以请求的表单的键值对，支持MULTI-FORM包含文件。
     */
    params?: Array<ProtocolParam>;
  }

  /**
   * 协议表单参数
   */
  interface ProtocolParam {
    name?: string; //协议表单参数的NAME,默认initParam
    value?: string; //传输的原始字符串值。
    fileName?: string; //传输带文件，可以指定的mimeType，暂时不支持。
    fullfileName?: string; //传输文件的文件的完整路径。
  }

  interface RefObject {
    uuid: string; //对象的唯一ID
    xs: string; //对象ID的名称空间，用于分组
    destroy(); //释放对象资源
  }

  interface WebClient extends RefObject {
    readonly method?: string; //请求的方法，暂时只支持POST
    readonly blocksize?: number; //上传的或者下载的分包大小，默认200BYTE
    readonly priority?: number; //调用的优先级，暂时不需要
    readonly timeout?: number; // 连接的超时时间，默认0，不限制。
    readonly readTimeout?: number; //传输流的超时时间，默认0，不限制
    readonly retryCount?: number; //传输的重试最大次数
    readonly retryInterval?: number; //重试的时间间隔。
    /**
     * 传输状态的改变监听
     * @param stateCB
     */
    onStatechanged(stateCB: WebClientStateChangedCallback): void;
    /**
     * 传输的进度监听
     * @param progressCB
     */
    onProgressChanged(progressCB: WebClientProgressCallback): void;

    /**
     * 提交请求
     * @param url
     * @param message
     * @param successCB
     * @param errorCB
     */
    post(
      url: string,
      message: ProtocolMessage,
      successCB?: WebClientSuccessCallback,
      errorCB?: WebClientErrorCallback
    );
    /**
     * 上传文件，暂时不支持，使用POST替代。
     * @param url
     * @param message
     * @param successCB
     * @param errorCB
     */
    uploadFile(
      url: string,
      message: ProtocolMessage,
      successCB?: WebClientSuccessCallback,
      errorCB?: WebClientErrorCallback
    );
    /**
     * 下载文件
     * @param url
     * @param message
     * @param fullFileName
     * @param successCB
     * @param errorCB
     */
    downloadFile(
      url: string,
      message: ProtocolMessage,
      fullFileName: string,
      successCB?: WebClientSuccessCallback,
      errorCB?: WebClientErrorCallback
    );
    /**
     * 强制终止
     */
    abort();
  }
}

interface SuccessCallback {
  (): void;
}

interface ErrorCallback {
  (error?: DOMException | any): void | any; //匿名方法委托
}

interface KeyValuePair {
  name: string;
  value: string;
}

interface FileSuccessCallback {
  (file: string): void;
}

interface ResultsCallback<T> {
  (results: Array<T>);
}

interface WebClientSuccessCallback {
  (result: string): void;
}

interface WebClientErrorCallback {
  (error?: DOMException): void | any; //匿名方法委托
}

interface WebClientStateChangedCallback {
  (state: string): void;
}

interface WebClientProgressCallback {
  (progress: number): void;
}
