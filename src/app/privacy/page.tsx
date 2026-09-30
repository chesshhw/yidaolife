import type { Metadata } from "next";

export const metadata: Metadata = { title: "咨询信息使用说明 | Enquiry privacy", alternates: { canonical: "/privacy" } };

export default function InquiryPrivacyPage() {
  return <div className="site-container max-w-4xl py-12 sm:py-16">
    <h1 className="section-title">咨询信息使用说明<br /><span lang="en" className="text-2xl">Enquiry information & privacy</span></h1>
    <p className="mt-5 text-sm text-[var(--muted)]">更新 / Updated: 2026-09-30</p>
    <section className="mt-9 space-y-5 text-base leading-8">
      <h2 className="text-xl font-semibold">中文</h2>
      <p>本咨询表单由都会急救（天津一道技术服务有限公司）使用。我们收集你填写的姓名、邮箱、留言，以及你自愿填写的单位名称、手机号和微信，用于回复本次咨询、沟通课程安排及后续服务。</p>
      <p>表单通过网站服务器处理，并通过邮件发送到 13512456138@163.com。网站托管和邮件服务商会为提供相应服务处理这些信息；此版本未建立可供查询的独立客户资料数据库，咨询记录保存在收件邮箱。</p>
      <p>请只填写咨询所需的信息，勿提交病历、身份证件、支付资料等敏感内容。我们不会将姓名、电话、邮箱或留言作为表单转化事件参数发送给 Google Analytics 或 Google Ads；提交成功后可记录不含联系资料的咨询事件。网站已有的访问分析仍适用。</p>
      <p>这些信息用于本次咨询及相关服务，不会仅因提交表单就将你加入营销邮件名单。我们仅在处理咨询及相关服务所需的期限内保留记录。若希望查询、更正或删除咨询记录，请发送邮件至 <a href="mailto:13512456138@163.com" className="underline text-[var(--brand)]">13512456138@163.com</a>。</p>
    </section>
    <section lang="en" className="mt-10 space-y-5 border-t border-[var(--border)] pt-8 text-base leading-8">
      <h2 className="text-xl font-semibold">English</h2>
      <p>This enquiry form is operated by 都会急救, operated by 天津一道技术服务有限公司. We use your name, email address, message and any optional company, phone or WeChat details to reply to your enquiry and discuss training arrangements and related services.</p>
      <p>Your submission is processed by our website server and sent by email to 13512456138@163.com. Our hosting and email providers process the information to deliver these services. This version stores enquiry correspondence in the recipient mailbox, not in a separate searchable customer database.</p>
      <p>Please include only information needed for your enquiry, not medical records, identity documents or payment information. We do not include your name, phone number, email address or message in enquiry conversion events sent to Google Analytics or Google Ads. A successful submission may trigger an event without contact details. Existing website visit analytics still apply.</p>
      <p>Submitting the form does not subscribe you to marketing emails. Records are retained for as long as needed to handle your enquiry and related services. To ask about, correct or delete a record, email <a href="mailto:13512456138@163.com" className="underline text-[var(--brand)]">13512456138@163.com</a>.</p>
    </section>
  </div>;
}
