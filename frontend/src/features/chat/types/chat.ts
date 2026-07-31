export interface Source {

    chunk_id: number;

    document_id: number;

    filename: string;

    score: number;

    text: string;

}

export interface ChatResponse {

    conversation_id: number;

    answer: string;

    sources: Source[];

}

export interface ChatRequest {

    question: string;

    conversation_id: number;

    document_id?: number;

}