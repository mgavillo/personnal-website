import { create } from "zustand";

interface stateType {
  characterCat: number;
  catLength: number;
  setCharacterCat: (value: number) => void;
  incrCharacterCat: () => void;
  decrCharacterCat: () => void;
}

const useCharacterStore = create<stateType>((set) => ({
  characterCat: 0,
  catLength: 3,
  setCharacterCat: (value) =>
    set((state) => ({
      ...state,
      characterCat: value,
    })),
  incrCharacterCat: () =>
    set((state) => ({
      ...state,
      characterCat:
        state.characterCat < state.catLength - 1 ? state.characterCat + 1 : 0,
    })),
  decrCharacterCat: () =>
    set((state) => ({
      ...state,
      characterCat:
        state.characterCat > 0 ? state.characterCat - 1 : state.catLength - 1,
    })),
}));

export default useCharacterStore;
