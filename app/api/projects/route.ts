import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1")
  const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

  // Calculate pagination
  const skip = (page - 1) * pageSize

  try {
    // Get total count for pagination
    const totalCount = await prisma.project.count()

    // Get projects with pagination
    const projects = await prisma.project.findMany({
      skip,
      take: pageSize,
      include: {
        approvalStatus: {
          select: {
            name: true,
          },
        },
        leadOrgUnit: {
          select: {
            name: true,
          },
        },
        countries: {
          select: {
            country: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    })

    return NextResponse.json({
      projects,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize,
      totalCount,
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Create the project
    const project = await prisma.project.create({
      data: {
        title: body.title,
        paasCode: body.paasCode,
        approvalStatusId: body.approvalStatusId,
        fundId: body.fundId,
        pagValue: body.pagValue,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        leadOrgUnitId: body.leadOrgUnitId,
        totalExpenditure: body.totalExpenditure,
        totalContribution: body.totalContribution,
        totalPsc: body.totalPsc,
      },
    })

    // Create country relationships
    if (body.countries && body.countries.length > 0) {
      await Promise.all(
        body.countries.map((countryId: number) =>
          prisma.projectCountry.create({
            data: {
              projectId: project.id,
              countryId,
            },
          }),
        ),
      )
    }

    // Create theme relationships
    if (body.themes && body.themes.length > 0) {
      await Promise.all(
        body.themes.map((themeId: number) =>
          prisma.projectTheme.create({
            data: {
              projectId: project.id,
              themeId,
            },
          }),
        ),
      )
    }

    // Create donor relationships
    if (body.donors && body.donors.length > 0) {
      await Promise.all(
        body.donors.map((donorId: number) =>
          prisma.projectDonor.create({
            data: {
              projectId: project.id,
              donorId,
            },
          }),
        ),
      )
    }

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
