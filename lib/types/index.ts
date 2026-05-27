export type ProjectStatus = "planning" | "building" | "launched" | "archived";
export type ProjectVisibility = "public" | "unlisted" | "private";
export type ContentVisibility = "public" | "private" | "draft";
export type SectionType =
  | "heading"
  | "paragraph"
  | "code"
  | "image"
  | "diagram"
  | "video"
  | "quote"
  | "architecture"
  | "tweet_embed";

export interface Theme {
  id: number;
  name: string;
  slug: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  strong_text_color: string;
  muted_text_color: string;
  border_color: string;
  heading_font: string;
  body_font: string;
  serif_font: string | null;
  button_radius: string;
  card_radius: string;
  shadow_style: string | null;
  is_default: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  theme_id: number | null;
  theme?: Theme | null;
}

export interface LessonLearned {
  title: string;
  body: string;
}

export interface CoreFeature {
  title: string;
  description?: string | null;
}

export interface RoadmapItem {
  milestone: string;
  status: "done" | "in_progress" | "planned";
  date?: string | null;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  problemStatement: string;
  architectureOverview: string;
  architectureMermaid?: string | null;
  lessonsLearned: LessonLearned[];
  techStack: string[];
  coreFeatures: CoreFeature[];
  roadmap: RoadmapItem[];
  githubUrl: string | null;
  demoUrl: string | null;
  thumbnail: string | null;
  bannerImage: string | null;
  walkthroughUrl: string | null;
  walkthroughDuration: string | null;
  buildLogsUrl: string | null;
  status: ProjectStatus;
  isFeatured: boolean;
  visibility: ProjectVisibility;
  accentColor: string;
  iconLabel: string | null;
  featuredArticleIds: number[];
  themeId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFeature {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  icon: string | null;
  order_index: number;
}

export interface ProjectTechStack {
  id: number;
  project_id: number;
  name: string;
  category: string;
  logo: string | null;
  documentation_url: string | null;
}

export interface ProjectArchitectureNode {
  id: number;
  project_id: number;
  label: string;
  type: string;
  position_x: number;
  position_y: number;
  metadata_json: string | null;
}

export type ProjectDetail = Project;

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content_markdown: string | null;
  cover_image: string | null;
  reading_time: number | null;
  category_id: number | null;
  theme_id: number | null;
  author_id: number | null;
  project_id: number | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  featured: boolean;
  published: boolean;
  visibility: ContentVisibility;
  created_at: string;
  updated_at: string;
}

export interface ArticleSection {
  id: number;
  article_id: number;
  section_type: SectionType;
  title: string | null;
  content: string | null;
  order_index: number;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface ArticleDetail extends Article {
  sections: ArticleSection[];
  author: Author | null;
  theme: Theme | null;
  resources: Resource[];
  videos: Video[];
  related_articles: Article[];
}

export interface Resource {
  id: number;
  title: string;
  description: string | null;
  file_url: string;
  type: string;
  thumbnail: string | null;
}

export interface Video {
  id: number;
  title: string;
  video_url: string;
  thumbnail: string | null;
  platform: string;
  duration: number | null;
}

export interface PaginatedProjects {
  items: Project[];
  total: number;
  page: number;
  page_size: number;
}

export interface PaginatedArticles {
  items: Article[];
  total: number;
  page: number;
  page_size: number;
}

export interface SearchResults {
  query: string;
  articles: Article[];
  projects: Project[];
  resources: Resource[];
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
