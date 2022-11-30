

export interface BlockCreationStrategy {
    create(data: { state: number, color: string }, altura: number): void;
}