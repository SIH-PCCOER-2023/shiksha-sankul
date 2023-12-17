import { sendGetRequest } from "./sendHttp"

export const getQuestions = async() => {
    const questions = await sendGetRequest("http://localhost:8080/test/getQuestions");
    console.log(questions.data);
    return questions.data;
}