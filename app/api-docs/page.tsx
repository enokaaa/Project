import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">API Documentation</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              The Project Management API provides access to project data in JSON format.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All API endpoints return data in JSON format. The base URL for all API requests is <code>/api</code>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endpoints</CardTitle>
            <CardDescription>Available API endpoints for accessing project data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Get All Projects</h3>
              <p className="text-sm text-muted-foreground mt-1">Returns a list of all projects with pagination.</p>
              <div className="mt-2 p-2 bg-muted rounded-md">
                <code>GET /api/projects?page=1&pageSize=10</code>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium">Parameters:</h4>
                <p className="text-sm">
                  <code>page</code> - The page number (default: 1)
                  <br />
                  <code>pageSize</code> - Number of items per page (default: 10)
                </p>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium">Example Response:</h4>
                <pre className="mt-1 p-2 bg-muted rounded-md overflow-auto text-xs">
                  {`{
  "projects": [
    {
      "id": 1,
      "title": "FSGLO10S05:Youth Empowerment for Urban Development",
      "paasCode": "H139",
      "approvalStatus": {
        "name": "Approved"
      },
      "leadOrgUnit": {
        "name": "Urban Economy"
      },
      "countries": [
        {
          "country": {
            "name": "GLOBAL"
          }
        }
      ],
      "pagValue": 4218607
    },
    ...
  ],
  "totalPages": 2,
  "currentPage": 1,
  "pageSize": 10,
  "totalCount": 12
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Get Projects by Country</h3>
              <p className="text-sm text-muted-foreground mt-1">Returns projects filtered by country name.</p>
              <div className="mt-2 p-2 bg-muted rounded-md">
                <code>GET /api/projects/country/{"{country}"}</code>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium">Parameters:</h4>
                <p className="text-sm">
                  <code>country</code> - The name of the country (e.g., "Kenya")
                </p>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium">Example Response:</h4>
                <pre className="mt-1 p-2 bg-muted rounded-md overflow-auto text-xs">
                  {`{
  "projects": [
    {
      "id": 2,
      "title": "FDGLO11F05: Preparations for the 23rd Session of the Governing Council",
      "paasCode": "A119",
      "approvalStatusId": 1,
      "fundId": 2,
      "pagValue": 51549,
      "startDate": "2011-01-01T00:00:00.000Z",
      "endDate": "2011-12-31T00:00:00.000Z",
      "totalExpenditure": 51549,
      "totalContribution": 0,
      "totalPsc": 0,
      "leadOrgUnitId": 2,
      "createdAt": "2023-05-14T13:45:22.123Z",
      "updatedAt": "2023-05-14T13:45:22.123Z",
      "approvalStatus": {
        "id": 1,
        "name": "Approved",
        "description": "Project has been approved"
      },
      "leadOrgUnit": {
        "id": 2,
        "name": "External Relations",
        "department": "Relations"
      },
      ...
    }
  ]
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Get Projects by Status</h3>
              <p className="text-sm text-muted-foreground mt-1">Returns projects filtered by approval status.</p>
              <div className="mt-2 p-2 bg-muted rounded-md">
                <code>GET /api/projects/status/{"{status}"}</code>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium">Parameters:</h4>
                <p className="text-sm">
                  <code>status</code> - The approval status (e.g., "Approved")
                </p>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium">Example Response:</h4>
                <pre className="mt-1 p-2 bg-muted rounded-md overflow-auto text-xs">
                  {`{
  "projects": [
    {
      "id": 1,
      "title": "FSGLO10S05:Youth Empowerment for Urban Development",
      "paasCode": "H139",
      "approvalStatusId": 1,
      "fundId": 1,
      "pagValue": 4218607,
      "startDate": "2012-01-01T00:00:00.000Z",
      "endDate": "2013-12-31T00:00:00.000Z",
      "totalExpenditure": 4439757,
      "totalContribution": 4329257,
      "totalPsc": 316548,
      "leadOrgUnitId": 1,
      "createdAt": "2023-05-14T13:45:22.123Z",
      "updatedAt": "2023-05-14T13:45:22.123Z",
      "approvalStatus": {
        "id": 1,
        "name": "Approved",
        "description": "Project has been approved"
      },
      ...
    },
    ...
  ]
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
