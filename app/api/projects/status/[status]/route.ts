import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { status: string } }) {
  const status = params.status

  try {
    // Find the status by name (case insensitive)
    const statusRecord = await prisma.approvalStatus.findFirst({
      where: {
        name: {
          equals: status,
          mode: "insensitive",
        },
      },
    })

    if (!statusRecord) {
      return NextResponse.json({ message: `Status not found: ${status}` }, { status: 404 })
    }

    // Find all projects with this status
    const projects = await prisma.project.findMany({
      where: {
        approvalStatusId: statusRecord.id,
      },
      include: {
        approvalStatus: true,
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

    return NextResponse.json({ projects })
  } catch (error) {
    console.error(`Error fetching projects for status ${status}:`, error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
