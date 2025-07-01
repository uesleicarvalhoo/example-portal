export type GetSummaryParams = {
    startDate: Date
    endDate: Date
}

export type AppointmentSummary = {
    total: number
    pending: number
    inProgress: number
    canceled: number
    waitingForPayment: number
    completed: number
    avgWaitingTime: string // e.g. "00:12:00"
    avgConsultTime: string // e.g. "00:30:00"
}
