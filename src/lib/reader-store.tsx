"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface JournalEntry {
  id: string;
  date: string;
  type: 'morning' | 'evening' | 'reflection';
  title: string;
  prompt?: string;
  content: string;
  tags?: string[];
  mood?: 'sereno' | 'desafiado' | 'grato' | 'vigilante';
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  provider: 'guest' | 'google' | 'apple' | 'email';
  joinedDate: string;
}

export interface ReaderSettings {
  theme: 'dark' | 'light';
  fontSize: 'normal' | 'large' | 'larger';
  dailyReminderEnabled: boolean;
  dailyReminderTime: string; // e.g. "07:00"
  selectedFavoriteThemes: string[];
}

interface ReaderContextType {
  user: UserProfile;
  settings: ReaderSettings;
  favoriteQuoteIds: string[];
  savedArticleSlugs: string[];
  readingListBookSlugs: string[];
  journalEntries: JournalEntry[];
  completedDailyActions: string[]; // dates like "2026-09-16"
  isInitialized: boolean;

  // Actions
  toggleFavoriteQuote: (quoteId: string) => void;
  isFavoriteQuote: (quoteId: string) => boolean;

  toggleSaveArticle: (slug: string) => void;
  isArticleSaved: (slug: string) => boolean;

  toggleReadingListBook: (slug: string) => void;
  isBookInReadingList: (slug: string) => boolean;

  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  deleteJournalEntry: (id: string) => void;

  toggleDailyActionComplete: (dateStr: string) => void;
  isDailyActionCompleted: (dateStr: string) => boolean;

  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
  updateSettings: (partial: Partial<ReaderSettings>) => void;

  loginWithProvider: (provider: 'google' | 'apple' | 'email', name?: string, email?: string) => void;
  logout: () => void;
  requestNotificationPermission: () => Promise<boolean>;
}

const defaultSettings: ReaderSettings = {
  theme: 'dark',
  fontSize: 'normal',
  dailyReminderEnabled: false,
  dailyReminderTime: '07:00',
  selectedFavoriteThemes: ['Autocontrole', 'Ansiedade', 'Disciplina', 'Resiliência'],
};

const defaultUser: UserProfile = {
  id: 'guest_user',
  name: 'Leitor Estoico',
  provider: 'guest',
  joinedDate: 'Hoje',
};

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

const STORAGE_KEY = 'caverna_estoico_state_v1';

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [settings, setSettings] = useState<ReaderSettings>(defaultSettings);
  const [favoriteQuoteIds, setFavoriteQuoteIds] = useState<string[]>(['q1', 'q2', 'q3']);
  const [savedArticleSlugs, setSavedArticleSlugs] = useState<string[]>(['o-que-esta-sob-nosso-controle']);
  const [readingListBookSlugs, setReadingListBookSlugs] = useState<string[]>(['meditacoes-marco-aurelio', 'manual-de-epicteto']);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 'j1',
      date: new Date().toLocaleDateString('pt-BR'),
      type: 'morning',
      title: 'Exame Matinal de Marco Aurélio',
      prompt: 'O que depende de mim nas próximas horas?',
      content: 'Hoje preciso manter a serenidade durante as reuniões de trabalho. Lembrarei que as palavras afiadas dos outros não podem contaminar meu caráter a não ser que eu consinta.',
      mood: 'vigilante'
    }
  ]);
  const [completedDailyActions, setCompletedDailyActions] = useState<string[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.user) setUser(parsed.user);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.favoriteQuoteIds) setFavoriteQuoteIds(parsed.favoriteQuoteIds);
        if (parsed.savedArticleSlugs) setSavedArticleSlugs(parsed.savedArticleSlugs);
        if (parsed.readingListBookSlugs) setReadingListBookSlugs(parsed.readingListBookSlugs);
        if (parsed.journalEntries) setJournalEntries(parsed.journalEntries);
        if (parsed.completedDailyActions) setCompletedDailyActions(parsed.completedDailyActions);
      }
    } catch (e) {
      console.error('Failed to load caverna state from storage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      const payload = {
        user,
        settings,
        favoriteQuoteIds,
        savedArticleSlugs,
        readingListBookSlugs,
        journalEntries,
        completedDailyActions,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to persist caverna state', e);
    }
  }, [user, settings, favoriteQuoteIds, savedArticleSlugs, readingListBookSlugs, journalEntries, completedDailyActions, isInitialized]);

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [settings.theme]);

  const toggleFavoriteQuote = (quoteId: string) => {
    setFavoriteQuoteIds(prev => 
      prev.includes(quoteId) ? prev.filter(id => id !== quoteId) : [...prev, quoteId]
    );
  };

  const isFavoriteQuote = (quoteId: string) => favoriteQuoteIds.includes(quoteId);

  const toggleSaveArticle = (slug: string) => {
    setSavedArticleSlugs(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isArticleSaved = (slug: string) => savedArticleSlugs.includes(slug);

  const toggleReadingListBook = (slug: string) => {
    setReadingListBookSlugs(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isBookInReadingList = (slug: string) => readingListBookSlugs.includes(slug);

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: 'journal_' + Date.now(),
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(item => item.id !== id));
  };

  const toggleDailyActionComplete = (dateStr: string) => {
    setCompletedDailyActions(prev => 
      prev.includes(dateStr) ? prev.filter(d => d !== dateStr) : [...prev, dateStr]
    );
  };

  const isDailyActionCompleted = (dateStr: string) => completedDailyActions.includes(dateStr);

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const setTheme = (theme: 'dark' | 'light') => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const setFontSize = (fontSize: 'normal' | 'large' | 'larger') => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const updateSettings = (partial: Partial<ReaderSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  };

  const loginWithProvider = (provider: 'google' | 'apple' | 'email', name?: string, email?: string) => {
    setUser({
      id: 'user_' + Date.now(),
      name: name || (provider === 'google' ? 'Praticante Google' : provider === 'apple' ? 'Praticante Apple' : 'Estudante da Stoa'),
      email: email || (provider === 'google' ? 'leitor@gmail.com' : 'leitor@icloud.com'),
      avatarUrl: provider === 'google' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      provider,
      joinedDate: new Date().toLocaleDateString('pt-BR')
    });
  };

  const logout = () => {
    setUser(defaultUser);
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('As notificações não são suportadas neste navegador.');
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSettings({ dailyReminderEnabled: true });
        new Notification('Caverna do Estoico', {
          body: 'Lembrete ativado. Cultivaremos a serenidade juntos a cada amanhecer.',
          icon: '/favicon.ico'
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <ReaderContext.Provider
      value={{
        user,
        settings,
        favoriteQuoteIds,
        savedArticleSlugs,
        readingListBookSlugs,
        journalEntries,
        completedDailyActions,
        isInitialized,
        toggleFavoriteQuote,
        isFavoriteQuote,
        toggleSaveArticle,
        isArticleSaved,
        toggleReadingListBook,
        isBookInReadingList,
        addJournalEntry,
        deleteJournalEntry,
        toggleDailyActionComplete,
        isDailyActionCompleted,
        toggleTheme,
        setTheme,
        setFontSize,
        updateSettings,
        loginWithProvider,
        logout,
        requestNotificationPermission
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
}

export function useReaderState() {
  const context = useContext(ReaderContext);
  if (!context) {
    throw new Error('useReaderState must be used within a ReaderProvider');
  }
  return context;
}
