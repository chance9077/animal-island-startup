<p align="center">
  <img src="public/assets/animal_icon.png" width="100" alt="island-startup logo" />
</p>

<h1 align="center">island-startup</h1>

<p align="center">
  <strong>动物森友会风格的 Chrome 新标签页扩展</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61dafb?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646cff?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Manifest-V3-4285f4?logo=googlechrome" alt="Manifest V3" />
  <img src="https://img.shields.io/github/license/chance9077/animal-island-startup" alt="License" />
</p>

---

## Preview

**[Live Demo](https://chance9077.github.io/animal-island-startup/)**

<p align="center">
  <video src="https://raw.githubusercontent.com/chance9077/animal-island-startup/main/demo.mp4" controls width="600" />
</p>

## Features

- **多引擎搜索** — 内置 Google / GitHub / npm / skills，一键切换
- **前缀匹配** — 输入引擎名称前缀，`Tab` 切换，`Space` 确认
- **自定义引擎** — 拖拽排序、启用/禁用、自由添加删除
- **快捷键** — 按 `/` 随时聚焦搜索框
- **持久化配置** — 基于 `chrome.storage.local`，数据不丢失
- **动物森友会风格** — 圆润 UI、奶油配色、游戏按键立体感

## Credits

UI 基于 [animal-island-ui](https://guokaigdg.github.io/animal-island-ui/#/) — 一套动物森友会风格的 React 组件库。

## Tech Stack

| 层级 | 技术 |
|---|---|
| UI 组件 | [animal-island-ui](https://www.npmjs.com/package/animal-island-ui) |
| 状态管理 | Zustand + chrome.storage 持久化 |
| 拖拽排序 | @dnd-kit |
| 构建 | Vite 6 |
| 类型 | TypeScript (strict) |
| 扩展规范 | Chrome Extension Manifest V3 |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install

```bash
git clone git@github.com:chance9077/animal-island-startup.git
cd animal-island-startup
npm install
```

### Development

```bash
npm run dev
```

浏览器访问 `http://localhost:5173` 预览。

### Build

```bash
npm run build
```

### Load Extension

1. 打开 Chrome，进入 `chrome://extensions`
2. 开启右上角 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择项目根目录下的 `dist` 文件夹

## Usage

| 操作 | 说明 |
|---|---|
| 直接输入 + `Enter` | 使用当前引擎搜索 |
| 输入前缀 + `Tab` | 匹配并切换引擎 |
| `Space` | 确认候选引擎 |
| `/` | 聚焦搜索框 |
| 右上角齿轮 | 打开设置面板 |

## Project Structure

```
├── public/
│   ├── assets/          # 图标与背景图
│   └── manifest.json    # Chrome 扩展清单
├── src/
│   ├── components/      # SettingsIcon / SettingsPanel
│   ├── App.tsx          # 主界面
│   ├── App.css          # 全局样式
│   ├── store.ts         # Zustand 状态管理
│   ├── engines.ts       # 内置搜索引擎配置
│   ├── types.ts         # TypeScript 类型
│   └── main.tsx         # 入口
├── index.html
├── vite.config.ts
└── tsconfig.json
```

## License

MIT
