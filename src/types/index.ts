export type ThemeMode = 'light' | 'dark';

export type SoundEffect =
  | 'temple-bell'
  | 'paper-flip'
  | 'ink-stroke'
  | 'wind'
  | 'ambient-temple';

export interface NavItem {
  id: string;
  label: string;
  sanskritLabel: string;
  path: string;
  icon: string;
  description: string;
}

export interface AnimationConfig {
  reducedMotion: boolean;
  intensity: 'subtle' | 'normal' | 'cinematic';
}

export * from './archive';
export * from './settings';
export * from './kundali';
