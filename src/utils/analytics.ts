import { redis } from '../lib/redis'
import { getDate } from './index'
import { parse } from 'date-fns'

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

    async retriveDays(namespace: string, days: number){
        type AnaliticsPromise = ReturnType<typeof analytics.retrive>
        const promises: AnaliticsPromise[] = []

        for (let i = 0; i < days; i++){
            const date = getDate(i)
            promises.push(analytics.retrive(namespace, date))
        }

        const fetched = await Promise.all(promises)

        const data = fetched.sort((a, b) => {
            if (
                parse(a.date, "yyyy-MM-dd", new Date()) >
                parse(b.date, "yyyy-MM-dd", new Date())
            ) {
                return 1
            } else {
                return -1
            }
        })

        return data
    }
         

    async retrive(namespace: string, date: string ){
        const res = await redis.hgetall<Record<string,string>>(`analytics::${namespace}::${date}`)
        
        return {
            date,
            events: Object.entries(res?? []).map(([key, value]) => ({
               [key]: Number(value)
            }))
        }
    } 
}

export const analytics = new Analytics()