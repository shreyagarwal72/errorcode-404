export interface Puzzle {
  id: number;
  title: string;
  description: string;
  type: 'riddle' | 'cipher' | 'logic' | 'pattern';
  question: string;
  answer: string;
  hint: string;
}

export const puzzles: Puzzle[] = [
  {
    id: 1,
    title: "The Missing Number",
    description: "A sequence of numbers has a pattern. Find the missing one.",
    type: "pattern",
    question: "2, 4, 8, 16, ?, 64",
    answer: "32",
    hint: "Each number doubles the previous one"
  },
  {
    id: 2,
    title: "The Door Code",
    description: "Decode this message to unlock the door.",
    type: "cipher",
    question: "IFMMP XPSME (Shift by -1)",
    answer: "HELLO WORLD",
    hint: "Caesar cipher with a shift of -1"
  },
  {
    id: 3,
    title: "The Riddle of Time",
    description: "Answer this ancient riddle.",
    type: "riddle",
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "MAP",
    hint: "Think about representations, not reality"
  },
  {
    id: 4,
    title: "Logic Gate",
    description: "Complete the logical sequence.",
    type: "logic",
    question: "If A=1, B=2, C=3... what is DEAD in numbers?",
    answer: "4514",
    hint: "D=4, E=5, A=1, D=4"
  },
  {
    id: 5,
    title: "The Mirror Speaks",
    description: "Read what the mirror shows.",
    type: "cipher",
    question: "EPACSƎ (reversed text)",
    answer: "ESCAPE",
    hint: "Look at it backwards"
  },
  {
    id: 6,
    title: "The Shadow's Count",
    description: "A dark pattern emerges from the void.",
    type: "pattern",
    question: "1, 1, 2, 3, 5, 8, ?, 21",
    answer: "13",
    hint: "Each number is the sum of the two before it"
  },
  {
    id: 7,
    title: "The Forgotten Words",
    description: "Decipher the lost language.",
    type: "cipher",
    question: "ROT13: QNEX FRPERG",
    answer: "DARK SECRET",
    hint: "Rotate each letter by 13 positions"
  },
  {
    id: 8,
    title: "The Eternal Question",
    description: "Solve the ancient riddle of the dead.",
    type: "riddle",
    question: "The more you take, the more you leave behind. What am I?",
    answer: "FOOTSTEPS",
    hint: "Think about walking"
  },
  {
    id: 9,
    title: "The Cursed Equation",
    description: "Break the mathematical hex.",
    type: "logic",
    question: "If 2+3=10, 4+5=32, then 6+7=?",
    answer: "72",
    hint: "Multiply first number by second, then by 2"
  },
  {
    id: 10,
    title: "The Ghost's Whisper",
    description: "Listen to what death speaks.",
    type: "riddle",
    question: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?",
    answer: "ECHO",
    hint: "Think about sound bouncing back"
  },
  {
    id: 11,
    title: "The Binary Curse",
    description: "Decode the machine language.",
    type: "cipher",
    question: "01000110 01000101 01000001 01010010 (Binary to ASCII)",
    answer: "FEAR",
    hint: "Convert each 8-bit binary to a letter"
  },
  {
    id: 12,
    title: "The Spiral of Doom",
    description: "Find the pattern in the darkness.",
    type: "pattern",
    question: "100, 81, 64, 49, ?, 25",
    answer: "36",
    hint: "Perfect squares in descending order: 10², 9², 8²..."
  }
];
