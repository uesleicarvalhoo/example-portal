import { Conditions } from "./conditions"
import { Eye, EyeParams } from "./eye"



export type Exam = {
    id: string
    appointmentId: string
    rightEye: Eye
    leftEye: Eye
    conditions: Conditions
    observations?: string
    createdAt: string
}

export type CreateExaminationDTO = {
    appointmentId: string
    rightEye: EyeParams
    leftEye: EyeParams
    conditions: Conditions
    observations?: string
}

export type ExamParams = {
    appointmentId: string
    rightEye: EyeParams
    leftEye: EyeParams
    conditions: Conditions
    observations?: string
}



export type ExamFormValues = {
    appointmentId: string
    rightEye: EyeParams
    leftEye: EyeParams
    conditions: Conditions
    observations?: string
}
