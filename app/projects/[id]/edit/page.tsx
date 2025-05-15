import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectForm } from "@/components/project-form"
import prisma from "@/lib/prisma"

export default async function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  const projectId = Number.parseInt(params.id)

  // Fetch the project with all its relations
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      approvalStatus: true,
      fund: true,
      leadOrgUnit: true,
      countries: {
        include: {
          country: true,
        },
      },
      themes: {
        include: {
          theme: true,
        },
      },
      donors: {
        include: {
          donor: true,
        },
      },
    },
  })

  if (!project) {
    notFound()
  }

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
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/projects/${project.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to project</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
      </div>

      <ProjectForm
        project={project}
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
