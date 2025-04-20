export class PerformanceMonitor {
    private updateTimes: number[] = [];
    private readonly maxSamples: number = 10;
    private readonly targetUpdateTime: number = 16; // Target 60fps (16ms per frame)

    logUpdateTime(duration: number) {
        this.updateTimes.push(duration);
        if (this.updateTimes.length > this.maxSamples) {
            this.updateTimes.shift();
        }
    }

    getAverageUpdateTime(): number {
        if (this.updateTimes.length === 0) return 0;
        const sum = this.updateTimes.reduce((a, b) => a + b, 0);
        return sum / this.updateTimes.length;
    }

    isPerformanceGood(): boolean {
        return this.getAverageUpdateTime() <= this.targetUpdateTime;
    }

    getPerformanceStatus(): string {
        const avgTime = this.getAverageUpdateTime();
        if (avgTime <= this.targetUpdateTime) {
            return 'Good';
        } else if (avgTime <= this.targetUpdateTime * 1.5) {
            return 'Fair';
        } else {
            return 'Poor';
        }
    }

    getSuggestedUpdateInterval(): number {
        const avgTime = this.getAverageUpdateTime();
        if (avgTime <= this.targetUpdateTime) {
            return 100; // Default interval when performance is good
        } else {
            // Increase interval based on how much slower than target we are
            const factor = avgTime / this.targetUpdateTime;
            return Math.ceil(100 * factor);
        }
    }

    reset() {
        this.updateTimes = [];
    }
} 