/*
 * ACHIEVEMENTS DATA
 * ------------------
 * This is the single source of truth for the "Achievements & certifications"
 * section on the site. The site reads this file and builds the cards
 * automatically — you never need to touch index.html to add one.
 *
 * TO ADD A NEW ACHIEVEMENT BY HAND:
 *   Copy one of the objects below, paste it into the array, and edit the
 *   fields. Then save this file and refresh the page (or push to GitHub).
 *
 * TO ADD ONE WITHOUT EDITING CODE:
 *   Open admin.html in a browser. It gives you a form, and an "Export"
 *   button that generates an updated copy of this exact file for you to
 *   download and commit to your repo. See README.md for details.
 *
 * FIELD REFERENCE:
 *   title    (required) — the achievement or certificate name
 *   issuer   (required) — who issued it / where it happened
 *   date     (optional) — a short display string, e.g. "May 2026"
 *   icon     (required) — one of: award, target, code, hf, briefcase,
 *                          star, message, globe, waveform, check, layers
 *   verify   (optional) — a URL where anyone can verify the credential
 *   cert     (optional) — path to a certificate image, e.g.
 *                          "assets/certificates/yourfile.jpg"
 *                          shows a "View certificate" button that opens
 *                          the image in a lightbox
 */

const ACHIEVEMENTS = [
  {
    title: "2025 UNESCO UNITWIN Design Sprint Camp",
    issuer: "Handong Global University & MUST · Uganda",
    date: "Jul 7–11, 2025",
    icon: "award",
    cert: "assets/certificates/unesco-unitwin.jpg"
  },
  {
    title: "Introduction to Data Science in Python",
    issuer: "Coursera · University of Michigan",
    date: "Mar 30, 2026",
    icon: "target",
    verify: "https://coursera.org/verify/EHQ8747QQPJM",
    cert: "assets/certificates/coursera-datascience.jpg"
  },
  {
    title: "Introduction to Python Programming Training",
    issuer: "UCoBS · Ghent University, VUB & MUST",
    date: "Apr 13–17, 2026",
    icon: "code",
    cert: "assets/certificates/ghent-python-training.jpg"
  },
  {
    title: "The LLM Course — Fundamentals of LLMs",
    issuer: "Hugging Face",
    date: "Jun 9, 2026",
    icon: "hf",
    cert: "assets/certificates/huggingface-llm-course.jpg"
  },
  {
    title: "1 Minute Typing Test",
    issuer: "typing.com",
    date: "August 7, 2026",
    icon: "award",
    verify: "http://typing.com/apiv1/student/tests/414912272/177121827/certificate?language=en&product_id=adult_learner",
    cert: "assets/doc.pdf"
  },
  {
    title: "BrighterMonday Uganda Soft Skills Certificate",
    issuer: "BrighterMonday Uganda × Mastercard Foundation",
    date: "May 1, 2026",
    icon: "briefcase",
    verify: "https://www.brightermonday.co.ug/certificate/56ae84d2-b38b-4461-b528-cb69246e9833",
    cert: "assets/certificates/brightermonday-softskills.jpg"
  },
  {
    title: "AWS Badges — Compute & Storage",
    issuer: "Amazon Web Services",
    icon: "layers"
  },
  {
    title: "Most Disciplined Student",
    issuer: "A-Level Class of 2022–2023",
    icon: "star"
  },
  {
    title: "Class Councillor",
    issuer: "Biological Class, 2022–2023",
    icon: "message"
  },
  {
    title: "2nd Runner-Up, Dance Sport",
    issuer: "Wakiso District Regionals",
    icon: "award"
  },
  {
    title: "3rd Runner-Up, National Dance Sport",
    issuer: "USSSA Ball Games II",
    icon: "award"
  },
  {
    title: "DevFest Mbarara Attendee",
    issuer: "Google Developers Community",
    icon: "globe"
  },
  {
    title: "Fort Portal City Marathon Finisher",
    issuer: "5KM",
    date: "Jul 2026",
    icon: "waveform"
  },
  {
    title: "Zero Absences, Full Internship",
    issuer: "Sunbird AI, 8 Weeks",
    icon: "check"
  }
];

// Support both browser <script> usage and module usage (for admin.html)
if (typeof module !== "undefined" && module.exports) {
  module.exports = ACHIEVEMENTS;
}
