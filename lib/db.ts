// This is a mock database implementation
// In a real application, you would use Prisma, Drizzle, or another ORM

export type Project = {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  budget: number
  countryId: number
  orgUnitId: number
  statusId: number
}

export type Country = {
  id: number
  name: string
  code: string
}

export type OrgUnit = {
  id: number
  name: string
  department: string
}

export type Theme = {
  id: number
  name: string
  description: string
}

export type Status = {
  id: number
  name: string
  description: string
}

export type ProjectTheme = {
  projectId: number
  themeId: number
}

// Mock data
export const countries: Country[] = [
  { id: 1, name: "Kenya", code: "KE" },
  { id: 2, name: "Uganda", code: "UG" },
  { id: 3, name: "Tanzania", code: "TZ" },
  { id: 4, name: "Ethiopia", code: "ET" },
  { id: 5, name: "Rwanda", code: "RW" },
]

export const orgUnits: OrgUnit[] = [
  { id: 1, name: "Health Department", department: "Health" },
  { id: 2, name: "Education Unit", department: "Education" },
  { id: 3, name: "Infrastructure Team", department: "Infrastructure" },
  { id: 4, name: "Agriculture Division", department: "Agriculture" },
  { id: 5, name: "Technology Group", department: "Technology" },
]

export const themes: Theme[] = [
  { id: 1, name: "Healthcare", description: "Projects focused on improving healthcare" },
  { id: 2, name: "Education", description: "Projects focused on education improvement" },
  { id: 3, name: "Infrastructure", description: "Projects focused on infrastructure development" },
  { id: 4, name: "Agriculture", description: "Projects focused on agricultural development" },
  { id: 5, name: "Technology", description: "Projects focused on technology advancement" },
]

export const statuses: Status[] = [
  { id: 1, name: "Planned", description: "Project is in planning phase" },
  { id: 2, name: "In Progress", description: "Project is currently in progress" },
  { id: 3, name: "Completed", description: "Project has been completed" },
  { id: 4, name: "On Hold", description: "Project is temporarily on hold" },
  { id: 5, name: "Cancelled", description: "Project has been cancelled" },
]

export const projectThemes: ProjectTheme[] = [
  { projectId: 1, themeId: 1 },
  { projectId: 1, themeId: 3 },
  { projectId: 2, themeId: 2 },
  { projectId: 3, themeId: 4 },
  { projectId: 4, themeId: 5 },
  { projectId: 5, themeId: 1 },
  { projectId: 6, themeId: 3 },
  { projectId: 7, themeId: 2 },
  { projectId: 8, themeId: 4 },
  { projectId: 9, themeId: 5 },
  { projectId: 10, themeId: 1 },
  { projectId: 11, themeId: 3 },
  { projectId: 12, themeId: 2 },
]

export const projects: Project[] = [
  {
    id: 1,
    title: "Rural Health Clinics",
    description: "Building health clinics in rural areas",
    startDate: "2023-01-15",
    endDate: "2024-06-30",
    budget: 500000,
    countryId: 1,
    orgUnitId: 1,
    statusId: 2,
  },
  {
    id: 2,
    title: "Primary School Construction",
    description: "Construction of primary schools in underserved areas",
    startDate: "2023-03-10",
    endDate: "2024-12-15",
    budget: 750000,
    countryId: 2,
    orgUnitId: 2,
    statusId: 2,
  },
  {
    id: 3,
    title: "Sustainable Farming Initiative",
    description: "Promoting sustainable farming practices",
    startDate: "2023-02-01",
    endDate: "2024-01-31",
    budget: 350000,
    countryId: 3,
    orgUnitId: 4,
    statusId: 3,
  },
  {
    id: 4,
    title: "Digital Literacy Program",
    description: "Teaching digital skills to youth",
    startDate: "2023-05-20",
    endDate: "2024-05-19",
    budget: 200000,
    countryId: 1,
    orgUnitId: 5,
    statusId: 2,
  },
  {
    id: 5,
    title: "Maternal Health Improvement",
    description: "Improving maternal health services",
    startDate: "2023-04-01",
    endDate: "2025-03-31",
    budget: 600000,
    countryId: 4,
    orgUnitId: 1,
    statusId: 2,
  },
  {
    id: 6,
    title: "Road Infrastructure Development",
    description: "Building and repairing rural roads",
    startDate: "2023-06-15",
    endDate: "2024-12-31",
    budget: 1200000,
    countryId: 5,
    orgUnitId: 3,
    statusId: 1,
  },
  {
    id: 7,
    title: "Secondary Education Scholarships",
    description: "Providing scholarships for secondary education",
    startDate: "2023-09-01",
    endDate: "2026-08-31",
    budget: 450000,
    countryId: 2,
    orgUnitId: 2,
    statusId: 2,
  },
  {
    id: 8,
    title: "Irrigation Systems",
    description: "Installing irrigation systems for small-scale farmers",
    startDate: "2023-07-10",
    endDate: "2024-07-09",
    budget: 380000,
    countryId: 3,
    orgUnitId: 4,
    statusId: 2,
  },
  {
    id: 9,
    title: "Tech Innovation Hub",
    description: "Creating a technology innovation hub",
    startDate: "2023-10-01",
    endDate: "2025-09-30",
    budget: 800000,
    countryId: 1,
    orgUnitId: 5,
    statusId: 1,
  },
  {
    id: 10,
    title: "Community Health Workers",
    description: "Training community health workers",
    startDate: "2023-08-15",
    endDate: "2024-08-14",
    budget: 320000,
    countryId: 4,
    orgUnitId: 1,
    statusId: 2,
  },
  {
    id: 11,
    title: "Bridge Construction",
    description: "Building bridges in rural areas",
    startDate: "2023-11-01",
    endDate: "2025-04-30",
    budget: 950000,
    countryId: 5,
    orgUnitId: 3,
    statusId: 1,
  },
  {
    id: 12,
    title: "Teacher Training Program",
    description: "Professional development for teachers",
    startDate: "2023-12-01",
    endDate: "2025-11-30",
    budget: 280000,
    countryId: 2,
    orgUnitId: 2,
    statusId: 2,
  },
]

// Helper functions to get related data
export function getCountryById(id: number): Country | undefined {
  return countries.find((country) => country.id === id)
}

export function getOrgUnitById(id: number): OrgUnit | undefined {
  return orgUnits.find((orgUnit) => orgUnit.id === id)
}

export function getStatusById(id: number): Status | undefined {
  return statuses.find((status) => status.id === id)
}

export function getThemesByProjectId(projectId: number): Theme[] {
  const themeIds = projectThemes.filter((pt) => pt.projectId === projectId).map((pt) => pt.themeId)

  return themes.filter((theme) => themeIds.includes(theme.id))
}

export function getProjectsByCountry(countryName: string): Project[] {
  const country = countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase())
  if (!country) return []

  return projects.filter((project) => project.countryId === country.id)
}

export function getProjectsByStatus(statusName: string): Project[] {
  const status = statuses.find((s) => s.name.toLowerCase() === statusName.toLowerCase())
  if (!status) return []

  return projects.filter((project) => project.statusId === status.id)
}

// Function to get projects with pagination
export function getPaginatedProjects(page: number, pageSize: number) {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedProjects = projects.slice(startIndex, endIndex)

  return {
    data: paginatedProjects,
    pagination: {
      total: projects.length,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(projects.length / pageSize),
    },
  }
}

// Function to add a new project
export function addProject(project: Omit<Project, "id">): Project {
  const newProject = {
    ...project,
    id: projects.length + 1,
  }

  projects.push(newProject)
  return newProject
}

// Function to update a project
export function updateProject(id: number, project: Partial<Project>): Project | null {
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return null

  projects[index] = { ...projects[index], ...project }
  return projects[index]
}

// Function to delete a project
export function deleteProject(id: number): boolean {
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return false

  projects.splice(index, 1)
  return true
}
