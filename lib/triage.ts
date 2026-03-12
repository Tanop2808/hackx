export type Urgency = "RED" | "YELLOW" | "GREEN";

export interface BilingualText {
  hi: string;
  en: string;
}

export interface TriageResult {
  urgency: Urgency;
  conditionHi: string;
  conditionEn: string;
  doNow: BilingualText[];
  doNot: BilingualText[];
  warnings: BilingualText[];
  docType: BilingualText;
  wait: BilingualText;
  contagious: BilingualText;
  emergency: boolean;
  summary: string;
}

// ─────────────────────────────────────────────────────
// SYMPTOM COMBINATION RULES
// Each rule is checked in order — first match wins
// More specific rules (longer symptom lists) come first
// ─────────────────────────────────────────────────────

interface TriageRule {
  required: string[];
  boosters?: string[];
  urgency: Urgency;
  conditionHi: string;
  conditionEn: string;
  doNow: BilingualText[];
  doNot: BilingualText[];
  warnings: BilingualText[];
  docType: BilingualText;
  wait: BilingualText;
  contagious: BilingualText;
  emergency: boolean;
  summary: string;
}

const TRIAGE_RULES: TriageRule[] = [

  // ── RED — LIFE THREATENING ────────────────────────────

  {
    required: ["chest", "breath"],
    urgency: "RED",
    conditionHi: "संभावित हृदय आपातकाल",
    conditionEn: "Possible Cardiac Emergency",
    doNow: [
      { hi: "तुरंत लेट जाएं — बिल्कुल न हिलें", en: "Lie down immediately — do not move at all" },
      { hi: "108 पर अभी कॉल करें — एम्बुलेंस", en: "Call 108 right now — Ambulance" },
      { hi: "किसी परिवार के सदस्य को तुरंत बुलाएं", en: "Call a family member immediately" },
    ],
    doNot: [
      { hi: "खाना या पानी बिल्कुल न दें", en: "Do not give food or water at all" },
      { hi: "अकेले न छोड़ें — पास रहें", en: "Do not leave alone — stay close" },
      { hi: "चलने या उठने की कोशिश न करें", en: "Do not try to walk or get up" },
    ],
    warnings: [
      { hi: "होंठ या नाखून नीले पड़ें", en: "Lips or nails turning blue" },
      { hi: "बेहोशी आने लगे", en: "Signs of losing consciousness" },
      { hi: "बायें हाथ में दर्द बढ़े", en: "Pain spreading to left arm" },
    ],
    docType: { hi: "आपातकालीन / हृदय रोग विशेषज्ञ", en: "Emergency / Cardiologist" },
    wait: { hi: "तुरंत — एक मिनट भी न रुकें", en: "Immediately — do not wait even one minute" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: true,
    summary: "Chest pain with breathlessness — possible cardiac emergency. Call 108 immediately.",
  },

  {
    required: ["chest", "sweat"],
    urgency: "RED",
    conditionHi: "संभावित दिल का दौरा",
    conditionEn: "Possible Heart Attack",
    doNow: [
      { hi: "तुरंत लेट जाएं", en: "Lie down immediately" },
      { hi: "108 पर कॉल करें", en: "Call 108 now" },
      { hi: "कपड़े ढीले करें", en: "Loosen tight clothing" },
    ],
    doNot: [
      { hi: "खाना या पानी न दें", en: "Do not give food or water" },
      { hi: "अकेले न छोड़ें", en: "Do not leave alone" },
    ],
    warnings: [
      { hi: "बेहोशी आए", en: "Loss of consciousness" },
      { hi: "सांस बंद होने लगे", en: "Breathing stops" },
    ],
    docType: { hi: "हृदय रोग विशेषज्ञ", en: "Cardiologist" },
    wait: { hi: "तुरंत — 0 मिनट", en: "Immediately — 0 minutes" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: true,
    summary: "Chest pain with sweating — possible heart attack. Emergency care needed immediately.",
  },

  {
    required: ["breath"],
    boosters: ["chest", "dizzy", "sweat"],
    urgency: "RED",
    conditionHi: "गंभीर सांस की तकलीफ",
    conditionEn: "Severe Breathing Difficulty",
    doNow: [
      { hi: "सीधे बैठें — लेटें नहीं", en: "Sit upright — do not lie down" },
      { hi: "108 पर कॉल करें", en: "Call 108 immediately" },
      { hi: "खिड़की खोलें — ताज़ी हवा दें", en: "Open windows — allow fresh air" },
    ],
    doNot: [
      { hi: "लेटाएं नहीं", en: "Do not make them lie flat" },
      { hi: "घबराएं नहीं — शांत रहें", en: "Do not panic — stay calm" },
    ],
    warnings: [
      { hi: "होंठ नीले पड़ें", en: "Lips turning blue" },
      { hi: "बात करने में तकलीफ हो", en: "Difficulty speaking" },
    ],
    docType: { hi: "आपातकालीन चिकित्सक", en: "Emergency Doctor" },
    wait: { hi: "तुरंत", en: "Immediately" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: true,
    summary: "Severe breathlessness — possible respiratory emergency. Call 108 immediately.",
  },

  {
    required: ["fever", "rash", "headache"],
    urgency: "RED",
    conditionHi: "संभावित डेंगू / मेनिनजाइटिस",
    conditionEn: "Possible Dengue / Meningitis",
    doNow: [
      { hi: "तुरंत अस्पताल जाएं", en: "Go to hospital immediately" },
      { hi: "ORS या नारियल पानी दें", en: "Give ORS or coconut water" },
      { hi: "मरीज़ को अलग कमरे में रखें", en: "Keep patient in separate room" },
    ],
    doNot: [
      { hi: "Aspirin या Ibuprofen न दें", en: "Do not give Aspirin or Ibuprofen" },
      { hi: "अकेला न छोड़ें", en: "Do not leave alone" },
    ],
    warnings: [
      { hi: "दाने फैलने लगें", en: "Rash spreading rapidly" },
      { hi: "गर्दन अकड़ जाए", en: "Stiffness in neck" },
      { hi: "रोशनी से परेशानी हो", en: "Sensitivity to light" },
    ],
    docType: { hi: "आपातकालीन / संक्रामक रोग विशेषज्ञ", en: "Emergency / Infectious Disease" },
    wait: { hi: "तुरंत — आज ही अस्पताल जाएं", en: "Immediately — go to hospital today" },
    contagious: { hi: "हो सकता है", en: "Possibly yes" },
    emergency: true,
    summary: "Fever with rash and headache — possible dengue or meningitis. Immediate hospital visit required.",
  },

  {
    required: ["unconscious"],
    urgency: "RED",
    conditionHi: "बेहोशी — आपातकाल",
    conditionEn: "Unconsciousness — Emergency",
    doNow: [
      { hi: "तुरंत 108 पर कॉल करें", en: "Call 108 immediately" },
      { hi: "करवट से लिटाएं — पीठ पर नहीं", en: "Lay on side — not on back" },
      { hi: "मुँह में कुछ न डालें", en: "Do not put anything in mouth" },
    ],
    doNot: [
      { hi: "हिलाएं या झकझोरें नहीं", en: "Do not shake or jolt the person" },
      { hi: "पानी न पिलाएं", en: "Do not give water" },
    ],
    warnings: [
      { hi: "सांस बंद हो जाए", en: "Breathing stops" },
      { hi: "दौरे आने लगें", en: "Seizures begin" },
    ],
    docType: { hi: "आपातकालीन चिकित्सक", en: "Emergency Doctor" },
    wait: { hi: "तुरंत — 0 मिनट", en: "Immediately — 0 minutes" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: true,
    summary: "Unconsciousness reported — life-threatening emergency. Call 108 immediately.",
  },

  {
    required: ["seizure"],
    urgency: "RED",
    conditionHi: "दौरा / मिर्गी — आपातकाल",
    conditionEn: "Seizure — Emergency",
    doNow: [
      { hi: "आस-पास की चीज़ें हटाएं जिससे चोट न लगे", en: "Remove nearby objects to prevent injury" },
      { hi: "करवट से लिटाएं", en: "Turn on their side" },
      { hi: "108 पर कॉल करें", en: "Call 108 now" },
    ],
    doNot: [
      { hi: "मुँह में कुछ न डालें", en: "Do not put anything in mouth" },
      { hi: "दबाकर न पकड़ें", en: "Do not restrain forcefully" },
    ],
    warnings: [
      { hi: "दौरा 5 मिनट से ज़्यादा चले", en: "Seizure lasts more than 5 minutes" },
      { hi: "बेहोशी बनी रहे", en: "Remains unconscious after seizure" },
    ],
    docType: { hi: "न्यूरोलॉजिस्ट / आपातकाल", en: "Neurologist / Emergency" },
    wait: { hi: "तुरंत", en: "Immediately" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: true,
    summary: "Seizure reported — neurological emergency. Call 108 and ensure patient safety.",
  },

  {
    required: ["bleed"],
    urgency: "RED",
    conditionHi: "गंभीर रक्तस्राव",
    conditionEn: "Severe Bleeding",
    doNow: [
      { hi: "साफ कपड़े से दबाव डालें — रक्त रोकें", en: "Apply pressure with clean cloth — stop bleeding" },
      { hi: "108 पर कॉल करें", en: "Call 108 immediately" },
      { hi: "लिटा दें और पैर ऊपर करें", en: "Lay down and raise legs" },
    ],
    doNot: [
      { hi: "कपड़ा बार-बार न हटाएं", en: "Do not keep removing the cloth" },
      { hi: "घाव साफ करने की कोशिश न करें", en: "Do not try to clean the wound" },
    ],
    warnings: [
      { hi: "खून न रुके", en: "Bleeding does not stop" },
      { hi: "मरीज़ पीला पड़ जाए", en: "Patient becomes pale" },
    ],
    docType: { hi: "आपातकालीन / सर्जन", en: "Emergency / Surgeon" },
    wait: { hi: "तुरंत", en: "Immediately" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: true,
    summary: "Severe bleeding — apply pressure and call 108 immediately.",
  },

  {
    required: ["vomit", "diarrhea", "dizzy", "weakness"],
    urgency: "RED",
    conditionHi: "गंभीर निर्जलीकरण",
    conditionEn: "Severe Dehydration",
    doNow: [
      { hi: "तुरंत ORS घोल दें — थोड़ा-थोड़ा हर 5 मिनट में", en: "Give ORS solution immediately — small sips every 5 minutes" },
      { hi: "नारियल पानी या नींबू पानी दें", en: "Give coconut water or lemon water" },
      { hi: "आज अस्पताल जाएं — IV drip ज़रूरी हो सकता है", en: "Go to hospital today — IV drip may be needed" },
    ],
    doNot: [
      { hi: "ठंडा पानी एक बार में ज़्यादा न दें", en: "Do not give large amounts of cold water at once" },
      { hi: "दूध या तेल वाला खाना न दें", en: "Do not give milk or oily food" },
    ],
    warnings: [
      { hi: "पेशाब बंद हो जाए", en: "Urination stops completely" },
      { hi: "आँखें अंदर धँस जाएं", en: "Eyes appear sunken" },
      { hi: "बेहोशी आने लगे", en: "Signs of losing consciousness" },
    ],
    docType: { hi: "सामान्य चिकित्सक / आपातकाल", en: "General Physician / Emergency" },
    wait: { hi: "आज — 2 घंटे में", en: "Today — within 2 hours" },
    contagious: { hi: "हो सकता है", en: "Possibly" },
    emergency: true,
    summary: "Severe dehydration with multiple symptoms — hospital visit urgently needed today.",
  },

  // ── YELLOW — NEEDS DOCTOR TODAY ──────────────────────

  {
    required: ["fever", "chills"],
    urgency: "YELLOW",
    conditionHi: "संभावित मलेरिया / वायरल बुखार",
    conditionEn: "Possible Malaria / Viral Fever",
    doNow: [
      { hi: "Paracetamol लें — बुखार कम करें", en: "Take Paracetamol — reduce fever" },
      { hi: "ORS या नींबू पानी पिएं", en: "Drink ORS or lemon water" },
      { hi: "आज डॉक्टर से मिलें — मलेरिया टेस्ट करवाएं", en: "See doctor today — get malaria test" },
    ],
    doNot: [
      { hi: "Aspirin न लें — खासकर बच्चों को न दें", en: "Do not take Aspirin — especially for children" },
      { hi: "भारी काम न करें", en: "Avoid heavy physical activity" },
    ],
    warnings: [
      { hi: "बुखार 103°F से ऊपर जाए", en: "Fever goes above 103°F" },
      { hi: "तेज़ सिरदर्द और उल्टी आए", en: "Severe headache and vomiting" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "आज — 4 घंटे में", en: "Today — within 4 hours" },
    contagious: { hi: "नहीं (मच्छर से फैलता है)", en: "No (spreads via mosquito)" },
    emergency: false,
    summary: "Fever with chills — possible malaria. Doctor visit and malaria test needed today.",
  },

  {
    required: ["fever", "rash"],
    urgency: "YELLOW",
    conditionHi: "संभावित डेंगू / वायरल संक्रमण",
    conditionEn: "Possible Dengue / Viral Infection",
    doNow: [
      { hi: "खूब पानी और ORS पिएं", en: "Drink plenty of water and ORS" },
      { hi: "आज डॉक्टर से मिलें — डेंगू टेस्ट करवाएं", en: "See doctor today — get dengue test" },
      { hi: "मच्छरदानी लगाएं", en: "Use mosquito net" },
    ],
    doNot: [
      { hi: "Aspirin या Brufen न लें", en: "Do not take Aspirin or Ibuprofen" },
      { hi: "खुद से एंटीबायोटिक न लें", en: "Do not self-medicate with antibiotics" },
    ],
    warnings: [
      { hi: "मसूढ़ों से खून आए", en: "Bleeding from gums" },
      { hi: "पेट में तेज़ दर्द हो", en: "Severe stomach pain" },
      { hi: "दाने तेज़ी से फैलें", en: "Rash spreading rapidly" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "आज — 3 घंटे में", en: "Today — within 3 hours" },
    contagious: { hi: "नहीं (मच्छर से)", en: "No (via mosquito)" },
    emergency: false,
    summary: "Fever with rash — possible dengue. Doctor visit and blood test needed today.",
  },

  {
    required: ["fever", "cough", "breath"],
    urgency: "YELLOW",
    conditionHi: "संभावित निमोनिया / श्वसन संक्रमण",
    conditionEn: "Possible Pneumonia / Respiratory Infection",
    doNow: [
      { hi: "आज डॉक्टर से मिलें — छाती का X-ray हो सकता है", en: "See doctor today — chest X-ray may be needed" },
      { hi: "भाप लें (Steam inhalation)", en: "Do steam inhalation" },
      { hi: "गर्म पानी और तरल पिएं", en: "Drink warm water and fluids" },
    ],
    doNot: [
      { hi: "ठंडी चीज़ें न खाएं-पिएं", en: "Avoid cold food and drinks" },
      { hi: "बाहर ठंड में न जाएं", en: "Do not go out in cold" },
    ],
    warnings: [
      { hi: "सांस लेने में ज़्यादा तकलीफ हो", en: "Breathing becomes more difficult" },
      { hi: "खाँसी में खून आए", en: "Blood in cough" },
    ],
    docType: { hi: "सामान्य चिकित्सक / छाती रोग विशेषज्ञ", en: "General Physician / Chest Specialist" },
    wait: { hi: "आज — 2 घंटे में", en: "Today — within 2 hours" },
    contagious: { hi: "हाँ — मास्क लगाएं", en: "Yes — wear a mask" },
    emergency: false,
    summary: "Fever with cough and breathlessness — possible pneumonia. See doctor today.",
  },

  {
    required: ["fever", "headache", "vomit"],
    urgency: "YELLOW",
    conditionHi: "संभावित टाइफाइड / गंभीर वायरल",
    conditionEn: "Possible Typhoid / Severe Viral",
    doNow: [
      { hi: "आज डॉक्टर से मिलें — Widal test करवाएं", en: "See doctor today — get Widal test for typhoid" },
      { hi: "उबला हुआ पानी पिएं", en: "Drink only boiled water" },
      { hi: "हल्का खाना खाएं — दाल, खिचड़ी", en: "Eat light food — dal, khichdi" },
    ],
    doNot: [
      { hi: "बाहर का खाना बिल्कुल न खाएं", en: "Do not eat outside food at all" },
      { hi: "खुद से एंटीबायोटिक न लें", en: "Do not self-medicate with antibiotics" },
    ],
    warnings: [
      { hi: "बुखार 7 दिन से ज़्यादा रहे", en: "Fever persists more than 7 days" },
      { hi: "पेट में बहुत दर्द हो", en: "Severe stomach pain develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "आज — 3 घंटे में", en: "Today — within 3 hours" },
    contagious: { hi: "हाँ — हाथ धोते रहें", en: "Yes — wash hands frequently" },
    emergency: false,
    summary: "Fever with headache and vomiting — possible typhoid. Doctor visit and blood test needed today.",
  },

  {
    required: ["fever", "body_ache"],
    urgency: "YELLOW",
    conditionHi: "वायरल बुखार / फ्लू",
    conditionEn: "Viral Fever / Flu",
    doNow: [
      { hi: "Paracetamol 500mg लें", en: "Take Paracetamol 500mg" },
      { hi: "आराम करें और खूब पानी पिएं", en: "Rest and drink plenty of water" },
      { hi: "2 दिन में न सुधरे तो डॉक्टर से मिलें", en: "See doctor if not improved in 2 days" },
    ],
    doNot: [
      { hi: "Aspirin न लें", en: "Do not take Aspirin" },
      { hi: "भारी काम न करें", en: "Avoid heavy work" },
    ],
    warnings: [
      { hi: "बुखार 103°F से ऊपर जाए", en: "Fever exceeds 103°F" },
      { hi: "3 दिन में सुधार न हो", en: "No improvement after 3 days" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "2 दिन देखें", en: "Monitor for 2 days" },
    contagious: { hi: "हाँ", en: "Yes" },
    emergency: false,
    summary: "Viral fever with body ache. Rest, Paracetamol, and fluids recommended.",
  },

  {
    required: ["fever", "cough"],
    urgency: "YELLOW",
    conditionHi: "वायरल बुखार और खाँसी",
    conditionEn: "Viral Fever with Cough",
    doNow: [
      { hi: "Paracetamol लें — बुखार के लिए", en: "Take Paracetamol for fever" },
      { hi: "भाप लें — खाँसी के लिए", en: "Take steam for cough" },
      { hi: "गर्म पानी में नमक-हल्दी मिलाकर गरारे करें", en: "Gargle with warm salt-turmeric water" },
    ],
    doNot: [
      { hi: "ठंडा पानी न पिएं", en: "Do not drink cold water" },
      { hi: "धूल और धुएं से दूर रहें", en: "Stay away from dust and smoke" },
    ],
    warnings: [
      { hi: "खाँसी में खून आए", en: "Blood appears in cough" },
      { hi: "सांस लेने में तकलीफ हो", en: "Difficulty breathing develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "24 घंटे में", en: "Within 24 hours" },
    contagious: { hi: "हाँ — मास्क लगाएं", en: "Yes — wear a mask" },
    emergency: false,
    summary: "Fever with cough — viral respiratory infection. Rest and see doctor within 24 hours.",
  },

  {
    required: ["vomit", "diarrhea"],
    urgency: "YELLOW",
    conditionHi: "गैस्ट्रोएंटेराइटिस / फूड पॉइज़निंग",
    conditionEn: "Gastroenteritis / Food Poisoning",
    doNow: [
      { hi: "ORS घोल बनाकर हर 15 मिनट में थोड़ा-थोड़ा पिएं", en: "Make ORS solution and take small sips every 15 minutes" },
      { hi: "नारियल पानी और नींबू पानी पिएं", en: "Drink coconut water and lemon water" },
      { hi: "हल्का खाना खाएं — दाल, चावल", en: "Eat light food — dal and rice" },
    ],
    doNot: [
      { hi: "तेल, मिर्च और भारी खाना न खाएं", en: "Avoid oily, spicy and heavy food" },
      { hi: "दूध और दूध से बनी चीज़ें न लें", en: "Avoid milk and dairy products" },
    ],
    warnings: [
      { hi: "पेशाब बहुत कम हो जाए", en: "Urination reduces significantly" },
      { hi: "दस्त में खून आए", en: "Blood in stool" },
      { hi: "कमज़ोरी बहुत ज़्यादा हो", en: "Extreme weakness develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "आज — 4 घंटे में", en: "Today — within 4 hours" },
    contagious: { hi: "हाँ — हाथ धोएं", en: "Yes — wash hands" },
    emergency: false,
    summary: "Vomiting and diarrhea — gastroenteritis. ORS fluids and doctor visit needed today.",
  },

  {
    required: ["urine_burn"],
    urgency: "YELLOW",
    conditionHi: "मूत्र संक्रमण (UTI)",
    conditionEn: "Urinary Tract Infection (UTI)",
    doNow: [
      { hi: "खूब पानी पिएं — 3 लीटर प्रतिदिन", en: "Drink plenty of water — 3 litres per day" },
      { hi: "आज डॉक्टर से मिलें — urine test", en: "See doctor today — urine test needed" },
    ],
    doNot: [
      { hi: "पेशाब रोककर न रखें", en: "Do not hold urine" },
      { hi: "मसालेदार खाना न खाएं", en: "Avoid spicy food" },
    ],
    warnings: [
      { hi: "बुखार भी हो जाए", en: "Fever also develops" },
      { hi: "कमर में दर्द हो", en: "Pain in lower back develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "आज", en: "Today" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Burning urination — likely UTI. Hydration and doctor visit needed today.",
  },

  {
    required: ["chest"],
    urgency: "YELLOW",
    conditionHi: "सीने में दर्द — जाँच ज़रूरी",
    conditionEn: "Chest Pain — Evaluation Needed",
    doNow: [
      { hi: "आराम करें — भारी काम बंद करें", en: "Rest — stop all heavy activity" },
      { hi: "आज डॉक्टर से मिलें — ECG हो सकता है", en: "See doctor today — ECG may be needed" },
      { hi: "परिवार को बताएं", en: "Inform family members" },
    ],
    doNot: [
      { hi: "अनदेखा न करें", en: "Do not ignore chest pain" },
      { hi: "भारी काम या व्यायाम न करें", en: "Do not do heavy work or exercise" },
    ],
    warnings: [
      { hi: "दर्द बाएं हाथ या जबड़े में फैले", en: "Pain spreads to left arm or jaw" },
      { hi: "सांस लेने में तकलीफ हो", en: "Breathing difficulty develops" },
      { hi: "पसीना आए", en: "Sweating starts" },
    ],
    docType: { hi: "सामान्य चिकित्सक / हृदय रोग विशेषज्ञ", en: "General Physician / Cardiologist" },
    wait: { hi: "आज — 2 घंटे में", en: "Today — within 2 hours" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Chest pain without breathlessness — needs evaluation today. Watch for emergency signs.",
  },

  {
    required: ["headache", "fever"],
    urgency: "YELLOW",
    conditionHi: "वायरल बुखार और सिरदर्द",
    conditionEn: "Viral Fever with Headache",
    doNow: [
      { hi: "Paracetamol लें", en: "Take Paracetamol" },
      { hi: "अँधेरे कमरे में आराम करें", en: "Rest in a dark quiet room" },
      { hi: "खूब पानी पिएं", en: "Drink plenty of water" },
    ],
    doNot: [
      { hi: "तेज़ रोशनी में न रहें", en: "Avoid bright lights" },
      { hi: "Aspirin न लें", en: "Do not take Aspirin" },
    ],
    warnings: [
      { hi: "गर्दन अकड़ जाए", en: "Neck becomes stiff" },
      { hi: "उल्टी भी आए", en: "Vomiting also starts" },
      { hi: "रोशनी से आँखें दुखें", en: "Eyes hurt in light" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "24 घंटे में", en: "Within 24 hours" },
    contagious: { hi: "हो सकता है", en: "Possibly" },
    emergency: false,
    summary: "Fever with headache — viral illness likely. Rest and see doctor within 24 hours.",
  },

  {
    required: ["stomach", "fever"],
    urgency: "YELLOW",
    conditionHi: "पेट संक्रमण / एपेंडिसाइटिस संभव",
    conditionEn: "Stomach Infection / Possible Appendicitis",
    doNow: [
      { hi: "आज डॉक्टर से मिलें", en: "See doctor today" },
      { hi: "हल्का खाना और पानी लें", en: "Take light food and water" },
    ],
    doNot: [
      { hi: "दर्द निवारक गोली खुद न लें", en: "Do not self-medicate with painkillers" },
      { hi: "पेट की सिकाई न करें", en: "Do not apply heat to stomach" },
    ],
    warnings: [
      { hi: "दर्द नाभि से दाईं तरफ जाए", en: "Pain moves from navel to lower right" },
      { hi: "दर्द बहुत तेज़ हो जाए", en: "Pain becomes very severe" },
    ],
    docType: { hi: "सामान्य चिकित्सक / सर्जन", en: "General Physician / Surgeon" },
    wait: { hi: "आज", en: "Today" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Stomach pain with fever — possible infection or appendicitis. Doctor visit today.",
  },

  {
    required: ["headache", "vomit"],
    urgency: "YELLOW",
    conditionHi: "माइग्रेन या गंभीर सिरदर्द",
    conditionEn: "Migraine or Severe Headache",
    doNow: [
      { hi: "अँधेरे और शांत कमरे में आराम करें", en: "Rest in dark quiet room" },
      { hi: "माथे पर ठंडी पट्टी रखें", en: "Apply cold compress on forehead" },
      { hi: "आज डॉक्टर से मिलें", en: "See doctor today" },
    ],
    doNot: [
      { hi: "तेज़ रोशनी और शोर से दूर रहें", en: "Avoid bright light and noise" },
      { hi: "खाली पेट न रहें", en: "Do not stay empty stomach" },
    ],
    warnings: [
      { hi: "अचानक बहुत तेज़ सिरदर्द हो", en: "Sudden very severe headache" },
      { hi: "दाने या बुखार भी हो", en: "Rash or fever also develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक / न्यूरोलॉजिस्ट", en: "General Physician / Neurologist" },
    wait: { hi: "24 घंटे में", en: "Within 24 hours" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Headache with vomiting — possible migraine. Rest and see doctor today.",
  },

  {
    required: ["dizzy", "weakness"],
    urgency: "YELLOW",
    conditionHi: "निम्न रक्तचाप / एनीमिया संभव",
    conditionEn: "Low Blood Pressure / Possible Anaemia",
    doNow: [
      { hi: "तुरंत लेट जाएं और पैर ऊपर करें", en: "Lie down immediately and raise legs" },
      { hi: "ORS या नमक-चीनी का पानी पिएं", en: "Drink ORS or salt-sugar water" },
      { hi: "आज डॉक्टर से मिलें", en: "See doctor today" },
    ],
    doNot: [
      { hi: "अचानक खड़े न हों", en: "Do not stand up suddenly" },
      { hi: "खाली पेट न रहें", en: "Do not stay empty stomach" },
    ],
    warnings: [
      { hi: "बेहोशी आने लगे", en: "Signs of fainting" },
      { hi: "दिल की धड़कन बहुत तेज़ या धीमी हो", en: "Heart rate becomes very fast or slow" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "आज", en: "Today" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Dizziness with weakness — possible low BP or anaemia. Doctor visit today.",
  },

  // ── GREEN — HOME CARE SUFFICIENT ─────────────────────

  {
    required: ["headache"],
    urgency: "GREEN",
    conditionHi: "सामान्य सिरदर्द",
    conditionEn: "Common Headache",
    doNow: [
      { hi: "खूब पानी पिएं — निर्जलीकरण हो सकता है", en: "Drink plenty of water — may be dehydration" },
      { hi: "Paracetamol 500mg ले सकते हैं", en: "You can take Paracetamol 500mg" },
      { hi: "अँधेरे में आराम करें — 1-2 घंटे", en: "Rest in dark room for 1-2 hours" },
    ],
    doNot: [
      { hi: "स्क्रीन (मोबाइल, TV) से दूर रहें", en: "Avoid screens (mobile, TV)" },
      { hi: "ज़्यादा दर्द निवारक न लें", en: "Do not take too many painkillers" },
    ],
    warnings: [
      { hi: "बुखार भी आए", en: "Fever also develops" },
      { hi: "3 दिन में सुधार न हो", en: "No improvement in 3 days" },
    ],
    docType: { hi: "सामान्य चिकित्सक (ज़रूरत पड़े तो)", en: "General Physician (if needed)" },
    wait: { hi: "2-3 दिन देखें", en: "Monitor for 2-3 days" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Common headache — rest, hydration and Paracetamol should help.",
  },

  {
    required: ["cold"],
    urgency: "GREEN",
    conditionHi: "सामान्य जुकाम",
    conditionEn: "Common Cold",
    doNow: [
      { hi: "गर्म पानी में शहद और नींबू मिलाकर पिएं", en: "Drink warm water with honey and lemon" },
      { hi: "भाप लें — नाक खुलेगी", en: "Take steam — will clear blocked nose" },
      { hi: "पर्याप्त आराम करें", en: "Take adequate rest" },
    ],
    doNot: [
      { hi: "ठंडा पानी और आइसक्रीम न लें", en: "Avoid cold water and ice cream" },
      { hi: "धूल और धुएं से बचें", en: "Avoid dust and smoke" },
    ],
    warnings: [
      { hi: "बुखार आ जाए", en: "Fever develops" },
      { hi: "1 हफ्ते में सुधार न हो", en: "No improvement in 1 week" },
    ],
    docType: { hi: "सामान्य चिकित्सक (ज़रूरत पड़े तो)", en: "General Physician (if needed)" },
    wait: { hi: "5-7 दिन देखें", en: "Monitor for 5-7 days" },
    contagious: { hi: "हाँ — हाथ धोएं", en: "Yes — wash hands regularly" },
    emergency: false,
    summary: "Common cold — home remedies, rest and steam inhalation recommended.",
  },

  {
    required: ["cough"],
    urgency: "GREEN",
    conditionHi: "सामान्य खाँसी",
    conditionEn: "Common Cough",
    doNow: [
      { hi: "गर्म पानी में शहद मिलाकर पिएं", en: "Drink warm water with honey" },
      { hi: "भाप लें दिन में 2 बार", en: "Take steam twice daily" },
      { hi: "नमक के गर्म पानी से गरारे करें", en: "Gargle with warm salt water" },
    ],
    doNot: [
      { hi: "ठंडी चीज़ें न खाएं-पिएं", en: "Avoid cold food and drinks" },
      { hi: "धुएं और धूल से बचें", en: "Avoid smoke and dust" },
    ],
    warnings: [
      { hi: "खाँसी में खून आए", en: "Blood appears in cough" },
      { hi: "बुखार भी आ जाए", en: "Fever also develops" },
      { hi: "2 हफ्ते में सुधार न हो", en: "No improvement in 2 weeks" },
    ],
    docType: { hi: "सामान्य चिकित्सक (ज़रूरत पड़े तो)", en: "General Physician (if needed)" },
    wait: { hi: "5-7 दिन देखें", en: "Monitor for 5-7 days" },
    contagious: { hi: "हो सकता है", en: "Possibly" },
    emergency: false,
    summary: "Common cough — steam, honey-ginger water and rest recommended.",
  },

  {
    required: ["back"],
    urgency: "GREEN",
    conditionHi: "सामान्य कमर दर्द",
    conditionEn: "Common Back Pain",
    doNow: [
      { hi: "गर्म सिकाई करें — 15 मिनट, दिन में 2 बार", en: "Apply heat — 15 minutes, twice daily" },
      { hi: "Paracetamol ले सकते हैं", en: "You can take Paracetamol" },
      { hi: "सीधे बैठें — झुककर न बैठें", en: "Sit straight — avoid slouching" },
    ],
    doNot: [
      { hi: "भारी वज़न न उठाएं", en: "Do not lift heavy weights" },
      { hi: "देर तक एक ही position में न रहें", en: "Do not stay in one position too long" },
    ],
    warnings: [
      { hi: "टाँगों में सुन्नपन हो", en: "Numbness in legs" },
      { hi: "पेशाब या शौच में दिक्कत हो", en: "Problems with urination or bowel movement" },
    ],
    docType: { hi: "सामान्य चिकित्सक / हड्डी रोग विशेषज्ञ", en: "General Physician / Orthopedic" },
    wait: { hi: "3-5 दिन देखें", en: "Monitor for 3-5 days" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Common back pain — heat therapy, rest and Paracetamol recommended.",
  },

  {
    required: ["eyes"],
    urgency: "GREEN",
    conditionHi: "आँखों की जलन / नेत्रश्लेष्मलाशोथ",
    conditionEn: "Eye Irritation / Conjunctivitis",
    doNow: [
      { hi: "साफ ठंडे पानी से आँखें धोएं", en: "Wash eyes with clean cold water" },
      { hi: "आँखें मलें नहीं", en: "Do not rub your eyes" },
      { hi: "डॉक्टर से eye drops लें", en: "Get eye drops from doctor" },
    ],
    doNot: [
      { hi: "आँखें बिल्कुल न मलें", en: "Do not rub eyes at all" },
      { hi: "दूसरों का तकिया या तौलिया न इस्तेमाल करें", en: "Do not share pillow or towel" },
    ],
    warnings: [
      { hi: "दिखना कम हो जाए", en: "Vision becomes blurry" },
      { hi: "तेज़ दर्द हो", en: "Severe pain in eye" },
    ],
    docType: { hi: "नेत्र रोग विशेषज्ञ", en: "Eye Specialist / Ophthalmologist" },
    wait: { hi: "2-3 दिन देखें", en: "Monitor for 2-3 days" },
    contagious: { hi: "हाँ — हाथ धोएं", en: "Yes — wash hands frequently" },
    emergency: false,
    summary: "Eye irritation — likely conjunctivitis. Rinse with clean water and see eye doctor.",
  },

  {
    required: ["stomach"],
    urgency: "GREEN",
    conditionHi: "पेट में हल्का दर्द / अपच",
    conditionEn: "Mild Stomach Pain / Indigestion",
    doNow: [
      { hi: "गर्म पानी पिएं", en: "Drink warm water" },
      { hi: "हल्का खाना खाएं — दाल, खिचड़ी", en: "Eat light food — dal, khichdi" },
      { hi: "थोड़ा टहलें — हाज़मा सुधरेगा", en: "Take a short walk — improves digestion" },
    ],
    doNot: [
      { hi: "तेल, मिर्च और भारी खाना न खाएं", en: "Avoid oily, spicy and heavy food" },
      { hi: "तुरंत नहीं लेटें खाने के बाद", en: "Do not lie down immediately after eating" },
    ],
    warnings: [
      { hi: "दर्द बहुत तेज़ हो जाए", en: "Pain becomes very severe" },
      { hi: "बुखार भी आ जाए", en: "Fever also develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक (ज़रूरत पड़े तो)", en: "General Physician (if needed)" },
    wait: { hi: "2-3 दिन देखें", en: "Monitor for 2-3 days" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Mild stomach pain — likely indigestion. Light diet and warm water recommended.",
  },

  {
    required: ["rash"],
    urgency: "GREEN",
    conditionHi: "त्वचा पर दाने / एलर्जी",
    conditionEn: "Skin Rash / Allergy",
    doNow: [
      { hi: "प्रभावित जगह ठंडे पानी से धोएं", en: "Wash affected area with cold water" },
      { hi: "खुजलाएं नहीं", en: "Do not scratch" },
      { hi: "डॉक्टर से antihistamine लें", en: "Get antihistamine from doctor" },
    ],
    doNot: [
      { hi: "खुजलाएं या रगड़ें नहीं", en: "Do not scratch or rub" },
      { hi: "केमिकल साबुन प्रभावित जगह पर न लगाएं", en: "Do not apply chemical soap on affected area" },
    ],
    warnings: [
      { hi: "दाने पूरे शरीर पर फैलें", en: "Rash spreads to entire body" },
      { hi: "बुखार भी आ जाए", en: "Fever also develops" },
      { hi: "सांस लेने में तकलीफ हो", en: "Breathing difficulty develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक / त्वचा रोग विशेषज्ञ", en: "General Physician / Dermatologist" },
    wait: { hi: "2-3 दिन देखें", en: "Monitor for 2-3 days" },
    contagious: { hi: "हो सकता है", en: "Possibly" },
    emergency: false,
    summary: "Skin rash — likely allergy. Clean the area, avoid scratching and see doctor if spreading.",
  },

  {
    required: ["weakness"],
    urgency: "GREEN",
    conditionHi: "सामान्य कमज़ोरी / थकान",
    conditionEn: "General Weakness / Fatigue",
    doNow: [
      { hi: "पर्याप्त नींद लें — 8 घंटे", en: "Get adequate sleep — 8 hours" },
      { hi: "पोषण से भरपूर खाना खाएं", en: "Eat nutritious food" },
      { hi: "खूब पानी पिएं", en: "Drink plenty of water" },
    ],
    doNot: [
      { hi: "भारी काम न करें", en: "Avoid heavy physical work" },
      { hi: "खाना न छोड़ें", en: "Do not skip meals" },
    ],
    warnings: [
      { hi: "कमज़ोरी 1 हफ्ते से ज़्यादा रहे", en: "Weakness persists more than 1 week" },
      { hi: "बुखार भी आ जाए", en: "Fever also develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक (ज़रूरत पड़े तो)", en: "General Physician (if needed)" },
    wait: { hi: "3-5 दिन देखें", en: "Monitor for 3-5 days" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "General weakness — rest, nutrition and hydration recommended. See doctor if persistent.",
  },

  {
    required: ["swelling"],
    urgency: "GREEN",
    conditionHi: "सूजन — जाँच ज़रूरी",
    conditionEn: "Swelling — Needs Evaluation",
    doNow: [
      { hi: "प्रभावित जगह को ऊपर रखें — आराम करें", en: "Elevate affected area — rest" },
      { hi: "ठंडी सिकाई करें — 10 मिनट", en: "Apply ice pack — 10 minutes" },
      { hi: "2 दिन में न सुधरे तो डॉक्टर से मिलें", en: "See doctor if not improved in 2 days" },
    ],
    doNot: [
      { hi: "ज़्यादा दबाव न डालें", en: "Do not apply excessive pressure" },
      { hi: "दर्द हो तो काम जारी न रखें", en: "Do not continue work if painful" },
    ],
    warnings: [
      { hi: "सूजन बढ़ती जाए", en: "Swelling keeps increasing" },
      { hi: "बुखार भी आ जाए", en: "Fever also develops" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "2-3 दिन देखें", en: "Monitor for 2-3 days" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Localized swelling — elevation, ice and rest. Doctor visit if not improving.",
  },

  {
    required: ["pain"],
    urgency: "GREEN",
    conditionHi: "जोड़ों का दर्द / सामान्य दर्द",
    conditionEn: "Joint Pain / General Pain",
    doNow: [
      { hi: "गर्म सिकाई करें", en: "Apply warm compress" },
      { hi: "Paracetamol ले सकते हैं", en: "You can take Paracetamol" },
      { hi: "आराम करें", en: "Take rest" },
    ],
    doNot: [
      { hi: "भारी काम न करें", en: "Avoid heavy physical activity" },
      { hi: "दर्द हो तो जबरदस्ती हिलाएं नहीं", en: "Do not force movement if painful" },
    ],
    warnings: [
      { hi: "दर्द बहुत तेज़ हो जाए", en: "Pain becomes very severe" },
      { hi: "जोड़ लाल और गर्म हो जाए", en: "Joint becomes red and hot" },
    ],
    docType: { hi: "सामान्य चिकित्सक / हड्डी रोग विशेषज्ञ", en: "General Physician / Orthopedic" },
    wait: { hi: "3-5 दिन देखें", en: "Monitor for 3-5 days" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Joint or general pain — rest, heat therapy and Paracetamol recommended.",
  },

  {
    required: ["dizzy"],
    urgency: "GREEN",
    conditionHi: "हल्के चक्कर — निर्जलीकरण संभव",
    conditionEn: "Mild Dizziness — Possible Dehydration",
    doNow: [
      { hi: "तुरंत लेट जाएं", en: "Lie down immediately" },
      { hi: "पानी या ORS पिएं", en: "Drink water or ORS" },
      { hi: "खाना खाएं — खाली पेट न रहें", en: "Eat food — do not stay empty stomach" },
    ],
    doNot: [
      { hi: "अचानक खड़े न हों", en: "Do not stand up suddenly" },
      { hi: "गाड़ी न चलाएं", en: "Do not drive" },
    ],
    warnings: [
      { hi: "चक्कर बहुत तेज़ हों", en: "Dizziness becomes severe" },
      { hi: "उल्टी भी आए", en: "Vomiting also starts" },
    ],
    docType: { hi: "सामान्य चिकित्सक (ज़रूरत पड़े तो)", en: "General Physician (if needed)" },
    wait: { hi: "2-3 दिन देखें", en: "Monitor for 2-3 days" },
    contagious: { hi: "नहीं", en: "No" },
    emergency: false,
    summary: "Mild dizziness — likely dehydration or low BP. Rest, hydration and food recommended.",
  },

  {
    required: ["fever"],
    urgency: "YELLOW",
    conditionHi: "बुखार — ध्यान ज़रूरी",
    conditionEn: "Fever — Needs Attention",
    doNow: [
      { hi: "Paracetamol 500mg लें", en: "Take Paracetamol 500mg" },
      { hi: "खूब पानी और ORS पिएं", en: "Drink plenty of water and ORS" },
      { hi: "माथे पर ठंडी पट्टी रखें", en: "Apply cold compress on forehead" },
    ],
    doNot: [
      { hi: "Aspirin न लें", en: "Do not take Aspirin" },
      { hi: "गर्म कपड़े पहनकर न रहें", en: "Do not wear too many warm clothes" },
    ],
    warnings: [
      { hi: "बुखार 103°F से ऊपर जाए", en: "Fever goes above 103°F" },
      { hi: "2 दिन में सुधार न हो", en: "No improvement in 2 days" },
    ],
    docType: { hi: "सामान्य चिकित्सक", en: "General Physician" },
    wait: { hi: "24 घंटे में", en: "Within 24 hours" },
    contagious: { hi: "हो सकता है", en: "Possibly" },
    emergency: false,
    summary: "Fever alone — Paracetamol and fluids. See doctor if not improved in 24 hours.",
  },
];

// ─────────────────────────────────────────────────────
// DEFAULT FALLBACK — if no rule matches at all
// ─────────────────────────────────────────────────────

const DEFAULT_RESPONSE: TriageResult = {
  urgency: "GREEN",
  conditionHi: "हल्की तकलीफ — घर पर आराम करें",
  conditionEn: "Mild Discomfort — Rest at Home",
  doNow: [
    { hi: "पर्याप्त आराम करें", en: "Get adequate rest" },
    { hi: "खूब पानी पिएं", en: "Drink plenty of water" },
    { hi: "हल्का पोषण से भरपूर खाना खाएं", en: "Eat light nutritious food" },
  ],
  doNot: [
    { hi: "ज़्यादा दवाइयाँ न लें", en: "Avoid taking too many medicines" },
    { hi: "भारी काम न करें", en: "Avoid heavy physical work" },
  ],
  warnings: [
    { hi: "लक्षण 5 दिन में न सुधरें", en: "Symptoms do not improve in 5 days" },
    { hi: "नए लक्षण आएं जैसे बुखार या दर्द", en: "New symptoms like fever or pain appear" },
  ],
  docType: { hi: "सामान्य चिकित्सक (ज़रूरत पड़े तो)", en: "General Physician (if needed)" },
  wait: { hi: "2-3 दिन देखें", en: "Monitor for 2-3 days" },
  contagious: { hi: "नहीं", en: "No" },
  emergency: false,
  summary: "Mild symptoms with no specific pattern. Rest and hydration recommended.",
};

// ─────────────────────────────────────────────────────
// MAIN FALLBACK TRIAGE FUNCTION — Rule-based matching
// ─────────────────────────────────────────────────────

export function fallbackTriage(symptomIds: string[]): TriageResult {
  const sorted = [...TRIAGE_RULES].sort(
    (a, b) => b.required.length - a.required.length
  );

  for (const rule of sorted) {
    const allRequired = rule.required.every((r) => symptomIds.includes(r));
    if (!allRequired) continue;

    let urgency = rule.urgency;
    if (rule.boosters && rule.urgency !== "RED") {
      const hasBooster = rule.boosters.some((b) => symptomIds.includes(b));
      if (hasBooster) urgency = "RED";
    }

    return { ...rule, urgency };
  }

  return DEFAULT_RESPONSE;
}

// ─────────────────────────────────────────────────────
// AI TRIAGE — Claude API (runs server-side only)
// ─────────────────────────────────────────────────────

export async function runAITriage(symptomNames: string[]): Promise<TriageResult> {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are a medical triage AI for SehatSetu, a rural India telemedicine app serving patients in Nabha, Punjab. A patient reports these symptoms: ${symptomNames.join(", ")}.

STRICT TRIAGE RULES — follow exactly:

RED (life-threatening — emergency: true):
- Chest pain + breathlessness together = always RED cardiac emergency
- Chest pain + sweating = RED possible heart attack
- Breathlessness alone with no other cause = RED
- Fever + rash + headache together = RED possible dengue/meningitis
- Vomiting + diarrhea + dizziness + weakness together = RED severe dehydration
- Any mention of unconscious, seizure, or severe bleeding = RED
- Never downgrade these combinations

YELLOW (needs doctor today — emergency: false):
- Fever alone or with cough = YELLOW
- Fever with body ache or chills = YELLOW possible malaria
- Vomiting + diarrhea without severe weakness = YELLOW
- Chest pain alone without breathlessness = YELLOW needs evaluation
- Headache + fever = YELLOW
- Headache + vomiting = YELLOW possible migraine
- Dizziness + weakness = YELLOW possible low BP

GREEN (home care — emergency: false):
- Headache alone with no fever = GREEN
- Cold alone = GREEN
- Cough alone without fever = GREEN
- Back pain alone = GREEN
- Eye irritation alone = GREEN
- Mild stomach pain alone without fever = GREEN
- Weakness alone without fever = GREEN
- Dizziness alone without weakness = GREEN
- Skin rash alone without fever = GREEN
- Joint pain alone without fever = GREEN
- Swelling alone without fever = GREEN

Respond ONLY with raw JSON — no markdown, no backticks, no explanation:
{
  "urgency": "RED" or "YELLOW" or "GREEN",
  "conditionHi": "condition name in Hindi maximum 6 words",
  "conditionEn": "condition name in English maximum 6 words",
  "doNow": [{"hi":"action in Hindi","en":"action in English"}],
  "doNot": [{"hi":"avoid in Hindi","en":"avoid in English"}],
  "warnings": [{"hi":"warning sign in Hindi","en":"warning sign in English"}],
  "docType": {"hi":"specialist in Hindi","en":"specialist in English"},
  "wait": {"hi":"time in Hindi","en":"time in English"},
  "contagious": {"hi":"yes/no/possibly in Hindi","en":"yes/no/possibly in English"},
  "emergency": true or false,
  "summary": "one line clinical summary in English maximum 15 words"
}

doNow must have 3 items. doNot must have 2 items. warnings must have 2-3 items.
Respond with raw JSON only. Nothing else.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("")
    .replace(/```json|```/g, "")
    .trim();

  return JSON.parse(text) as TriageResult;
}
