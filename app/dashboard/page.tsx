import { DashboardCharts } from "@/components/dashboard-charts"
import { DashboardStats } from "@/components/dashboard-stats"
import prisma from "@/lib/prisma"

export default async function DashboardPage() {
  // Fetch data for dashboard
  const projectCount = await prisma.project.count()
  const countryCount = await prisma.country.count()
  const orgUnitCount = await prisma.orgUnit.count()

  // Calculate total budget (PAG Value)
  const projectsWithPagValue = await prisma.project.findMany({
    select: {
      pagValue: true,
    },
  })

  const totalPagValue = projectsWithPagValue.reduce((sum, project) => sum + (project.pagValue?.toNumber() || 0), 0)

  // Get projects by status
  const projectsByStatus = await prisma.approvalStatus.findMany({
    include: {
      projects: true,
    },
  })

  const statusData = projectsByStatus.map((status) => ({
    name: status.name,
    count: status.projects.length,
  }))

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>

      <DashboardStats
        projectCount={projectCount}
        countryCount={countryCount}
        orgUnitCount={orgUnitCount}
        totalPagValue={totalPagValue}
        statusData={statusData}
      />

      <div className="mt-8">
        <DashboardCharts />
      </div>
    </div>
  )
}
