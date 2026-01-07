// lib/store.ts
export type Job = {
  id: string;
  text: string;
  summary?: string;
  isPaid?: boolean;
};

class StoreImpl {
  private jobs = new Map<string, Job>();

  getJob(id: string) {
    return this.jobs.get(id);
  }

  listJobs() {
    return Array.from(this.jobs.values());
  }

  createJob(job: Job) {
    this.jobs.set(job.id, job);
  }

  updateJob(id: string, data: Partial<Job>) {
    const job = this.jobs.get(id);
    if (!job) return;
    this.jobs.set(id, { ...job, ...data });
  }
}

export const Store = new StoreImpl();