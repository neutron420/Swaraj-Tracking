import { NextResponse } from "next/server";

const mockComplaints: any = {
  "TRK2345623456": {
    trackingId: "TRK2345623456",
    status: "UNDER_PROCESSING",
    category: { name: "Road Damage" },
    submissionDate: "2025-11-29T10:30:00Z",
    location: {
      locality: "Sector 22",
      city: "Chandigarh",
      district: "UT Chandigarh",
    },
    description: "Road is broken and causing traffic issues.",
    stages: [
      {
        department: "Citizen Facilitation Center",
        status: "Complaint Registered",
        updatedAt: "2025-01-20T10:30:00Z",
      },
      {
        department: "Municipal Corporation",
        status: "Inspection Scheduled",
        updatedAt: "2025-01-21T14:00:00Z",
      },
      {
        department: "PWD Department",
        status: "Under Processing",
        updatedAt: "2025-01-22T11:15:00Z",
        remarks: "Team assigned and visiting site tomorrow.",
      },
    ],
  },
};

export async function GET(req: Request, context: any) {
  // Next.js 14 FIX: params is async
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing tracking ID" }, { status: 400 });
  }

  const trackingId = id.toUpperCase();
  const complaint = mockComplaints[trackingId];

  if (!complaint) {
    return NextResponse.json({ error: "Complaint not found" }, { status: 404 });
  }

  return NextResponse.json({ complaint });
}
