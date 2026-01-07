export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Store } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ jobs: Store.listJobs() });
}
