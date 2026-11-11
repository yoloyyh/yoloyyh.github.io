# yoloyyh 魔法档案馆

## GitHub 项目目录

`projects-data.js` 是生成的公开仓库快照。项目目录展示 `yoloyyh` 自己创建的公开仓库，以及确认存在由 GitHub 账号 `yoloyyh` 署名提交的开源项目。个人 Fork 检查各个分支；其他人的公开仓库通过 GitHub 提交搜索发现（该搜索仅覆盖默认分支）。以 GitHub 上游关系和相同本人提交的 SHA 合并重复仓库，保留一张项目卡。没有本人提交或无法核验的仓库不显示，GitHub 无法关联到 `yoloyyh` 账号的提交不会计入。

`.github/workflows/deploy.yml` 在推送 `main`、手动运行以及每天北京时间约 06:17 生成最新数据并部署 GitHub Pages。定时任务可能延迟，且只在仓库默认分支生效；请确保默认分支为 `main`，在仓库 Settings → Pages → Build and deployment 的 Source 选择 GitHub Actions，并确认 Actions 已启用。GitHub 会在公开仓库无活动 60 天后自动停用定时任务。

本目录目前只是本地文件夹。要启用自动发布，需要把本目录的内容（包括隐藏的 `.github`）放在独立网站仓库根目录并推送；不要把工作区其他项目文件一起发布。暂不涉及任何 GitHub 写入或部署。

手动刷新：`GITHUB_TOKEN=... node scripts/update-projects.mjs`。Token 仅供执行时读取公开 GitHub API，不会写入页面；GitHub Actions 会自动提供 `GITHUB_TOKEN`。运行测试：`node --test tests/projects.test.mjs`。


## 知识库文章公开规则

个人网站的本机预览与公开网站都只显示带公开标记的文章。只有在 Obsidian 笔记的 YAML 属性中明确添加 `public: true`，或在 `tags` 中添加 `public`，该文章才会写入 `articles-public.js`，供公开网站使用。`public: false` 会覆盖标签并阻止公开。未标记的文章不会导出；移除标记后，本地导出会移除该文章。

自动预览服务会在本机更新 `articles-preview.js`（被忽略，不发布）和 `articles-public.js`（仅公开文章）。GitHub Pages 构建环境无法访问本机知识库：要更新线上内容，需要将更新后的 `articles-public.js` 提交并推送到网站仓库，部署完成后才会生效。取消公开同样需要推送并重新部署；已公开内容可能仍存在于 Git 历史中。

例如：

```yaml
---
public: true
---
```


## 音效素材

`assets/pen-on-paper.mp3` 为 [SFXMint 的 Pencil Writing 01](https://sfxmint.com/sounds/pencil-writing-01)，以 CC0 1.0 发布。页面播放时放慢至原速度的 90%，音量调低；原音频保存在本地。

`assets/castle-original.wav` 和蜡烛点亮、吹灭音效是为本项目合成的原创音频，不包含电影原曲或其他第三方录音。
