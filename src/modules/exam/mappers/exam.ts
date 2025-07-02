import {
    Exam,
    ExamFormValues,
    ExamParams,
} from '../types/exam';

// 🔹 Mapper: Form → Create DTO
export const toCreateExamParams = (form: ExamFormValues): ExamParams => ({
    appointmentId: form.appointmentId,
    rightEye: { ...form.rightEye },
    leftEye: { ...form.leftEye },
    conditions: { ...form.conditions },
    observations: form.observations?.trim() || undefined,
});

// 🔹 Mapper: Domain → Form
export const toExamFormValues = (exam: Exam): ExamFormValues => ({
    appointmentId: exam.appointmentId,
    rightEye: {
        spherical: exam.rightEye.spherical,
        cylindrical: exam.rightEye.cylindrical,
        axis: exam.rightEye.axis,
        observations: exam.rightEye.observations || '',
    },
    leftEye: {
        spherical: exam.leftEye.spherical,
        cylindrical: exam.leftEye.cylindrical,
        axis: exam.leftEye.axis,
        observations: exam.leftEye.observations || '',
    },
    conditions: {
        astigmatism: exam.conditions.astigmatism ?? false,
        myopia: exam.conditions.myopia ?? false,
        hyperopia: exam.conditions.hyperopia ?? false,
        presbyopia: exam.conditions.presbyopia ?? false,
    },
    observations: exam.observations || '',
});

// 🔹 Mapper: Form → Exam (modelo de domínio)
export const fromExamFormValues = (examId: string, appointmentId: string, form: ExamFormValues): Exam => ({
    id: examId,
    appointmentId,
    rightEye: {
        spherical: form.rightEye.spherical,
        cylindrical: form.rightEye.cylindrical,
        axis: form.rightEye.axis,
        observations: form.rightEye.observations?.trim() || '',
    },
    leftEye: {
        spherical: form.leftEye.spherical,
        cylindrical: form.leftEye.cylindrical,
        axis: form.leftEye.axis,
        observations: form.leftEye.observations?.trim() || '',
    },
    conditions: {
        astigmatism: form.conditions.astigmatism ?? false,
        myopia: form.conditions.myopia ?? false,
        hyperopia: form.conditions.hyperopia ?? false,
        presbyopia: form.conditions.presbyopia ?? false,
    },
    observations: form.observations?.trim() || '',
    createdAt: new Date().toISOString(),
});
