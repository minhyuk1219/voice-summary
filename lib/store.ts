// lib/store.ts
type Job = {
  id: string;
  text: string;
  summary?: string;
  isPaid?: boolean;
  createdAt: string;
  regeneratedAt?: string;
};

class InMemoryStore {
  private jobs = new Map<string, Job>();

  createJob(text: string) {
    const id = crypto.randomUUID();
    const job: Job = {
      id,
      text,
      createdAt: new Date().toISOString(),
      isPaid: false,
    };
    this.jobs.set(id, job);
    return job;
  }

  getJob(id: string) {
    return this.jobs.get(id);
  }

  updateJob(id: string, data: Partial<Job>) {
    const job = this.jobs.get(id);
    if (!job) return null;
    const updated = { ...job, ...data };
    this.jobs.set(id, updated);
    return updated;
  }

  listJobs() {
    return Array.from(this.jobs.values());
  }
}

export const Store = new InMemoryStore();