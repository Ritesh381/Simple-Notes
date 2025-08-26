// queue + set for unique jobs
class JobQueue {
  constructor() {
    this.items = [];
    this.jobs = new Set();
  }

  push(id) {
    if (!this.jobs.has(id)) {
      this.items.push(id); // enqueue
      this.jobs.add(id);
    }
  }

  get() {
    if (this.isEmpty()) return null;
    const val = this.items.shift(); // dequeue (FIFO)
    this.jobs.delete(val);
    return val;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const jobQueue = new JobQueue();
module.exports = jobQueue;
