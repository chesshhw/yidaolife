import Image from "next/image";
import Link from "next/link";

const content = {
  zh: {
    eyebrow: "企业培训 · 从需求到安排",
    title: "把目标、实操和交付逐项确认",
    intro: "员工学习急救与培养内部讲师是两类需求。先明确参训对象和用途，再讨论课程、人员与场地安排。",
    steps: [
      { title: "说明需求", text: "提供城市、人数、岗位与意向日期；说明是员工学习、指定课程完成要求，还是希望培养内部讲师。" },
      { title: "核对方案", text: "确认课程版本、授课语言、师资与设备安排，了解每位学员怎样轮换练习、获得反馈和完成所需考核。" },
      { title: "确定现场安排", text: "确认具体时段、场地、联系人与名单；逐项核对报价包含的教学、器材、材料、考核和证书项目。" },
      { title: "约定课后事项", text: "事先讨论所需出勤与完成情况记录、未完成项目的处理、证书核验，以及后续复练如何安排。" },
    ],
    note: "具体费用、人数配置、证书与课后材料以本次书面确认的方案为准。咨询不代表已锁定日期或名额。",
    evidenceTitle: "确认谁来教、由谁发证",
    evidence: "如单位有资质或采购审核要求，请在方案确认前核对授课导师姓名、适用课程类别和相关资格的有效状态，并确认发证培训中心与核验渠道。机构名称、活动照片与某一项目记录，不能替代本次授课资格的核对。",
    evidenceLink: "查看证书与核验说明 →",
    caseEyebrow: "已有项目记录 · 导师培养",
    caseTitle: "汾阳医院：从学员课程到真实课堂督导",
    caseText: "本站项目记录介绍：都会急救参与汾阳医院的导师培养项目，历时两个月，累计9天培训与督导，10位候选人完成相关培养流程。项目包含学员课程、导师课程与真实课堂督导。",
    caseNote: "这是医务人员导师培养案例，其时长、人数和培养路径不能直接套用为普通员工班的交付承诺。",
    caseLink: "阅读完整项目记录 →",
    routes: "根据目标继续了解",
    team: "为员工安排培训",
    instructors: "了解导师培养路径",
    photo: "汾阳医院急救导师培养项目合影",
  },
  en: {
    eyebrow: "TEAM TRAINING · PLANNING",
    title: "Agree on the course and delivery details",
    intro: "Employee training and instructor development serve different goals. Start with the participants and intended use, then discuss the course, people and venue.",
    steps: [
      { title: "Share the brief", text: "Include the city, team size, roles and preferred dates. Explain whether the goal is employee learning, a specific course requirement or internal instructor development." },
      { title: "Review the proposed course", text: "Confirm the course version, language, instructor and equipment arrangements. Ask how each participant will practise, receive feedback and complete any required assessment." },
      { title: "Confirm on-site arrangements", text: "Agree on the timetable, venue, local contact and participant list. Check which teaching, equipment, materials, assessment and card-related items are included in the quote." },
      { title: "Discuss follow-up needs", text: "Before booking, discuss attendance and completion records, any unfinished requirements, course-card verification and possible refresher arrangements." },
    ],
    note: "Fees, staffing, course cards and follow-up materials depend on the written arrangements for your course. An enquiry does not reserve a date or place.",
    evidenceTitle: "Confirm the instructor and issuing Training Center",
    evidence: "If your organization requires supplier or qualification checks, confirm the instructor's name, applicable course discipline and current credentials, together with the issuing Training Center and verification route. A project story or photograph does not establish the qualifications for your proposed course.",
    evidenceLink: "Course-card verification information (Chinese) →",
    caseEyebrow: "PROJECT RECORD · INSTRUCTOR DEVELOPMENT",
    caseTitle: "Fenyang Hospital: learning, teaching and classroom monitoring",
    caseText: "Our published project record describes a two-month instructor-development project at Fenyang Hospital, with nine days of training and monitoring for ten candidates. It covered learner courses, instructor training and observation in real classes.",
    caseNote: "This was instructor development for medical staff. Its duration, group size and pathway are not a delivery promise for a standard employee course.",
    caseLink: "Read the full project record (Chinese) →",
    routes: "EXPLORE YOUR NEXT STEP",
    team: "Discuss employee training",
    instructors: "Explore instructor development",
    photo: "Group photograph from the Fenyang Hospital instructor-development project",
  },
};

export default function EnterprisePlanning({ language = "zh" }: { language?: "zh" | "en" }) {
  const t = content[language];
  const english = language === "en";
  return <section id="team-planning" lang={english ? "en" : "zh-CN"} className="scroll-mt-28 border-y border-[var(--border)] bg-[var(--surface)]">
    <div className="site-container py-12 sm:py-16">
      <p className="eyebrow">{t.eyebrow}</p>
      <h2 className="section-title mt-4">{t.title}</h2>
      <p className="section-intro mt-5 max-w-3xl">{t.intro}</p>
      <ol className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.steps.map((step, index) => <li key={step.title} className="border-t-2 border-[#91af96] pt-5"><span className="text-xs font-medium text-[#64816b]">0{index + 1}</span><h3 className="mt-3 text-lg font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.text}</p></li>)}
      </ol>
      <p className="mt-7 text-xs leading-6 text-[var(--muted)]">{t.note}</p>
      <div className="mt-9 rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8"><h3 className="text-lg font-semibold">{t.evidenceTitle}</h3><p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--muted)]">{t.evidence}</p><Link href="/blog/aha-certificate-verification-mainland-china" className="text-link mt-3">{t.evidenceLink}</Link></div>
      <article id="enterprise-case" className="mt-12 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <figure><div className="relative aspect-[3736/2314] overflow-hidden rounded-xl"><Image src="/images/g11.jpg" alt={t.photo} fill sizes="(max-width: 1023px) 100vw, 500px" className="object-cover" /></div><figcaption className="mt-3 text-xs leading-6 text-[var(--muted)]">{t.photo}</figcaption></figure>
        <div><p className="eyebrow">{t.caseEyebrow}</p><h3 className="mt-4 text-2xl font-semibold leading-snug">{t.caseTitle}</h3><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{t.caseText}</p><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{t.caseNote}</p><Link href="/blog/fenyang-hospital-first-aid-training-base" className="text-link mt-3">{t.caseLink}</Link><p className="mt-5 text-xs font-medium text-[var(--brand)]">{t.routes}</p><div className="mt-3 flex flex-wrap gap-3"><a href={english ? "#inquiry" : "#enterprise-contact"} className="button-primary">{t.team}</a><Link href={english ? "/en/aha-instructor-training-china" : "/instructor"} className="button-secondary">{t.instructors}</Link></div></div>
      </article>
    </div>
  </section>;
}
