import type { ReactNode } from "react";
import { HomeCourseCTA } from "./HomeCourseCTA";

const cardBase =
  "rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-md sm:p-8 dark:border-neutral-800 dark:bg-neutral-950";

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
      <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500" aria-hidden>
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

/** SECTION 1 */
function CourseIntro() {
  return (
    <header className="mx-auto max-w-4xl text-center lg:max-w-5xl">
      <h2
        id="home-course-heading"
        className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl dark:text-white"
      >
        AHA Heartsaver 急救员认证课程
      </h2>
      <div className="mt-6 space-y-5 text-left text-base leading-relaxed text-neutral-800 sm:text-lg sm:leading-8 dark:text-neutral-200 lg:mx-auto lg:max-w-3xl lg:text-center">
        <p>
          <strong className="font-semibold text-neutral-900 dark:text-white">AHA Heartsaver</strong>{" "}
          急救员课程由<strong className="font-semibold text-neutral-900 dark:text-white">美国心脏协会</strong>
          （American Heart Association）制定，是全球广泛认可的标准化急救培训课程，适合公众、企业员工、学校老师、教练、物业安保等非医疗人员学习。
        </p>
        <p>
          课程聚焦最常见的突发情况急救技能，包括 <strong className="font-semibold text-neutral-900 dark:text-white">CPR 心肺复苏</strong>、
          <strong className="font-semibold text-neutral-900 dark:text-white"> AED </strong>
          自动体外除颤仪使用以及气道异物梗阻急救等内容。通过一天的培训与技能考核后，可获得{" "}
          <strong className="font-semibold text-neutral-900 dark:text-white">AHA 官方急救员认证证书</strong>
          ，证书有效期 2 年。
        </p>
        <p>
          我们在全国多个城市开展 <strong className="font-semibold text-neutral-900 dark:text-white">AHA急救培训</strong>
          ，可根据个人或企业需求协同安排培训时间，实现<strong className="font-semibold text-neutral-900 dark:text-white">全国开课</strong>与灵活排期。
        </p>
      </div>
    </header>
  );
}

/** SECTION 2 */
function CourseSkills() {
  const firstAidItems = [
    "急救员职责与现场安全判断",
    "启动120及紧急求助流程",
    "常见内科急症识别与应对",
    "出血、骨折、烧伤等创伤急救",
    "气道异物梗阻现场处理",
  ];
  const cprItems = [
    "成人 CPR 心肺复苏与 AED 使用",
    "儿童 CPR 心肺复苏与 AED 使用",
    "婴儿 CPR 心肺复苏",
    "气道异物梗阻急救处理",
  ];

  return (
    <section className="scroll-mt-24" aria-labelledby="home-course-skills">
      <h2
        id="home-course-skills"
        className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white"
      >
        你将掌握的核心救命技能
      </h2>
      <p className="mt-3 max-w-3xl text-base text-neutral-700 dark:text-neutral-300">
        围绕<strong className="text-neutral-900 dark:text-white">急救员认证</strong>要求，将现场急救与{" "}
        <strong className="text-neutral-900 dark:text-white">CPR、AED</strong> 技能分模块训练。
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className={cardBase}>
          <h3 className="text-lg font-semibold text-neutral-900 sm:text-xl dark:text-white">急救课程内容</h3>
          <ul className="mt-6 space-y-4">
            {firstAidItems.map((t) => (
              <CheckItem key={t}>{t}</CheckItem>
            ))}
          </ul>
        </div>
        <div className={cardBase}>
          <h3 className="text-lg font-semibold text-neutral-900 sm:text-xl dark:text-white">心肺复苏课程内容</h3>
          <ul className="mt-6 space-y-4">
            {cprItems.map((t) => (
              <CheckItem key={t}>{t}</CheckItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** SECTION 3 */
function CourseInfo() {
  const items = [
    {
      title: "培训时长",
      body: ["一天课程（约6–8小时）"],
    },
    {
      title: "授课方式",
      body: ["AHA 标准化视频教学", "导师讲解 + 实操练习 + 技能考核"],
    },
    {
      title: "适合人群",
      body: ["公众、企业员工、老师、教练、家长、物业安保等"],
    },
    {
      title: "证书说明",
      body: ["完成培训与考核后获得 AHA 官方认证急救员证书", "证书有效期 2 年，可官方查询"],
    },
    {
      title: "开课方式",
      body: ["全国多城市开课", "可协同安排培训时间"],
    },
  ];

  return (
    <section className="scroll-mt-24" aria-labelledby="home-course-info">
      <h2 id="home-course-info" className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
        课程信息
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {items.map(({ title, body }) => (
          <div key={title} className={`${cardBase} flex flex-col`}>
            <h3 className="text-base font-semibold text-neutral-900 sm:text-lg dark:text-white">{title}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-800 sm:text-base dark:text-neutral-200">
              {body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** SECTION 4 */
function CourseValue() {
  const points = [
    "美国心脏协会标准课程体系",
    "CPR + AED + 气道急救核心技能完整覆盖",
    "适合企业培训及个人学习",
    "全国多城市开课，报名灵活",
  ];

  return (
    <section className="scroll-mt-24" aria-labelledby="home-course-value">
      <h2 id="home-course-value" className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
        为什么很多人选择 AHA 急救培训
      </h2>
      <p className="mt-3 max-w-3xl text-base text-neutral-700 dark:text-neutral-300">
        从课程体系与技能覆盖出发，便于个人与机构评估是否匹配自身需求。
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((t) => (
          <li key={t} className={cardBase}>
            <p className="flex gap-3 text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
              <span className="shrink-0 text-emerald-600 dark:text-emerald-500" aria-hidden>
                ✓
              </span>
              <span>{t}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** SECTION 5 */
function CourseCTA() {
  return (
    <section
      className="scroll-mt-24 rounded-3xl border-2 border-neutral-200 bg-gradient-to-b from-neutral-50 to-white px-6 py-10 shadow-lg sm:px-10 sm:py-12 lg:px-14 lg:py-14 dark:border-neutral-800 dark:from-neutral-950 dark:to-neutral-900"
      aria-labelledby="home-course-cta"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="home-course-cta" className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          现在开始学习急救技能
        </h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-800 sm:text-lg dark:text-neutral-200">
          全国多城市开课
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          可查看最近培训城市与时间安排
        </p>
        <div className="mt-8">
          <HomeCourseCTA />
        </div>
      </div>
    </section>
  );
}

/**
 * 首页 Hero 下方：完整课程模块（介绍 → 技能 → 信息 → 价值 → CTA）
 */
export default function HomeCourseSection() {
  return (
    <section
      id="home-course"
      className="border-b border-[var(--border)] bg-white py-16 sm:py-20 lg:py-24 dark:bg-black"
      aria-label="AHA Heartsaver 课程介绍"
    >
      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:space-y-20 sm:px-6 lg:space-y-24 lg:px-8">
        <CourseIntro />
        <CourseSkills />
        <CourseInfo />
        <CourseValue />
        <CourseCTA />
      </div>
    </section>
  );
}
