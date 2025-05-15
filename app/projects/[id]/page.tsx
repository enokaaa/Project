import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"

export default async function ProjectDetailPage({
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

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to projects</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        </div>
        <Button asChild>
          <Link href={`/projects/${project.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" /> Edit Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Comprehensive information about this project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.paasCode && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">PAAS Code</h3>
                <p className="mt-1">{project.paasCode}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                <p className="mt-1">{project.startDate.toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
                <p className="mt-1">{project.endDate.toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Countries</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.countries.map((pc) => (
                  <span
                    key={pc.countryId}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                  >
                    {pc.country.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Themes</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.themes.map((pt) => (
                  <span
                    key={pt.themeId}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                  >
                    {pt.theme.name}
                  </span>
                ))}
              </div>
            </div>

            {project.donors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Donors</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.donors.map((pd) => (
                    <span
                      key={pd.donorId}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                    >
                      {pd.donor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.pagValue && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">PAG Value</h3>
                  <p className="mt-1 text-xl font-semibold">${project.pagValue.toLocaleString()}</p>
                </div>
              )}

              {project.totalContribution !== null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Contribution</h3>
                  <p className="mt-1 text-xl font-semibold">${project.totalContribution.toLocaleString()}</p>
                </div>
              )}

              {project.totalExpenditure !== null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Expenditure</h3>
                  <p className="mt-1 text-xl font-semibold">${project.totalExpenditure.toLocaleString()}</p>
                </div>
              )}

              {project.totalPsc !== null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total PSC</h3>
                  <p className="mt-1 text-xl font-semibold">${project.totalPsc.toLocaleString()}</p>
                </div>
              )}

              {project.totalContribution !== null && project.totalExpenditure !== null && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Balance</h3>
                  <p className="mt-1 text-xl font-semibold">
                    ${(project.totalContribution - project.totalExpenditure).toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <div className="mt-1">
                  <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    {project.approvalStatus.name}
                  </span>
                </div>
              </div>

              {project.fund && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Fund</h3>
                  <p className="mt-1">{project.fund.name}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Lead Organization</h3>
                <p className="mt-1">{project.leadOrgUnit.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
