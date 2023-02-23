import axios from "axios";
import { apiURL } from "../config.json";
import { Answer } from "../types/question.types";

export async function postAnswers(answers: Answer[]): Promise<any> {
  return await axios.post(`${apiURL}/answers`, { entries: answers });
}
