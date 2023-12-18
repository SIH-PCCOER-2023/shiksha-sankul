import { sendGetRequest } from "./sendHttp";

export const getQuestions = async () => {
    const questions = await sendGetRequest(
        "http://localhost:8080/api/v1/questions"
    );
    let questionArray = questions.data.data;
    console.log(questionArray);
    questionArray.forEach((element) => {
        element["options"] =[
            element.A,
            element.B,
            element.C,
            element.D,
        ];
    });
    return questionArray;
};
