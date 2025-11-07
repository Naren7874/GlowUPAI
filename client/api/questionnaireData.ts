export const questionnaire = [
  {
    code: "Q1",
    text: "30 minutes after washing with plain water, how does your face feel?",
    type: "single",
    order: 1,
    required: true,
    options: [
      { key: "a", label: "Tight / stretched", tags: ["dry"] },
      { key: "b", label: "Comfortable / balanced", tags: ["normal"] },
      { key: "c", label: "Shiny all over", tags: ["oily"] },
      { key: "d", label: "Oily forehead & nose, dry cheeks (T-zone oily)", tags: ["combination"] }
    ]
  },
  {
    code: "Q2",
    text: "How often do you get pimples/blackheads/whiteheads?",
    type: "single",
    order: 2,
    required: true,
    options: [
      { key: "a", label: "Rarely/Never" },
      { key: "b", label: "Sometimes (monthly)", tags: ["acne"] },
      { key: "c", label: "Frequently", tags: ["acne","oily"] }
    ]
  },
  {
    code: "Q3",
    text: "Do products (face wash/cream) sting, burn or turn your skin red?",
    type: "single",
    order: 3,
    required: true,
    options: [
      { key: "a", label: "Yes", tags: ["sensitive"] },
      { key: "b", label: "No" }
    ]
  },
  {
    code: "Q4",
    text: "Do you notice dryness/flakiness during winters or in AC rooms?",
    type: "single",
    order: 4,
    required: true,
    options: [
      { key: "a", label: "Yes", tags: ["dry"] },
      { key: "b", label: "No" }
    ]
  },
  {
    code: "Q5",
    text: "Do you tan easily or get dark spots after pimples?",
    type: "single",
    order: 5,
    required: true,
    options: [
      { key: "a", label: "Yes", tags: ["pigmentation"] },
      { key: "b", label: "No" }
    ]
  },
  {
    code: "Q6",
    text: "Current concerns (choose all that apply)",
    type: "multi",
    order: 6,
    required: false,
    options: [
      { key: "a", label: "Pimples/Acne", tags: ["acne"] },
      { key: "b", label: "Dark spots/Uneven tone", tags: ["pigmentation"] },
      { key: "c", label: "Dull skin", tags: ["dullness"] },
      { key: "d", label: "Wrinkles/Fine lines", tags: ["aging"] },
      { key: "e", label: "Redness/Irritation", tags: ["sensitive"] },
      { key: "f", label: "None" }
    ]
  },
  {
    code: "Q7",
    text: "Simple at-home oil test (after 2–3 hrs of washing): what did the tissue show?",
    type: "single",
    order: 7,
    required: true,
    options: [
      { key: "a", label: "No oil", tags: ["dry","normal"] },
      { key: "b", label: "Slight oil on T-zone", tags: ["combination"] },
      { key: "c", label: "Oil on most areas", tags: ["oily"] }
    ]
  }
];

export function analyzeAnswers(answers: Record<string, string | string[]>) {
  let flags = {
    oily: 0, dry: 0, combo: 0, normal: 0, sensitive: 0,
    acne: 0, pigmentation: 0, dullness: 0, aging: 0
  };

  const pick = (q: string) => answers[q];
  const has = (q: string, key: string) => Array.isArray(answers[q]) && (answers[q] as string[]).includes(key);

  // Q1 baseline feel
  if (pick('Q1') === 'a') flags.dry += 2;
  if (pick('Q1') === 'b') flags.normal += 1;
  if (pick('Q1') === 'c') flags.oily += 2;
  if (pick('Q1') === 'd') flags.combo += 2;

  // Q2 acne
  if (pick('Q2') === 'b') flags.acne += 1;
  if (pick('Q2') === 'c') { flags.acne += 2; flags.oily += 1; }

  // Q3 sensitivity
  if (pick('Q3') === 'a') flags.sensitive += 3;

  // Q4 dryness/flaking
  if (pick('Q4') === 'a') flags.dry += 2;

  // Q5 pigmentation
  if (pick('Q5') === 'a') flags.pigmentation += 2;

  // Q6 concerns (multi)
  if (has('Q6','a')) flags.acne += 1;
  if (has('Q6','b')) flags.pigmentation += 1;
  if (has('Q6','c')) flags.dullness += 1;
  if (has('Q6','d')) flags.aging += 1;
  if (has('Q6','e')) flags.sensitive += 2;

  // Q7 oil test
  if (pick('Q7') === 'a') { flags.dry += 1; flags.normal += 1; }
  if (pick('Q7') === 'b') flags.combo += 2;
  if (pick('Q7') === 'c') flags.oily += 2;

  // Decide skin type
  const scores: [string, number][] = [
    ['sensitive', flags.sensitive] as [string, number],
    ['oily', flags.oily] as [string, number],
    ['dry', flags.dry] as [string, number],
    ['combo', flags.combo] as [string, number],
    ['normal', flags.normal] as [string, number]
  ].sort((a, b) => b[1] - a[1]);

  const [topType, topScore] = scores[0];
  const skinType = topType === 'combo' ? 'Combination' :
                   topType === 'dry' ? 'Dry' :
                   topType === 'oily' ? 'Oily' :
                   topType === 'sensitive' ? 'Sensitive' : 'Normal';

  const concerns = [];
  if (flags.acne > 0) concerns.push('Acne');
  if (flags.pigmentation > 0) concerns.push('Pigmentation');
  if (flags.dullness > 0) concerns.push('Dullness');
  if (flags.aging > 0) concerns.push('Aging');

  return {
    skinType,
    concerns,
    confidence: Math.min(95, 55 + (topScore * 4))
  };
}