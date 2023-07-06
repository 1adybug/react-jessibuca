# React Jessibuca

## 介绍

基于 [Jessibuca](https://github.com/langhuihui/jessibuca) 封装的 react 播放组件

## 使用说明（必看）

1. 安装 `react-jessibuca`

    ```shell
    npm i react-jessibuca
    ```

2. 打开项目目录中的 `node_modules/react-jessibuca/static` 文件夹，或者在[最新发布的版本](https://github.com/langhuihui/jessibuca/releases)中下载 `dist.zip`，并解压
3. 将 `decoder.js` 和 `decoder.wasm` 复制到你的静态资源中，两者必须处于同一目录
4. 稍后将 `decoder` 设置为你的 `decoder.js` 路径地址
5. 引入组件并使用

    ```typescript
    import JessibucaPlayer from "react-jessibuca"

    <JessibucaPlayer width={400} height={300} src="http://xxx.xxx/xxx" decoder="http://xxx.xxx/decoder.js" />
    ```

6. 或者全局设置 `decoder`

    ```typescript
    // 入口文件 index.ts
    import { setDecoder } from "react-jessibuca"

    setDecoder("http://xxx.xxx/decoder.js")
    ```

## 参数

```typescript
export interface PlayerEvent {
    onLoad?: () => void
    onTimeUpdate?: (ts: number) => void
    onVideoInfo?: (data: VideoInfo) => void
    onAudioInfo?: (data: AudioInfo) => void
    onLog?: (msg: any) => void
    onError?: (err: ERROR) => void
    onKBps?: (value: number) => void
    onStart?: () => void
    onTimeout?: (error: TIMEOUT) => void
    onLoadingTimeout?: () => void
    onDelayTimeout?: () => void
    onFullscreen?: (fullscreen: boolean) => void
    onPlay?: () => void
    onPause?: () => void
    onMute?: (mute: boolean) => void
    onStats?: (stats: Stats) => void
    onPerformance?: (performance: 0 | 1 | 2) => void
    onRecordStart?: () => void
    onRecordEnd?: () => void
    onRecord?: (data: any) => void
    onRecordingTimestamp?: (timestamp: number) => void
    onPlayToRenderTimes?: (times: PlayToRenderTimes) => void
}

export interface ControlOptions {
    /** 是否显示全屏按钮 */
    fullscreen?: boolean
    /** 是否显示截图按钮 */
    screenshot?: boolean
    /** 是否显示播放暂停按钮 */
    play?: boolean
    /** 是否显示声音按钮 */
    audio?: boolean
    /** 是否显示录制按 */
    record?: boolean
}

export interface PlayerProps extends PlayerEvent {
    className?: string
    style?: CSSProperties
    /** 视频宽度 */
    width?: number

    /** 视频高度 */
    height?: number

    /** 视频地址 */
    src: string

    /** 播放器配置 */
    config?: PlayerConfig

    /** 是否开启调试 */
    debug?: boolean

    /** 是否静音，建议同时使用 onMute 事件来监听更改 */
    mute?: boolean

    /** 视频填充模式 */
    objectFit?: "fill" | "contain" | "cover"

    /** 是否全屏，建议同时使用 onFullscreen 事件来监听更改 */
    fullscreen?: boolean

    /** 解码器 decoder.js 地址 */
    decoder?: string

    /** 加载文字 */
    loadingText?: string

    /** 解码模式，详见 https://jessibuca.com/document.html#usemse */
    decodeMode?: "useMSE" | "useWCS" | "wasm"

    /** 当前超过并发限制时，回调 */
    onExceed?: (concurrency: number) => void

    /** 是否开启控制栏 */
    controls?: boolean | ControlOptions

    /** 音量大小 */
    volume?: number
}
```
