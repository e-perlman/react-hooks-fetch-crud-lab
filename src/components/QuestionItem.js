import React from "react";

function QuestionItem({ question,onDeleteQuestion,onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    .then(() => onDeleteQuestion(question));
  }
  function handleAnswerUpdate(event){
    const newAnswer=event.target.value
    fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correctIndex: newAnswer,
    }),
  })
    .then((r) => r.json())
    .then((updatedItem) => onUpdateQuestion(updatedItem))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerUpdate}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
