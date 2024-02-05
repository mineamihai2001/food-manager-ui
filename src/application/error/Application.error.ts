export class ApplicationError {
    public constructor(
        public parent: Error | null = null,
        public message: string = "unknown",
        public statusCode: number = 500,
        public description: string = ""
    ) {}
}
