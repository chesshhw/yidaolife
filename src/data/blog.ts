export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
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
    slug: "how-to-do-cpr",
    title: "CPR心肺复苏怎么做？",
    excerpt:
      "从“知道 CPR”到“会做 CPR”，关键在于理解流程并进行规范实操训练。",
    description:
      "介绍 CPR 的基本概念和步骤，说明为什么规范培训和反复实操对急救效果很重要。",
    publishedAt: "2026-03-09",
    sections: [
      {
        heading: "CPR 的基本概念",
        paragraphs: [
          "CPR（心肺复苏）是在心脏骤停时通过胸外按压等手段维持基础循环的急救技术。它的目标是在专业救援到达前，尽可能维持重要器官灌注。",
        ],
      },
      {
        heading: "CPR 的基本步骤",
        paragraphs: [
          "实际场景中，流程通常包括：确认环境安全、判断意识与呼吸、呼叫急救与求助、开始高质量胸外按压、尽快获取 AED 并按提示操作。",
        ],
        bullets: [
          "尽早识别与呼救",
          "持续且规范的胸外按压",
          "尽快接入 AED",
          "与现场人员协作分工",
        ],
      },
      {
        heading: "为什么需要专业培训",
        paragraphs: [
          "CPR 看似简单，但按压深度、频率、回弹和中断时间都会影响效果。没有实操训练，很难在紧张环境下保持动作质量。",
        ],
      },
      {
        heading: "急救课程学习建议",
        paragraphs: [
          "建议通过系统课程完成从理论到实操的完整学习，尤其要在导师指导下反复练习。这样在紧急情况下更容易快速进入正确流程，而不是只停留在概念层面。",
        ],
      },
    ],
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
        ],
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
