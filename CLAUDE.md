# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Chrome 新标签页扩展，使用动物森友会风格 UI（animal-island-ui）覆盖浏览器默认新标签页。

## 常用命令

- `npm run dev` — 启动 Vite 开发服务器
- `npm run build` — TypeScript 类型检查 + Vite 构建，输出到 `dist/`
- `npm run preview` — 预览构建产物

## 技术栈

- React 18 + TypeScript（strict 模式，noUnusedLocals/noUnusedParameters 开启）
- Vite 6 构建，入口为 `index.html`
- animal-island-ui 组件库 + 全局样式（通过 `import 'animal-island-ui/style'`）
- Chrome Extension Manifest V3，`chrome_url_overrides.newtab` 替换新标签页

## 项目结构

- `src/App.tsx` — 根组件（当前为空壳）
- `src/main.tsx` — 入口，挂载 React 并引入 animal-island-ui 全局样式
- `public/manifest.json` — Chrome 扩展清单
- `dist/` — 构建产物，直接作为扩展加载

## 构建注意事项

构建产物即为可加载的 Chrome 扩展目录。`manifest.json` 中引用了 `assets/icon.png`，需确保构建后该资源存在于 `dist/assets/` 下。
