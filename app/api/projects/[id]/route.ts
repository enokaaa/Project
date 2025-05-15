import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  try {
    const project = await prisma.project.findUnique({
      where: { id },
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
      return NextResponse.json({ error: `Project with ID ${id} not found` }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const body = await request.json()

  try {
    // First, update the project
    const updatedProject = await prisma.project.update({
      where: { id },
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

    // Delete existing relationships
    await prisma.projectCountry.deleteMany({
      where: { projectId: id },
    })

    await prisma.projectTheme.deleteMany({
      where: { projectId: id },
    })

    await prisma.projectDonor.deleteMany({
      where: { projectId: id },
    })

    // Create new relationships
    if (body.countryIds && body.countryIds.length > 0) {
      await Promise.all(
        body.countryIds.map((countryId: number) =>
          prisma.projectCountry.create({
            data: {
              projectId: id,
              countryId,
            },
          }),
        ),
      )
    }

    if (body.themeIds && body.themeIds.length > 0) {
      await Promise.all(
        body.themeIds.map((themeId: number) =>
          prisma.projectTheme.create({
            data: {
              projectId: id,
              themeId,
            },
          }),
        ),
      )
    }

    if (body.donorIds && body.donorIds.length > 0) {
      await Promise.all(
        body.donorIds.map((donorId: number) =>
          prisma.projectDonor.create({
            data: {
              projectId: id,
              donorId,
            },
          }),
        ),
      )
    }

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error(`Error updating project ${id}:`, error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  try {
    // Delete the project (cascade will handle related records)
    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
