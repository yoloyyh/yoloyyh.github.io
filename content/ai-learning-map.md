---
title: AI 学习地图：从文档到实践
public: true
updated: 2026-11-12
---
# AI 学习地图：从文档到实践

AI 资料太多，我把常用入口分成了几类：想了解产品和接口，先查官方文档；想动手，跟着教程做；想研究 Agent 安全，再看开源项目和测试方法。

## 官方文档

这些文档适合在动手时随查随用。

- [Claude Platform](https://platform.claude.com/docs/en/home)：Claude 的 API、工具调用和开发指南。
- [Claude Code](https://code.claude.com/docs/en/overview)：了解 Claude Code 的使用、配置和扩展方式。
- [Claude Cookbooks](https://github.com/anthropics/claude-cookbooks)：Claude 相关的代码示例和实践笔记。
- [Anthropic Engineering](https://www.anthropic.com/engineering)：Agent、工具设计和工程实践文章。
- [ChatGPT Learn](https://learn.chatgpt.com/docs)：了解 ChatGPT 的功能和使用方式。
- [OpenAI 开发者文档](https://developers.openai.com/api/docs)：查询 API、模型、工具和 Agent 开发资料。
- [OpenAI Cookbook](https://github.com/openai/openai-cookbook)：通过示例学习 OpenAI API 的常见用法。
- [LangChain](https://docs.langchain.com/oss/python/langchain/overview)：了解如何组合模型、工具和 Agent。
- [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)：了解如何组织有状态的 Agent 工作流。
- [MCP 官方文档](https://modelcontextprotocol.io/docs/getting-started/intro)：了解 AI 应用如何连接外部工具和数据。

## 入门课程与动手教程

先选一门跟着做完，比同时收藏很多教程更有用。

- [动手学大模型应用开发](https://datawhalechina.github.io/llm-universe/)：Datawhale 的中文教程，适合从应用开发入手；[项目源码](https://github.com/datawhalechina/llm-universe)也可以一起看。
- [Hello Agents](https://github.com/datawhalechina/hello-agents)：从零了解智能体的原理与实践。
- [Happy LLM](https://github.com/datawhalechina/happy-llm)：想往模型原理和构建方向深入时可以看。
- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/)：学习大语言模型及 Hugging Face 生态的课程。
- [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/)：围绕 Agent 基础与实践组织的课程。
- [RAG from Scratch](https://github.com/langchain-ai/rag-from-scratch)：通过示例了解检索增强生成的基本思路。
- [Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)：查阅提示词、上下文、RAG 和 Agent 相关资料。

一个适合练手的小项目是知识库问答：先做文档导入、检索和回答，再检查答案能否追溯到原文、是否会读到不该读的数据。

## Agent 与 AI 安全项目

Agent 不只生成文字，还可能调用工具和读写文件。下面这些项目适合从不同角度了解它的风险与防护。

- [AxoraSecurity/agentguard](https://github.com/AxoraSecurity/agentguard)：关注 Agent 技能、敏感信息和运行时动作的安全检查。
- [WhitzardAgent/AgentGuard](https://github.com/WhitzardAgent/AgentGuard)：围绕 Agent 工具调用的访问控制，提供不同框架的集成。它与上面的 AgentGuard 是不同项目。
- [AgentSight](https://github.com/eunomia-bpf/agentsight)：从系统层观察 AI Agent 行为，适合关注 eBPF 和可观测性的读者。
- [garak](https://github.com/NVIDIA/garak)：大模型漏洞扫描工具，可用来了解常见模型安全测试方向。
- [promptfoo](https://github.com/promptfoo/promptfoo)：用于测试提示词、Agent 和 RAG，也支持 AI 安全评测。
- [AgentDojo](https://github.com/ethz-spylab/agentdojo)：用于评估针对 LLM Agent 的攻击与防御。

读这类项目时，我会先看它保护什么、在哪里拦截、能看到哪些信息，以及出问题后能不能追踪。项目介绍可以帮助了解设计思路，实际防护效果还需要结合自己的场景测试。

## 安全研究与资讯

- [OWASP GenAI Security Project](https://genai.owasp.org/)：查阅生成式 AI 和 Agent 的安全风险、测试与防护资料。
- [MITRE ATLAS](https://atlas.mitre.org/)：了解针对 AI 系统的攻击技术和案例。
- [模安局](https://moanju.org/)：关注 AI 安全、治理、评测和 Agent 风险，适合顺着话题继续找论文与技术资料。
- [AIHOT](https://aihot.news/)：快速了解 AI 领域的新动态；遇到重要消息，再去看官方公告或原始资料。
