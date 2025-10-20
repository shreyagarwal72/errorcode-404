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
  }
];
