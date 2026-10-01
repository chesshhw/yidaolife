import { ADDITIONAL_ENGLISH_CITIES } from "./english-cities";

export type EnglishTrainingPage = {
  title: string; heading: string; description: string; eyebrow: string;
  intro: string; city?: string; training: string;
  sections: { title: string; text: string; items?: string[] }[];
  faqs: { question: string; answer: string }[];
};
export const ENGLISH_TRAINING: Record<string, EnglishTrainingPage> = {
  ...ADDITIONAL_ENGLISH_CITIES,
  "corporate-first-aid-training-china": {
    title: "Corporate First Aid Training in China",
    heading: "Corporate first aid training in China.",
    description: "Plan hands-on first aid, CPR and AED training for your employees in China. Enquire about on-site courses in Beijing, Shanghai, Tianjin and other cities.",
    eyebrow: "FOR HR, EHS & EMPLOYEE TEAMS",
    intro: "AHA First Aid, CPR and AED training for companies, international organizations and employee teams. Build a training plan around your people and your workplace in China.",
    training: "Corporate First Aid Training",
    sections: [
      { title: "Practical skills, not just a presentation", text: "Hands-on practice is a core part of the training. Participants learn through demonstrations, practice with training equipment, scenarios and skills assessment. The final syllabus depends on the course selected.", items: ["First aid and adult CPR", "AED use and choking response", "Child and infant CPR where included in the selected course", "Medical, injury and environmental emergencies"] },
      { title: "For the people responsible for your team", text: "We welcome enquiries from international companies, offices, factories, hotels, schools and sports organizations. Tell us how training fits your employee health and safety program, including any specific course-completion requirements." },
      { title: "Bring training to your workplace", text: "On-site and group training can be arranged in major Chinese cities, subject to instructor, venue and date availability. Share your office or factory city, approximate group size and preferred dates. We will confirm the space, practice equipment and delivery arrangements before booking." },
      { title: "Planning from overseas?", text: "You can start the conversation by email. Include your China-based location and local contact if available. Teaching language, course materials, fees and scheduling are confirmed for each enquiry; submitting the form is not a booking." },
    ],
    faqs: [
      { question: "Can training take place at our office or factory?", answer: "Yes, on-site arrangements can be discussed. Please share the city, venue, team size and dates so we can confirm whether the proposed location and schedule are suitable." },
      { question: "Can a team in several Chinese cities enquire together?", answer: "Yes. List the cities and approximate numbers in your message. Delivery and dates need to be confirmed for each location." },
      { question: "Is English-language instruction guaranteed?", answer: "No. Tell us your language needs so we can confirm instructor availability, materials and course arrangements before you book." },
    ],
  },
  "aha-training-china": {
    title: "AHA Heartsaver Training in China | First Aid CPR AED",
    heading: "AHA Heartsaver First Aid CPR AED training in China.",
    description: "Enquire about AHA Heartsaver First Aid CPR AED training in China. Hands-on skills practice for individuals and teams, with dates and language confirmed before booking.",
    eyebrow: "AHA HEARTSAVER · INDIVIDUALS & TEAMS",
    intro: "Learn practical first aid, CPR and AED skills in China. Ask about a Heartsaver course that matches your workplace requirements or personal training goals.",
    training: "AHA Heartsaver First Aid CPR AED",
    sections: [
      { title: "Choose the right course", text: "Heartsaver courses are designed for people with little or no medical training. Tell us whether you need first aid, CPR and AED together, and whether an employer or organization requires a particular course." },
      { title: "Learning includes hands-on practice", text: "Training covers the topics included in the selected course, such as first aid, CPR, AED use and choking response. Instructor-guided practice and the required skills assessment are part of completing a skills-based course." },
      { title: "Course completion and validity", text: "An AHA Heartsaver course completion card is valid for two years. It is issued following successful completion of the applicable course requirements, not simply for submitting an enquiry or attending a presentation. Confirm the exact course and card requirements before booking." },
      { title: "Make arrangements before you travel", text: "Tell us your city in China, travel dates and preferred teaching language. We will discuss available arrangements. 都会急救 is the training provider presented on this website; this page is not an official American Heart Association website." },
    ],
    faqs: [
      { question: "How long is a Heartsaver course completion card valid?", answer: "An AHA Heartsaver course completion card is valid for two years after successful course completion." },
      { question: "Can I enquire as an individual?", answer: "Yes. Share your city and possible dates so we can discuss suitable training arrangements." },
      { question: "Is this an online-only certificate?", answer: "This enquiry is for practical training in China. Hands-on practice and required skills assessments must be completed; an enquiry does not confer certification." },
    ],
  },
  "beijing-first-aid-training": {
    title: "First Aid & CPR Training in Beijing",
    heading: "First aid & CPR training in Beijing.",
    description: "Enquire about AHA Heartsaver, first aid, CPR and AED training in Beijing for individuals, international organizations and workplace teams.",
    eyebrow: "BEIJING · TRAINING ENQUIRIES", city: "Beijing",
    intro: "Arrange practical first aid, CPR and AED training for your Beijing team, or ask about an individual course during your time in the city.",
    training: "AHA Heartsaver First Aid CPR AED",
    sections: [
      { title: "For Beijing-based teams", text: "If you are coordinating training for an office, international organization or school, tell us your district, team size and preferred dates. On-site options depend on the venue and instructor schedule." },
      { title: "Individual learning and course requirements", text: "Enquire about AHA Heartsaver First Aid CPR AED or CPR and AED training. Mention any workplace requirement and whether you need English-language instruction. The course, language and available dates will be confirmed before booking." },
      { title: "Planning a short stay?", text: "Provide your arrival and departure dates and the days you can attend. A city enquiry does not reserve a place or imply a daily walk-in schedule; please confirm your course before making travel plans around it." },
    ],
    faqs: [
      { question: "Where in Beijing will the course take place?", answer: "The venue is confirmed with the course arrangement. For a company group, include your office location so we can discuss on-site delivery." },
      { question: "Can our Beijing team learn first aid, CPR and AED together?", answer: "Ask about the AHA Heartsaver First Aid CPR AED course. We will confirm the selected course content and completion requirements for your group." },
    ],
  },
  "shanghai-first-aid-training": {
    title: "First Aid & CPR Training in Shanghai",
    heading: "First aid & CPR training in Shanghai.",
    description: "Request first aid, CPR and AED training in Shanghai. AHA Heartsaver enquiries, employee group training and individual course arrangements.",
    eyebrow: "SHANGHAI · INDIVIDUALS & COMPANIES", city: "Shanghai",
    intro: "From a corporate training brief to an individual course enquiry, start planning hands-on first aid training in Shanghai.",
    training: "AHA Heartsaver First Aid CPR AED",
    sections: [
      { title: "A useful brief for a Shanghai course", text: "Share your location in Shanghai, group size and practical goals. For a workplace group, include your available training space and any scheduling constraints so we can discuss a suitable on-site format." },
      { title: "Skills for your workplace or everyday life", text: "Enquire about AHA Heartsaver, first aid, CPR and AED training. Hands-on practice supports the selected course; it is not replaced by watching a video. Course content and assessment requirements are confirmed before booking." },
      { title: "Working across time zones", text: "If you are booking from an overseas headquarters, email is enough to begin. Tell us the Shanghai contact and teaching-language needs if known. Individuals visiting or living in Shanghai can use the same enquiry form." },
    ],
    faqs: [
      { question: "Can an overseas office arrange training for staff in Shanghai?", answer: "Yes. Submit the Shanghai location, expected participant count and preferred dates. We will discuss delivery, language and fees before confirming a booking." },
      { question: "Do I need a Chinese phone number?", answer: "No. Your name, email and training city are sufficient to submit an enquiry. Phone and WeChat details are optional." },
    ],
  },
  "tianjin-first-aid-training": {
    title: "First Aid & CPR Training in Tianjin",
    heading: "First aid & CPR training in Tianjin.",
    description: "Enquire about practical first aid, CPR and AED training in Tianjin. Discuss AHA Heartsaver courses, company groups and individual training needs.",
    eyebrow: "TIANJIN · HANDS-ON LEARNING", city: "Tianjin",
    intro: "Discuss AHA Heartsaver, first aid, CPR and AED training in Tianjin with 都会急救. Tell us who will attend and what you need from the course.",
    training: "AHA Heartsaver First Aid CPR AED",
    sections: [
      { title: "Tell us where your team works", text: "For company and factory enquiries, include the venue area in Tianjin and your expected participant count. We can discuss on-site training requirements, instructor availability and a suitable date." },
      { title: "Practice is central to the course", text: "Individuals and employee teams can enquire about first aid, CPR and AED training. The chosen course determines the topics, practice and assessment. Mention any specific course-completion card requirement when you contact us." },
      { title: "Confirm the details before attending", text: "Venue, price, course date and teaching language are confirmed as part of your enquiry. If you need an English-language course, tell us early; it is subject to instructor and material availability." },
    ],
    faqs: [
      { question: "Can I join as an individual in Tianjin?", answer: "Yes, individual enquiries are welcome. Share possible dates so we can discuss course availability." },
      { question: "Can training be arranged for a company in Tianjin?", answer: "Yes, group and on-site arrangements can be discussed based on the city location, venue, number of participants and selected course." },
    ],
  },
  "aha-instructor-training-china": {
    title: "AHA Instructor Training in China | Enquiries",
    heading: "AHA instructor training enquiries in China.",
    description: "Discuss the AHA instructor pathway in China. Share your existing training, intended discipline and location to confirm prerequisites and course availability.",
    eyebrow: "INSTRUCTOR PATHWAY · ENQUIRE FIRST",
    intro: "Interested in becoming an instructor? Start with your existing training, intended course discipline and the city in China where you would like to train.",
    training: "AHA Instructor Training",
    sections: [
      { title: "Begin with eligibility", text: "Instructor development is different from taking a provider course. Tell us which valid provider cards you hold, your teaching background and which discipline you intend to teach. Do not send identity documents or card numbers through this form." },
      { title: "Confirm the complete pathway", text: "Prerequisites, required learning, instructor-course availability, monitoring and any training-center arrangements must be confirmed before enrollment. An instructor-course enquiry is not a promise of instructor status." },
      { title: "Language and timing", text: "Share your city, preferred dates and language needs. We will discuss whether the available arrangements match your goals. Do not book travel on the assumption that a course date or English-language place is guaranteed." },
    ],
    faqs: [
      { question: "Does attending a course automatically make me an AHA instructor?", answer: "No. Applicable prerequisites, course requirements and subsequent steps must be completed. Ask for the full pathway and eligibility requirements before booking." },
      { question: "What should I include in my enquiry?", answer: "Your city, current provider qualification type, intended discipline, preferred dates and teaching-language needs are helpful. Avoid sending sensitive documents in the initial message." },
    ],
  },
};
