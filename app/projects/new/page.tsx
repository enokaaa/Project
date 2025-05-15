import { ProjectForm } from "@/components/project-form"
import prisma from "@/lib/prisma"

export default async function NewProjectPage() {
  // Fetch all the reference data needed for the form
  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
  })

  const orgUnits = await prisma.orgUnit.findMany({
    orderBy: { name: "asc" },
  })

  const themes = await prisma.theme.findMany({
    orderBy: { name: "asc" },
  })

  const approvalStatuses = await prisma.approvalStatus.findMany({
    orderBy: { name: "asc" },
  })

  const funds = await prisma.fund.findMany({
    orderBy: { name: "asc" },
  })

  const donors = await prisma.donor.findMany({
    orderBy: { name: "asc" },
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Create New Project</h1>
      <ProjectForm
        countries={countries}
        orgUnits={orgUnits}
        themes={themes}
        approvalStatuses={approvalStatuses}
        funds={funds}
        donors={donors}
      />
    </div>
  )
}
