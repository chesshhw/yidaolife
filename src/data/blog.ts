export type BlogSection = {
  heading: string;
  paragraphs: string[];
  blocks?: Array<
    | { type: "paragraph"; text: string; links?: Array<{ text: string; url: string }> }
    | { type: "list"; items: string[] }
  >;
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
  table?: { headers: string[]; rows: string[][]; mobileCards?: boolean };
  image?: {
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
    layout?: "wide" | "compact";
  };
  qrCard?: {
    title: string;
    cta?: string;
    image: { src: string; alt: string };
    textLines: string[];
  };
  subsections?: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  /** 真实修改日期；缺省时与 publishedAt 一致 */
  updatedAt?: string;
  /** 独立 SEO 标题（不含站点 title template 重复后缀） */
  seoTitle?: string;
  author?: string;
  authorType?: "Person" | "Organization";
  brand?: string;
  organization?: string;
  topics?: string[];
  ogImage?: { src: string; alt: string; width?: number; height?: number };
  relatedSlugs?: string[];
  /** 标题下方导语（非 H2） */
  lead?: string[];
  /** FAQ（用于页面展示与 FAQPage schema） */
  faqItems?: Array<{ q: string; a: string }>;
  sources?: Array<{
    id: string;
    title: string;
    publisher: string;
    url: string;
    date?: string | null;
    note?: string;
  }>;
  sourcesVerifiedAt?: string;
  bottomCta?: {
    primary: { label: string; modalTitle: string; qrImageSrc: string; qrAlt: string };
    secondary: { label: string; href: string };
  };
  sections: BlogSection[];
};

export const DEFAULT_BLOG_AUTHOR = "黄老师";

export const BLOG_POSTS: BlogPost[] = [
  {
    "slug": "fitness-certification-cpr-aed-requirements",
    "title": "健身教练考证需要 CPR/AED 证书吗？NSCA、ACSM、ACE、NASM 要求与纸质证书说明",
    "seoTitle": "健身教练CPR/AED证书要求与AHA纸质卡｜都会急救",
    "excerpt": "对照 NSCA、ACSM、ACE、NASM 的急救资格要求，区分 PADI 的 CPR 与 First Aid 前置条件，并说明中国大陆 AHA 纸质课程完成卡的使用与核验。",
    "description": "准备 NSCA、ACSM、ACE 或 NASM 健身认证？了解 CPR/AED、实操与提交时间要求，区分 PADI 急救条件，以及大陆 AHA 纸质证书如何使用和核验。",
    "publishedAt": "2026-10-22",
    "brand": "都会急救",
    "organization": "天津一道技术服务有限公司",
    "topics": [
      "健身教练CPR AED证书",
      "NSCA CPR AED",
      "ACSM CPR AED",
      "ACE成人CPR",
      "NASM CPR AED",
      "PADI急救培训",
      "AHA纸质证书",
      "Heartsaver"
    ],
    "relatedSlugs": [
      "aha-certificate-verification-mainland-china",
      "why-first-aid-hands-on-practice-matters",
      "reduce-risk-sudden-cardiac-arrest-during-exercise"
    ],
    "lead": [
      "准备健身教练、体能训练或潜水相关认证时，除了专业课程与考试，急救培训证明也是需要提前核对的材料。CPR 指心肺复苏，AED 指自动体外除颤器；它们与 First Aid（急救）相关，但不能把这些课程名称直接当成同一种资格。",
      "先看结论：NSCA-CPT、CSCS、ACSM-CPT 和 NASM-CPT 均设有 CPR/AED 要求；ACE 对成人 CPR 有明确要求，AED 则存在地区差异。PADI 部分进阶和职业课程要求 CPR 加急救培训，不能仅凭一张写着 CPR/AED 的卡就认定全部满足。"
    ],
    "sections": [
      {
        "heading": "一、四家常见健身认证，对急救证书分别有什么要求？",
        "paragraphs": [
          "下面按具体认证项目比较，资料核验日期为2026年10月22日。表格聚焦急救条件，不替代各项目对年龄、学历、专业背景等其他资格的要求。"
        ],
        "table": {
          "headers": [
            "认证项目",
            "急救培训要求",
            "什么时候需要准备"
          ],
          "rows": [
            [
              "NSCA-CPT / CSCS",
              "有效 CPR/AED，含动手技能考核。首次认证应按 NSCA 要求选择课程。",
              "可以先考，在考试日起1年内补交有效证明；所有资格满足后才取得认证。[S1][S2][S3]"
            ],
            [
              "ACSM-CPT / ACSM-EP",
              "有效成人 CPR/AED，须有现场、面对面的实操考核。",
              "申请或报名考试时核对资格；不接受完全没有现场实操的纯线上课程。[S4][S5][S6]"
            ],
            [
              "ACE Certified Personal Trainer",
              "有效成人 CPR，含现场或虚拟实操技能考核；AED 要求因地区而异。",
              "注册及参加认证考试时须符合资格，证书应在考试日有效。[S7][S8][S9]"
            ],
            [
              "NASM-CPT（NCCA认证考试）",
              "有效 CPR/AED。NASM 对其指定线上课程另有接受安排。",
              "考试前取得，考试当天须出示有效证明；购买学习课程与参加认证考试是不同环节。[S10][S11]"
            ]
          ],
          "mobileCards": true
        },
        "blocks": [
          {
            "type": "paragraph",
            "text": "ACE 的官方页面对 AED 必需地区的列举存在差异，但均不能支持“中国大陆报考 ACE 一律强制 AED”的说法。对于实际训练场景，学习 AED 仍有价值；学习建议与考试硬性条件应分开理解。[S7][S8]"
          },
          {
            "type": "paragraph",
            "text": "ACSM-CEP 属于不同层级，现行资格列有 BLS、ACLS 或 Professional Rescuer CPR，并要求现场实操。不要把一般 Heartsaver 课程直接当作所有 ACSM 认证的通用替代。[S6]"
          }
        ]
      },
      {
        "heading": "二、AHA Heartsaver 可以用于健身教练考证吗？",
        "paragraphs": [
          "AHA（美国心脏协会）的 Heartsaver CPR AED，以及包含急救内容的 Heartsaver First Aid CPR AED，是可以按目标资格要求核对的培训路径。选择时要核对课程全名、实际完成的模块、技能考核及卡片有效期，不能只看“AHA”或“HS”缩写。",
          "ACE 等机构列有多个可接受培训提供方，ACSM 也明确强调课程要求而非只限定一家培训机构。因此，正确的说法是“AHA 是可供考虑的培训路径之一”，而不是“这些认证只承认 AHA”。[S5][S9]"
        ],
        "bullets": [
          "需要成人 CPR 和 AED 时，确认这两个模块都实际完成；只学 First Aid 不能自动替代 CPR/AED。",
          "需要 First Aid 时，确认选择的是包含急救模块的课程，不要只按 CPR/AED 名称报名。",
          "AHA Heartsaver 是课程系列。现行国际课程页特别注明 Heartsaver Basic 不面向岗位或监管资格要求，不应把所有版本都宣传为“考证通用”。[S14]",
          "AHA Heartsaver CPR AED 课程完成卡通常有效两年。专业认证的续证周期不等于急救卡有效期，应以卡片及报考规则为准。[S18]"
        ],
        "blocks": [
          {
            "type": "paragraph",
            "text": "如果计划将同一份急救证明用于多个认证或雇主审核，优先逐项核对实操与课程级别。NASM 接受的某种线上课程，不代表 NSCA、ACSM 或 PADI 也接受同一课程。[S3][S5][S11][S12]"
          }
        ]
      },
      {
        "heading": "三、准备 PADI 救援潜水员、潜水长或教练课程，还要注意 First Aid",
        "paragraphs": [
          "PADI 官方说明，Rescue Diver（救援潜水员）、Divemaster（潜水长）和 Instructor（教练）相关课程需要近24个月内的 CPR 与 First Aid 培训。EFR Primary and Secondary Care 是其列明的路径，其他机构课程需要按内容和实操要求核对。[S12]",
          "PADI 同时明确，单独的 EFR CPR & AED 课程不满足上述三类课程的急救前置条件。可见“学过 CPR/AED”和“已满足 PADI 要求”不是一回事。[S12]",
          "如果选择 AHA 等其他机构课程，建议先将课程全名、所含模块和实操安排交给 PADI 教练确认。潜水教练路线还有其他资格条件，不能将一张普通学员课程完成卡写成获得教练资格的充分条件。[S12][S13]"
        ]
      },
      {
        "heading": "四、中国大陆的 AHA 纸质证书，没有电子版还能使用吗？",
        "paragraphs": [
          "都会急救目前在中国大陆安排的 AHA 课程，统一发放纸质课程完成卡，不提供 AHA eCard（电子课程完成卡）。这是都会急救当前的发卡安排。",
          "可以作为课程完成凭证使用。纸质形式本身不会使一张真实、有效的 AHA 课程完成卡失效；没有电子版，也不能单独成为认定证书不正规的依据。具体用于哪项认证，还需满足该项目的课程、实操、有效期及材料提交要求。",
          "AHA 在2020年12月的国际电子卡说明中曾明确，中国当时暂不强制使用 eCard；2026年国际管理文件也继续规定适用地区纸质卡的管理办法。纸质卡是正式管理的课程完成凭证形式，学员无需仅因没有电子版就重复参加培训。其他培训中心的具体发卡方式，以其当期安排为准。[S15][S17]",
          "“纸质卡能作为培训凭证使用”与“任何申请都一定审核通过”需要区分。以 NSCA 为例，其2026年认证手册允许提交 CPR/AED 证书正反面的扫描件、复印件等材料供审核，并没有把电子卡列为唯一提交形式。[S3]"
        ],
        "bullets": [
          "留好卡片正反面，核对姓名、课程名称、发证与到期信息、培训中心信息。",
          "报考平台要求上传文件时，按要求提供清晰扫描件；纸质卡的扫描件不等于 AHA 系统签发的 eCard。",
          "需要核验真伪或课程记录时，联系原发证培训中心。AHA 官方列明了这条核验渠道。[S16]",
          "如果接收单位要求特定编号、验证方式或额外证明，先把要求交给培训中心确认，再安排报考。"
        ],
        "links": [
          {
            "label": "延伸阅读：中国大陆 AHA 证书与官网核验说明",
            "href": "/blog/aha-certificate-verification-mainland-china"
          }
        ]
      },
      {
        "heading": "五、报名前，把这五件事一次问清楚",
        "paragraphs": [
          "把目标认证放在课程选择之前，可以减少重复培训或临近考试时补材料的情况。"
        ],
        "bullets": [
          "准确项目：是 NSCA-CPT、CSCS、ACSM-CPT、ACE Certified Personal Trainer、NASM-CPT，还是某一级别的 PADI 课程？",
          "课程模块：需要成人 CPR、AED、First Aid，还是 BLS 等更高层级？",
          "实操形式：要求现场考核，允许虚拟技能考核，还是有特定线上课程例外？",
          "时间安排：何时交材料、考试日是否仍有效，以及培训中心的发卡周期。",
          "凭证材料：当前发纸质卡还是 eCard，需提交哪些页面，以及遇到核验问题联系谁。"
        ],
        "blocks": [
          {
            "type": "paragraph",
            "text": "滑雪、登山及赛事急救跑者等项目的条件由具体组织或赛事制定。计划将同一张急救卡用于这些场景时，也应先核对当期招募或资格文件。"
          }
        ]
      },
      {
        "heading": "六、个人考证与企业团体培训，都可以先按用途沟通",
        "paragraphs": [
          "个人学员咨询时，可以告诉都会急救：目标认证、预计考试日期和所在城市，便于沟通课程模块、实操安排及发卡方式。",
          "健身房、工作室或企业组织团体培训时，可以一并说明人数、岗位和场地设备，让培训需求与团队实际使用场景相匹配。具体课程、排期及费用以咨询确认的安排为准。"
        ],
        "links": [
          {
            "label": "查看个人急救课程",
            "href": "/programs"
          },
          {
            "label": "查看开课城市",
            "href": "/cities"
          },
          {
            "label": "了解企业与团体培训",
            "href": "/enterprise-training"
          },
          {
            "label": "咨询课程与证书安排",
            "href": "/contact#inquiry"
          }
        ]
      },
      {
        "heading": "常见问题",
        "paragraphs": []
      }
    ],
    "faqItems": [
      {
        "q": "NSCA、ACSM、ACE、NASM 都必须考 AHA Heartsaver 吗？",
        "a": "不是。相关认证对急救培训有要求，但并非只接受 AHA。应按具体项目核对课程模块、实操考核、有效期与提交时间；ACE 的 AED 要求还有地区差异。"
      },
      {
        "q": "没有电子版，AHA 纸质证书就不能用于健身认证吗？",
        "a": "不能这样判断。都会急救目前在中国大陆安排的AHA课程统一发放纸质课程完成卡，不提供AHA eCard。真实有效的纸质卡不会仅因没有电子版而失效，NSCA也允许提交证书正反面扫描件等材料。具体申请是否符合条件，还取决于课程内容、实操、有效期和接收机构规则。"
      },
      {
        "q": "是不是必须先取得 CPR/AED 证书，才能参加 NSCA 考试？",
        "a": "NSCA-CPT和CSCS允许未持当前有效CPR/AED证明的候选人先报名考试，并在考试日起一年内补交有效材料；完成全部资格条件后才取得认证。实际安排应查阅当前资格页。"
      },
      {
        "q": "PADI 只提交 CPR/AED 证书就够了吗？",
        "a": "不一定。PADI救援潜水员、潜水长及教练相关课程要求近24个月内的CPR和First Aid培训，并有实操要求。单独CPR/AED课程不能自动满足这项前置资格，其他机构课程应由PADI教练确认。"
      },
      {
        "q": "纯线上 CPR/AED 课程可以用于所有健身认证吗？",
        "a": "不可以一概而论。ACSM要求现场实操，ACE要求现场或虚拟技能考核，NASM对指定线上课程有接受安排。打算跨机构使用时，必须逐项核对。"
      },
      {
        "q": "AHA 课程完成卡一般有效多久，如何核验？",
        "a": "AHA Heartsaver CPR AED课程完成卡通常有效两年，具体以卡片记录为准。需要核验课程完成卡时，可联系原签发培训中心；不要把专业资格的续证周期当成急救卡有效期。"
      }
    ],
    "sources": [
      {
        "id": "S1",
        "title": "NSCA-CPT 考试资格",
        "publisher": "NSCA",
        "url": "https://www.nsca.com/certification/nsca-cpt/nsca-cpt-exam-prerequisites/",
        "date": null
      },
      {
        "id": "S2",
        "title": "CSCS 考试资格",
        "publisher": "NSCA",
        "url": "https://www.nsca.com/certification/cscs/cscs-exam-prerequisites/",
        "date": null
      },
      {
        "id": "S3",
        "title": "NSCA Certification Handbook",
        "publisher": "NSCA",
        "url": "https://www.nsca.com/globalassets/certification/certification-pdfs/nsca-certification-handbook.pdf",
        "date": "2026-07-01 生效",
        "note": "正文第7页：实操；第10页：资格材料与证书正反面扫描/复印件。"
      },
      {
        "id": "S4",
        "title": "ACSM-CPT 认证与候选手册",
        "publisher": "ACSM",
        "url": "https://acsm.org/certification/get-certified/personal-trainer/",
        "date": null,
        "note": "链接的2025年7月候选手册列成人CPR/AED及现场实操。"
      },
      {
        "id": "S5",
        "title": "国际考生 CPR/AED 常见问题",
        "publisher": "ACSM",
        "url": "https://acsm.org/certification/get-certified/international/",
        "date": null
      },
      {
        "id": "S6",
        "title": "ACSM-EP / CEP 资格更新",
        "publisher": "ACSM",
        "url": "https://acsm.org/updated-acsm-ep-and-acsm-cep-certifications-requirements-and-accreditation/",
        "date": "2026-02-06 修订",
        "note": "原文章发布于2020-11-04；本文使用页面明确标记的2026修订信息。"
      },
      {
        "id": "S7",
        "title": "ACE 考试资格与报名",
        "publisher": "ACE",
        "url": "https://www.acefitness.org/fitness-certifications/schedule-your-exam/",
        "date": null
      },
      {
        "id": "S8",
        "title": "ACE 个人教练认证",
        "publisher": "ACE",
        "url": "https://www.acefitness.org/fitness-certifications/personal-trainer-certification/default.aspx",
        "date": null,
        "note": "AED地区列表与考试预约页不完全一致；两页均不足以支持中国大陆一律强制AED。"
      },
      {
        "id": "S9",
        "title": "CPR/AED 提供方及技能考核要求",
        "publisher": "ACE",
        "url": "https://www.acefitness.org/fitness-certifications/certified-cpr/",
        "date": null
      },
      {
        "id": "S10",
        "title": "NASM-CPT 考试要求",
        "publisher": "NASM",
        "url": "https://www.nasm.org/certified-personal-trainer-exam-info",
        "date": null
      },
      {
        "id": "S11",
        "title": "NASM / AFAA CPR powered by ASTI",
        "publisher": "NASM",
        "url": "https://www.nasm.org/products/nasm-afaa-cpr-powered-by-asti",
        "date": null
      },
      {
        "id": "S12",
        "title": "CPR 与急救课程、PADI 前置资格 FAQ",
        "publisher": "PADI",
        "url": "https://www.padi.com/education/emergency-first-response",
        "date": null
      },
      {
        "id": "S13",
        "title": "其他机构 CPR 与急救培训的审核要求",
        "publisher": "PADI",
        "url": "https://pros-blog.padi.com/meeting-cpr-and-first-aid-requirements-for-padi-courses-2/",
        "date": "2018-11-05",
        "note": "与当前PADI课程FAQ交叉核对；不将旧文写成新规。"
      },
      {
        "id": "S14",
        "title": "Heartsaver First Aid CPR AED 课程说明",
        "publisher": "AHA",
        "url": "https://international.heart.org/en/courses/heartsaver-first-aid-cpr-aed",
        "date": null
      },
      {
        "id": "S15",
        "title": "国际电子课程完成卡 FAQ",
        "publisher": "AHA",
        "url": "https://www.heart.org/-/media/a735cdafd2374549b1af09230380a51c.ashx",
        "date": "2020-12 版本",
        "note": "中国当时暂不强制eCard，不能据此断言2026年全国一律只有纸质卡。"
      },
      {
        "id": "S16",
        "title": "课程完成卡与核验说明",
        "publisher": "AHA",
        "url": "https://cpr.heart.org/en/resources/course-card-information",
        "date": "参考指南标注2026-10更新"
      },
      {
        "id": "S17",
        "title": "2026 国际项目管理手册变更对照",
        "publisher": "AHA",
        "url": "https://international.heart.org/en/-/media/International/ECC_News/Intl_PAM-changes-comparison-table_Final-2.pdf?sc_lang=en",
        "date": "2026版",
        "note": "包括适用地区纸质课程完成卡管理要求；不是大陆统一发卡公告。"
      },
      {
        "id": "S18",
        "title": "Heartsaver CPR AED 课程及有效期",
        "publisher": "AHA",
        "url": "https://cpr.heart.org/en/cpr-courses-and-kits/heartsaver/heartsaver-cpr-aed-training",
        "date": null
      }
    ],
    "sourcesVerifiedAt": "2026-10-22"
  },
  {
    "slug": "outdoor-first-aid-preparation-before-hiking",
    "title": "救护车难以到达的户外活动，急救准备应该多想哪几步？",
    "seoTitle": "户外活动急救准备：路线、求助与救援交接｜都会急救",
    "excerpt": "从北京市卫健委公布的一起山地救援案例出发，梳理个人徒步和企业户外活动出发前需要明确的路线、联络、现场分工与救援交接。",
    "description": "户外活动发生急症，救护车可能无法直接抵达。结合2026年10月16日发布的北京山地救援报道，整理适合个人与团体的出行准备问题。",
    "publishedAt": "2026-10-19",
    "topics": [
      "户外急救",
      "徒步安全",
      "企业户外活动",
      "应急准备"
    ],
    "relatedSlugs": [
      "how-to-do-cpr",
      "why-first-aid-hands-on-practice-matters"
    ],
    "lead": [
      "城市里熟悉的门牌地址、平整通道和救护车接应点，到了山路上可能都不具备。安排徒步或企业户外活动时，除了携带急救用品，还需要提前想清楚：人在哪里，谁联系救援，救援人员怎样找到队伍。"
    ],
    "sections": [
      {
        "heading": "一、从一则山地救援报道看出行准备",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "北京市卫生健康委于2026年10月16日发布报道：一名登山者在虎头山附近出现右侧肢体无力，因所在位置车辆难以通行，由急救、公安和消防力量联合开展搜寻与转运。原文只写事件发生于“近日”，未公布确切事发日期，也没有给出最终疾病诊断。",
            "links": [
              {
                "text": "阅读北京市卫健委原文",
                "url": "https://wjw.beijing.gov.cn/xwzx_20031/jcdt/202610/t20261016_4904913.html"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "报道提醒公众量力而行，选择正规成熟游览路线，不要擅自进入未开发野山。以下是都会急救据此整理的出行准备建议，并非对该事件的医学诊断，也不是专业山地搬运教程。"
          }
        ]
      },
      {
        "heading": "二、出发前，把路线与联系办法写清楚",
        "paragraphs": [
          "个人结伴出行或单位组织活动，都可以先把这些问题列成一张简明联络表，由同行人员共同确认。"
        ],
        "bullets": [
          "路线是否正规开放，入口、出口和明显地标是什么；若遇天气变化或体力不适，如何提前结束行程。",
          "谁负责联系外部救援，谁保留路线信息与紧急联系人；手机电量、照明与必要防护是否准备妥当。",
          "哪些位置车辆可以到达，谁能够在安全的位置接应；不要把预计救援时间写成保证。",
          "队伍成员是否知道集合与清点方式，发生情况后如何避免走散。"
        ]
      },
      {
        "heading": "三、求助时，先让专业人员知道你在哪里",
        "paragraphs": [
          "遇到伤病应及时联系120，并说明人数、目前表现、所在位置和车辆通行情况。若涉及被困、搜救等问题，按接警或急救人员指导联系相应救援力量。报出已知的地标与路线，比只说“在山上”更有帮助。",
          "安排一名联络人员持续接听回电，将已确认的信息交接给到场人员。不要为了自行转运而进入陡坡等危险地形；现场处置与是否移动伤病者，应结合实际危险和专业救援指导决定。"
        ]
      },
      {
        "heading": "四、训练时，把协作与交接一起练",
        "paragraphs": [
          "单位组织培训，可以把活动地点、人数、常见环境和现有设备提前告诉培训方，请其说明哪些内容适合纳入课程。除基础急救技能，还可以练习描述位置、分配联络与接应任务、记录并交接已采取的措施。",
          "课堂中的模拟练习不能让参与者自动具备专业山地搜救或复杂转运能力。选择课程时，应确认授课内容、实操机会、考核方式和适用范围，避免把一种课程证书当成所有户外风险的解决办法。"
        ]
      },
      {
        "heading": "五、个人学习与企业活动分别准备",
        "paragraphs": [
          "个人学员可以从基础急救课程开始，说明自己常参加的活动类型；企业或团体可先整理人数、地点和活动安排，再沟通培训需求。具体课程、时间与费用以咨询确认的安排为准。"
        ],
        "links": [
          {
            "label": "了解个人急救课程",
            "href": "/programs"
          },
          {
            "label": "咨询企业与团体培训",
            "href": "/enterprise-training"
          },
          {
            "label": "联系都会急救",
            "href": "/contact#inquiry"
          }
        ]
      }
    ]
  },
  {
    slug: "aha-certificate-verification-mainland-china",
    title: "关于中国大陆地区 AHA 急救培训证书及官网验证情况的说明",
    seoTitle: "中国大陆 AHA 证书及官网核验说明（2026年10月更新）｜都会急救",
    excerpt: "说明中国大陆地区 AHA 纸质课程完成卡、官网核验限制及现阶段的核验方式。恢复安排以正式通知为准，学员可联系原发证培训中心核对记录。",
    description: "针对学员关心的 AHA 急救培训证书形式、官网验证及后续恢复安排，说明公开资料与目前掌握的信息，并提供联系原发证培训中心核验的建议。",
    publishedAt: "2026-10-14",
    updatedAt: "2026-10-14",
    topics: ["AHA证书", "课程完成卡", "纸质证书", "证书核验", "中国大陆"],
    relatedSlugs: ["aha-vs-red-cross-first-aid", "why-first-aid-hands-on-practice-matters"],
    lead: [
      "更新日期：2026 年 10 月 14 日。",
      "针对学员关心的 AHA（美国心脏协会）急救培训证书形式、官网验证及后续恢复安排，现结合公开资料与目前掌握的信息，作如下说明。本文为都会急救整理的情况说明，并非 AHA 或主管部门发布的公告；其中涉及培训通知和内部沟通的内容，已在相应段落注明。",
    ],
    sections: [
      {
        heading: "一、纸质课程完成卡是正常的凭证形式",
        paragraphs: [],
        blocks: [
          {
            type: "paragraph",
            text: "中国大陆地区 AHA 急救培训长期采用纸质课程完成卡，目前仍有相关课程沿用纸质证书发放方式。AHA 官方发布的国际电子证书说明（2020 年 12 月版本）曾明确，中国地区因相关法规及其他要求，暂不强制使用电子证书，后续安排另行通知。因此，纸质证书是正常的课程完成凭证形式，不能仅凭证书是否为电子版判断其真实性。具体课程的现行发证方式，应在报名前向所属培训中心确认。",
            links: [
              {
                text: "AHA 官方电子证书说明（2020 年 12 月，PDF）",
                url: "https://www.heart.org/-/media/a735cdafd2374549b1af09230380a51c.ashx",
              },
            ],
          },
        ],
      },
      {
        heading: "二、官网核验及电子证书查询情况",
        paragraphs: [
          "根据我们掌握的相关培训通知及目前信息，自 2024 年以来，中国大陆地区相关 AHA 培训证书的官网核验及电子证书查询服务受到限制。部分学员可能无法通过原有查询渠道获取培训或证书信息。具体受影响的证书范围及查询安排，应以所属培训中心的通知为准。",
        ],
      },
      {
        heading: "三、合规背景与内部沟通进展",
        paragraphs: [
          "据了解，这一情况涉及学员个人信息保护及数据出境合规要求。证书管理和在线验证如果涉及将学员个人信息传输至境外系统，需要满足适用的合规要求；具体合规路径应结合实际情况确定。相关服务的恢复，还需结合合规工作的实际进展及系统安排确定。",
          "据内部沟通了解，国内相关方正在积极准备和完善资料，推进与国家网信办相关的审批工作。上述进展来自内部沟通，尚不能据此确认具体受理情况、审查阶段或最终结果，仍应以主管部门或 AHA 的正式通知为准。",
        ],
      },
      {
        heading: "四、目前无法提供确定的恢复时间",
        paragraphs: [
          "截至本说明更新之日，在本次核查的公开资料中，尚未查到明确公布上述官网查询服务恢复日期的官方公告。目前无法提供确定的恢复时间，请学员关注 AHA 及所属授权培训中心后续发布的正式通知。",
        ],
      },
      {
        heading: "五、现阶段如何核验证书",
        paragraphs: [],
        blocks: [
          {
            type: "paragraph",
            text: "官网暂时无法查询，本身不足以认定证书无效或不真实。如需核验证书，学员或用证单位可联系原发证培训中心，核对课程记录、考核结果及证书信息。AHA 官方也明确说明，核验课程完成卡有效性时，可以联系签发该卡的培训中心。",
            links: [
              {
                text: "AHA 官方证书核验说明",
                url: "https://cpr.heart.org/en/resources/course-card-information",
              },
            ],
          },
        ],
      },
      {
        heading: "六、保管证书与用证提醒",
        paragraphs: [
          "请妥善保管纸质证书及相关培训记录，并留意证书注明的有效期。如需用于入职、赛事报名或其他资格审核，建议提前与接收单位确认材料要求，并联系原发证培训中心协助核验。",
          "如正在考虑个人报名或企业团体培训，可在报名前确认课程名称、考核要求、发证形式及后续核验方式。",
        ],
        links: [
          { label: "查看个人课程与课程体系", href: "/programs" },
          { label: "了解企业团体培训", href: "/enterprise-training" },
          { label: "联系都会急救咨询", href: "/contact#inquiry" },
        ],
      },
    ],
  },
  {
    "slug": "restart-a-heart-day-workplace-school-checklist",
    "title": "10月16日世界重启心脏日前，企业与学校可以先做这份急救准备清单",
    "seoTitle": "世界重启心脏日：企业与学校急救准备清单｜都会急救",
    "excerpt": "10月16日前，从AED点位、设备状态、现场分工和实操安排入手，检查企业与学校的急救准备。附日常管理清单及个人课程、团体培训咨询入口。",
    "description": "10月16日世界重启心脏日前，企业与学校如何检查AED点位、设备状态、现场分工和实操安排？一份可执行的急救准备清单，兼顾个人学习与团体培训需求。",
    "publishedAt": "2026-10-12",
    "topics": [
      "世界重启心脏日",
      "企业急救培训",
      "学校急救培训",
      "CPR",
      "AED"
    ],
    "relatedSlugs": [
      "why-aed-still-need-training",
      "why-first-aid-hands-on-practice-matters",
      "community-aed-needs-cpr-hands-on-training"
    ],
    "lead": [
      "单位准备开展一次急救主题活动，先从哪里开始？可以先走一遍现场：最近的 AED 在哪里、能否及时取到、谁负责呼救和接应、哪些岗位需要实操训练。把这些问题写清楚，再安排课程，活动才更容易落到日常工作里。",
      "美国心脏协会（AHA）的活动页面将每年10月16日列为 World Restart a Heart Day，鼓励家庭、工作场所、学校与社区参与 CPR 和 AED 科普。这个时间点可以成为单位检查急救准备情况的契机。以下清单是都会急救提出的活动组织建议，并非 AHA 规定的课程或认证要求。"
    ],
    "faqItems": [
      {
        "q": "没有急救证书，可以使用 AED 吗？",
        "a": "可以。AHA面向公众的说明指出，AED会提供操作提示，使用并不以先接受医疗培训为前提。遇到疑似心脏骤停时，应及时呼救并遵循120调度员和设备提示，不应因没有证书而等待。事先学习有助于熟悉设备。"
      },
      {
        "q": "单位已经买了 AED，还值得组织培训吗？",
        "a": "值得。培训可以让员工练习辨认情况、呼救、团队协作和设备使用，并发现实际环境中的障碍。设备管理与人员准备需要分别落实。"
      },
      {
        "q": "参加主题活动就等于获得 AHA 证书吗？",
        "a": "不能这样理解。本文建议的是单位内部检查和练习活动；若有证书需求，应单独确认所报课程的名称、考核与发证安排。"
      },
      {
        "q": "一定要在10月16日当天开展吗？",
        "a": "不必。AHA活动页面鼓励在整个10月开展宣传活动。单位可以结合排班安排检查、课程和复练，避免只在纪念日当天做一次宣传。"
      }
    ],
    "sections": [
      {
        "heading": "一、先确认：设备在现场能不能找到、取到",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "可以邀请不熟悉设备点位的同事，从办公室、教室或活动场地出发，按现有标识寻找 AED。记录途中遇到的问题，例如方向不清、门禁阻挡、柜体上锁，或夜间管理方式与白天不同。检查的目的，是把障碍交给明确的责任人解决。"
          },
          {
            "type": "paragraph",
            "text": "演练前告知现场负责人，避免被误认为真实急救事件。技能练习使用模拟人和训练用 AED，不消耗实际救援设备的电极片，也不对真人实施电击练习。"
          }
        ]
      },
      {
        "heading": "二、把现场分工写成几句话",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "一次单位演练可以围绕以下问题展开：发现情况后谁呼救、谁联系120、谁取 AED、谁接应救护人员？门牌地址、楼栋楼层、电梯或车辆入口是否容易说清楚？若负责人不在场，由谁替补？"
          },
          {
            "type": "paragraph",
            "text": "这张分工表是培训和协作的辅助工具。真实紧急情况应及时呼救，按120调度员和 AED 的指导行动，不应等待某一名指定员工或持证人员到场才开始求助。"
          }
        ]
      },
      {
        "heading": "三、让参与者实际练习，再给反馈",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "北京市卫生健康委2026年9月7日发布的党校培训报道，介绍了8月28日面向教职工与物业人员开展的理论、演示、实操考核相结合的培训，并提到后续复训与场景演练。这提供了一个可以参考的组织方式。",
            "links": [
              {
                "text": "查看原报道",
                "url": "https://wjw.beijing.gov.cn/xwzx_20031/jcdt/202609/t20260907_4853263.html"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "组织自己的活动时，可在课前确认：每组人数、模拟人和训练设备数量、每人练习机会、导师反馈方式，以及未掌握环节如何补练。面向儿童、教职工或企业员工的内容应按实际对象确定，不能用同一套成人场景概括所有人群。"
          }
        ]
      },
      {
        "heading": "四、用一张记录表留住检查结果",
        "paragraphs": [],
        "blocks": [
          {
            "type": "list",
            "items": [
              "点位与开放：AED所在位置、标识是否清楚、不同时间能否取用。",
              "设备与耗材：按设备说明书核对状态提示、电极片与电池有效期，记录问题和处理人。",
              "人员覆盖：各楼层、班次和活动场地参与培训的人员，以及缺岗时的安排。",
              "现场协作：呼救、取设备、接应等任务是否明确，具体卡点是什么。",
              "后续行动：本次发现的问题、责任人、完成期限和下次检查日期。"
            ]
          },
          {
            "type": "paragraph",
            "text": "检查频率应结合设备厂家要求、现场管理制度和人员变化来安排。课程证书有效期与日常复练计划分别管理；不要把“证书还没到期”当作不必再练习的理由。"
          }
        ]
      },
      {
        "heading": "五、单位活动与个人学习可以分别安排",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "企业、学校和物业团队可先整理城市、人数、人员岗位、设备配置和期望日期，再咨询培训方案。个人学员则可以说明所在城市、希望学习的内容和可参加的时间。具体课程、是否安排考核、证书类型、费用和授课语言，都应在报名之前确认。"
          }
        ],
        "links": [
          {
            "label": "了解企业团体培训",
            "href": "/enterprise-training"
          },
          {
            "label": "查看个人课程与课程体系",
            "href": "/programs"
          },
          {
            "label": "查看培训城市",
            "href": "/cities"
          },
          {
            "label": "咨询个人报名或团体培训",
            "href": "/contact#inquiry"
          }
        ]
      },
      {
        "heading": "常见问题",
        "paragraphs": []
      },
      {
        "heading": "来源与日期",
        "paragraphs": [
          "活动日期与报道日期分别标注。以下报道仅作为公开资料引用，不代表都会急救参与了报道中的培训。"
        ],
        "links": [
          {
            "label": "AHA：World Restart a Heart Day（每年10月16日；页面未标发布日期，2026-10-12核验）",
            "href": "https://www.heart.org/en/volunteer/world-restart-a-heart-day"
          },
          {
            "label": "AHA：What is an AED? How to use one during a cardiac arrest（2026-09-08）",
            "href": "https://www.heart.org/en/news/2026/09/08/what-is-an-aed-how-to-use-one-during-a-cardiac-arrest"
          },
          {
            "label": "北京市卫生健康委：急救赋能筑防线 协同护航卫健康（2026-09-07发布，8月28日活动）",
            "href": "https://wjw.beijing.gov.cn/xwzx_20031/jcdt/202609/t20260907_4853263.html"
          }
        ]
      }
    ]
  },
  {
    slug: "fenyang-hospital-first-aid-training-base",
    title: "两个月、9天培训与督导：汾阳医院培养10位急救导师",
    seoTitle: "汾阳医院培养10位急救导师｜两个月、9天培训与督导｜都会急救",
    excerpt: "从学员课程到导师培养，再到真实课堂督导，汾阳医院用两个月、9天培训与督导，培养10位急救导师，为急救培训基地建设夯实师资基础。",
    description: "山西省汾阳医院急救导师培养项目历时两个月，累计开展9天培训与督导。10位导师候选人完成学员课程、导师课程和真实课堂督导，为医院建立急救培训基地、持续开展规范化急救培训夯实师资基础。",
    publishedAt: "2026-10-01",
    author: "都会急救项目组",
    authorType: "Organization",
    brand: "都会急救",
    organization: "天津一道技术服务有限公司",
    topics: ["汾阳医院", "急救培训基地", "急救导师培养", "Heartsaver培训", "CPR AED"],
    ogImage: {
      src: "/images/g11.jpg",
      alt: "山西省汾阳医院急救导师培养项目合影",
      width: 3736,
      height: 2314,
    },
    relatedSlugs: ["why-first-aid-hands-on-practice-matters", "why-companies-need-first-aid-training", "community-aed-needs-cpr-hands-on-training"],
    lead: [
      "一支能持续开展急救培训的队伍，需要的不只是会操作的学员，还需要懂课程、会示范、能反馈的院内导师。围绕山西省汾阳医院建设急救培训基地的目标，都会急救参与实施了为期两个月的导师培养项目。",
      "项目累计安排9天培训与督导，帮助10位导师候选人从学习急救技能走向学习如何教、如何组织课堂，并在真实授课场景中接受观察和反馈。",
    ],
    sections: [
      {
        heading: "从学员课程开始，把技能和教学接起来",
        paragraphs: [
          "项目先组织10位医务人员分批完成 Heartsaver 急救学员课程和导师课程。学员课程覆盖心肺复苏（CPR）、自动体外除颤器（AED）使用，以及常见内科、创伤和环境相关急症的基础处置；导师课程则进一步练习课程组织、技能示范与反馈、课堂管理和考核流程。",
          "这条培养路径把“自己会做”与“带着别人学会”连接起来，也让医院后续开展院内培训有了更清晰的课程框架。",
        ],
        image: {
          src: "/images/g10.jpg",
          alt: "汾阳医院 Heartsaver 急救培训课程现场合影",
          caption: "汾阳医院 Heartsaver 急救培训课程现场。",
          width: 1200,
          height: 453,
          layout: "wide",
        },
      },
      {
        heading: "两个月、9天安排，循序推进导师培养",
        paragraphs: [
          "整个项目历时两个月，累计9天培训与督导：前4天分批开展学员课程和导师课程，之后安排连续5天督导。10位导师候选人分组进入真实课堂，每天由2位候选人接受观察和评估，并有3位学员参与课程练习。",
          "把课堂学习和后续督导分开安排，给了候选人消化课程内容、熟悉教学材料和准备试讲的时间，也让导师培养从课堂知识延伸到实际授课。",
        ],
      },
      {
        heading: "每位候选人都为真实授课做足准备",
        paragraphs: [
          "导师候选人需要提前熟悉课程流程和教材，复习技能标准，并准备授课片段。胸外按压、AED 操作和急救技能的示范，不仅要动作规范，还要能看出学员练习中的问题，并给出清楚、及时的反馈。",
          "准备过程让候选人从听课者逐步转为授课者：反复梳理课程内容，在练习中熟悉讲解顺序，也为督导中的课堂组织和技能评估打下基础。",
        ],
        image: {
          src: "/images/g7.jpg",
          alt: "导师在模拟人练习中指导汾阳医院导师候选人",
          caption: "导师在模拟人练习中观察操作，并进行现场指导。",
          width: 1200,
          height: 900,
          layout: "wide",
        },
      },
      {
        heading: "五天督导，在课堂中练习如何教",
        paragraphs: [
          "督导安排在有真实学员参与的课程中进行。候选人轮流承担教学任务，督导导师观察技能示范、教学表达、学员互动和课堂节奏，并根据现场表现提供反馈与改进建议。",
          "真实课堂让教学能力有了具体的练习和检查过程：候选人既要掌握技能，也要让学员听得懂、跟得上、练得到。对医院而言，这一步帮助新导师把课程标准转化为可以在院内开展的教学实践。",
        ],
        image: {
          src: "/images/g8.jpg",
          alt: "汾阳医院培训现场，导师指导学员练习心肺复苏",
          caption: "学员分组练习，导师在旁观察并及时反馈。",
          width: 720,
          height: 960,
          layout: "wide",
        },
      },
      {
        heading: "培养10位导师，为培训基地建设夯实基础",
        paragraphs: [
          "经过学员课、导师课和后续督导，10位导师候选人完成了从技能学习到课堂实践的培养流程。项目把课程组织、技能练习、教学反馈和督导评估连成闭环，为汾阳医院急救培训基地建设补上院内师资与教学能力这一环。",
          "一批导师的成长是持续培训的起点。今后，医院可依托这支队伍组织更多规范化急救课程、开展院内复训，并在教学实践中继续积累经验，让急救知识和技能在更多医务人员中传递。",
        ],
        image: {
          src: "/images/g11.jpg",
          alt: "山西省汾阳医院急救导师培养项目合影",
          caption: "汾阳医院急救导师培养项目合影。",
          width: 1200,
          height: 743,
          layout: "wide",
        },
      },
    ],
  },
  {
    slug: "first-aid-training-for-new-employment-groups",
    title: "外卖员、网约车司机为什么更需要实用的急救培训",
    seoTitle: "外卖员网约车司机急救培训怎么做｜CPR与AED实操建议｜都会急救",
    excerpt: "新就业群体工作地点流动、接触人群广，更需要把 CPR、AED、气道异物梗阻和创伤处置练成能在路上用的基本技能。",
    description: "外卖员、网约车司机、货车司机等新就业群体为什么需要急救培训？结合近期红十字会相关活动，都会急救整理适合流动岗位的 CPR、AED、呼吸道异物和创伤急救实操建议。",
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-28",
    author: "黄老师",
    brand: "都会急救",
    organization: "天津一道技术服务有限公司",
    topics: ["新就业群体急救培训", "外卖员急救", "网约车司机急救", "CPR AED实操"],
    ogImage: { src: "/images/g6.jpg?v=bebb2a9ae9b6", alt: "急救培训课堂中的 AED 与模拟人练习设备", width: 4096, height: 3072 },
    relatedSlugs: ["community-aed-needs-cpr-hands-on-training", "why-first-aid-hands-on-practice-matters", "why-companies-need-first-aid-training"],
    lead: [
      "外卖员、网约车司机、货车司机和电商主播的工作地点不断变化，遇到突发状况时，第一目击者不一定是医护人员，也不一定在熟悉的办公场所。",
      "近期红十字会在多地把急救培训带进新就业群体，重点覆盖 CPR、AED、气道异物梗阻和创伤救护。对流动岗位来说，培训要解决的不是记住一套口号，而是知道在路上先做什么、怎样呼救、怎样协作。",
    ],
    faqItems: [
      { q: "新就业群体为什么需要专门的急救培训", a: "他们工作地点流动、接触人群广，可能在道路、商场、社区、园区或客户现场遇到突发情况。培训应结合真实工作场景，练习呼救、CPR、AED、气道异物和创伤处置。" },
      { q: "司机没有 AED 也需要学习 AED 吗", a: "需要。司机可能是最先发现情况的人，学习 AED 有助于在设备到场后快速配合操作；在没有 AED 时，仍应先呼救并按调度员指导开始胸外按压。" },
      { q: "流动岗位的急救培训应该怎么练", a: "应采用短情境、分组实操和重复练习，覆盖车内、路边、商场和社区等场景，并让学员实际完成呼救分工、胸外按压、AED 协作和气道异物处置。" },
      { q: "参加过一次急救培训后还要复练吗", a: "要。流动岗位的人员、路线和工作环境会变化，企业或平台应结合安全活动、站点服务和岗位培训安排复练与技能检查。" },
    ],
    sections: [
      {
        heading: "流动工作场景让第一目击者更重要",
        paragraphs: [
          "在办公楼里，员工通常知道前台、保安和会议室的位置；在道路、社区和客户现场，救援条件可能完全不同。司机或配送人员可能先看到有人倒地，周围的人也可能只会围观，不知道谁来拨打 120、谁去找 AED。",
          "因此，适合新就业群体的课程应把呼救、定位、分工和基础操作放在一起训练，让学员在不熟悉的场地也能先启动正确流程。",
        ],
        links: [{ label: "中国红十字会：关注新就业群体，开展 CPR+AED 专项培训", href: "https://www.redcross.org.cn/autoweb/hlwmh/third/hlwmh_hlwmhyjjh_299016.html?firstcode=hlwmhywgz" }],
      },
      {
        heading: "培训内容要贴近路上会遇到的情况",
        paragraphs: [
          "新就业群体不一定每天接触同一种风险。课程可以用短情境练习连接技能：有人在路边突然倒地，怎样判断和呼救；有人在餐饮或家庭场景发生气道异物梗阻，怎样根据对象和情况采取措施；发生摔倒、割伤或碰撞后，怎样保护现场并进行基础处置。",
          "CPR 和 AED 仍然是核心技能，但培训不能只围绕设备按钮。学员需要知道设备在哪里、如何让旁人帮忙取设备，以及设备到场前怎样减少等待。",
        ],
        blocks: [{ type: "list", items: ["先确保自身安全，再接近和判断现场。", "明确一人呼救、一人取 AED、一人开始按压的分工。", "根据培训教材练习气道异物和创伤处置，不凭短视频临场猜动作。", "把定位、道路环境和与 120 调度员沟通纳入情境。"] }],
      },
      {
        heading: "平台和企业怎样把培训落到岗位",
        paragraphs: [
          "平台或企业可以把培训安排在站点、服务站、车队集结点和安全活动中，采用小班实操，减少对配送和接单的影响。重要的是让每位参训者都实际操作，而不是只有少数代表上台。",
          "培训结束后，还可以在站点放置清晰的急救流程卡，标注 AED 或急救箱位置，建立联系人和补训名单。对于人员流动较大的岗位，复练和新员工培训应成为固定流程。",
        ],
        links: [{ label: "中国红十字基金会：新就业群体应急救护培训基地落地郑州", href: "https://redcross.org.cn/autoweb/hlwmh/third/hlwmh_hlwmhyjjh_299018.html?firstcode=hlwmhywgz" }],
      },
      { heading: "常见问题", paragraphs: [] },
    ],
  },
  {
    slug: "community-aed-needs-cpr-hands-on-training",
    title: "社区配置 AED 后，为什么还要让员工完成 CPR 实操",
    seoTitle: "社区配置AED后为什么还要培训CPR｜企业急救培训检查清单｜都会急救",
    excerpt: "AED 放进社区门店只是起点。结合近期 11 城社区门店配置 AED 和 CPR+AED 认证培训的报道，说明企业还要把人员、分工、实操和复练落实到现场。",
    description: "社区或企业配置 AED 后，为什么还要让员工完成 CPR+AED 实操培训？都会急救结合近期 11 城社区门店 AED 配置与认证培训案例，整理设备、人员、分工、考核和复练的检查清单。",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-26",
    author: "黄老师",
    brand: "都会急救",
    organization: "天津一道技术服务有限公司",
    topics: ["AED培训", "CPR实操", "社区急救", "企业急救培训"],
    ogImage: { src: "/images/g3.jpg?v=eb9351e83ceb", alt: "企业员工在培训现场练习 CPR 和 AED 协同操作", width: 4096, height: 3072 },
    relatedSlugs: ["why-first-aid-hands-on-practice-matters", "why-companies-need-first-aid-training", "why-aed-still-need-training"],
    lead: [
      "AED 到位，代表社区多了一件关键设备；但设备能不能在紧急时刻发挥作用，还取决于现场有没有知道先做什么、谁来呼救、谁来取 AED、谁能持续按压的人。",
      "近期报道显示，11 座城市的社区门店完成首批 AED 装机，并有 1000 位经纪人接受 CPR+AED 专业认证培训。这件事值得企业借鉴：设备配置和人员训练要一起规划。",
    ],
    faqItems: [
      { q: "社区安装了 AED，员工还需要参加 CPR 培训吗", a: "需要。AED 会分析心律并给出语音提示，但现场仍需要有人识别情况、呼叫急救、开始胸外按压、贴好电极片并按提示协同操作。设备配置不能代替人员训练。" },
      { q: "企业急救培训是不是让少数员工会用 AED 就够了", a: "通常不够。第一目击者可能来自前台、物业、保安、门店或普通员工，培训应让岗位上可能最先发现情况的人获得实际操作机会，并明确替补人员和轮班安排。" },
      { q: "企业配置 AED 后应该检查哪些培训内容", a: "应检查是否有人能完成呼救分工、胸外按压、AED 开机和贴片操作，是否做过完整情境演练，是否有技能考核和纠错机会，以及设备位置、取用路径和日常巡检责任是否明确。" },
      { q: "学过一次 CPR 和 AED 后还需要复练吗", a: "需要。急救技能会因缺少使用而生疏，企业可以结合岗位变化、设备巡检和年度安全计划安排复练，并用反馈设备或导师观察检查关键动作。" },
    ],
    sections: [
      {
        heading: "AED 配置和 CPR 培训要同时规划",
        paragraphs: [
          "AED 的价值不只在于把设备放到墙上。发生疑似心脏骤停时，现场人员要尽快识别、呼叫 120、安排取 AED，同时开始胸外按压。设备到场后，还要有人打开设备、按语音提示贴好电极片，并在分析和电击时保持现场安全。",
          "如果只有设备，没有经过练习的人员，现场容易出现等待、围观、找不到设备或不敢操作等情况。培训的目标，是让员工把设备位置、呼救分工和基本动作连起来。",
        ],
        links: [{ label: "新华网：11城链家门店安装首批AED，1000位经纪人接受急救培训认证", href: "https://www.xinhuanet.com/house/20260916/114e44c0552742639ae8f5ceab38c396/c.html" }],
      },
      {
        heading: "企业现场需要一套可执行的分工",
        paragraphs: [
          "企业可以先画出从发现倒地到 AED 到场的路线：谁拨打 120，谁取设备，谁疏散围观人员，谁开始按压，谁在救护人员到达后交接信息。分工越具体，现场越不依赖某一位“最懂急救的人”。",
          "门店、办公楼、园区、学校和健身房的人员流动不同，设备放置点和培训对象也应随场景调整。前台、物业、保安、值班主管和一线员工，都可能成为第一目击者。",
        ],
        blocks: [{ type: "list", items: ["确认 AED 的位置、取用路径和开门权限。", "让可能最先发现情况的岗位亲手完成 CPR 和 AED 操作。", "安排替补人员，覆盖轮班、休假和人员流动。", "把呼救、按压、取 AED 和交接写进现场应急流程。"] }],
      },
      {
        heading: "实操和考核决定培训是否落地",
        paragraphs: [
          "观看 AED 视频可以帮助员工熟悉设备外观，但不能确认他们能否在压力下完成贴片、听从提示和减少按压中断。培训应让每位参训者在模拟人上操作，并在导师观察或反馈设备提示下纠正动作。",
          "近期多地急救培训都采用理论、分组实操和统一考核的组合。对企业来说，考核不是为了增加形式，而是为了发现设备位置、动作顺序和人员协作中的具体问题。",
        ],
        links: [{ label: "农业农村部：AED设施配置与实操能力提升培训", href: "https://dangwei.moa.gov.cn/qzhd/202609/t20260920_6487908.htm" }, { label: "新华网：教师急救培训包含分组实操与统一考核", href: "https://app.xinhuanet.com/news/article.html?articleId=202609236b577a2ec8bb479c88d28fb2d604be96" }],
      },
      {
        heading: "企业可以用这份清单做一次复盘",
        paragraphs: ["AED 配置完成后，建议企业定期复盘以下问题：设备是否能快速取用，员工是否知道具体位置，是否有人能持续按压，是否有人实际操作过 AED，培训记录是否覆盖轮班人员，发现错误后是否安排了再次练习。"],
        blocks: [{ type: "list", items: ["设备：位置、标识、取用路径和巡检责任是否明确。", "人员：第一目击岗位是否覆盖，是否有替补和轮班安排。", "技能：每个人是否完成 CPR、AED 和情境协作练习。", "机制：是否有考核、纠错、复练和与 120 交接的流程。"] }],
      },
      {
        heading: "常见问题",
        paragraphs: [],
      },
    ],
  },
  {
    "slug": "why-first-aid-hands-on-practice-matters",
    "title": "急救培训为什么必须重视实操练习",
    "seoTitle": "急救培训为什么必须实操练习｜CPR与人工呼吸教学案例｜都会急救",
    "excerpt": "都会急救结合人工呼吸面膜与面罩的课堂案例，说明每位学员为什么都需要亲手操作、获得反馈、接受技能检查并安排后续复练。",
    "description": "急救培训为什么不能只听讲座、看视频？都会急救结合AHA教学中的人工呼吸面膜与面罩案例，说明实操练习、及时反馈、技能考核和后续复练的重要性，帮助企业判断培训是否落实到每位员工。",
    "publishedAt": "2026-09-24",
    "updatedAt": "2026-09-24",
    "author": "黄老师",
    "brand": "都会急救",
    "organization": "天津一道技术服务有限公司",
    "topics": [
      "急救实操训练",
      "企业急救培训",
      "心肺复苏培训",
      "人工呼吸面膜与面罩"
    ],
    "ogImage": {
      "src": "/images/g5.jpg",
      "alt": "急救培训课堂上，学员在模拟人上练习胸外按压和呼吸面罩操作",
      "width": 4032,
      "height": 2268
    },
    "relatedSlugs": [
      "how-to-do-cpr",
      "why-companies-need-first-aid-training",
      "why-aed-still-need-training"
    ],
    "lead": [
      "“听懂了，也看明白了，为什么一做还是会错？”一次人工呼吸演练，让我再次看到了这个问题。",
      "急救技能需要通过亲手操作、获得反馈和反复练习来掌握。视频和讲解能帮助我们理解步骤，但手应该放在哪里、不同工具如何使用、动作是否产生效果，都需要在实际操作中检验。"
    ],
    "faqItems": [
      {
        "q": "只看急救视频能学会心肺复苏吗",
        "a": "视频有助于理解流程，但仅凭看过视频，无法确认自己的动作是否正确。掌握心肺复苏技能，需要实际操作，并通过导师或合适的反馈设备检查和纠正动作。"
      },
      {
        "q": "人工呼吸面膜和呼吸面罩的操作一样吗",
        "a": "不一样。以本文讨论的成人操作为例，常见薄膜式面膜需要配合捏鼻和口部密封；覆盖口鼻的口袋面罩依靠面罩与面部密封完成通气。学习时需要区分，并按具体产品说明练习。"
      },
      {
        "q": "企业办过急救讲座还需要技能培训吗",
        "a": "取决于目标。如果希望员工掌握实际施救技能，就需要让每个人参加相应操作训练和技能检查；只有讲解、观看视频或少数人体验，不能确认全体员工已经具备这些能力。"
      },
      {
        "q": "学过一次急救还需要复练吗",
        "a": "需要。技能会因缺少使用而生疏，后续复练应结合技能检查结果、岗位需求和课程要求安排。不要把“曾经上过课”当成当前技能仍然熟练的证明。"
      }
    ],
    "sections": [
      {
        "heading": "一次人工呼吸演练暴露的动作混淆",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "在美国心脏协会（AHA）Heartsaver 急救课程的教学中，不同导师有时会有不同的授课侧重。有的导师更强调人工呼吸面膜的便携性，要求学员用面膜练习；对于呼吸面罩，则主要通过视频介绍。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "我实际遇到过这样的情况：学员看过呼吸面罩的教学视频，但只用人工呼吸面膜做过练习。后来换成呼吸面罩演练时，学员竟然把手伸进面罩下方捏住模拟人的鼻子，同时对着面罩的单向阀吹气。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "问题就在这里：覆盖口鼻的呼吸面罩，需要依靠面罩边缘与面部的密封来完成通气。把手伸进面罩下方，会妨碍密封、造成漏气，可能使通气不足甚至无效。学员记住了“捏鼻子”和“对着阀门吹气”，却把属于不同操作方式的动作拼在了一起。",
            "links": [
              {
                "text": "［参考：AHA 2025 成人基础生命支持指南］",
                "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "这里说的人工呼吸面膜，是薄膜式的呼吸隔离装置；呼吸面罩则指覆盖口鼻、带单向阀的口袋面罩。以成人模拟人练习为例，常见薄膜式面膜仍需配合口对口通气的捏鼻动作，口袋面罩则需要密封口鼻周围，不能再把手伸进面罩里捏鼻子。具体产品应遵循其使用说明。",
            "links": [
              {
                "text": "［参考：Laerdal 成人模拟人及训练面膜使用说明］",
                "url": "https://cdn.laerdal.com/downloads/f1394/ACKGGTVH/Res-Anne-DfU-6736-rev-B.pdf"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "如果只问“你看懂了吗”，这类错误很可能发现不了。让学员真正拿起工具操作，观察模拟人的胸廓是否随着吹气起伏，才能进一步检查气道开放、密封和吹气是否到位。做出了吹气的动作，并不等于完成了有效通气。",
            "links": [
              {
                "text": "［参考：AHA 2025 成人基础生命支持指南］",
                "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support"
              }
            ]
          }
        ]
      },
      {
        "heading": "导师的教学重点不能成为学员的技能盲区",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "反过来，也需要警惕另一种情况。有的导师更关注面膜的防护局限，因此只让学员观看面膜视频，实操时全部使用呼吸面罩。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "但离开教室，学员未必随身携带口袋面罩。如果需要改用另一种已经学过、却没有练过的通气方式，他们能不能正确调整手的位置？会不会在需要捏鼻子时忘记这一步？这些都是需要通过演练验证的问题，不能因为学员看过视频，就默认他们已经会做。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "面罩与面膜各有使用特点，不能仅凭个人感受判断防护效果，也不能把“我更推荐这件工具”直接变成“其他相关操作不用练”。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "教学重点应当依据课程标准和学员的实际需要来确定。对于所授课程要求掌握的技能，应当完整落实练习；对于课程涵盖、学员可能遇到且容易混淆的操作，应帮助学员在练习中理解差异。具体必学与选学内容，应以适用的课程教材为准。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "全面教学也需要教会学员在条件有限时作出判断。遇到疑似心脏骤停的成人，不能因为没有面罩就等待。应立即呼叫 120、安排获取自动体外除颤仪（AED）并开始胸外按压；没有受过培训或不愿提供人工呼吸的施救者，可以先实施单纯胸外按压，并听从调度员指导。",
            "links": [
              {
                "text": "［参考：AHA 2025 成人基础生命支持指南］",
                "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support"
              }
            ]
          }
        ]
      },
      {
        "heading": "有效练习需要反馈和复练",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "急救操作往往要同时完成几个动作。以人工呼吸为例，学员需要开放气道、做好密封，并观察通气效果。观看视频时，这些动作由示范者连贯完成；自己操作时，才会发现手的位置会相互影响，注意一个细节时又可能漏掉另一个。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "所以，“多练习”也需要方法。针对前面的例子，导师可以先让学员分别使用两种工具，在模拟人上完成相应操作；确认学员掌握差异后，再更换工具进行演练，观察他们能否自行调整，而不是全程跟着口令做。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "发现漏气，应帮助学员找到原因，再给他们重新操作的机会。对于胸外按压，则可以结合反馈设备，检查按压深度、频率和回弹等表现。2025 年 AHA 复苏教育科学指南推荐在公众和专业人员的心肺复苏（CPR）培训中使用反馈设备，并推荐在集中培训后安排巩固训练。",
            "links": [
              {
                "text": "［参考：AHA 2025 复苏教育科学指南］",
                "url": "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/resuscitation-education-science"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "练习的价值，在于把错误发现于课堂，并在指导下修正。如果学员反复做着同一个错误动作，却没有人指出问题，练习次数增加也不代表能力提高。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "练习还应逐步延伸到完整情境：发现有人倒下，如何呼救，如何安排他人获取 AED，设备到场后如何配合。把单项动作放回救援流程，才能检查学员是否能把学过的内容连起来。对于担心做错、不敢上前的学员，在课堂中完成过相应操作、知道出现问题如何调整，也能让施救信心有更具体的依据。",
            "links": []
          }
        ]
      },
      {
        "heading": "企业急救培训要落实到每个人的操作",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "这个问题同样存在于企业急救培训中。考虑预算、员工排班和组织成本，有些企业会选择集中讲座：讲师讲解、播放视频，再邀请少数学员上台体验。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "这样的活动有普及价值，可以让员工了解急救知识、认识 AED，建立遇事呼救的意识。但如果企业希望员工在突发情况下能够实际施救，就还需要安排针对个人的技能训练。几位员工上台练过，不能代表其他人也已经掌握。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "AHA Heartsaver 的课程设计也保留了这一点。其混合学习形式包括线上学习和实操技能环节，课堂形式同样包含动手练习。线上学习可以提高理论学习的便利性，实操环节则承担着检验和纠正动作的任务。",
            "links": [
              {
                "text": "［参考：AHA Heartsaver First Aid CPR AED 课程形式说明］",
                "url": "https://cpr.heart.org/en/courses/heartsaver-first-aid-cpr-aed-course-options"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "企业选择培训时，除了人数、时长和价格，还可以进一步了解：",
            "links": []
          },
          {
            "type": "list",
            "items": [
              "每位员工是否都有充分的操作机会，而不是只观看同事练习。",
              "模拟人和训练设备是否够用，导师是否能观察到每个人的动作并及时纠正。",
              "发现错误后是否有重新练习的时间，课程结束前是否实际检查技能表现。",
              "是否结合办公场所、车间或服务区域开展情境演练，并安排后续复练。"
            ]
          },
          {
            "type": "paragraph",
            "text": "预算有限时，可以通过分批组织、合理分组以及课程允许的线上理论学习来提高效率。需要重点保留的，是每个人实际操作、获得反馈和纠正错误的机会。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "作为导师，我希望学员离开教室时，能说清自己练过什么，也知道自己曾在哪里出错、怎样调整。下一次换一种工具，或者遇到没有导师提示的场景，他们仍能把动作做出来，这才是我们需要持续检验的培训效果。",
            "links": []
          },
          {
            "type": "paragraph",
            "text": "都会急救由天津一道技术服务有限公司运营，面向个人及企业开展 AHA Heartsaver 急救培训。了解课程时，欢迎重点询问实操安排、教学设备和技能考核方式，选择适合自己的训练。",
            "links": []
          }
        ]
      },
      {
        "heading": "常见问题",
        "paragraphs": [],
        "blocks": []
      }
    ]
  },
  {
    slug: "reduce-risk-sudden-cardiac-arrest-during-exercise",
    title: "如何降低运动过程中发生心脏骤停的概率？跑步健身人群必读",
    excerpt:
      "详解运动中猝死与心脏骤停的真实原因，以及如何通过筛查、训练控制、风险识别和急救能力降低风险，适合跑步、健身和运动人群阅读。",
    description:
      "详解运动中猝死与心脏骤停的真实原因，以及如何通过筛查、训练控制、风险识别和急救能力降低风险，适合跑步、健身和运动人群阅读。",
    publishedAt: "2026-04-28",
    bottomCta: {
      primary: {
        label: "立即报名",
        modalTitle: "扫码打开小程序报名",
        qrImageSrc: "/images/app.jpg",
        qrAlt: "小程序二维码",
      },
      secondary: { label: "查看开课城市与排期", href: "/cities" },
    },
    lead: [
      "这两年，一个现象越来越明显：",
      "越来越多“看起来很健康的人”，在运动过程中突然倒下。",
      "跑步、打球、健身、骑行……",
      "很多人第一反应是：",
      "“是不是运动太危险？”",
      "但真正的问题，不在“要不要运动”，而在：",
      "你有没有做好风险管理。",
    ],
    sections: [
      {
        heading: "一、运动导致心脏骤停，其实不是“偶然”",
        paragraphs: [
          "从医学角度来看，运动本身很少直接“导致”心脏骤停。",
          "更常见的情况是：",
          "👉 本身存在潜在心脏问题",
          "👉 在运动强度上升时被“触发”",
          "比如：",
        ],
        bullets: ["冠心病（很多人并不知情）", "心肌炎恢复不完全", "心律失常", "长期缺乏运动后突然高强度"],
      },
      {
        heading: "差别不在运气，而在：身体基础 + 行为方式",
        paragraphs: ["所以你会看到：", "有的人长期运动没问题", "有的人第一次跑步就出事"],
      },
      {
        heading: "二、真正有效的，是这4个“预防层级”",
        paragraphs: ["如果你认真想降低风险，可以从以下4个层级入手："],
        subsections: [
          {
            heading: "1、基础筛查（最容易被忽视）",
            paragraphs: [
              "很多人开始运动前，从来没有做过检查。",
              "如果你属于以下人群，建议评估：",
            ],
            bullets: ["30岁以上突然开始高强度运动", "有家族心脏病史", "长期熬夜、压力大", "有胸闷、心悸、头晕等情况"],
          },
          {
            heading: "建议检查：",
            paragraphs: ["👉 这一步可以筛掉大量隐性风险"],
            bullets: ["心电图", "心脏彩超", "必要时运动负荷试验"],
          },
          {
            heading: "2、控制运动强度（不是越猛越好）",
            paragraphs: ["很多问题，其实是“拼出来的”。", "常见错误："],
            bullets: ["很久没运动，一上来就高强度", "跟着别人节奏硬撑", "身体不适还在坚持"],
          },
          {
            heading: "更合理的方式：",
            paragraphs: ["👉 运动是长期行为，而不是一次挑战"],
            bullets: ["循序渐进", "保持“可以说话”的强度", "关注身体反馈"],
          },
          {
            heading: "3、识别危险信号（关键但常被忽略）",
            paragraphs: ["身体往往会提前发出信号："],
            bullets: ["胸痛、胸闷", "心跳异常", "突然乏力", "运动中头晕"],
          },
          {
            heading: "但很多人选择忽略。",
            paragraphs: ["甚至觉得：", "“再坚持一下就好了”", "现实是：", "👉 很多严重事件，就发生在这几分钟"],
          },
          {
            heading: "4、最关键的一层：急救能力 + AED",
            paragraphs: [
              "前面3点是“降低发生概率”",
              "这一点决定的是：",
              "👉 一旦发生，还有没有机会活下来",
              "关键因素：",
              "是否有人会CPR",
              "身边是否有AED",
              "重要事实：",
              "心脏骤停黄金时间只有4分钟",
              "而现实中：",
              "救护车几乎不可能在4分钟内到达",
              "所以真正决定结果的，是：",
              "👉 现场的人",
            ],
          },
        ],
      },
      {
        heading: "三、一个被很多人低估的现实",
        paragraphs: [
          "很多人觉得：",
          "“这种事离我很远”",
          "但如果你在：",
          "跑步",
          "健身房",
          "球场",
          "户外活动",
          "你已经在风险场景中。",
          "问题不是会不会发生，而是：",
          "👉 有没有准备",
        ],
      },
      {
        heading: "四、真正有用的运动安全方案",
        paragraphs: [
          "一个完整的运动安全体系应该包括：",
          "基础健康评估",
          "合理训练计划",
          "场地 AED 配置",
          "人员急救培训",
          "但现实中，大多数只做到前两项。",
          "而真正决定结果的，是后两项。",
        ],
      },
      {
        heading: "五、写在最后",
        paragraphs: [
          "运动本身没有错。",
          "盲目、自信、忽视风险，才是问题。",
          "你不需要停止运动，",
          "但可以：",
          "用更专业的方式，让自己更安全。",
          "如果你是：",
          "企业",
          "健身房",
          "跑团",
          "学校",
          "户外组织",
          "建议认真考虑：",
          "👉 当意外发生时，你们有没有能力应对？",
        ],
      },
      {
        heading: "急救培训咨询",
        paragraphs: [
          "如果需要急救培训（AHA标准课程），全国70城可安排，支持企业上门培训。",
          "电话 / 微信：13512456138",
        ],
      },
      {
        heading: "扫码咨询急救培训",
        paragraphs: [],
        qrCard: {
          title: "扫码咨询急救培训",
          image: { src: "/images/wechat.png", alt: "微信二维码咨询急救培训" },
          textLines: ["微信扫码咨询课程", "或添加微信：13512456138"],
        },
      },
      {
        heading: "相关阅读",
        paragraphs: ["相关阅读："],
        links: [
          { label: "企业为什么买了AED还要做急救培训？", href: "/blog/why-aed-still-need-training" },
          { label: "AED为什么重要？", href: "/blog/aed-why-important" },
          { label: "CPR心肺复苏到底有多重要？", href: "/blog/how-to-do-cpr" },
        ],
      },
    ],
  },
  {
    slug: "aha-training-site-application",
    title: "AHA急救培训基地如何申请？需要什么条件（2026最新指南）",
    excerpt:
      "详细讲解AHA急救培训基地申请流程、条件及适合人群，包括场地、设备、师资要求及申请步骤，适合企业与培训机构参考。",
    description:
      "详细讲解AHA急救培训基地申请流程、条件及适合人群，包括场地、设备、师资要求及申请步骤，适合企业与培训机构参考。",
    publishedAt: "2026-04-18",
    bottomCta: {
      primary: {
        label: "立即报名",
        modalTitle: "扫码打开小程序报名",
        qrImageSrc: "/images/wechat.png",
        qrAlt: "小程序二维码",
      },
      secondary: { label: "查看开课城市与排期", href: "/cities" },
    },
    lead: [
      "这两年，除了个人报名急救培训，我们也经常收到另一类咨询：",
      "“我们单位能不能申请成为AHA急救培训基地？”",
      "咨询的通常是：",
      "企业安全负责人",
      "培训机构负责人",
      "医院或学校管理人员",
      "已经在做应急培训的团队",
      "如果你也在考虑搭建自己的急救培训体系，这篇文章把最关键的信息讲清楚：",
      "- 什么是急救培训基地",
      "- 申请需要哪些条件",
      "- 具体流程是什么",
      "- 适合哪些单位",
    ],
    sections: [
      {
        heading: "一、什么是AHA急救培训基地？",
        paragraphs: [
          "AHA急救培训基地，是具备条件并按照美国心脏协会（AHA）标准开展急救培训的教学场地。",
          "可用于开展：",
        ],
        bullets: [
          "AHA Heartsaver急救员培训",
          "CPR心肺复苏培训",
          "AED使用培训",
          "企业急救培训",
        ],
      },
      {
        heading: "二、申请急救培训基地需要什么条件？",
        paragraphs: [],
        subsections: [
          {
            heading: "1、场地要求",
            paragraphs: ["具备固定培训场地，满足教学需求："],
            bullets: ["投影设备", "音响系统", "足够空间"],
          },
          {
            heading: "2、设备要求",
            paragraphs: [],
            bullets: ["CPR模拟人", "AED训练器", "急救教学设备"],
          },
          {
            heading: "3、师资要求",
            paragraphs: ["需要AHA认证导师："],
            bullets: ["可自建或合作"],
          },
          {
            heading: "4、培训要求",
            paragraphs: ["必须按照AHA标准流程："],
            bullets: ["视频教学", "技能训练", "考核评估"],
          },
          {
            heading: "5、管理要求",
            paragraphs: [],
            bullets: ["培训组织", "学员管理", "课程安排", "资料归档"],
          },
        ],
      },
      {
        heading: "三、AHA急救培训基地申请流程",
        paragraphs: [],
        subsections: [
          { heading: "第一步：提交申请", paragraphs: ["填写申请信息，了解要求"] },
          { heading: "第二步：预约评估", paragraphs: ["评估场地、设备、能力"] },
          { heading: "第三步：导师培训", paragraphs: ["培养或引入AHA导师"] },
          { heading: "第四步：签署协议", paragraphs: ["完成合作或培训协议"] },
          { heading: "第五步：正式运营", paragraphs: ["开始开展急救培训"] },
        ],
      },
      {
        heading: "四、哪些单位适合申请？",
        paragraphs: [],
        bullets: ["企业（EHS、安全培训）", "培训机构", "学校、医院", "已有培训能力团队"],
      },
      {
        heading: "五、申请的实际价值",
        paragraphs: [],
        bullets: ["1、建立长期培训能力", "2、提升专业标准", "3、支持企业安全体系", "4、拓展培训业务"],
      },
      {
        heading: "六、申请前建议",
        paragraphs: [],
        bullets: ["是否有长期需求", "是否有培训资源", "是否具备场地和人员"],
      },
      {
        heading: "七、如何咨询？",
        paragraphs: ["课程顾问：黄老师", "电话 / 微信：13512456138"],
      },
      {
        heading: "急救培训基地申请咨询",
        paragraphs: [
          "如果你希望搭建企业急救培训体系，可以先评估是否适合申请培训基地。",
        ],
      },
      {
        heading: "咨询急救培训基地申请",
        paragraphs: [],
        qrCard: {
          title: "咨询急救培训基地申请",
          image: { src: "/images/wechat.png", alt: "微信二维码咨询急救培训基地申请" },
          textLines: ["微信扫码咨询急救培训基地申请", "或添加微信：13512456138", "也可电话咨询：13512456138"],
        },
      },
      {
        heading: "相关阅读",
        paragraphs: ["相关阅读："],
        links: [
          { label: "AHA急救证书含金量如何？", href: "/blog/benefits-of-first-aid-training" },
          { label: "企业为什么买了AED还要做急救培训？", href: "/blog/why-aed-still-need-training" },
          { label: "AHA和红十字急救培训有什么区别？", href: "/blog/aha-vs-red-cross-first-aid" },
        ],
      },
    ],
  },
  {
    slug: "aha-instructor-guide-2026",
    title: "想成为AHA急救导师？国内哪里可以考？需要什么条件（2026最新指南）",
    excerpt:
      "不只是“考证”，AHA 导师更像一套授课能力与标准化教学流程。本文整理成为 AHA（Heartsaver/BLS/ACLS/PALS）导师的路径、条件、国内如何参加培训，以及普通人能否报考。",
    description:
      "2026年想成为AHA急救导师？本文讲清楚导师类型、报名条件、国内如何参加授权培训中心导师课程、普通人是否可以报考，以及成为导师的实际价值与常见问题。",
    publishedAt: "2026-04-06",
    lead: [
      "这两年，我们收到的咨询里，有一类问题明显变多了：不是来报名急救员课程，而是直接问“我想成为AHA导师，国内哪里可以培训？需要什么条件？”",
      "咨询人群也很典型：医生护士、企业培训负责人、安全培训讲师，以及已经在做急救培训、希望体系更专业的人。",
      "如果你也在考虑成为 AHA 导师，这篇文章把最关键的信息一次讲清楚，帮你少走弯路。",
    ],
    sections: [
      {
        heading: "一、什么是AHA导师？",
        paragraphs: [
          "AHA 导师，是美国心脏协会（American Heart Association）认证的急救培训讲师，可以按照 AHA 标准开展急救培训课程。",
          "常见的导师类型包括：BLS 导师（医护急救课程）、ACLS 导师（高级生命支持）、PALS 导师（儿科急救）、Heartsaver 导师（大众急救课程）。",
          "其中，Heartsaver 导师是大多数非医疗人员选择的路径，因为主要教授公众急救技能：CPR 心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻急救、突发情况现场应对流程。",
          "它通常面向企业员工、学校人员与公众培训，一般不要求医学背景。",
        ],
      },
      {
        heading: "二、成为AHA导师需要什么条件？",
        paragraphs: [
          "很多人以为必须是医生才能成为导师，其实不是。Heartsaver 导师条件相对友好，整体更像“教学能力认证”，而不是单纯考试。",
          "常见路径通常包括：先取得 AHA 学员证书 → 参加导师培训课程（Instructor Course）→ 完成教学考核。",
        ],
        bullets: [
          "先取得 AHA 学员证书（例如 Heartsaver CPR AED 或 BLS 证书）",
          "参加导师培训课程：学习授课方法、如何使用 AHA 教学视频、课程组织与考核流程",
          "完成教学考核：模拟授课、助教实践、技能评估等（以当期安排为准）",
        ],
      },
      {
        heading: "三、AHA导师在哪里可以培训？（国内怎么报名）",
        paragraphs: [
          "AHA 导师必须通过授权培训中心培训，不是“随时报名随时考试”的模式。",
          "常见流程是：先取得学员证书 → 再报名导师课程 → 等待课程排期。",
          "国内一般在这些城市更可能有导师培训排期：北京、上海、广州、深圳、成都等。",
          "导师课程不像普通急救课程每月都有，很多时候是“有需求才组织、人数够才开班”，因此提前了解与咨询会更重要。",
        ],
      },
      {
        heading: "四、哪些人适合成为AHA导师？",
        paragraphs: ["根据实际情况，比较适合的人群包括："],
        bullets: [
          "医疗行业人员：医生、护士、急救人员",
          "培训行业人员：企业培训师、职业讲师、安全培训老师",
          "企业管理人员：EHS 负责人、安全经理、行政负责人",
          "已从事急救培训的人：红十字讲师、应急培训讲师、安全教育从业者",
        ],
      },
      {
        heading: "五、成为AHA导师有什么实际价值？",
        paragraphs: [
          "很多人最关心的是：成为导师之后能做什么？现实中主要有三个价值。",
        ],
        bullets: [
          "提升专业认可度：AHA 属于国际急救体系，在外企、国际学校和部分大型企业认可度较高",
          "课程体系更标准：视频与流程标准化，课程质量稳定，不完全依赖个人授课经验",
          "可以开展培训业务：对本身就在做培训的人，这是一个可长期发展的专业方向",
        ],
      },
      {
        heading: "六、很多人关心的几个真实问题",
        paragraphs: [
          "没有医学背景能考吗？可以。Heartsaver 导师本身就是公众急救课程方向。",
          "需要英语好吗？通常不需要。国内培训一般是中文教学。",
          "多久可以成为导师？通常取决于课程排期与个人准备：取得学员证书 → 参加导师课程 → 完成考核。",
          "费用多少？不同城市和培训中心不同，通常需要单独咨询确认。",
        ],
      },
      {
        heading: "七、想成为AHA导师，建议先了解这些",
        paragraphs: [
          "不要只问“哪里报名”，更建议先确认：是否适合做培训、是否有授课兴趣、是否有培训资源。",
          "因为导师更像一项长期能力，而不是单纯证书。如果只是考证，不一定有意义；如果准备长期做培训，价值会更大。",
        ],
      },
      {
        heading: "咨询AHA导师培训",
        paragraphs: ["如果你想了解：如何成为 AHA 导师、是否符合条件、国内哪里可以培训、近期是否有导师课程，可以直接咨询。"],
        qrCard: {
          title: "快速咨询AHA导师培训",
          cta: "也可电话咨询：13512456138",
          image: { src: "/images/wechat.png", alt: "微信二维码咨询AHA导师培训" },
          textLines: ["微信扫码咨询AHA导师培训", "或添加微信：13512456138"],
        },
      },
      {
        heading: "相关阅读",
        paragraphs: ["你也可以继续阅读："],
        links: [
          { label: "AHA急救证书含金量如何？", href: "/blog/benefits-of-first-aid-training" },
          { label: "企业为什么买了AED还要做急救培训？", href: "/blog/why-aed-still-need-training" },
          { label: "AHA和红十字急救培训有什么区别？", href: "/blog/aha-vs-red-cross-first-aid" },
        ],
      },
    ],
  },
  {
    slug: "aha-vs-red-cross-first-aid",
    title: "AHA和红十字急救培训有什么区别？怎么选更适合？（2026）",
    excerpt:
      "从课程体系、适用人群、证书与应用场景出发，对比 AHA 与红十字急救培训的差异，并给出选择建议。",
    description:
      "对比AHA与红十字急救培训的主要差异：课程体系、教学方式、适用场景与证书应用，帮助个人与企业选择更适合的急救培训路径。",
    publishedAt: "2026-04-06",
    sections: [
      {
        heading: "一、先说结论：两者都能学到急救技能，但体系侧重点不同",
        paragraphs: [
          "AHA 和红十字都能学习到 CPR、AED、窒息急救等基础技能。差异更多体现在：课程体系标准化程度、授课方式、证书应用场景与机构合作模式等。",
          "选择时更建议从“你的使用场景”出发：个人学习、企业内训、学校培训、外企/国际学校认可度等。",
        ],
      },
      {
        heading: "二、课程体系与授课方式的差异",
        paragraphs: [
          "AHA 体系更强调标准化流程与统一的教学材料（如视频与课程结构），有助于在不同班次维持一致的课堂质量。",
          "红十字课程在国内覆盖广、组织体系成熟，很多城市更容易找到常态化开班与报名入口。",
          "对企业来说，如果更关注课程交付一致性、复训机制与可复制的组织流程，通常会更偏向标准化程度更高的一类课程；如果更关注覆盖面与就近便利性，也可以优先考虑本地资源更充足的路径。",
        ],
      },
      {
        heading: "三、适用人群与常见选择建议",
        paragraphs: ["你可以按下面思路快速判断："],
        bullets: [
          "更偏企业、学校、公众急救普及：优先看课程是否强调实操、分组练习与流程演练",
          "更偏外企/国际学校/国际化场景：可重点关注 AHA 体系课程在该场景的认可度",
          "更偏就近学习、快速找到班次：可优先选择你所在城市更容易报名、排期更稳定的机构",
        ],
      },
      {
        heading: "四、企业怎么选更稳妥？",
        paragraphs: [
          "企业选择急救培训时，建议不要只看“证书”，而是把目标落在“现场是否真的会做”。",
          "更建议把培训做成可执行体系：覆盖关键岗位、明确分工、结合 AED 点位、安排周期性复训与演练。",
        ],
        links: [{ label: "企业为什么买了AED还要做急救培训？", href: "/blog/why-aed-still-need-training" }],
      },
      {
        heading: "五、下一步：怎么咨询与安排",
        paragraphs: [
          "如果你不确定选哪种更适合，可以先说明你的场景（企业/学校/个人）、城市、人数与目标，我们再建议更合适的方案与排期。",
        ],
      },
    ],
  },
  {
    "slug": "why-aed-still-need-training",
    "title": "企业配置AED后，培训与日常管理怎么安排？",
    "excerpt": "公众无需先接受医疗培训也可按提示使用 AED。企业仍值得安排实操和演练，并把设备点位、值班替补、维护检查与复盘落实到人。本文提供可填写的管理清单。",
    "description": "企业买了AED后如何安排员工培训和日常管理？区分公众使用AED、课程证书与技能复练，附点位可达、岗位替补、设备检查和演练复盘清单。",
    "publishedAt": "2026-04-03",
    "lead": [
      "企业配置 AED 后，下一步值得问的是：员工找得到吗、设备随时能取用吗、出现问题由谁处理、现场协作是否练过？",
      "先澄清一点：培训有助于做好准备，但不能把未培训或没有证书写成等待他人使用 AED 的理由。下文讨论企业平时怎样组织培训和管理，不替代紧急现场的专业急救指导。"
    ],
    "faqItems": [
      {
        "q": "没有培训或证书，可以使用AED吗？",
        "a": "可以。AED 面向公众设计。遇到疑似心脏骤停时，应及时呼救并遵循120调度员和设备提示，不应因没有培训或证书而等待。企业平时组织实操，有助于员工熟悉设备和分工。"
      },
      {
        "q": "企业买了AED，为什么还值得安排培训？",
        "a": "培训可以把设备使用与现场呼救、取用路线、团队分工和交接连接起来。可安排每名学员亲手练习，并在演练中找出问题、获得反馈。"
      },
      {
        "q": "AED培训必须每两年才复练一次吗？",
        "a": "不是。AHA Heartsaver CPR AED 课程完成卡有效期为两年，但证书有效期不等于技能复练间隔。企业可根据岗位和轮班变化、演练发现的问题，另行安排短时复练与情境演练。"
      },
      {
        "q": "企业AED多久检查、更换耗材？",
        "a": "按所配设备型号的厂家手册、设备提示和耗材有效期制定检查及更换计划。记录具体要求、责任人和处理结果，不统一套用未经核实的固定周期。"
      },
      {
        "q": "企业急救培训人数和费用怎么确定？",
        "a": "先提供城市、人数、工作场景、期望日期与证书需求，再确认分组、实操安排和报价。培训人数应兼顾每个人的实际练习机会。"
      }
    ],
    "sections": [
      {
        "heading": "一、公众可以使用AED，培训帮助企业做好平时准备",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "美国心脏协会 2026 年 9 月 8 日的公众科普指出，AED 无需医疗培训即可使用，设备会提供逐步提示；其使用还需要与心肺复苏配合。这里引用的是公众使用说明，不是中国企业的法定培训要求。",
            "links": [
              {
                "text": "阅读原文",
                "url": "https://www.heart.org/en/news/2026/09/08/what-is-an-aed-how-to-use-one-during-a-cardiac-arrest"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "企业培训的价值，是让员工在平时熟悉取用路线和设备提示，练习 CPR 与 AED 的协作，并知道如何联系专业急救人员。不要把“培训值得做”写成“没培训不能用”。"
          }
        ]
      },
      {
        "heading": "二、把课堂内容接到工作场景中",
        "paragraphs": [
          "安排培训时，可以提前提供实际工作地点、设备型号和岗位分布，让培训方说明哪些内容会练、如何分组、如何反馈。涉及不同楼层、前台、物业和夜班时，也应让相关岗位参加分工讨论。"
        ],
        "blocks": [
          {
            "type": "paragraph",
            "text": "北京市卫生健康委党校 2026 年 9 月 7 日报道的 8 月 28 日培训，包含现场演示、实操考核，并提出后续定期复训和场景模拟演练。这个例子说明，可以把一次课程延伸为后续练习安排；它不代表所有企业适用同一周期。",
            "links": [
              {
                "text": "阅读原文",
                "url": "https://wjw.beijing.gov.cn/xwzx_20031/jcdt/202609/t20260907_4853263.html"
              }
            ]
          }
        ],
        "bullets": [
          "个人实操：每位参与者有上手机会，记录需要再次练习的环节。",
          "团队协作：练习呼救、取用设备、引导急救人员和现场交接。",
          "岗位覆盖：考虑不同班次和休假时的替补，避免只指定一名员工。"
        ]
      },
      {
        "heading": "三、演练情境：AED在楼下，值班人员在楼上",
        "paragraphs": [
          "以下是用于讨论分工的虚构演练情境，不是真实事故或客户案例：办公区安排一次模拟演练，AED 位于一楼，参与者在三楼。现场发现大家知道设备的大致位置，却不清楚夜间能否进入一楼、谁去取设备、谁负责联系和引导急救人员。",
          "复盘时，把问题落到可处理的事项上：确认全天取用路线和门禁安排，补充不同班次的联系人，更新现场指引，再进行一次同场景演练。演练使用训练设备，按组织者的安排开展，不让练习占用设备的应急可用状态。"
        ]
      },
      {
        "heading": "四、证书有效期与日常复练，分别安排",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "AHA Heartsaver CPR AED 课程页面说明，完成课程要求后获得的课程完成卡有效期为两年。这是课程卡的有效期，不能据此推导为企业两年内不用练习。",
            "links": [
              {
                "text": "阅读原文",
                "url": "https://cpr.heart.org/en/cpr-courses-and-kits/heartsaver/heartsaver-cpr-aed-training"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "企业可分别记录课程完成与到期日期，以及下一次复练计划。新员工加入、岗位轮换、设备点位改变，或演练暴露问题时，都值得重新检查安排。复练频率由单位结合现场情况和培训反馈确定；本文不设统一周期。"
          }
        ]
      },
      {
        "heading": "五、可复制填写的AED管理与演练清单",
        "paragraphs": [
          "下面是便于企业开展自查的工作模板，不是法规要求，也不替代设备厂家手册。复制后填入具体人员和日期；每次检查或演练后更新。"
        ],
        "bullets": [
          "设备与点位：设备型号____；楼栋/楼层/准确位置____；现场指引位置____。",
          "取用可达：开放时段____；夜间或节假日能否取用____；门禁或锁具问题____；处理人____。",
          "责任与替补：日常负责人____；联系方式____；替补____；夜班/假日联系人____。",
          "检查依据：厂家手册名称及版本____；手册规定的检查项目和频次____；最近检查日期____；检查人____。",
          "设备与耗材记录：状态指示____；电极片有效期____；电池状态/更换要求____；其他手册要求____。",
          "异常处理：发现问题____；联系厂家/服务方____；处理期限____；处理完成及复核日期____。",
          "培训与复练：参与岗位/班次____；课程完成日期____；证书到期日期（如适用）____；待复练内容____；下次安排____。",
          "演练复盘：演练日期与情境____；取用路线是否畅通____；分工是否清楚____；发现的问题____；负责人及期限____；复核结果____。"
        ]
      },
      {
        "heading": "六、咨询培训时，先说明这些信息",
        "paragraphs": [
          "企业、学校和物业可提供城市、人数、主要工作场景、已有 AED 的型号与点位、期望日期和证书需求，便于讨论课程、分组及演练安排。个人也可以咨询所在城市的课程。",
          "都会急救｜黄老师；电话：13512456138；微信号：HHW20190225；邮箱：contact@yidaolife.com。具体课程、日期、费用和授课语言请咨询确认。"
        ],
        "links": [
          {
            "label": "咨询个人课程或企业团体培训",
            "href": "/contact"
          },
          {
            "label": "企业急救培训方案",
            "href": "/enterprise-training"
          },
          {
            "label": "查看培训城市",
            "href": "/cities"
          }
        ]
      },
      {
        "heading": "常见问题",
        "paragraphs": []
      },
      {
        "heading": "相关阅读",
        "paragraphs": [
          "继续了解设备配置和课程选择："
        ],
        "links": [
          {
            "label": "买AED之前需要了解的问题",
            "href": "/blog/before-buying-aed"
          },
          {
            "label": "为什么急救培训需要亲手练习",
            "href": "/blog/why-first-aid-hands-on-practice-matters"
          },
          {
            "label": "AHA急救课程体系",
            "href": "/programs"
          }
        ]
      }
    ],
    "updatedAt": "2026-10-12",
    "seoTitle": "企业配置AED后，培训与日常管理怎么安排？｜都会急救",
    "relatedSlugs": [
      "restart-a-heart-day-workplace-school-checklist",
      "before-buying-aed",
      "why-first-aid-hands-on-practice-matters"
    ]
  },
  {
    slug: "before-buying-aed",
    title: "买AED之前必须了解的9个关键问题｜企业AED采购与急救培训建议",
    excerpt:
      "企业采购 AED 往往只看价格和品牌，但真正决定“能不能用、敢不敢用”的，是设计、耗材维护与员工培训。本文整理 9 个采购前必须想清楚的问题。",
    description:
      "企业采购AED需要注意什么？从设备设计、价格、耗材到急救培训，本篇详细介绍AED采购前必须了解的关键问题，避免设备买了却不会用。",
    publishedAt: "2026-04-03",
    lead: [
      "近年来越来越多企业开始关注 AED（自动体外除颤器）的配置问题，但很多单位在采购时往往只关注价格和品牌，而忽略了设备设计、后期维护以及员工急救培训等关键因素。",
      "作为长期从事 AHA 急救培训和 AED 使用培训的机构，我们在实际培训和企业服务中总结了一些真实经验，希望帮助准备配置 AED 的单位少走弯路。",
    ],
    faqItems: [
      { q: "AED需要培训吗？", a: "建议至少接受一次规范急救培训。设备到位只是第一步，真正的关键是现场有人能按流程完成识别、呼救、按压与除颤配合。" },
      { q: "AED电极片多久更换？", a: "通常 2–5 年（不同品牌与型号略有差异），建议按设备提示与耗材有效期进行统一管理与周期性检查。" },
      { q: "买AED要不要考虑维护成本？", a: "要。电池、电极片等耗材更换周期与价格、售后响应、日常巡检与责任人机制，都会影响设备的长期可用率与实际成本。" },
    ],
    sections: [
      {
        heading: "一、为什么我对AED有一些不同的看法",
        paragraphs: [
          "很多单位在采购 AED 时，会把它当成“买一台设备”来完成任务：对比品牌、比价格、看参数，最后就下单。",
          "但在培训现场我经常看到另一个现实：AED 真的放在那里，并不等于关键时刻就能用起来。差距通常出现在“设备放置与管理”“耗材维护”“人员培训与演练”这三件事上。",
          "所以我更愿意把 AED 采购看成一件系统工程：设备 + 位置 + 人 + 流程 + 维护缺一不可。",
        ],
      },
      {
        heading: "二、真实课堂里的一个细节",
        paragraphs: [
          "在 CPR + AED 实操训练里，很多学员第一次看到 AED 会紧张：担心电击、担心按错键、担心“我不是医生能不能用”。",
          "但 AED 设计本身就是为了让普通人也能使用：它会自动分析心律、语音提示操作，并明确告诉你“是否需要电击”。",
          "真正的难点往往不是设备，而是现场能不能把流程做出来：呼救分工、持续按压、贴片位置、按提示除颤、减少中断。",
        ],
        image: {
          src: "/images/g3.jpg?v=eb9351e83ceb",
          alt: "急救培训现场实操训练",
          caption: "实操训练能显著降低紧张与误操作，提升现场可执行性。",
        },
      },
      {
        heading: "三、关键问题1：你买AED的真实使用场景是什么？",
        paragraphs: [
          "企业 AED 不是摆设，它要面对真实场景：办公楼、园区、厂区、健身房、学校、物业等，环境差异很大。",
          "建议先明确三个问题：AED 主要放室内还是室外？人流密度与风险点在哪里？发生事件时谁最可能是第一目击者？",
          "场景明确后，设备选型、防护等级、放置点位与培训安排才有依据。",
        ],
      },
      {
        heading: "四、关键问题2：放置位置是否真的“拿得到、看得见、用得上”？",
        paragraphs: [
          "很多单位把 AED 放在“最安全的地方”，例如管理办公室、抽屉里、上锁柜子里——结果就是关键时刻取不到。",
          "更推荐的原则是：靠近人流与风险点、标识清晰、取用路径短、不会被遮挡；同时明确责任人做日常检查。",
          "如果你的场所跨度大，可能需要多台设备与分区管理，而不是一台“全覆盖”。",
        ],
      },
      {
        heading: "五、关键问题3：你关注的是“买得便宜”，还是“长期可用率”？",
        paragraphs: [
          "AED 的价格区间确实很大，但采购决策不应只看一次性成本。",
          "很多单位忽略了长期可用率：电池与电极片是否按期更换？是否有人定期检查状态指示？设备报警是否能被及时处理？",
          "从风险管理角度，最贵的不是买贵了，而是“关键时刻不能用”。",
        ],
      },
      {
        heading: "六、关键问题4：耗材与维护机制是否清晰？",
        paragraphs: [
          "AED 的电极片、电池都有有效期与更换周期。不同品牌型号的耗材价格、可获得性、替换便利度也不同。",
          "建议在采购前就问清楚：耗材更换周期与成本、是否有状态自检与报警提示、售后响应时间、是否支持提醒与台账管理。",
          "把维护责任写进制度，比买哪一款更能提升长期效果。",
        ],
        image: {
          src: "/images/g5.jpg",
          alt: "AED 设备与公共场所配置",
          caption: "设备到位之外，更要把放置与维护流程落实到人。",
        },
      },
      {
        heading: "AED设备重要，但培训更重要",
        paragraphs: [
          "很多单位在采购 AED 后才发现：设备可以买，但员工不会用。",
          "真正决定急救成功率的，往往是有没有人接受过规范培训，能在紧张情境下把流程执行出来。",
          "我们目前提供：AHA Heartsaver急救培训、AED使用培训、企业急救培训。",
        ],
        bullets: ["一天完成", "国际认证", "全国多个城市开课", "纸质证书2年有效"],
        links: [
          { label: "查看急救培训课程", href: "/programs" },
          { label: "企业培训咨询", href: "/enterprise-training" },
        ],
      },
      {
        heading: "七、关键问题5：现场有没有“敢用的人”？（培训覆盖率）",
        paragraphs: [
          "AED 设计给普通人使用，但前提是现场有人愿意站出来并按流程操作。",
          "对于企业来说，比“配一台设备”更关键的是：每个风险点至少有一批人受过训练，知道怎么分工与协作。",
          "建议把培训覆盖与复训机制纳入年度安全管理，而不是一次性活动。",
        ],
      },
      {
        heading: "八、关键问题6：你是否把AED纳入了整体应急流程？",
        paragraphs: [
          "AED 的价值体现在和 CPR、呼救、现场分工一起运行。建议明确：谁负责取 AED、谁负责呼叫 120、谁持续按压、谁负责引导救援人员到达。",
          "如果是公共场所或大型园区，还应考虑：标识、广播、门禁与电梯通行、保安协作等环节。",
          "把流程演练一遍，比“写在制度里”更有效。",
        ],
      },
      {
        heading: "九、关键问题7：采购时是否考虑了“教育成本”？",
        paragraphs: [
          "同一台 AED，放在不同团队里，效果可能完全不同。原因是团队急救素养不同。",
          "建议把培训预算与采购预算一起规划：设备投入解决“有没有”，培训投入解决“会不会”。",
          "这也是为什么越来越多单位把 AED 配置与急救培训打包推进。",
        ],
        image: {
          src: "/images/g1.jpg",
          alt: "CPR 与 AED 教学演练",
          caption: "通过情境化训练，让流程变成肌肉记忆。",
        },
      },
      {
        heading: "十、关键问题8：你如何评估供应商与售后支持？",
        paragraphs: [
          "对多数单位来说，售后与培训支持的重要性不亚于设备本身。",
          "建议关注：响应速度、耗材供应稳定性、是否支持上门培训/集中培训、是否能提供标识与点位建议、是否能协助建立台账与巡检机制。",
          "把这些写进采购条款，后续会省很多沟通成本。",
        ],
      },
      {
        heading: "十一、关键问题9：哪些单位更适合优先配置AED？",
        paragraphs: [
          "从人员密度与突发事件风险角度，以下场景通常更适合优先配置：",
          "配置 AED 的意义不只是“买设备”，更是提升突发事件应对能力：设备、位置、培训、流程与维护要一起落地。",
        ],
        bullets: ["企业", "学校", "健身房", "写字楼", "商业综合体", "社区与公共场所"],
      },
      {
        heading: "如果你已经在考虑采购AED，建议同步考虑培训",
        paragraphs: [
          "很多企业采购 AED 后都会遇到同一个问题：设备在那里，但没人敢用。",
          "建议在采购时同步考虑：设备选型、安装位置、员工急救培训、使用流程设计。",
          "我们可以提供：AED选型建议、AED安装培训、AHA急救培训、企业急救体系建议。",
          "联系人：黄老师",
          "电话：13512456138",
          "微信：13512456138",
        ],
        links: [
          { label: "查看急救培训课程", href: "/programs" },
          { label: "企业培训咨询", href: "/enterprise-training" },
        ],
      },
      {
        heading: "常见问题（FAQ）",
        paragraphs: ["下面这些问题，是企业在 AED 采购与培训咨询中最常见的："],
      },
      {
        heading: "为什么很多企业选择我们",
        paragraphs: ["如果你希望把 AED 配置与急救能力建设一起推进，通常会更关注交付质量与可执行性："],
        bullets: ["AHA课程体系", "真实培训经验", "企业培训案例", "设备与培训一体化服务"],
      },
      {
        heading: "相关阅读",
        paragraphs: ["你也可以继续阅读这些内容："],
        links: [
          { label: "企业为什么买了AED还要做急救培训？", href: "/blog/why-aed-still-need-training" },
          { label: "AHA急救培训课程介绍", href: "/programs" },
          { label: "企业急救培训解决方案", href: "/enterprise-training" },
        ],
      },
      {
        heading: "如果你的单位正在考虑配置AED",
        paragraphs: [
          "适用单位：企业、学校、健身房、写字楼、商业综合体。",
          "可以直接联系咨询：黄老师 13512456138（电话/微信同号）。",
        ],
        links: [{ label: "立即咨询", href: "/contact" }],
      },
    ],
  },
  {
    slug: "tianjin-wma-wilderness-first-aid-training",
    title: "天津野外急救培训WMA（WMW）是什么？适合谁学？和AHA有什么区别？",
    excerpt:
      "从户外风险出发，解释 WMA（WMW）野外急救课程是什么、适合哪些人，以及它与 AHA 急救的差异，帮助你判断是否需要学习。",
    description:
      "天津野外急救培训（WMA WMW）适合徒步、登山、越野跑等户外人群。本文详细讲解WMA课程内容、适用人群以及与AHA急救的区别，帮助你判断是否需要学习。",
    publishedAt: "2026-03-17",
    updatedAt: "2026-10-22",
    lead: [
      "徒步、露营、登山、越野跑越来越普及，但真正遇到偏远地区的扭伤、失温、外伤出血或长时间等待救援时，很多人会发现：仅仅“会一点基础急救”并不够。",
      "本文用更偏科普的方式，讲清楚 WMA 野外急救（WMW）在学什么、适合谁，以及和 AHA 急救课程的区别，并给出天津线下学习入口，便于你做判断。",
    ],
    faqItems: [
      { q: "零基础可以学吗？", a: "可以。课程通常会从现场评估与基本原则讲起，并以情境化训练帮助学员把流程做出来。" },
      { q: "是否有证书？", a: "完成课程后一般会获得 WMA 体系相关培训证明/记录（以实际课程安排为准）。" },
      { q: "学完能解决什么问题？", a: "更重要的是提升“判断与决策能力”：在设备有限、无法快速送医的情况下，学会评估风险、处理常见伤情，并组织转运与长时间照护。" },
    ],
    sections: [
      {
        heading: "一、为什么越来越多人开始学野外急救？",
        paragraphs: [
          "一方面，户外活动（徒步、露营、越野跑等）参与人数在增加；另一方面，活动半径变大、环境更复杂，风险也随之上升。",
          "很多人学习过 AHA 等普通急救课程，能掌握 CPR、AED 使用等标准流程；但在真实户外环境中，常见挑战是：设备不足、通信不稳定、距离医疗系统远，甚至需要在现场处理较长时间。",
          "这也是野外急救的重要性所在：不只是“做一个动作”，而是能在复杂条件下判断风险、做出决策，并把处置组织起来。",
        ],
      },
      {
        heading: "二、什么是WMA野外急救（WMW课程）？",
        paragraphs: [
          "WMA（Wilderness Medical Associates）是国际知名的野外医学培训体系。",
          "WMW（Wilderness Medical Workshop）课程更强调在户外或偏远地区场景下的应对：当资源有限、无法快速送医时，如何进行伤情评估、做出处理与转运决策，并组织更长时间的照护。",
        ],
      },
      {
        heading: "三、WMA和AHA急救有什么区别？",
        paragraphs: [
          "可以用“场景差异”来理解两者的侧重点：",
          "AHA 课程更适合建立标准化急救流程与关键动作；WMA 更强调在不确定环境中把“评估—处理—转运”串起来。",
          "如果你经常户外或需要带队/保障，WMA 的思维框架往往更贴近真实情境。",
        ],
        table: {
          headers: ["项目", "AHA急救", "WMA野外急救"],
          rows: [
            ["场景", "标准环境", "野外环境"],
            ["核心", "技术操作", "判断 + 决策"],
            ["是否依赖设备", "高", "低"],
          ],
        },
      },
      {
        heading: "四、哪些人适合学WMA？",
        bullets: [
          "徒步 / 登山 / 露营人群",
          "越野跑 / 马拉松（尤其是长距离与山地）",
          "教练 / 体育老师 / 户外领队",
          "AHA学员进阶（希望补齐户外场景能力）",
        ],
        paragraphs: [
          "如果你在搜索“天津野外急救培训”“WMA野外急救课程”，通常意味着你已经意识到：户外场景的关键在于提前准备，而不是事后补救。",
        ],
      },
      {
        heading: "五、你能学到什么？",
        paragraphs: ["不同班次与场景侧重点可能略有差异，核心模块通常包括："],
        bullets: [
          "伤情评估（Primary & Secondary Survey）",
          "出血处理与伤口处理",
          "骨折固定（在无专业器材时的思路与方法）",
          "环境伤害（中暑 / 失温等）处理",
          "转运决策与团队协作分工",
          "长时间照护（Extended Care）",
        ],
      },
      {
        heading: "六、天津哪里可以学野外急救？",
        paragraphs: [
          "天津野外急救课程旧排期已归档，目前接受新一期意向咨询；时间、地点、费用、课程版本与证书安排待确认。",
          "天津野外急救培训（WMA WMW）",
          "建议先了解课程的上课日期、地点与适用人群，再结合自己的户外频率和风险暴露做选择。",
        ],
        links: [
          { label: "天津野外急救新一期咨询", href: "/tianjin-wma-wilderness-first-aid-training" },
          { label: "WMA野外急救课程详情", href: "/tianjin-wma-wilderness-first-aid-training" },
        ],
      },
      {
        heading: "七、是否值得学习？",
        paragraphs: [
          "如果你经常户外、参与长距离运动或处在偏远地区环境，通常更建议系统学习：关键时刻它能把“慌乱”变成可执行的流程。",
          "如果只是偶尔短途活动，也可以视情况而定：至少建立基本风险意识与核心处置原则，再逐步进阶。",
          "急救的价值常常体现在“用不上时的踏实感”，以及真正遇到情况时能够争取时间与机会。",
        ],
      },
      {
        heading: "八、常见问题（FAQ）",
        paragraphs: ["下面是一些常见问题，便于你快速判断是否适合："],
      },
      {
        heading: "了解更多",
        paragraphs: ["想了解天津野外急救课程当前状态与新一期咨询入口，可点击："],
        links: [{ label: "天津野外急救课程详情（WMA WMW）", href: "/tianjin-wma-wilderness-first-aid-training" }],
      },
    ],
  },
  {
    slug: "aed-price-difference",
    title: "AED价格从几千到两三万，到底差在哪？单位该买哪一款？",
    excerpt:
      "AED 价格差异主要来自品牌、功能配置、防护等级与长期维护成本。本文帮助企业、学校、健身房等单位建立选型思路。",
    description:
      "AED价格为什么从几千到两三万不等？本文从品牌、功能、防护等级、维护成本等方面，讲清楚 AED 的价格差异，以及企业、学校、健身房等单位应该如何选择。",
    publishedAt: "2026-03-17",
    lead: [
      "最近两年，我们收到很多来自企业、学校、健身房和写字楼物业的咨询：同样叫 AED（自动体外除颤仪），为什么有的几千元，有的两三万元？单位到底该买哪一款？",
      "这篇文章把常见的价格区间、差异点和采购建议整理成更适合网站阅读的版本，帮助你在预算、场景和长期维护之间做更稳妥的判断。",
    ],
    sections: [
      {
        heading: "一、为什么越来越多单位开始配置 AED",
        paragraphs: [
          "AED 的全称是自动体外除颤仪（Automated External Defibrillator）。它主要用于心脏骤停现场：当患者出现可除颤心律时，尽早进行除颤有机会恢复有效心跳。",
          "心脏骤停后，时间非常关键。通常认为 3–5 分钟内完成除颤与高质量 CPR，能显著提高成功率；而一旦错过窗口，生存机会会快速下降。",
          "现场有没有 AED，往往决定了“能不能把关键处置做起来”。因此越来越多公共场所与单位开始把 AED 配置纳入安全保障体系。",
        ],
        bullets: [
          "企业办公区、园区与厂区",
          "学校、培训机构、宿舍与体育场馆",
          "健身房、游泳馆、赛事活动现场",
          "写字楼、商场、社区与公共服务场所",
        ],
      },
      {
        heading: "二、AED其实普通人也可以使用",
        paragraphs: [
          "AED 并不是只有医生才能使用的设备。它的设计初衷就是让非专业人员在现场也能按照提示完成关键步骤。",
          "设备会自动分析心律，并判断是否需要电击除颤；如果不需要，AED 会明确提示继续胸外按压。语音提示与图示引导降低了操作门槛，让 AED 可以在公共场所推广。",
          "更现实的一点是：院外心脏骤停的第一目击者往往不是医护人员。让更多人“敢用、会用”，比把设备放在那里更重要。",
        ],
      },
      {
        heading: "三、AED价格区间大概是多少",
        paragraphs: [
          "从单位采购的常见报价看，AED 大致可以分为三个区间：",
          "价格差异通常不在“能不能除颤”这件事本身，而更多来自：品牌与渠道、功能配置、整体防护等级（例如防尘防水/抗摔抗冲击）、以及后期维护与耗材更换成本。",
          "对多数单位来说，更重要的问题不是“买最贵”，而是“在自己的使用场景下，买到更可靠、维护更可控的一款”。",
        ],
        table: {
          headers: ["类型", "价格区间"],
          rows: [
            ["入门款AED", "6000 – 10000元"],
            ["主流AED", "10000 – 20000元"],
            ["高端AED", "20000 – 30000元"],
          ],
        },
      },
      {
        heading: "四、目前常见的 AED 品牌",
        paragraphs: [
          "市场上常见品牌大致可以分为国际与国产两类。它们都属于成熟厂商，核心功能（识别心律、提示流程、必要时除颤）大致相同，差异更多体现在使用体验、设计细节、维护成本和服务支持上。",
        ],
        bullets: [
          "国际品牌：Philips（飞利浦）、ZOLL、LIFEPAK、HeartSine",
          "国产品牌：Mindray（迈瑞）",
        ],
      },
      {
        heading: "五、为什么很多单位现在选择迈瑞 AED",
        paragraphs: [
          "在实际配置与培训过程中，我们看到不少单位会把迈瑞列为优先对比项。以下更像是经验总结，而不是“哪家一定最好”的结论——最终仍要回到你单位的使用场景与管理方式。",
        ],
        subsections: [
          {
            heading: "1. 操作逻辑简单",
            paragraphs: [
              "单位配置 AED 的最大风险不是“不会买”，而是“关键时刻没人敢用”。操作提示更清晰、流程更直观的设备，更容易在紧张场景下被执行出来。",
            ],
          },
          {
            heading: "2. 防护等级较高",
            paragraphs: [
              "不少 AED 会被放在公共区域、前台、走廊、体育场馆或户外近入口处。更高的防护等级意味着对灰尘、潮湿、磕碰等环境因素更不敏感，日常管理压力更小。",
            ],
          },
          {
            heading: "3. 后期维护成本相对合理",
            paragraphs: [
              "采购只是第一步。电极片、电池等耗材的更换周期、价格与可获得性，以及售后响应速度，都会影响长期使用成本与“设备可用率”。很多单位更看重这一点的可控性。",
            ],
          },
        ],
      },
      {
        heading: "六、单位选择 AED 时建议重点看什么",
        paragraphs: [
          "如果你负责单位采购或安全管理，建议用下面 4 个维度建立决策逻辑：",
        ],
        bullets: [
          "使用场景：室内/室外？人流密度？是否靠近运动区域？是否需要随车/随队携带？",
          "操作难度：语音与图示是否清晰？开机/贴片/除颤提示是否一目了然？是否便于多人协作？",
          "售后与培训支持：是否能提供上门/集中培训？是否有耗材更换提醒与管理机制？售后响应是否明确？",
          "长期维护成本：耗材价格与更换周期、保修政策、后续升级与备件可获得性。",
        ],
      },
      {
        heading: "七、哪些单位适合配置 AED",
        paragraphs: [
          "从风险管理与人员密度角度看，以下场景配置 AED 的价值通常更高：",
          "配置 AED 不只是购买设备，更是提升突发事件应对能力：设备放置、人员培训、流程演练与维护管理需要一起做。",
        ],
        bullets: ["企业", "学校", "健身房", "写字楼", "商场", "社区", "赛事机构"],
      },
      {
        heading: "八、关于 AED 配置和急救培训咨询",
        paragraphs: [
          "最近咨询 AED 配置的单位较多。如果你有以下需求，可以联系沟通，我们可以根据场地、人群与预算给出更可执行的建议：",
        ],
        bullets: [
          "AED 采购建议",
          "AED 配置方案（数量、放置点位、标识与管理流程）",
          "AED 使用培训",
          "CPR + AED 急救培训（适合企业/学校/健身房等）",
        ],
      },
      {
        heading: "九、联系方式",
        paragraphs: [
          "名额有限，建议提前锁定",
          "联系人：黄老师",
          "电话：13512456138",
          "支持电话 / 微信咨询",
          "添加微信咨询报名",
        ],
        image: {
          src: "/images/wechat.png",
          alt: "微信二维码",
        },
      },
      {
        heading: "结尾",
        paragraphs: [
          "很多时候，差的不是技术——设备本身已经足够成熟。",
          "真正的差别，常常在于：现场有没有 AED、有没有人能按流程把它用起来。",
          "一台 AED 在关键时刻可能决定生死。把它放对地方、让更多人会用，才是配置的意义。",
        ],
      },
      {
        heading: "相关阅读",
        paragraphs: ["你也可以继续阅读这些内容："],
        links: [
          { label: "企业急救培训（定制/内训）", href: "/enterprise-training" },
          { label: "课程体系", href: "/programs" },
          { label: "AED为什么重要？", href: "/blog/aed-why-important" },
          { label: "CPR心肺复苏怎么做？", href: "/blog/how-to-do-cpr" },
        ],
      },
    ],
  },
  {
    slug: "aed-why-important",
    title: "AED为什么重要？",
    excerpt:
      "了解 AED 的基础作用，以及它在心脏骤停现场为什么常常决定抢救成功率。",
    description:
      "了解什么是 AED、AED 在心脏骤停中的作用，以及为什么公共场所需要 AED 设备与使用培训。",
    publishedAt: "2026-03-09",
    sections: [
      {
        heading: "什么是 AED",
        paragraphs: [
          "AED 是自动体外除颤仪（Automated External Defibrillator）的简称，用于在心脏骤停时识别可除颤心律并提示操作者进行电击除颤。它是为非专业人员也可在语音提示下使用而设计的设备。",
        ],
      },
      {
        heading: "AED 在心脏骤停中的作用",
        paragraphs: [
          "心脏骤停后，部分患者会出现可除颤心律。此时如果能尽早实施除颤，并配合 CPR 心肺复苏，可显著提高恢复自主循环的机会。",
          "AED 的价值不只是“放电”，更重要的是让现场急救流程更标准：快速判断、持续按压、及时除颤、等待专业救援接手。",
        ],
      },
      {
        heading: "为什么公共场所需要 AED",
        paragraphs: [
          "很多心脏骤停发生在医院外，例如办公区、商场、地铁、学校和体育场馆。公共场所配置 AED，能让旁观者在专业急救人员到达前完成关键处置。",
        ],
        bullets: [
          "缩短从发病到除颤的时间",
          "提升现场急救可执行性",
          "增强场所整体安全保障能力",
        ],
      },
      {
        heading: "学习 AED 使用的重要性",
        paragraphs: [
          "设备到位只是第一步，真正决定效果的是“现场是否有人会用”。通过系统急救培训学习 AED 使用流程，能够减少紧张和误操作，在关键时刻更快行动。",
          "如果希望更系统地掌握 AED 与 CPR 操作，可通过急救培训课程进行实操学习与指导。",
        ],
      },
    ],
  },
  {
    slug: "golden-four-minutes",
    title: "猝死黄金4分钟是什么意思？",
    excerpt:
      "黄金 4 分钟不是口号，而是心脏骤停现场争取生存机会的关键时间窗口。",
    description:
      "解释什么是心脏骤停和黄金 4 分钟，为什么 CPR 与 AED 在这个时间窗口内非常关键。",
    publishedAt: "2026-03-09",
    sections: [
      {
        heading: "什么是心脏骤停",
        paragraphs: [
          "心脏骤停是心脏突然停止有效泵血，患者会迅速失去意识、呼吸异常或停止。它与“心梗”并不完全相同，但都属于需要紧急处理的严重情况。",
        ],
      },
      {
        heading: "为什么黄金 4 分钟重要",
        paragraphs: [
          "脑组织对缺氧非常敏感。心脏骤停后如果长时间没有有效循环，神经系统损伤风险会明显上升。黄金 4 分钟强调的是：越早开始现场急救，越可能改善结局。",
        ],
      },
      {
        heading: "CPR 与 AED 的作用",
        paragraphs: [
          "CPR 可以在短时间内维持基础循环，帮助心脑获得有限血流；AED 则用于识别并处理可除颤心律。两者配合，是院外心脏骤停处理中最关键的组合。",
        ],
      },
      {
        heading: "为什么普通人也需要学习急救",
        paragraphs: [
          "很多突发事件发生在家庭、工作和公共场所，第一现场往往不是医护人员。普通人掌握急救技能，不是替代医疗，而是在专业救援前争取时间和机会。",
        ],
      },
    ],
  },
  {
    "slug": "how-to-do-cpr",
    "title": "CPR心肺复苏怎么做？",
    "seoTitle": "CPR心肺复苏怎么做？公众呼救、按压与AED要点｜都会急救",
    "excerpt": "遇到疑似心脏骤停，不要因为未受训而等待。说明成人及青少年场景下的识别、呼救、胸外按压和AED协作，以及实操学习的必要性。",
    "description": "结合AHA 2026年10月16日公众CPR提醒和国家卫健委科普，说明公众遇到疑似心脏骤停时的行动方向、单纯胸外按压的适用边界与培训建议。",
    "publishedAt": "2026-03-09",
    "updatedAt": "2026-10-19",
    "topics": [
      "CPR",
      "心肺复苏",
      "公众急救",
      "AED",
      "急救培训"
    ],
    "relatedSlugs": [
      "why-first-aid-hands-on-practice-matters",
      "why-aed-still-need-training",
      "outdoor-first-aid-preparation-before-hiking"
    ],
    "lead": [
      "这篇文章面向日常生活中的公众急救准备，重点说明遇到疑似心脏骤停时如何及时求助和行动。它不能覆盖所有年龄、病因和现场情况；真实紧急情况应立即呼救，并遵循急救调度员和AED提示。"
    ],
    "sections": [
      {
        "heading": "CPR 的基本概念",
        "paragraphs": [
          "CPR（心肺复苏）通过胸外按压，并在相应情形下结合人工呼吸，为心脏骤停患者维持血流和氧供，争取专业救援到达前的时间。它不适用于所有晕倒或身体不适的情况，需要结合反应与呼吸进行识别。"
        ]
      },
      {
        "heading": "没有受过培训，也不要等持证人员到场",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "AHA在2026年10月16日世界重启心脏日的公开提醒中强调，旁观者不应把CPR完全留给医疗专业人员。针对突然倒地、没有正常呼吸的青少年或成人，AHA鼓励及时呼救并开始胸外按压。是否持有培训证书，不应成为延迟求助和行动的理由。",
            "links": [
              {
                "text": "AHA 10月16日原文",
                "url": "https://newsroom.heart.org/news/4-ways-to-take-action-on-world-restart-a-heart-day"
              }
            ]
          }
        ]
      },
      {
        "heading": "成人及青少年场景下，先识别、呼救并行动",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "国家卫健委2026年1月13日新闻发布会面向公众介绍：先确认现场安全，判断是否有反应和正常呼吸；若无反应、没有正常呼吸或仅有濒死样喘息，应立即呼救、开展心肺复苏并尽快获取AED。在中国大陆，可拨打120，请周围的人协助取AED、接应救护人员，并按调度员指导行动。",
            "links": [
              {
                "text": "国家卫健委新闻发布会实录",
                "url": "https://www.nhc.gov.cn/xcs/c100122/202601/b805b5cc607941f1a4445a8b297bf4e9.shtml"
              }
            ]
          },
          {
            "type": "paragraph",
            "text": "对于符合上述情况的青少年或成人，未受训的旁观者可按急救调度员指导，在胸部中央持续用力、快速按压。AED到达后，打开设备并按语音提示操作；分析心律与电击时不要接触患者，之后按设备及调度指导继续施救。"
          }
        ]
      },
      {
        "heading": "单纯胸外按压不适合概括所有情况",
        "paragraphs": [],
        "blocks": [
          {
            "type": "paragraph",
            "text": "AHA的对照资料将公众单纯胸外按压提示主要用于青少年和成人；儿童、婴儿、溺水等情形需要特别重视呼吸支持。不要将“只按压”的简化提示直接套用到所有年龄与病因。应及时呼救，按照急救调度员指导和受训流程处理。",
            "links": [
              {
                "text": "AHA：单纯胸外按压与含人工呼吸的CPR",
                "url": "https://www.heart.org/-/media/CPR-Files/Courses-and-Kits/Hands-Only-CPR/2021HOCPR-documents/DS17758_CPRWeek_HOCPRvsCPR_02kk.pdf"
              }
            ]
          }
        ]
      },
      {
        "heading": "平时如何通过实操做好准备",
        "paragraphs": [
          "按压深度、频率、胸廓回弹以及减少中断，都需要在模拟人上练习并获得反馈。平时训练有助于改进动作和协作；遇到真实紧急情况时，不要因尚未参加课程而一直等待。",
          "个人学员可以关注识别、呼救、按压和AED操作；企业、学校与活动团队还可以练习谁联系120、谁取设备、谁接应、如何轮换与交接。课程内容和证书要求应在报名前确认。"
        ],
        "links": [
          {
            "label": "为什么急救培训必须重视实操",
            "href": "/blog/why-first-aid-hands-on-practice-matters"
          },
          {
            "label": "查看个人课程",
            "href": "/programs"
          },
          {
            "label": "了解企业团体培训",
            "href": "/enterprise-training"
          },
          {
            "label": "查看培训城市",
            "href": "/cities"
          }
        ]
      }
    ]
  },
  {
    slug: "why-companies-need-first-aid-training",
    title: "企业为什么需要急救培训？",
    excerpt:
      "企业急救培训不是可有可无的福利，而是组织安全管理能力的一部分。",
    description:
      "从企业安全管理、突发事件响应和员工能力建设角度，说明企业急救培训的实际价值。",
    publishedAt: "2026-03-09",
    sections: [
      {
        heading: "企业安全管理的重要性",
        paragraphs: [
          "企业日常运营会面对不同类型风险，急救能力是安全体系中的基础能力之一。建立急救培训机制，有助于完善组织的应急准备水平。",
        ],
      },
      {
        heading: "突发事件处理能力",
        paragraphs: [
          "无论在办公区、生产区还是活动现场，突发情况都可能发生。员工掌握 CPR 与 AED 基础操作，能够在第一时间完成初步处置并配合后续救援。",
        ],
      },
      {
        heading: "员工急救培训的价值",
        paragraphs: [
          "急救培训不仅提升个人能力，也能提升团队协作效率。经过训练的团队在紧急情况下更容易形成分工，减少现场混乱和等待成本。",
          "如果目标是让员工真正能施救，培训就不能只停留在讲座和观看同事演示，需要确认每位员工都有操作、反馈和考核的机会。",
        ],
        links: [{ label: "急救培训为什么必须重视实操练习", href: "/blog/why-first-aid-hands-on-practice-matters" }],
      },
      {
        heading: "企业培训场景",
        paragraphs: [
          "企业可结合人数、场地和行业需求，安排上门培训或集中培训。需要定制方案时，可查看企业培训页面了解详情。",
          "了解企业定制方案可访问：/enterprise-training",
        ],
      },
    ],
  },
  {
    slug: "benefits-of-first-aid-training",
    title: "学习急救证书有什么用？",
    excerpt:
      "急救证书的价值不仅在于“证明学过”，更在于建立可执行的急救能力。",
    description:
      "说明学习急救技能和获得急救证书在个人成长、岗位要求和企业培训中的实际价值。",
    publishedAt: "2026-03-09",
    sections: [
      {
        heading: "学习急救技能的意义",
        paragraphs: [
          "急救技能的核心价值在于“关键时刻能行动”。系统学习后，学员通常能更快判断现场情况并按流程开展基础处置。",
        ],
      },
      {
        heading: "急救证书的应用场景",
        paragraphs: [
          "在部分岗位和机构场景中，急救培训记录或证书可作为能力证明，也有助于个人在应聘、晋升或岗位分工中展示专业准备度。",
        ],
      },
      {
        heading: "为什么很多企业要求急救培训",
        paragraphs: [
          "越来越多企业把急救能力纳入安全培训体系。对企业来说，这不仅是合规和风险管理需求，也关系到员工和客户的现场安全保障。",
        ],
      },
      {
        heading: "如何参加急救课程",
        paragraphs: [
          "可以先查看开课城市与课程体系，再根据时间安排选择合适班次。个人报名通常以城市排期为主，企业需求可走定制培训路径。",
        ],
      },
    ],
  },
];

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
