export interface FormResponse {
	id: string
	filledAt: string
	clientId: string
	clientName: string
	clientEmail: string
	formTemplateTitle: string
	responses: Response[]
}

export interface Response {
	questionId: string
	questionText: string
	type: string
	answer: string
}
