---
title: 前端工程化配置（三）—— stylelint
author: hec9527
author_title: 前端切图工程师
author_url: https://github.com/hec9527
author_image_url: /img/avatar-circle.png
description: stylelint
keywords: [css]
tags: [css]
# draft: true
# image:
---

stylelint 是一个用于检测 CSS 代码风格和错误的工具，它有点类似于 ESlint，但是它专注于 CSS。 stylelint 不仅可以帮助你在团队中保持一致的 CSS 代码风格，发现潜在的错误，并且确保代码符合最佳实践。

![](img/2023-10-13-前端工程化_stylelint/stylelint.jpg)

<!-- truncate -->

stylelint 的主要特点和功能

1. 丰富的插件：stylelint 内置了很多插件，可以帮助你检测 CSS 代码中的错误和不规则的写法，并且能根据你的需求扩充其功能
2. 自动修复：stylelint 可以自动修复一些错误，比如在你使用了未知的属性时，它会自动添加该属性。
3. 自定义配置：stylelint 允许你自定义配置，你可以根据自己的喜好来配置 stylelint
4. 丰富的规则：stylelint 内置了许多规则，涵盖了常见的错误、最佳实践、语法错误、命名约定等
5. 使用方便：stylelint 非常容易使用，不仅提供了命令行工具，还可以与编辑器插件集成

## 安装

```bash
npm install stylelint --save-dev
```

生成配置文件

```bash
npm init stylelint
```

使用上述命令会生成一个名为 `.stylelintrc.json` 的默认配置文件，现在你可以使用命令行工具检测你的 css 代码了

```bash
npx stylelint "**/*.css"
```

在 vscode 插件市场搜索 stylelint 并安装，然后在 vscode 配置中添加以下配置信息，这样在每次保存后就会自动格式化并且修复你的 css 代码

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.stylelint": true
  }
}
```

保存后自动修复错误信息

<video autoPlay muted loop style={{"width":"100%"}}>

  <source src="/video/stylelint_auto_fix.mp4" type="video/mp4" />
</video>

## 配置

stylelint 的配置文件支持多种文件格式和命名，加载时会按照以下顺序加载配置文件

- `package.json`中的 `stylelint` 属性
- `.stylelintrc`
- .stylelintrc.{cjs,js,json,yaml,yml}
- stylelint.config.{cjs,mjs,js}

### `extends`

extends 字段类似于 eslint，用于继承其他社区共享的配置文件，比如 `stylelint-config-standard`，`stylelint-config-prettier`，`stylelint-config-rational-order`

- `stylelint-config-standard`：stylelint 官方标准配置，继承至 `stylelint-config-recommended`，并在此基础上开启了额外的规则来约束 CSS 规范中的现代约定
- `stylelint-config-prettier`：这个配置主要用于解决 stylelint 和 prettier 的配置冲突，这会关闭所有与 prettier 冲突的规则
- `stylelint-config-rational-order`：按照顺序分组对相关属性声明进行排序，这属于社区最佳实践配置，可以帮助你排序和整理你的 CSS 属性

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-rational-order", "stylelint-config-prettier"]
}
```

### `plugins`

插件是自定义规则或自定义规则集，用于支持方法、工具集、非标准 CSS 特性或非常具体的用例。

比如上面的属性排序功能就依赖于 `stylelint-order` 插件

```json
{
  "plugins": ["stylelint-order", "stylelint-config-rational-order/plugin"]
}
```

### `customSyntax`

stylelint 默认使用标准 CSS 语法，可以使用 `customSyntax` 来指定自定义语法，比如 scss、less 等

```json
{
  "customSyntax": "postcss-scss"
}
```

如果需要支持多种非标准语法，可以使用 overrides 为每一种语法指定语法解析工具

```json
{
  "overrides": [
    {
      "files": "*.scss",
      "customSyntax": "postcss-scss"
    },
    {
      "files": "*.less",
      "customSyntax": "postcss-less"
    }
  ]
}
```

### `ignorePath`

stylelint 默认忽略 `.stylelintignore` 文件，你可以使用 `ignorePath` 指定一个或多个文件、文件夹

```json
{
  // 忽略指定文件夹，支持glob语法
  "ignorePath": "test/**/*.css"
  // 传递数组忽略多个文件、文件夹
  "ignorePath": ["test/**/*.css", "dist/"]
}
```

### `rules`

stylelint 的规则是通过 `rules` 字段来配置的，它是一个对象，键是规则的名称，值是规则的配置

```json
{
  "rules": {
    "color-hex-case": "lower",
    "color-hex-length": "long",
    "color-no-invalid-hex": true
  }
}
```

stylelint 规定，值为 null 表示关闭此项规则，否则根据给定的值开启并配置此项规则，比如上面的 `"color-hex-length": "long"` 表示颜色使用 16 进制 6 位长格式表示法

## 禁用

当需要禁用某个文件或者目录时可以通过 `.stylelintignore`，如果是需要禁用单行可以使用注释来禁用单行检测

```css
* {
  user-select: none;
  /* stylelint-disable-next-line */
  -webkit-animation: fade-in 1s;
}
```
