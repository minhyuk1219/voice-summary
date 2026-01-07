import fs from "fs";
import path from "path";

export type JobStatus = "queued" | "processing" | "done" | "failed";

export type Job = {
  id: string;
  filename: string;
  createdAt: number;
  status: JobStatus;
  error?: string;
  transcript?: string;
  summary?: string;
  // 결제(구독) 상태
  isPaid: boolean;
};

type DB = {
  jobs: Record<string, Job>;
};

const dataDir = path.join(process.cwd(), ".data");
const dbPath = path.join(dataDir, "store.json");

function ensure() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    const init: DB = { jobs: {} };
    fs.writeFileSync(dbPath, JSON.stringify(init, null, 2), "utf-8");
  }
}

function read(): DB {
  ensure();
  return JSON.parse(fs.readFileSync(dbPath, "utf-8")) as DB;
}

function write(db: DB) {
  ensure();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
}

export const Store = {
  createJob(job: Job) {
    const db = read();
    db.jobs[job.id] = job;
    write(db);
  },
  getJob(id: string): Job | null {
    const db = read();
    return db.jobs[id] ?? null;
  },
  updateJob(id: string, patch: Partial<Job>) {
    const db = read();
    const cur = db.jobs[id];
    if (!cur) return;
    db.jobs[id] = { ...cur, ...patch };
    write(db);
  },
  listJobs(): Job[] {
    const db = read();
    return Object.values(db.jobs).sort((a, b) => b.createdAt - a.createdAt);
  },
};
