import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { country: string } }) {
  const country = params.country

  try {
    // Find the country by name (case insensitive)
    const countryRecord = await prisma.country.findFirst({
      where: {
        name: {
          equals: country,
          mode: "insensitive",
        },
      },
    })

    if (!countryRecord) {
      return NextResponse.json({ message: `Country not found: ${country}` }, { status: 404 })
    }

    // Find all projects for this country
    const projectCountries = await prisma.projectCountry.findMany({
      where: {
        countryId: countryRecord.id,
      },
      include: {
        project: {
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
        },
      },
    })

    const projects = projectCountries.map((pc) => pc.project)

    return NextResponse.json({ projects })
  } catch (error) {
    console.error(`Error fetching projects for country ${country}:`, error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
