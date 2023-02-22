import { render, fireEvent, screen } from "@testing-library/react";
import { Answer, Question } from "../types/question.types";
import QuestionBox from "./QuestionBox";

const mockFunc = () => {};

describe("TEST QuestionBox", () => {
    test("text and description are visible", () => {
        const question: Question = {
          id: 1,
          text: "Question?",
          description: 'Description',
          input_type: "text",
          required: true,
        };
        render(
          <QuestionBox
            question={question}
            nextStep={mockFunc}
            back={mockFunc}
            onSubmit={mockFunc}
            canGoNext={false}
            canGoBack={false}
          />
        );
      
        const questionBoxText = screen.getByTestId("questionBoxText");
        const questionBoxDescription = screen.getByTestId("questionBoxDescription");

        expect(questionBoxText).toHaveTextContent("Question?");
        expect(questionBoxDescription).toHaveTextContent("Description");
      });

      test("back and next are triggered on click", () => {
        const question: Question = {
          id: 1,
          text: "Question?",
          input_type: "text",
          required: false,
        };
        let counter = 0;

        const mockNext = () => {
          counter += 1;
        };
        const mockBack = () => {
          counter -= 1;
        };

        render(
          <QuestionBox
            question={question}
            nextStep={mockNext}
            back={mockBack}
            onSubmit={mockFunc}
            canGoNext={true}
            canGoBack={true}
          />
        );
      
        const questionBoxNextBtn = screen.getByTestId("questionBoxNextBtn");
        const questionBoxBackBtn = screen.getByTestId("questionBoxBackBtn");
        
        fireEvent.click(questionBoxNextBtn);
        expect(counter).toStrictEqual(1);

        fireEvent.click(questionBoxBackBtn);
        expect(counter).toStrictEqual(0);
      });

      test("next is disabled when question is required", () => {
        const question: Question = {
          id: 1,
          text: "Question?",
          input_type: "text",
          required: true,
        };
        let counter = 0;

        const mockNext = () => {
          counter += 1;
        };

        render(
          <QuestionBox
            question={question}
            nextStep={mockNext}
            back={mockFunc}
            onSubmit={mockFunc}
            canGoNext={true}
            canGoBack={false}
          />
        );
      
        const questionBoxNextBtn = screen.getByTestId("questionBoxNextBtn");
        
        fireEvent.click(questionBoxNextBtn);
        expect(counter).toStrictEqual(0);
      });

      test("error when input has value and doesn't match patten validation", () => {
        const question: Question = {
          id: 1,
          text: "Question?",
          input_type: "text",
          placeholder:'question1',
          validation: {
            pattern: '^[A-B]+$',
            message: 'error message'
          },
          required: false,
        };

        render(
          <QuestionBox
            question={question}
            nextStep={mockFunc}
            back={mockFunc}
            onSubmit={mockFunc}
            canGoNext={false}
            canGoBack={false}
          />
        );
          
        const questionBoxInput  = screen.getByTestId('questionBoxInput');
        const questionBoxInputElement = screen.getByLabelText("question1");
        
        fireEvent.change(questionBoxInputElement, {target: {value: 'hello'}})
        expect(questionBoxInput).toHaveTextContent("error message");
      });
      test("question answers are collected", () => {
        const question: Question = {
          id: 1,
          text: "Question?",
          input_type: "text",
          placeholder:'question1',
          required: false,
        };

        const expectedAnswers = [{ question_id: 1, value: 'hello' }]
        let actualAnswers;

        const mockSubmit = (answers: Answer[]) => {
          actualAnswers = answers
        }

        render(
          <QuestionBox
            question={question}
            nextStep={mockFunc}
            back={mockFunc}
            onSubmit={mockSubmit}
            canGoNext={false}
            canGoBack={false}
          />
        );
        const questionBoxInputElement = screen.getByLabelText("question1");
        const questionBoxNextBtn = screen.getByTestId("questionBoxNextBtn");
        
        fireEvent.change(questionBoxInputElement, {target: {value: 'hello'}})
        fireEvent.click(questionBoxNextBtn);

        expect(actualAnswers).toStrictEqual(expectedAnswers);
      });
})
