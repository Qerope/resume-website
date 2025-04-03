export interface Profile {
  network: string
  username: string
  url: string
}

export interface Location {
  city: string
  region: string
  countryCode: string
}

export interface Basics {
  name: string
  label: string
  email: string
  phone: string
  url: string
  location: Location
  profiles: Profile[]
}

export interface Work {
  name: string
  position: string
  url: string
  startDate: string
  endDate: string
  highlights: string[]
}

export interface Education {
  institution: string
  url: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  score: string
  courses: string[]
  summary: string
}

export interface Skill {
  name: string
  keywords: string[]
}

export interface Language {
  language: string
}

export interface Certificate {
  name: string
  issuer: string
}

export interface Publication {
  name: string
  publisher: string
  releaseDate: string
  url?: string
}

export interface Award {
  title: string
  date: string
  awarder: string
}

export interface Project {
  name: string
  description: string
  url: string
}

export interface ResumeData {
  basics: Basics
  work: Work[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certificates: Certificate[]
  publications: Publication[]
  awards: Award[]
  projects: Project[]
}

