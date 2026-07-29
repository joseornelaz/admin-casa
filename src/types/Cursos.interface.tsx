export type ViewMode = 'list' | 'grid';

export interface ModuleData {
  id: string | number;
  title: string;
  status?: string;
  isMandatory?: boolean;
  items?: Array<{
    id: string | number;
    sectionTitle: string;
    title: string;
    format: string;
    type?: 'article' | 'assignment' | 'forum' | 'quiz';
  }>;
}

export interface CourseData {
  id: string;
  title: string;
  author: string;
  period?: string;
  isMandatory?: boolean;
  status?: 'Publicado' | 'Borrador' | 'En revisión' | 'Sin publicar';
  modulesCount: number;
  description?: string;
  publishedCount?: number;
  draftCount?: number;
  unpublishedCount?: number;
  modules?: ModuleData[];
}