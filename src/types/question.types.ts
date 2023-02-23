export type QuestionInputType = "text" | 'select' | 'autocomplete' | 'multi-select';

export type Question = {
  id: number;
  title?: string;
  text: string;
  description?: string;
  placeholder?: string;
  input_type: QuestionInputType;
  required: boolean;
  validation?: {
    pattern: string;
    message: string;
  };
  options?: string[];
};

export type Answer = {
  question_id: number;
  value: any;
}

export type Questionnaire = {
  id: number;
  questions: Question[];
}