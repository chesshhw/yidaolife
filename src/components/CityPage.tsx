import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { EnrollModal } from "@/components/EnrollModal";
import type { City } from "@/data/cities";
import { getCityShortName, getDisplayLocations, hasSpecificLocations, parseScheduleDates } from "@/data/cities";
import { shanghaiDate, scheduleDateIso } from "@/lib/schedule";
import {
  APPLICABLE_SCENARIOS, BASIC_FIRST_AID_TOPICS, BRAND_NAME, buildCityJsonLd,
  COURSE_NAME, ENTERPRISE_TOPICS, ENVIRONMENT_TOPICS, getCityFaqItems,
  getCityPageTitle, INTERNAL_EMERGENCY_TOPICS, LEGAL_NAME, TARGET_AUDIENCE,
  TEACHING_FLOW, TRAINING_IMAGES, TRAUMA_TOPICS,
} from "@/lib/city-landing";
import styles from "./CityPage.module.css";

const resources = [
  { href: "/blog/aha-certificate-verification-mainland-china", title: "纸质证书与官网核验", description: "大陆课程完成卡的形式、查询情况与发证培训中心核验方式。" },
  { href: "/blog/fitness-certification-cpr-aed-requirements", title: "健身教练认证，需要哪种 CPR / AED 证书？", description: "了解 NSCA、ACSM、ACE、NASM 等认证的要求与核对方法。" },
  { href: "/blog/aha-vs-red-cross-first-aid", title: "AHA 与红十字急救课程怎么选？", description: "根据学习目的和用证单位要求，选择适合自己的课程。" },
];

function inquiryHref(slug: string, enterprise = false, date?: string) {
  const query = new URLSearchParams({ city: slug, training: enterprise ? "enterprise" : "individual" });
  if (date) query.set("date", date);
  return `/contact?${query.toString()}#inquiry`;
}

function SectionIntro({ number, title, children }: { number: string; title: string; children?: ReactNode }) {
  return <header className={styles.sectionIntro}><p className={styles.eyebrow}>{number} / 都会急救</p><h2>{title}</h2>{children && <div className={styles.intro}>{children}</div>}</header>;
}

export default function CityPage({ city, slug }: { city: City; slug: string }) {
  const short = getCityShortName(city);
  const asOf = shanghaiDate();
  const { isMinGroup, dates, pastDates } = parseScheduleDates(city.scheduleDates, asOf);
  const displayLocations = getDisplayLocations(city.locations);
  const showAddresses = hasSpecificLocations(city.locations);
  const awaitingDetails = ["puer", "ganzhou", "dujiangyan"].includes(slug);
  const faqItems = getCityFaqItems(city);
  const personalHref = inquiryHref(slug);
  const enterpriseHref = inquiryHref(slug, true);
  return <article className={styles.page}>
    {buildCityJsonLd(city, slug, asOf).map((block, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\\u003c") }} />)}
    <section className={styles.hero}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "培训城市", href: "/cities" }, { label: short }]} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{short} · 个人报名 / 企业团体</p>
            <h1>{getCityPageTitle(city)}</h1>
            <p className={styles.heroLead}>把急救学到手，<br />为生活与工作多一份准备。</p>
            <p className={styles.intro}>CPR 心肺复苏 · AED 使用 · 气道异物梗阻急救<br />通过视频学习、导师示范和现场实操，练习紧急时刻用得上的技能。</p>
            <div className={styles.actions} data-analytics-placement="hero"><a href="#city-schedule" className={styles.primary}>查看{short}排期 <span aria-hidden>↓</span></a><a href="#city-enterprise" className={styles.secondary}>企业团体培训</a></div>
            <ul className={styles.heroFacts}><li>无医学背景也可学</li><li>课堂实操与考核</li><li>纸质课程完成卡</li></ul>
          </div>
          <figure className={styles.heroPhoto}><Image src={TRAINING_IMAGES[1].src} alt={TRAINING_IMAGES[1].alt()} fill priority sizes="(max-width: 760px) 100vw, 48vw" className={styles.photo} /><figcaption><strong>技能，从亲手练习开始。</strong><span>都会急救课堂实拍，非{short}独立场地展示</span></figcaption></figure>
        </div>
      </div>
    </section>
    <nav className={styles.jumpNav} aria-label="城市课程页导航"><div className={styles.container}>{[["city-schedule", "时间与地点"], ["city-course", "课程与实操"], ["city-certificate", "证书解答"], ["city-enterprise", "企业培训"], ["city-faq", "常见问题"]].map(([id, text]) => <a key={id} href={`#${id}`}>{text}</a>)}</div></nav>

    <section id="city-schedule" className={`${styles.container} ${styles.section}`}>
      <SectionIntro number="01" title={`${short}急救培训时间与地点`}>先选择方便参加的日期，再与黄老师核对场次、费用和报名安排。</SectionIntro>
      <div className={styles.scheduleGrid}>
        <div className={styles.schedulePanel}><div className={styles.panelHeading}><h3>近期课程排期</h3><span>北京时间</span></div>
          {dates.length > 0 ? <ul className={styles.dateList}>{dates.map(date => <li key={date}><time dateTime={scheduleDateIso(date) ?? undefined}>{date}</time><Link href={inquiryHref(slug, false, scheduleDateIso(date) ?? undefined)}>咨询该期 <span aria-hidden>↗</span></Link></li>)}</ul> : <div className={styles.pending}><strong>{isMinGroup ? "满6人可预约开课" : "下一期排期待确认"}</strong><p>{isMinGroup ? "可以先登记意向，具体开课时间与地点需进一步确认。" : `${short}仍开展培训，欢迎先咨询个人或团体课程安排。`}</p></div>}
          <p className={styles.note}>费用与包含项目、具体上课时段、余位及报名状态，请在报名或出行前确认。</p>
          {pastDates.length > 0 && <details className={styles.history}><summary>历史排期（{pastDates.length}）</summary><ul>{pastDates.map(date => <li key={date}>{date}</li>)}</ul><p>仅保留过去登记的日期，不代表实际举办记录，也不作为当前报名日期。</p></details>}
        </div>
        <div className={styles.locationPanel}><div className={styles.panelHeading}><h3>{short}急救培训地点</h3><span>出行前核对</span></div>
          {showAddresses ? <ul className={styles.addresses}>{displayLocations.filter(address => !/待定|待确认|另行通知/.test(address)).map((address, index) => <li key={address}><span className={styles.locationNumber}>{String(index + 1).padStart(2, "0")}</span><address>{address}</address></li>)}</ul> : <div className={styles.pending}><strong>具体场地待确认</strong><p>课程咨询正常开放，确认场次时会一并核对详细地址。</p></div>}
          <p className={styles.note}>{awaitingDetails ? "本城仍开展培训，最新地点与课表待补充。" : "时间与地点依据2026年10月28日提供的资料更新，具体场次安排请再次核对。"}</p>
          <div className={styles.actions}><Link href={personalHref} className={styles.primary}>咨询{short}课程 <span aria-hidden>↗</span></Link><EnrollModal cityName={short} buttonText="小程序报名" /></div>
          <a href="tel:13512456138" className={styles.phone}>黄老师 · 135 1245 6138</a>
        </div>
      </div>
    </section>

    <section id="city-course" className={`${styles.container} ${styles.section} ${styles.divider}`}>
      <SectionIntro number="02" title={`${short}急救培训课程介绍`}>{short} {COURSE_NAME} 急救员课程面向公众与非医务人员，也适合企业、学校和公共机构组织学习。通过系统练习，把急救知识转化为清晰的行动流程。</SectionIntro>
      <div className={styles.skillGrid}>{[{ mark: "CPR", title: "心肺复苏", text: "成人、儿童心肺复苏与 AED 使用，以及婴儿心肺复苏，练习按压、通气和配合施救。" }, { mark: "AED", title: "自动体外除颤仪", text: "学习识别心脏骤停，练习 AED 操作流程与安全要点，理解 CPR 与 AED 的配合。" }, { mark: "FIRST AID", title: "急救与气道异物梗阻", text: "学习成人、儿童和婴儿气道异物梗阻的识别与处理，并了解常见急症、创伤和环境急症。" }].map(item => <div key={item.mark} className={styles.skill}><span>{item.mark}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
      <p className={styles.note}>成人、儿童、婴儿等模块以所选课程版本与实际安排为准，报名前可按用证要求确认。</p>
      <div className={styles.topicGrid}>{[["急救基础知识", BASIC_FIRST_AID_TOPICS], ["内科急症处理", INTERNAL_EMERGENCY_TOPICS], ["创伤急症处理", TRAUMA_TOPICS], ["环境相关急症处理", ENVIRONMENT_TOPICS]].map(([heading, items]) => <div key={heading as string}><h3>{heading as string}</h3><ul>{(items as string[]).map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
      <div className={styles.practiceGrid}><div><p className={styles.eyebrow}>学习方式</p><h3 className={styles.featureTitle}>边看、边学、边练，<br />在课堂上完成技能考核。</h3><ol className={styles.steps}>{TEACHING_FLOW.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol><p className={styles.note}>培训通常为全天、约8小时，实际时长受课程版本、人数、练习和考核进度影响，以具体场次安排为准。</p></div><div className={styles.practicePhotos}>{[TRAINING_IMAGES[0], TRAINING_IMAGES[2]].map(item => <figure key={item.src}><div><Image src={item.src} alt={item.alt()} fill sizes="(max-width: 760px) 90vw, 40vw" className={styles.photo} /></div><figcaption>{item.caption()}</figcaption></figure>)}</div></div>
    </section>

    <section id="city-certificate" className={styles.certificate}><div className={`${styles.container} ${styles.section}`}>
      <SectionIntro number="03" title="报名前，把证书问题问清楚">课程是否符合你的学习、入职或报考需要，可以提前核对。</SectionIntro>
      <div className={styles.certificateGrid}><div><span className={styles.tag}>AHA HEARTSAVER</span><h3 className={styles.featureTitle}>目前发放纸质课程完成卡</h3><p>都会急救目前在中国大陆开展的 AHA 课程统一发放纸质课程完成卡，不提供 AHA eCard。完成相应课程并通过考核后可获证，证书有效期为2年。</p><p>纸质形式本身不意味着证书无效。入职、健身教练认证等用途，还需核对接收单位要求的课程内容、实操考核与有效期。</p><p>如需核验，请联系原发证培训中心，核对课程、考核和证书记录。详情见下方说明。</p><a href="https://cpr.heart.org/en/resources/course-card-information" target="_blank" rel="noopener noreferrer" className={styles.textLink}>AHA 官方课程完成卡核验说明 ↗</a></div><div className={styles.resources}>{resources.map((item, index) => <Link key={item.href} href={item.href}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><span aria-hidden>↗</span></Link>)}</div></div>
    </div></section>

    <section id="city-enterprise" className={`${styles.container} ${styles.section}`}>
      <SectionIntro number="04" title={`${short}企业急救培训`}>为企业安全、工会活动、EHS、员工关怀或 AED 配置后的员工培训，安排匹配需求的课程。</SectionIntro>
      <div className={styles.enterpriseGrid}><div><h3 className={styles.featureTitle}>一个团队，一起练习。</h3><p>{BRAND_NAME}在{short}及周边开展团体急救培训。企业可咨询集中培训或上门培训，具体时间、师资与场地按人数和需求确认。</p><ul className={styles.checkList}>{ENTERPRISE_TOPICS.map(item => <li key={item}>{item}</li>)}</ul><div className={styles.actions}><Link href={enterpriseHref} className={styles.primary}>咨询{short}企业培训 <span aria-hidden>↗</span></Link><Link href="/enterprise-training" className={styles.textLink}>查看企业培训服务 →</Link></div></div><aside className={styles.enterpriseBrief}><p className={styles.eyebrow}>准备这四项，沟通更高效</p><ol>{["人数与岗位：有多少同事参加？", "培训目的：安全学习，还是有具体用证要求？", "时间与场地：意向日期、集中培训或企业现场？", "课程需求：CPR / AED、急救或完整认证课程？"].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol><p className={styles.note}>方案与报价在需求确认后提供。</p></aside></div>
      <div className={styles.audienceGrid}><div><h3>{short}急救培训适合人群</h3><ul>{TARGET_AUDIENCE.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>为什么学习急救？这些场景可能用得上</h3><ul>{APPLICABLE_SCENARIOS.map(item => <li key={item}>{item}</li>)}</ul></div></div>
    </section>

    <section id="city-faq" className={`${styles.container} ${styles.section} ${styles.divider}`}>
      <SectionIntro number="05" title={`${short}急救培训常见问题`} />
      <div className={styles.faq}>{faqItems.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div>
    </section>
    <section className={`${styles.container} ${styles.closing}`}><div><p className={styles.eyebrow}>从了解一堂课开始</p><h2>准备好在{short}学习急救了吗？</h2><p>告诉我们你的城市、意向日期与学习目的，黄老师与你确认下一步。</p></div><Link href={personalHref} className={styles.primary}>咨询课程与报名 <span aria-hidden>↗</span></Link></section>
    <div className={`${styles.container} ${styles.about}`}><p>关于{BRAND_NAME}：{LEGAL_NAME}旗下急救培训品牌，开展 AHA Heartsaver 急救员课程、企业急救培训和团体培训服务。</p><Link href="/cities">查看其他培训城市 →</Link></div>
    <div className={styles.mobileBar} data-analytics-placement="content"><a href="tel:13512456138" className={styles.secondary}>电话咨询</a><Link href={personalHref} className={styles.primary}>咨询{short}课程 ↗</Link></div>
  </article>;
}
