import { useEffect, useState } from 'react'

type ElapsedTimeProps = {
    since: string | Date
}

const formatElapsed = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const min = Math.floor((seconds % 3600) / 60)
    const sec = seconds % 60

    return `${String(hrs).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

const ElapsedTime = ({ since }: ElapsedTimeProps) => {
    const [elapsed, setElapsed] = useState<number>(() => {
        const diff = (Date.now() - new Date(since).getTime()) / 1000
        return Math.floor(diff)
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return <span className="font-mono text-sm">{formatElapsed(elapsed)}</span>
}

export default ElapsedTime
