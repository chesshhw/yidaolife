# 一道Life · 都会急救 | yidaolife.com

Next.js (App Router) + Tailwind CSS 项目。站点：Home / Programs / Cities / About / Contact，全站 Header + Footer，风格参考 wildmed.asia：高端、极简、大留白、强图片、克制按钮，移动端优先。

## 本地启动预览

```bash
# 安装依赖
npm install

# 开发模式（推荐，支持热更新）
npm run dev
```

浏览器打开 **http://localhost:3000** 即可预览。

其他命令：

- `npm run build` — 生产构建
- `npm run start` — 运行生产构建（需先执行 `npm run build`）
- `npm run lint` — 运行 ESLint

---

## 企业团训表单与邮件通知

联系页（/contact）的企业团训表单会提交到 **POST /api/contact**，校验通过后通过 [Resend](https://resend.com) 发送邮件到指定收件箱。

### 环境变量（必配）

在项目根目录创建 `.env.local`（开发）或部署平台配置以下变量：

| 变量 | 说明 |
|------|------|
| `RESEND_API_KEY` | Resend API Key（在 [Resend Dashboard](https://resend.com/api-keys) 创建） |
| `CONTACT_TO_EMAIL` | 收件人邮箱，如 `13512456138@163.com` |
| `CONTACT_FROM_EMAIL` | 发件人邮箱。须为 Resend 已验证域名下的邮箱，或使用 Resend 提供的测试发件人（如 `onboarding@resend.dev`） |

示例（`.env.local`）：

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=13512456138@163.com
CONTACT_FROM_EMAIL=no-reply@你的域名.com
```

未配置上述变量时，接口会返回 500，前端会提示「服务暂不可用，请稍后重试或直接致电联系」。

### 接口说明

- **POST /api/contact**：请求体 JSON 含 `name`、`phone`、`city`、`headcount`、`duration`（必填），以及可选 `company`、`note`、`pageUrl`、`userAgent`、`ts`。手机号校验 11 位；同一 IP 每分钟最多 5 次请求。
