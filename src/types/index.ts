export type Language = 'en' | 'ur';

export interface NavigationChildItem {
  id: string;
  label: string;
  labelUrdu: string;
  description: string;
  descriptionUrdu: string;
  path: string;
  iconName?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  labelUrdu: string;
  path: string;
  badge?: string;
  isExternal?: boolean;
  children?: NavigationChildItem[];
  iconName?: string;
}

export interface BreadcrumbItem {
  label: string;
  labelUrdu?: string;
  path?: string;
}

export interface EmergencyContact {
  id: string;
  title: string;
  titleUrdu: string;
  number: string;
  description: string;
  descriptionUrdu: string;
  isPrimary?: boolean;
}

export interface ServicePreview {
  id: string;
  title: string;
  titleUrdu: string;
  shortDesc: string;
  shortDescUrdu: string;
  iconName: string;
  path: string;
}

export interface TrafficUpdate {
  id: string;
  date: string;
  location: string;
  locationUrdu: string;
  status: 'clear' | 'congestion' | 'work_in_progress' | 'diversion';
  message: string;
  messageUrdu: string;
}
