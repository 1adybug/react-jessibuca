"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConcurrency = exports.setDecoder = exports.ERROR = exports.TIMEOUT = void 0;
const react_1 = __importStar(require("react"));
require("../jessibuca.js");
/** 超时信息 */
var TIMEOUT;
(function (TIMEOUT) {
    /** 当play()的时候，如果没有数据返回 */
    TIMEOUT["loadingTimeout"] = "loadingTimeout";
    /** 当播放过程中，如果超过timeout之后没有数据渲染 */
    TIMEOUT["delayTimeout"] = "delayTimeout";
})(TIMEOUT = exports.TIMEOUT || (exports.TIMEOUT = {}));
/** 错误信息 */
var ERROR;
(function (ERROR) {
    /** 播放错误，url 为空的时候，调用 play 方法 */
    ERROR["playError"] = "playError";
    /** http 请求失败 */
    ERROR["fetchError"] = "fetchError";
    /** websocket 请求失败 */
    ERROR["websocketError"] = "websocketError";
    /** webcodecs 解码 h265 失败 */
    ERROR["webcodecsH265NotSupport"] = "webcodecsH265NotSupport";
    /** mediaSource 解码 h265 失败 */
    ERROR["mediaSourceH265NotSupport"] = "mediaSourceH265NotSupport";
    /** wasm 解码失败 */
    ERROR["wasmDecodeError"] = "wasmDecodeError";
})(ERROR = exports.ERROR || (exports.ERROR = {}));
let defaultDecoder = "";
let concurrency = 9999;
let total = 0;
function setDecoder(decoder) {
    defaultDecoder = decoder;
}
exports.setDecoder = setDecoder;
function setConcurrency(limit) {
    concurrency = limit;
}
exports.setConcurrency = setConcurrency;
const JessibucaPlayer = (0, react_1.forwardRef)((props, ref) => {
    const { width, height, src, config, debug, mute, objectFit, className, decoder = defaultDecoder, onExceed, decodeMode, fullscreen, loadingText, controls, volume } = props;
    if (typeof decoder !== "string") {
        console.warn("检测到你没有输入解码器的 decoder，请按以下步骤操作");
        console.warn("1. 打开项目目录中的 node_modules/react-jessibuca/static 文件夹");
        console.warn("2. 将 decoder.js 和 decoder.wasm 复制到你的静态资源中，两者必须处于同一目录");
        console.warn("3. 将组件中的 decoder 参数设置为你的 decoder.js 路径地址，或者在全局组件中引入并设置 `import { setDecoder } from \"react-jessibuca\"; setDecoder(\"http://xxx.xxx/decoder.js\");`");
        throw new Error("解码器错误");
    }
    const style = props.style || {};
    const container = (0, react_1.useRef)(null);
    const jessibucaRef = (0, react_1.useRef)(null);
    const [exceeded, setExceeded] = (0, react_1.useState)(false);
    const [color, setColor] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (total < concurrency) {
            total++;
            jessibucaRef.current = new Jessibuca(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ container: container.current }, config), { decoder }), (decodeMode === "useMSE" ? { useMSE: true } : decodeMode === "useWCS" ? { useWCS: true } : {})), { loadingText }), (controls === undefined ? {} : typeof controls === "boolean" ? { operateBtns: { fullscreen: controls, screenshot: controls, play: controls, audio: controls, record: controls } } : { operateBtns: controls })));
            return () => {
                var _a;
                total--;
                (_a = jessibucaRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
                if (ref) {
                    if (typeof ref === "function") {
                        ref(null);
                    }
                    else {
                        ref.current = null;
                    }
                }
            };
        }
        else {
            console.warn("超出并发限制");
            const color = `#${getComputedStyle(container.current)
                .backgroundColor.match(/rgba?\((.+?)\)/)[1]
                .split(",")
                .map(it => (255 - Number(it)).toString(16).padStart(2, "0"))
                .join("")}`;
            onExceed === null || onExceed === void 0 ? void 0 : onExceed(concurrency);
            setExceeded(true);
            setColor(color);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (ref) {
            if (typeof ref === "function") {
                ref(jessibucaRef.current);
            }
            else {
                ref.current = jessibucaRef.current;
            }
        }
        for (const event in props) {
            if (event.startsWith("on") && jessibucaRef.current) {
                ;
                jessibucaRef.current[event] = props[event];
            }
        }
    });
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = jessibucaRef.current) === null || _a === void 0 ? void 0 : _a.play(src);
    }, [src]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (volume === undefined)
            return;
        if ((volume === 0 || volume > 0) && (volume === 1 || volume < 1)) {
            (_a = jessibucaRef.current) === null || _a === void 0 ? void 0 : _a.setVolume(volume);
        }
        else {
            console.warn(`${volume} 不在 0-1 区间内`);
        }
    }, [volume]);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = jessibucaRef.current) === null || _a === void 0 ? void 0 : _a.setDebug(!!debug);
    }, [debug]);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (mute === true) {
            (_a = jessibucaRef.current) === null || _a === void 0 ? void 0 : _a.mute();
            return;
        }
        (_b = jessibucaRef.current) === null || _b === void 0 ? void 0 : _b.cancelMute();
    }, [mute]);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d;
        switch (objectFit) {
            case "fill":
                (_a = jessibucaRef.current) === null || _a === void 0 ? void 0 : _a.setScaleMode(0);
                return;
            case "contain":
                (_b = jessibucaRef.current) === null || _b === void 0 ? void 0 : _b.setScaleMode(1);
                return;
            case "cover":
                (_c = jessibucaRef.current) === null || _c === void 0 ? void 0 : _c.setScaleMode(2);
                return;
            default:
                (_d = jessibucaRef.current) === null || _d === void 0 ? void 0 : _d.setScaleMode(1);
                return;
        }
    }, [objectFit]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (fullscreen !== undefined) {
            (_a = jessibucaRef.current) === null || _a === void 0 ? void 0 : _a.setFullscreen(!!fullscreen);
        }
    }, [fullscreen]);
    if (width) {
        style.width = `${width}px`;
    }
    if (height) {
        style.height = `${height}px`;
    }
    return (react_1.default.createElement("div", { ref: container, className: className, style: style }, exceeded && react_1.default.createElement("div", { style: { color } }, "\u8D85\u51FA\u5E76\u53D1\u9650\u5236")));
});
exports.default = JessibucaPlayer;
//# sourceMappingURL=index.js.map