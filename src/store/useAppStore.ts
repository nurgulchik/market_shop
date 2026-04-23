import { create } from 'zustand';

interface AppStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  isVoiceSearchActive: boolean;
  setVoiceSearchActive: (active: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    return { isDarkMode: newMode };
  }),
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  isVoiceSearchActive: false,
  setVoiceSearchActive: (active) => set({ isVoiceSearchActive: active }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
