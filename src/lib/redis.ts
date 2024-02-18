import { Redis, RedisConfigNodejs } from '@upstash/redis'

export const redis = new Redis({
    url: 'https://eu2-cheerful-pelican-32078.upstash.io',
    token: process.env.REDIS_KEY!,
})