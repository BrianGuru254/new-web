export type ServiceTime = {
  title: string;
  time: string;
  description: string;
};

export type Ministry = {
  name: string;
  summary: string;
};

export type Department = {
  name: string;
  summary: string;
  actionLabel: string;
  actionHref: string;
};

export type EventItem = {
  title: string;
  date: string;
  summary: string;
};

export type SermonItem = {
  title: string;
  preacher: string;
  series: string;
  videoUrl: string;
  summary: string;
};

export type QuickLink = {
  label: string;
  href: string;
  description: string;
};

export type MusicGroup = {
  name: string;
  memberCount: string;
  summary: string;
};

export type SiteContent = {
  churchName: string;
  heroTitle: string;
  heroSubtitle: string;
  mission: string;
  livestreamLabel: string;
  livestreamUrl: string;
  location: string;
  phone: string;
  email: string;
  sabbathSchoolTime: string;
  divineServiceTime: string;
  midweekTime: string;
  pastorName: string;
  welcomeMessage: string;
  aboutTitle: string;
  aboutBody: string;
  themeVerse: string;
  missionVisionTitle: string;
  missionVisionBody: string;
  objectives: string[];
  givingTitle: string;
  givingBody: string;
  givingHref: string;
  appointmentTitle: string;
  appointmentBody: string;
  announcements: string[];
  serviceTimes: ServiceTime[];
  ministries: Ministry[];
  departments: Department[];
  events: EventItem[];
  sermons: SermonItem[];
  quickLinks: QuickLink[];
  musicGroups: MusicGroup[];
  resources: QuickLink[];
};
