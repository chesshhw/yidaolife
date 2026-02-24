import Image from "next/image";
import Link from "next/link";
import { REGIONS, CITIES_BY_REGION } from "@/data/cities";

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex flex-col bg-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/china-map.jpg"
            alt="全国AHA HeartSaver急救员认证开课城市分布"
            fill
            className="object-contain object-[50%_60%]"
            priority={false}
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-white/15" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" aria-hidden />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 sm:p-8">
          <div className="max-w-xl w-full rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl border border-white/40 px-8 py-10 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
              全国AHA HeartSaver急救员认证开课城市
            </h1>
            <p className="text-base text-neutral-600 mt-3">
              全国统一认证 · 多城可约 · 支持企业团训
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#intro" className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800">
                了解说明
              </a>
              <a href="#regions" className="inline-flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 px-6 py-3 text-sm font-medium hover:bg-neutral-100">
                按区域查看
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-neutral-300 text-neutral-700 px-6 py-3 text-sm font-medium hover:bg-neutral-100">
                联系顾问
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 全国统一认证说明 + 400+ 字介绍 */}
      <section id="intro" className="py-14 scroll-mt-24 bg-white border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">全国统一AHA体系</h2>
          <div className="text-neutral-700 leading-relaxed space-y-4 max-w-[75ch]">
            <p>
              全国AHA HeartSaver急救员认证中心在全国多座城市开设美国心脏协会（AHA）HeartSaver急救员认证课程。
              各地课程采用统一的AHA教学大纲与考核标准，学员在任一城市完成的认证均全国认可、全球通用。
            </p>
            <p>
              无论您在北京、天津、上海、广州或其他开课城市报名，都将接受相同的CPR心肺复苏、AED使用、气道异物梗阻处理等核心内容培训，
              通过考核后获得AHA官方电子证书，证书效力一致。
            </p>
          </div>

          <h2 className="text-xl font-semibold text-neutral-900 mt-10 mb-6">全国同步排期</h2>
          <div className="text-neutral-700 leading-relaxed space-y-4 max-w-[75ch]">
            <p>
              各开课城市排期与全国同步更新，方便学员根据自身时间与所在地选择就近城市参加培训。
              若您所在城市暂无排期，也可选择相邻城市或联系客服咨询最新档期。
            </p>
            <p>
              报名后由客服确认具体培训日期与地点，确保每位学员都能在合适的时间完成HeartSaver急救员认证课程。
            </p>
          </div>

          <h2 className="text-xl font-semibold text-neutral-900 mt-10 mb-6">支持企业团训</h2>
          <div className="text-neutral-700 leading-relaxed space-y-4 max-w-[75ch]">
            <p>
              全国AHA HeartSaver急救员认证中心支持企业团体培训，可上门授课、可定制时间、可开具发票，
              并可将急救培训纳入企业安全培训体系，满足企业合规与员工技能提升需求。
            </p>
            <p>
              无论企业位于哪一开课城市，均可联系客服获取企业团训方案与报价。
            </p>
          </div>

          <h2 className="text-xl font-semibold text-neutral-900 mt-10 mb-6">官方电子证书</h2>
          <div className="text-neutral-700 leading-relaxed space-y-4 max-w-[75ch]">
            <p>
              完成培训并通过考核的学员将获得美国心脏协会（AHA）官方电子证书，
              证书全球通用，可用于出国、就职、企业年审等场景。
            </p>
            <p>
              全国各城市颁发的AHA HeartSaver证书样式与效力一致，由AHA官方体系统一认证。
            </p>
          </div>

          <h2 className="text-xl font-semibold text-neutral-900 mt-10 mb-6">全国真实培训地址</h2>
          <div className="text-neutral-700 leading-relaxed space-y-4 max-w-[75ch]">
            <p>
              各城市培训均在固定场地进行，地址明确至区、街道、大厦及门牌号，
              报名后可获取详细交通指引。培训地点位于各城市核心区域，交通便利。
            </p>
          </div>
        </div>
      </section>

      {/* 按区域分类 + 每个城市内部链接 */}
      <section id="regions" className="py-14 pb-24 scroll-mt-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-8">按区域选择城市</h2>
          <div className="space-y-12">
            {REGIONS.map((r) => {
              const cities = CITIES_BY_REGION[r.id] ?? [];
              if (cities.length === 0) return null;
              return (
                <div key={r.id} id={`region-${r.id}`} className="scroll-mt-24">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">{r.name}</h3>
                  <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
                    {cities.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/city/${c.slug}`}
                          className="inline-flex items-center rounded-xl bg-white border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 transition-colors shadow-sm"
                        >
                          {c.name}AHA急救培训
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
