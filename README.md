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
    import { setDefaultDecoder } from "react-jessibuca"

    setDefaultDecoder("http://xxx.xxx/decoder.js")

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
    onFullscreen?: (data: any) => void
    onPlay?: () => void
    onPause?: () => void
    onMute?: (data: any) => void
    onStats?: (stats: Stats) => void
    onPerformance?: (performance: 0 | 1 | 2) => void
    onRecordStart?: () => void
    onRecordEnd?: () => void
    onRecord?: (data: any) => void
    onRecordingTimestamp?: (timestamp: number) => void
    onPlayToRenderTimes?: (times: PlayToRenderTimes) => void
}

export interface PlayerProps extends PlayerEvent {
    className?: string
    style?: CSSProperties
    /** @description 视频宽度 */
    width?: number

    /** @description 视频高度 */
    height?: number

    /** @description 视频地址 */
    url: string

    /** @description 播放器配置 */
    config?: PlayerConfig

    /** @description 是否开启调试 */
    debug?: boolean

    /** @description 是否静音 */
    mute?: boolean

    /** @description 视频填充模式 */
    objectFit?: "fill" | "contain" | "cover"

    /** @description 是否全屏 */
    fullscreen?: boolean

    /** @description 解码器 decoder.js 地址 */
    decoderUrl: string
}
```
