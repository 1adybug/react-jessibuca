# React Jessibuca

## 介绍

基于 [Jessibuca](https://github.com/langhuihui/jessibuca) 封装的 react 播放组件

## 使用说明（必看）

1. 安装 `react-jessibuca`

    ```shell
    npm i react-jessibuca
    ```

2. 打开项目目录中的 `node_modules/react-jessibuca/static` 文件夹，或者[最新发布的版本](https://github.com/langhuihui/jessibuca/releases)
3. 将 `decorder.js` 和 `decorder.wasm` 复制到你的静态资源中，两者必须处于同一目录
4. 稍后将 `decorderUrl` 设置为你的 `decorder.js` 路径地址
5. 引入组件并使用

    ```typescript
    import Player from "react-jessibuca"

    <Player width={400} height={300} url="http://xxx.xxx/xxx" decorderUrl="http://xxx.xxx/decorder.js" />
    ```
