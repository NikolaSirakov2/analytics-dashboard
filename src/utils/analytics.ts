import { redis } from '../lib/redis'
import { getDate } from './index'

type AnalyticArgs = {
    retention?: number
}

type TrackOptions = {
    persist?: boolean
}

export class Analytics {
    private retention: number = 60 * 60 * 24 * 7

    constructor(options?: AnalyticArgs){
        if(options?.retention){
            this.retention = options.retention
        }
    }

    async track(namespace: string, event: object = {}, options?: TrackOptions){
        let key = `analytics::${namespace}`

        if(!options?.persist){
            key += `::${getDate()}`
        }

        await redis.hincrby(key, JSON.stringify(event), 1)
        if(options?.persist){
            await redis.expire(key, this.retention)
        }
    }
}

export const analytics = new Analytics()