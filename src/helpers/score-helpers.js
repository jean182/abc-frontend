const formatNonEditableQuestions = (
  riskFactorScores,
  nonEditableQuestions,
  procedureTypeValue,
  voteTypeValue
) => {
  return riskFactorScores
    .filter((riskFactorScore) => {
      return nonEditableQuestions.some(
        ({ id }) => id === riskFactorScore.riskFactorId
      );
    })
    .map((riskFactorScore) => {
      const { id, description } = riskFactorScore.riskFactor;
      return {
        ...riskFactorScore,
        riskFactorId: id,
        scale:
          description === "Tipo de votación"
            ? voteTypeValue
            : procedureTypeValue,
      };
    });
};

const formatQuestions = (riskFactorScores, questions, values) => {
  return riskFactorScores
    .filter((riskFactorScore) => {
      return questions.some(({ id }) => id === riskFactorScore.riskFactorId);
    })
    .map((riskFactorScore, index) => {
      const scale = Number(values[index]);
      return {
        ...riskFactorScore,
        scale,
      };
    });
};

const formatNewNonEditableQuestions = (
  nonEditableQuestions,
  procedureTypeValue,
  voteTypeValue
) => {
  return nonEditableQuestions.map((question) => {
    const { id, description } = question;
    return {
      riskFactorId: id,
      scale:
        description === "Tipo de votación" ? voteTypeValue : procedureTypeValue,
    };
  });
};

const formatNewQuestions = (questions, values) => {
  return questions.map((question, index) => {
    const scale = Number(values[index]);
    return {
      scale,
      riskFactorId: question.id,
    };
  });
};

const probabilityScaleTotal = (values, procedureTypeValue, voteTypeValue) => {
  const valueList = [...values, procedureTypeValue, voteTypeValue].map((n) =>
    Number(n)
  );
  const total = valueList.reduce((a, b) => a + b, 0);
  switch (true) {
    case total < 13:
      return 1;
    case total < 16:
      return 2;
    case total < 20:
      return 3;
    case total < 24:
      return 4;
    case total < 29:
      return 5;
    case total < 34:
      return 6;
    case total < 40:
      return 7;
    case total < 47:
      return 8;
    case total < 52:
      return 9;
    case total < 61:
      return 10;
    default:
      return 1;
  }
};

export const newScore = (
  values,
  questions,
  nonEditableQuestions,
  procedureTypeValue,
  voteTypeValue
) => {
  const newQuestions = formatNewQuestions(questions, values);
  const newNonEditableQuestions = formatNewNonEditableQuestions(
    nonEditableQuestions,
    procedureTypeValue,
    voteTypeValue
  );
  const probabilityScale = probabilityScaleTotal(
    values,
    procedureTypeValue,
    voteTypeValue
  );
  return {
    probabilityScale,
    riskFactorScoresAttributes: [...newQuestions, ...newNonEditableQuestions],
  };
};

export const editScore = (
  values,
  questions,
  nonEditableQuestions,
  score,
  procedureTypeValue,
  voteTypeValue
) => {
  const newQuestions = formatQuestions(
    score.riskFactorScores,
    questions,
    values
  );
  const newNonEditableQuestions = formatNonEditableQuestions(
    score.riskFactorScores,
    nonEditableQuestions,
    procedureTypeValue,
    voteTypeValue
  );
  const probabilityScale = probabilityScaleTotal(
    values,
    procedureTypeValue,
    voteTypeValue
  );
  return {
    ...score,
    probabilityScale,
    riskFactorScoresAttributes: [...newQuestions, ...newNonEditableQuestions],
  };
};
