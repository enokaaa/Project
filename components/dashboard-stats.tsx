import { Activity, Building, DollarSign, ListChecks } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DashboardStatsProps = {
  projectCount: number
  countryCount: number
  orgUnitCount: number
  totalPagValue: number
  statusData: { name: string; count: number }[]
}

export function DashboardStats({
  projectCount,
  countryCount,
  orgUnitCount,
  totalPagValue,
  statusData,
}: DashboardStatsProps) {
  // Find approved and in-progress projects
  const approvedProjects = statusData.find((s) => s.name === "Approved")?.count || 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projectCount}</div>
          <p className="text-xs text-muted-foreground">Across {countryCount} countries</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total PAG Value</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalPagValue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Avg: ${projectCount > 0 ? Math.round(totalPagValue / projectCount).toLocaleString() : 0} per project
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Project Status</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvedProjects} Approved</div>
          <p className="text-xs text-muted-foreground">{statusData.map((s) => `${s.count} ${s.name}`).join(", ")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Organizations</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{orgUnitCount}</div>
          <p className="text-xs text-muted-foreground">Leading various projects</p>
        </CardContent>
      </Card>
    </div>
  )
}
