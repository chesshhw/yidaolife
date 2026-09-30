import Link from "next/link";

const skills = [
  { tag: "CPR", title: "心肺复苏", description: "在模拟人上练习胸外按压与人工呼吸，了解成人、儿童和婴儿的相关技能。", details: "动作练习 / 导师指导 / 技能考核" },
  { tag: "AED", title: "自动体外除颤仪使用", description: "认识 AED，在训练设备上练习操作，并与心肺复苏流程相结合。", details: "设备操作 / 流程配合 / 情境演练" },
  { tag: "FIRST AID", title: "基础急救", description: "学习现场安全判断、紧急呼救、气道异物梗阻处理和常见急症、创伤的应对。", details: "现场判断 / 基础技能 / 场景应用" },
];

export default function HomeCourseSection() {
  return (
    <section id="home-course" className="section-space scroll-mt-24" aria-labelledby="home-course-heading">
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div><p className="eyebrow">课程体系</p><h2 id="home-course-heading" className="section-title mt-3">AHA Heartsaver<br />急救员课程</h2></div>
          <div><p className="section-intro">采用美国心脏协会（AHA）Heartsaver 课程体系，面向公众及非医疗人员。将视频教学、导师讲解、实际操作与技能考核结合，帮助学员理解每一步，也练习每一步。</p><Link href="/programs#heartsaver" className="text-link mt-3">了解完整课程体系 <span aria-hidden>↗</span></Link></div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {skills.map((skill) => <article key={skill.tag} className="surface-card flex flex-col p-6 sm:p-7"><p className="text-xs font-semibold tracking-[0.12em] text-[var(--brand)]">{skill.tag}</p><h3 className="mt-4 text-xl font-semibold">{skill.title}</h3><p className="mb-6 mt-4 text-sm leading-7 text-[var(--muted)]">{skill.description}</p><p className="mt-auto border-t border-[var(--border)] pt-4 text-xs leading-6 text-[var(--muted)]">{skill.details}</p></article>)}
        </div>
        <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-[var(--border)] pt-7 lg:grid-cols-4">
          {[["培训时长", "通常一天，约 6–8 小时"], ["授课方式", "讲解、实操与技能考核"], ["证书说明", "通过考核后获对应课程证书"], ["适合人群", "个人、企业员工、教师与家长"]].map(([title, value]) => <div key={title}><dt className="text-xs text-[var(--muted)]">{title}</dt><dd className="mt-2 text-sm font-medium leading-6">{value}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
