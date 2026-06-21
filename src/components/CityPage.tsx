import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { EnrollModal } from "@/components/EnrollModal";
import type { City } from "@/data/cities";
import {
  getCityShortName,
  getDisplayLocations,
  hasSpecificLocations,
  parseScheduleDates,
} from "@/data/cities";
import {
  APPLICABLE_SCENARIOS,
  BASIC_FIRST_AID_TOPICS,
  BRAND_NAME,
  buildCityJsonLd,
  cityPageStyles,
  COURSE_NAME,
  CTA_BUTTON_CLASS,
  ENTERPRISE_TOPICS,
  ENVIRONMENT_TOPICS,
  getCityFaqItems,
  getCityPageTitle,
  INTERNAL_EMERGENCY_TOPICS,
  LEGAL_NAME,
  TARGET_AUDIENCE,
  TEACHING_FLOW,
  TRAINING_IMAGES,
  TRAUMA_TOPICS,
} from "@/lib/city-landing";

const { SECTION_CLASS, H2_CLASS, P_CLASS, P_SHORT, UL_CLASS, H3_CLASS } = cityPageStyles;

type CityPageProps = {
  city: City;
  slug: string;
};

function CityCtaBlock({ short, heading }: { short: string; heading?: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      {heading && <p className="text-base font-medium text-neutral-900 mb-4">{heading}</p>}
      <div className="flex flex-wrap gap-3">
        <EnrollModal cityName={short} buttonText={`报名参加${short}急救培训`} />
        <Link href="/contact" className={CTA_BUTTON_CLASS}>
          微信咨询
        </Link>
        <Link href="/cities" className={CTA_BUTTON_CLASS}>
          查看培训城市
        </Link>
        <a href="tel:13512456138" className={CTA_BUTTON_CLASS}>
          电话咨询
        </a>
      </div>
    </div>
  );
}

export default function CityPage({ city, slug }: CityPageProps) {
  const short = getCityShortName(city);
  const title = getCityPageTitle(city);
  const displayLocations = getDisplayLocations(city.locations).slice(0, 3);
  const showAddresses = hasSpecificLocations(city.locations);
  const { isMinGroup, dates } = parseScheduleDates(city.scheduleDates);
  const faqItems = getCityFaqItems(city);
  const jsonLdBlocks = buildCityJsonLd(city, slug);

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {jsonLdBlocks.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
          />
        ))}

        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "首页", href: "/" },
              { label: "培训城市", href: "/cities" },
              { label: short },
            ]}
          />
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">{title}</h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600">
          CPR心肺复苏 · AED自动体外除颤仪使用 · 气道异物梗阻急救
        </p>

        <section className="mt-8 mb-10">
          <p className={P_CLASS}>
            {BRAND_NAME}是{LEGAL_NAME}旗下急救培训品牌，在{short}开展 {COURSE_NAME}{" "}
            急救员认证课程。课程面向个人学员、企业员工、学校及公共机构工作人员，帮助学员系统学习急救基础知识、CPR心肺复苏、AED自动体外除颤仪使用、气道异物梗阻急救，以及常见急症和创伤的现场处理方法。
          </p>
          <p className={`mt-3 ${P_CLASS}`}>
            课程采用互动式学习模式，通过 AHA 官方课程视频、导师讲解示范、现场实操练习和随堂考核相结合的方式进行。学员将在课堂中按照“边看、边学、边练、边考核”的节奏完成学习，真正掌握可以在紧急情况下使用的急救技能。
          </p>
          <p className={`mt-3 ${P_CLASS}`}>
            完成培训并通过考核后，学员可获得 AHA Heartsaver 急救员证书，证书有效期为2年。
          </p>
          <div className="mt-6">
            <CityCtaBlock short={short} />
          </div>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{short}急救培训课程介绍</h2>
          <p className={P_CLASS}>
            {short} AHA Heartsaver 急救员课程是一门面向公众和非医务人员的系统急救培训课程，适合希望学习急救技能的个人，也适合企业、学校、公共机构和社会团体组织员工参加安全培训。
          </p>
          <p className={`mt-3 ${P_CLASS}`}>
            课程内容不仅包括 CPR 心肺复苏、AED 自动体外除颤仪使用和气道异物梗阻急救，还包括急救员职责、自我防护、启动120、常见内科急症、创伤急症、环境相关急症等内容。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>为什么要在{short}参加急救培训？</h2>
          <p className={P_CLASS}>
            很多人听说过 CPR 和 AED，也知道急救很重要，但真正遇到突发情况时，往往会因为“不确定怎么做”“担心做错”“不知道什么时候使用AED”而犹豫。
          </p>
          <p className={`mt-3 ${P_CLASS}`}>
            一次系统的急救培训，可以帮助学员把零散的急救知识转化为清晰的行动流程。
          </p>
          <p className={`mt-3 ${P_SHORT}`}>适用场景包括：</p>
          <ul className={UL_CLASS}>
            {APPLICABLE_SCENARIOS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{short}急救培训适合人群</h2>
          <ul className={UL_CLASS}>
            {TARGET_AUDIENCE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{short}急救培训地点</h2>
          {showAddresses ? (
            <>
              <p className={P_SHORT}>目前{short}培训地点包括：</p>
              <ul className="space-y-2 list-none p-0 m-0">
                {displayLocations.map((addr, i) => (
                  <li key={i}>
                    <address className="not-italic text-neutral-700 leading-relaxed">{addr}</address>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className={P_CLASS}>{short}具体培训地址将在报名确认后通知。</p>
          )}
          {isMinGroup ? (
            <div className="mt-4">
              <p className="font-medium text-neutral-900">近期{short}急救培训安排：</p>
              <p className="mt-2 text-neutral-700 leading-relaxed">
                满6人可预约开课，具体时间和地点以报名确认为准。
              </p>
            </div>
          ) : dates.length > 0 ? (
            <div className="mt-4">
              <p className="font-medium text-neutral-900">近期{short}急救培训时间：</p>
              <ul className="mt-2 list-disc list-inside text-neutral-700 space-y-1">
                {dates.map((date) => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>课程内容与学习流程</h2>
          <p className={P_CLASS}>
            {short} AHA Heartsaver 急救员课程采用互动式学习模式，学员将在导师带领下，通过观看官方课程视频、导师讲解示范、现场实操练习和随堂考核完成学习。
          </p>
          <p className={`mt-3 ${P_CLASS}`}>
            课程不是单纯听课，而是按照“边看、边学、边练、边考核”的节奏推进。导师会在关键技能环节进行示范、观察和纠正，帮助学员逐步掌握规范的急救流程和操作方法。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>急救课程内容</h2>
          <h3 className={H3_CLASS}>急救基础知识</h3>
          <ul className={UL_CLASS}>
            {BASIC_FIRST_AID_TOPICS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className={H3_CLASS}>内科急症处理</h3>
          <ul className={UL_CLASS}>
            {INTERNAL_EMERGENCY_TOPICS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className={H3_CLASS}>创伤急症处理</h3>
          <ul className={UL_CLASS}>
            {TRAUMA_TOPICS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className={H3_CLASS}>环境相关急症处理</h3>
          <ul className={UL_CLASS}>
            {ENVIRONMENT_TOPICS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>心肺复苏课程内容</h2>
          <h3 className={H3_CLASS}>成人 CPR 心肺复苏与 AED 使用</h3>
          <p className={P_CLASS}>
            学习成人心脏骤停的识别、胸外按压、人工呼吸、AED 使用流程，以及如何与他人配合完成急救。
          </p>
          <h3 className={H3_CLASS}>儿童 CPR 心肺复苏与 AED 使用</h3>
          <p className={P_CLASS}>
            学习儿童心肺复苏的操作要点，以及儿童场景下 AED 的使用注意事项。
          </p>
          <h3 className={H3_CLASS}>婴儿 CPR 心肺复苏</h3>
          <p className={P_CLASS}>
            学习婴儿心肺复苏的按压位置、按压方式、通气方法和完整操作流程。
          </p>
          <h3 className={H3_CLASS}>气道异物梗阻急救</h3>
          <p className={P_CLASS}>
            学习成人、儿童和婴儿发生气道异物梗阻时的识别方法和现场急救处理流程。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>教学模式</h2>
          <p className={P_CLASS}>本课程采用互动式学习，强调“边看边练，边练边考”。</p>
          <p className={`mt-3 ${P_SHORT}`}>学习流程包括：</p>
          <ul className={UL_CLASS}>
            {TEACHING_FLOW.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>培训时长</h2>
          <p className={P_CLASS}>
            AHA Heartsaver 急救员课程通常为全天课程，约8小时左右。具体课程时间会根据课程版本、学员人数、现场练习情况和考核进度进行适当调整。课程结束时间以现场教学和考核完成情况为准。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>培训现场</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 list-none p-0 m-0">
            {TRAINING_IMAGES.map(({ src, caption, alt }) => (
              <li key={src}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    alt={alt(short)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-600 text-center">{caption(short)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{short}企业急救培训</h2>
          <p className={P_CLASS}>
            {BRAND_NAME}可为{short}及周边企业提供团体急救培训服务，适用于企业安全培训、工会活动、EHS培训、员工关怀项目、AED配置后的员工培训等场景。
          </p>
          <p className={`mt-3 ${P_SHORT}`}>企业培训内容可包括：</p>
          <ul className={UL_CLASS}>
            {ENTERPRISE_TOPICS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={`mt-3 ${P_CLASS}`}>
            企业可以选择到培训教室集中培训，也可以根据人数和场地情况安排上门培训。
          </p>
          <div className="mt-5">
            <Link
              href="/enterprise-training"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 px-5 py-2.5 text-sm font-medium hover:bg-neutral-50"
            >
              咨询企业培训
            </Link>
          </div>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>关于{BRAND_NAME}</h2>
          <p className={P_CLASS}>
            {BRAND_NAME}是{LEGAL_NAME}旗下急救培训品牌，长期开展 AHA Heartsaver
            急救员课程、企业急救培训和团体定制培训服务。
          </p>
          <p className={`mt-3 ${P_CLASS}`}>
            在{short}，{BRAND_NAME}面向个人学员、企业员工、学校及公共机构工作人员，提供 CPR
            心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻急救、常见内科急症、创伤急症和环境相关急症处理等培训内容。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>FAQ常见问题</h2>
          <dl className="space-y-4">
            {faqItems.map(({ question, answer }) => (
              <div key={question}>
                <dt className="font-medium text-neutral-900">{question}</dt>
                <dd className="mt-1 text-neutral-700">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={SECTION_CLASS}>
          <p className={P_CLASS}>
            如果你希望在{short}学习 CPR 心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻急救以及常见急症处理方法，可以通过
            {BRAND_NAME}报名参加 AHA Heartsaver 急救员认证课程。
          </p>
          <div className="mt-6">
            <CityCtaBlock short={short} heading="报名入口" />
          </div>
        </section>
      </article>
    </div>
  );
}
