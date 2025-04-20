export class PerformanceMonitor {
    private updateTimes: number[] = [];
    private readonly maxSamples: number = 10;
    private readonly targetUpdateTime: number = 16; // Target 60fps (1000ms / 60 ≈ 16ms)

    /**
     * Logs a new update time and maintains a rolling window of samples
     * @param duration Time in milliseconds for the update
     */
    logUpdateTime(duration: number): void {
        this.updateTimes.push(duration);
        if (this.updateTimes.length > this.maxSamples) {
            this.updateTimes.shift();
        }
    }

    /**
     * Gets the average update time from the collected samples
     * @returns Average update time in milliseconds
     */
    getAverageUpdateTime(): number {
        if (this.updateTimes.length === 0) return 0;
        const sum = this.updateTimes.reduce((a, b) => a + b, 0);
        return sum / this.updateTimes.length;
    }

    /**
     * Checks if the current performance meets the target threshold
     * @returns true if performance is good (average update time <= target)
     */
    isPerformanceGood(): boolean {
        return this.getAverageUpdateTime() <= this.targetUpdateTime;
    }

    /**
     * Gets a qualitative assessment of current performance
     * @returns 'Good', 'Fair', or 'Poor' based on performance metrics
     */
    getPerformanceStatus(): string {
        const avgTime = this.getAverageUpdateTime();
        if (avgTime <= this.targetUpdateTime) return 'Good';
        if (avgTime <= this.targetUpdateTime * 2) return 'Fair';
        return 'Poor';
    }

    /**
     * Suggests an update interval based on current performance
     * @returns Suggested interval in milliseconds
     */
    getSuggestedUpdateInterval(): number {
        const avgTime = this.getAverageUpdateTime();
        if (avgTime <= this.targetUpdateTime) return 100; // Fast updates for good performance
        if (avgTime <= this.targetUpdateTime * 2) return 200; // Medium for fair performance
        return 500; // Slow updates for poor performance
    }

    /**
     * Resets all performance metrics
     */
    reset(): void {
        this.updateTimes = [];
    }
} 