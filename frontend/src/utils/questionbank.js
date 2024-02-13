import { sendGetRequest } from "./sendHttp";

export const getQuestions = async (type) => {
  const questions = await sendGetRequest(
    `http://localhost:8080/api/v1/questions/getSet/${type}/10`
  );
  let questionArray = questions.data.data;

  questionArray.forEach((element) => {
    element["options"] = [element.A, element.B, element.C, element.D];
  });
  return questionArray;
};
