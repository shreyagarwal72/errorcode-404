import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GameState {
  solvedPuzzles: number[];
  ghostConversations: number;
  hasEscaped: boolean;
  currentPage: string;
  addSolvedPuzzle: (id: number) => void;
  incrementGhostConversations: () => void;
  setHasEscaped: (escaped: boolean) => void;
  setCurrentPage: (page: string) => void;
  resetGame: () => void;
}

export const useGameState = create<GameState>()(
  persist(
    (set) => ({
      solvedPuzzles: [],
      ghostConversations: 0,
      hasEscaped: false,
      currentPage: '/',
      addSolvedPuzzle: (id) =>
        set((state) => ({
          solvedPuzzles: state.solvedPuzzles.includes(id)
            ? state.solvedPuzzles
            : [...state.solvedPuzzles, id],
        })),
      incrementGhostConversations: () =>
        set((state) => ({
          ghostConversations: state.ghostConversations + 1,
        })),
      setHasEscaped: (escaped) => set({ hasEscaped: escaped }),
      setCurrentPage: (page) => set({ currentPage: page }),
      resetGame: () =>
        set({
          solvedPuzzles: [],
          ghostConversations: 0,
          hasEscaped: false,
          currentPage: '/',
        }),
    }),
    {
      name: '404-souls-game-state',
    }
  )
);
