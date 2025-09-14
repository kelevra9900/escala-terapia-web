import {GenericError} from "."

export interface PatientResponseSuccess {
	client: Patient
	pendingInvitations: PendingInvitation[]
	latestResponse: LatestResponse
}

export type PatientResponse = PatientResponseSuccess | GenericError

export interface Patient {
	id: string
	name: string
	email: string
	birthdate: Date
	gender: string
	notes: string
}

export interface PendingInvitation {
	id: string
	token: string
	clientId: string
	clientName: string
	formTemplateId: string
	formTitle: string
	isCompleted: boolean
	createdAt: string
	expiresAt: string
}

export interface LatestResponse {
	id: string
	client: Patient
	title: string
	filledAt: string
	responses: Response[]
}

export interface Response {
	questionText: string
	answer: string
	type: string
}
