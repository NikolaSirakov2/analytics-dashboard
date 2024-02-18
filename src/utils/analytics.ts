type AnalyticArgs = {
    retention?: number
}

export class Analytics {
    private retention: number = 60 * 60 * 24 * 7

    constructor(options?: AnalyticArgs){
        if(options?.retention){
            this.retention = options.retention
        }
    }

    async track(namespace: string, event: object = {}){
        console.log(`Tracking ${namespace} with event`, event)
    }
}

export const analytics = new Analytics()