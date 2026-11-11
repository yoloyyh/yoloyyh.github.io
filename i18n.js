(() => {
  const translations = {
    '✳ YOLOYYH / 魔法城堡':'✳ YOLOYYH / THE MAGIC CASTLE',
    '你好，我是':'Hello, I’m','yoloyyh。':'yoloyyh.',
    '城堡的灯火还亮着。穿过大门，走进我的魔法档案馆，探索安全、技术和创造的故事。':'The castle lights are still on. Step inside my magical archive and explore stories of security, technology, and creation.',
    '✦ 进入魔法档案馆　→':'✦ Enter the archive　→','◇ 直接查看项目':'◇ Explore projects',
    '进入档案馆':'Enter the archive','进入档案馆，打开进入档案馆':'Enter the archive',
    '← 返回城堡外':'← Return to the castle','YOLOYYH / 魔法档案馆':'YOLOYYH / THE MAGIC ARCHIVE','INSIDE THE ARCHIVE / 馆内探索':'INSIDE THE ARCHIVE / EXPLORE',
    '故事，都在':'Stories live','书页之间。':'between the pages.',
    '这里收藏着我的项目，以及关于 AI 的学习资料和思考。点亮蜡烛，打开一份档案。':'A collection of projects, AI learning materials, and reflections. Light the candle and open an archive.',
    '点亮蜡烛':'Light the candle','熄灭蜡烛':'Extinguish the candle','项目书架 ↗':'Project bookshelf ↗','AI 资料与思考 ↗':'AI reading room ↗','AI 资料与思考':'AI reading room','关于 yoloyyh':'About yoloyyh','手记与来信':'Notes & contact','✳ 点击馆内光点探索':'✳ Select a glowing point to explore',
    '← 返回魔法世界':'← Return to the magic world','项目书架':'Project bookshelf','阅读原文 ↗':'Read original ↗','联系方式':'Contact','欢迎通过以下方式联系我。':'You can contact me using the links below.','邮箱 · 1764163852@qq.com':'Email · 1764163852@qq.com','◈ PROJECT ARCHIVE / 项目空间':'◈ PROJECT ARCHIVE','SELECTED WORKS / 作品目录':'SELECTED WORKS / PROJECTS',
    '每个项目，':'Every project','都有一段故事':'has a story','。':'.',
    '自动收录 GitHub 公开仓库，展示自建项目和本人有提交的开源项目。':'A collection of public GitHub repositories, including original projects and open-source projects with my authored commits.',
    '全部项目':'All projects','原创仓库':'Original repositories','参与的开源项目':'Open-source contributions','搜索项目、标签或关键词':'Search projects, tags or keywords','搜索项目':'Search projects','项目分类':'Project categories','项目空间':'Project archive',
    '没有找到匹配的项目，试试其他关键词或分类。':'No matching projects. Try another keyword or category.','暂无仓库简介':'No repository description','项目档案':'Project archive','查看详情 ↗':'View details ↗',
    '← 返回全部项目':'← Back to projects','← 返回项目空间':'← Back to projects','GITHUB 项目档案':'GITHUB PROJECT','仓库信息':'Repository','相关链接':'Links','更新情况':'Last updated',
    '01 / 仓库介绍':'01 / About','02 / 项目信息':'02 / Project details','03 / 更新说明':'03 / Updates',
    '这个仓库暂时没有填写简介。':'This repository does not have a description yet.','更多内容可以在 GitHub 仓库中查看。':'Visit the GitHub repository to learn more.',
    '查看 GitHub 仓库 ↗':'View on GitHub ↗','访问项目主页 ↗':'Visit project site ↗','主要语言：':'Language: ','最近推送：':'Last push: ','上游仓库：':'Upstream: ','仓库类型：原创仓库':'Type: original repository','仓库类型：外部开源项目':'Type: external open-source project','未标注':'Not specified','暂无':'Not available',
    '项目资料来自 GitHub 公开信息。参与的开源项目仅在检索到 yoloyyh 署名的提交后展示。':'Project information comes from public GitHub data. Open-source projects are shown only when a commit authored by yoloyyh is found.',
    '已检索到由 yoloyyh 署名的提交。':'A commit authored by yoloyyh was found in this repository.','查看本人提交 ↗':'View my commit ↗','查看上游提交 ↗':'View upstream commit ↗','由 yoloyyh 创建的公开仓库。':'A public repository created by yoloyyh.',
    '猫头鹰来信':'Owl post','打开猫头鹰送来的信':'Open the owl’s letter','欢迎来到 yoloyyh 的魔法城堡。穿过大门，探索项目书架与 AI 资料。':'Welcome to yoloyyh’s magic castle. Step inside to explore projects and AI reading notes.','关于我':'About me','文章与联系':'Notes & contact',
    '这里可以放你的职业介绍、关注的安全方向和联系方式。':'A place for your introduction, security interests, and contact information.',
    '这里可以展示技术文章、思考记录以及联系入口。':'A place for technical articles, notes, and contact information.',
    'CONCEPT PREVIEW / 示例内容':'CONCEPT PREVIEW / PLACEHOLDER','这里是交互示意，实际内容将根据你的经历填写。':'This is a placeholder for your own content.','关闭':'Close','← 返回档案馆':'← Back to the archive','◈ AI READING ROOM / AI 资料与思考':'◈ AI READING ROOM','READING ROOM / 学习与思考':'READING ROOM / NOTES','翻开书页，':'Turn a page,','继续探索':'keep exploring','来自本地知识库的 AI 学习资料、技术分析与思考。':'AI learning materials, technical analysis, and reflections from the local knowledge base.','仅在本机预览':'Local preview only','不会自动发布到公开网站':'Never published automatically','搜索文章标题或内容':'Search article titles or text','搜索文章':'Search articles','没有找到文章，请尝试其他关键词。':'No articles found. Try another keyword.','← 返回文章列表':'← Back to articles','AI 安全 / 阅读笔记':'AI SECURITY / READING NOTES','AI 学习 / 阅读笔记':'AI LEARNING / READING NOTES','本机预览：文章来自本地 Obsidian 知识库，不会自动发布。':'Local preview: this article comes from your Obsidian vault and will not be published automatically.',
    '♫ 音乐 · 开启':'♫ Music · On','♫ 音乐 · 关闭':'♫ Music · Off','播放背景音乐':'Play background music','关闭背景音乐':'Stop background music','音乐无法播放，请检查音频文件。':'Unable to play music. Please check the audio file.'
  };
  let language = 'zh';
  try { language = localStorage.getItem('site-language') === 'en' ? 'en' : 'zh'; } catch {}
  const originals = new WeakMap();
  const button = document.getElementById('language-toggle');
  const dynamic = text => text
    .replace(/^(\d+) 篇文章$/, '$1 articles')
    .replace(/^AI 安全 · /, 'AI SECURITY · ')
    .replace(/^AI 学习 · /, 'AI LEARNING · ')
    .replace(/ · 公开$/, ' · Public')
    .replace(/ · 本机预览$/, ' · Local preview')
    .replace(/^(\d+) 个公开仓库 · 参与项目已核验本人提交$/, '$1 public repositories · My authored commits verified in contributions')
    .replace(/^主要语言：/, 'Language: ')
    .replace(/^最近推送：/, 'Last push: ')
    .replace(/^上游仓库：/, 'Upstream: ')
    .replace(/^原创仓库 \/ GITHUB 项目档案$/, 'Original repository / GITHUB PROJECT')
    .replace(/^参与的开源项目 \/ GITHUB 项目档案$/, 'Open-source contributions / GITHUB PROJECT')
    .replace(/^数据更新于 (.+)（北京时间）$/, 'Updated $1 (Beijing time)')
    .replace(' / GITHUB 项目档案',' / GITHUB PROJECT')
    .replace(/^进入档案馆，打开进入档案馆$/, 'Enter the archive');
  function convert(value) {
    if (language !== 'en') return value;
    const match = value.match(/^(\s*)(.*?)(\s*)$/s);
    if (!match || !match[2]) return value;
    const translated = translations[match[2]] ?? dynamic(match[2]);
    return match[1] + translated + match[3];
  }
  function apply() {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = language === 'en' ? 'yoloyyh · Magic Castle' : 'yoloyyh · 魔法城堡';
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (['SCRIPT','STYLE'].includes(node.parentElement?.tagName) || node.parentElement?.closest?.('[data-profile-description]')) return;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const next = convert(originals.get(node)); if (node.nodeValue !== next) node.nodeValue = next;
    });
    document.querySelectorAll('[data-profile-description]').forEach(el => {const value = language === 'en' ? el.dataset.en : el.dataset.zh; if (el.textContent !== value) el.textContent = value;});
    document.querySelectorAll('[placeholder],[aria-label]').forEach(el => {
      for (const attribute of ['placeholder','aria-label']) {
        if (!el.hasAttribute(attribute) || el === button) continue;
        const key = 'original' + attribute.replace(/(^|-)([a-z])/g, (_, _dash, c) => c.toUpperCase());
        const previousKey = key + 'Rendered'; const current = el.getAttribute(attribute);
        if (el.dataset[key] === undefined || (el.dataset[previousKey] !== undefined && current !== el.dataset[previousKey])) el.dataset[key] = current;
        const value = convert(el.dataset[key]); el.dataset[previousKey] = value; if (current !== value) el.setAttribute(attribute, value);
      }
    });
    button.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
    const buttonText = language === 'zh' ? '中 / EN' : 'EN / 中'; if (button.textContent !== buttonText) button.textContent = buttonText;
  }
  button.addEventListener('click', () => {language = language === 'zh' ? 'en' : 'zh'; try {localStorage.setItem('site-language', language);} catch {} apply();});
  let queued = false;
  new MutationObserver(() => {if (!queued) {queued = true; queueMicrotask(() => {queued = false; apply();});}}).observe(document.body,{childList:true,subtree:true});
  apply();
  const frame = document.querySelector('.archive > .frame');
  if (matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    frame.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || document.body.classList.contains('journey-active')) return;
      const r = frame.getBoundingClientRect();
      frame.style.setProperty('--castle-x', `${((event.clientX-r.left)/r.width-.5)*-12}px`);
      frame.style.setProperty('--castle-y', `${((event.clientY-r.top)/r.height-.5)*-8}px`);
    });
    frame.addEventListener('pointerleave', () => {if (document.body.classList.contains('journey-active')) return; frame.style.setProperty('--castle-x','0px');frame.style.setProperty('--castle-y','0px')});
  }
})();
