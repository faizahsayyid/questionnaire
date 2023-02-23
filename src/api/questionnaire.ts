import axios from "axios";
import { apiURL } from "../config.json";
import { Questionnaire } from "../types/question.types";

export async function getQuestionnaire(): Promise<Questionnaire[]> {
  const res = await axios.get(`${apiURL}/questionnaires`);
  return res.data;
}
