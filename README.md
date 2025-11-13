# Delta Emulator UI Designer

This is a web-based editor/designer for [Delta emulator](https://github.com/rileytestut/Delta) skins, built with [Next.js](https://nextjs.org/). It is capable of directly loading/exporting .deltaskin files, as well as loading the info.json and assets separately which can be useful in developing and packaging a skin. Additionally, thank you to noah978 and others for [documentation on the skin making process](https://noah978.gitbook.io/delta-docs/skins).

An instance is [available for use here](https://pseudo.tokyo/deltaemu).

The editor supports touchscreen devices, but it is generally recommended to use a mouse or pen. Additionally, larger screens, such as a desktop or tablet, will be more convenient to work on. There is also some screen reader/ARIA support, full keyboard navigation and common keyboard shortcuts. Check the menu under Help -> Controls for more information.

## Major Dependencies

-   [PDF.js](https://mozilla.github.io/pdf.js/) to render PDFs to images
-   [ZIP.js](https://gildas-lormeau.github.io/zip.js/) to zip/unzip skin files
-   [SVG Repo](https://www.svgrepo.com) for icons

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 局域网访问 / LAN Access

服务器默认配置为监听所有网络接口（`0.0.0.0`），同一局域网内的设备可以通过以下方式访问：

1. 查看本机 IP 地址：
   - **macOS/Linux**: 在终端运行 `ifconfig` 或 `ip addr`
   - **Windows**: 在命令提示符运行 `ipconfig`
   
2. 在局域网内的其他设备上访问：
   ```
   http://[你的IP地址]:3000
   
   例如：
   http://192.168.1.100:3000
   http://10.0.0.50:3000
   ```

**注意事项：**
- 确保防火墙允许端口 3000 的访问
- 本机和访问设备需要在同一局域网内
- IP 地址可能会变化，建议在路由器中设置静态 IP

## Known Issues

-   State will be lost when the page is reloaded.
-   Some input fields reformat the contents while still typing.
-   Background may not render exactly as in the app yet, but should be acceptable if using a resizable background, or correctly sized PNGs.
-   Touchscreen pan/zoom doesn't work correctly if the first touch is on an element instead of the background.
