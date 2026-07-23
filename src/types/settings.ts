export type Language = 'en' | 'hi' | 'sa';

export type DateFormat =
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'MM/DD/YYYY'
  | 'D MMM YYYY';

export type TimeFormat = '12h' | '24h';

export type ThemeMode = 'light' | 'dark' | 'system';

export type AyanamshaSystem = 'lahiri' | 'raman' | 'krishnamurti';

export type HouseSystem = 'whole_sign' | 'placidus' | 'equal';

export interface UserSettings {
  language: Language;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  themeMode: ThemeMode;
  reducedMotion: boolean;
  ayanamsha: AyanamshaSystem;
  houseSystem: HouseSystem;
  soundEnabled: boolean;
  autoArchive: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  sanskritTitle?: string;
  description: string;
  category: 'muhurat' | 'festival' | 'dasha' | 'transit';
  eventDate: string;
  isRead: boolean;
  createdAt: string;
}
