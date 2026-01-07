type Job = {
  id: string;
  text?: string;
  summary?: string;
  createdAt: string;
  regeneratedAt?: string;
};

class JobStore {
  private jobs = new Map<string, Job>();

  get(id: string) {
    return this.jobs.get(id);
  }

  set(job: Job) {
    this.jobs.set(job.id, job);
  }

  update(id: string, data: Partial<Job>) {
    const job = this.jobs.get(id);
    if (!job) return;
    this.jobs.set(id, { ...job, ...data });
  }
}

export const db = {
  jobs: new JobStore(),
};