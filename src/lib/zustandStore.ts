import create from "zustand";

interface stateType {
  characterCat: number;
  incrCharacterCat: () => void;
  decrCharacterCat: () => void;
}

const useStore = create((set) => ({
  characterCat: 0,
  setCharacterCat: (value:number) => ({characterCat: value}),
  incrWhoamiCat: () => {
    set((state: stateType) => ({ whoamiCat: state.characterCat + 1 }));
  },
  decrWhoamiCat: () => {
    set((state: stateType) => ({ whoamiCat: state.characterCat - 1 }));
  },
}));

export default useStore;
