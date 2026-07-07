import fs from 'fs';
import path from 'path';
import projectsData from '@/data/projects.json';
import architectureData from '@/data/architecture.json';

export interface Project {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  why_matters: string;
  core_ideas: string[];
  status: 'production' | 'active' | 'experimental' | 'archived';
  technologies: string[];
  layer: string;
  blog_slugs: string[];
  related_projects: string[];
  roadmap?: string[];
  repository: string;
  url: string;
  created: string;
  last_updated: string;
  stars?: number;
  language?: string;
}

export interface Layer {
  slug: string;
  name: string;
  description: string;
  problem: string;
  why_matters: string;
  color: string;
  icon: string;
  position: string;
  projects: string[];
}

export interface Architecture {
  layers: Layer[];
  title: string;
  subtitle: string;
  narrative: string;
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find(p => p.slug === slug) || null;
}

export function getProjectsByLayer(layerSlug: string): Project[] {
  const projects = getAllProjects();
  return projects.filter(p => p.layer === layerSlug);
}

export function getLayers(): Layer[] {
  return architectureData.layers;
}

export function getLayerBySlug(slug: string): Layer | null {
  const layers = getLayers();
  return layers.find(l => l.slug === slug) || null;
}

export function getArchitecture(): Architecture {
  return architectureData;
}

export function getProjectCountByLayer(): Record<string, number> {
  const projects = getAllProjects();
  const counts: Record<string, number> = {};
  
  projects.forEach(project => {
    counts[project.layer] = (counts[project.layer] || 0) + 1;
  });
  
  return counts;
}

export function filterProjectsByStatus(status: string): Project[] {
  const projects = getAllProjects();
  return projects.filter(p => p.status === status);
}

export function filterProjectsByTechnology(technology: string): Project[] {
  const projects = getAllProjects();
  return projects.filter(p => p.technologies.includes(technology));
}

export function filterProjectsBySearch(query: string): Project[] {
  const projects = getAllProjects();
  const lowerQuery = query.toLowerCase();
  
  return projects.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.summary.toLowerCase().includes(lowerQuery) ||
    p.problem.toLowerCase().includes(lowerQuery) ||
    p.core_ideas.some(idea => idea.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedProjects(project: Project): Project[] {
  const allProjects = getAllProjects();
  return project.related_projects
    .map(slug => allProjects.find(p => p.slug === slug))
    .filter((p): p is Project => p !== undefined);
}

export function getBlogPostsForProject(project: Project): any[] {
  // This would need to be implemented similarly to blog.ts
  // For now, return empty array
  return [];
}
