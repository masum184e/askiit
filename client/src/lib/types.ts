export interface Achievement {
  achievement_id: number;
  competition_name: string;
  position: string;
  overview: string;
  session: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface ItemLinks {
  self: { href: string };
  all: { href: string };
}

export interface AchievementResponse extends Achievement {
  _links: ItemLinks;
}

export interface PaginationLinks {
  self: { href: string };
  first: { href: string };
  last: { href: string };
  prev?: { href: string } | null;
  next?: { href: string } | null;
}

export interface AchievementListResponse {
  _links: PaginationLinks;
  page: number;
  size: number;
  total: number;
  _embedded: {
    achievements: AchievementResponse[];
  };
}

export interface StudentResponse {
  student_id: number;
  name: string;
  email: string;
  whatsapp: string | null;
  session: string | null;
  address: string | null;
  internship_company: string | null;
  internship_technology: string | null;
  created_at: string;
  updated_at: string;
  _links: ItemLinks;
}

export interface StudentListResponse {
  _links: PaginationLinks;
  page: number;
  size: number;
  total: number;
  _embedded: {
    students: StudentResponse[];
  };
}