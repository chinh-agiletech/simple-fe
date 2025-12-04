export type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  progress: number; // 0-100
  assignedStaff: string[];
}

export interface ProjectItem {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  progress: number;
}

export interface Material {
  id: string;
  projectId: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'available' | 'ordered' | 'out-of-stock';
}

export interface Staff {
  id: string;
  projectId: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
}
