/* eslint-disable eqeqeq */
import { isEmpty } from "lodash";

const generateObservations = (impactRiskFactorScore, submittedObservations) => {
  const { observations } = impactRiskFactorScore;
  if (isEmpty(observations)) {
    if (isEmpty(submittedObservations)) return [];
    return submittedObservations.map((observation) => {
      return {
        name: observation,
      };
    });
  }
  return observations.map((observation) => {
    const matchingObservation = isEmpty(submittedObservations)
      ? null
      : submittedObservations.find((name) => name === observation.name);
    if (isEmpty(matchingObservation)) {
      return {
        id: observation.id,
        _destroy: true,
      };
    }
    return {
      id: observation.id,
      riskFactorScoreId: observation.riskFactorScoreId,
      name: observation.name,
    };
  });
};

const formatNonEditableQuestions = (score, nonEditableQuestions) => {
  const { riskFactorScores } = score;
  const nonEditableRiskFactorScores = isEmpty(riskFactorScores)
    ? []
    : riskFactorScores.filter((riskFactorScore) => {
        return nonEditableQuestions.some(
          ({ id }) => id === riskFactorScore.riskFactorId
        );
      });
  if (isEmpty(nonEditableRiskFactorScores)) {
    return nonEditableQuestions.map((nonEditableQuestion) => {
      return {
        riskFactorId: nonEditableQuestion.id,
        scale: 0,
      };
    });
  }
  return riskFactorScores
    .filter((riskFactorScore) => {
      return nonEditableQuestions.some(
        ({ id }) => id === riskFactorScore.riskFactorId
      );
    })
    .map((riskFactorScore) => {
      const { id } = riskFactorScore.riskFactor;

      return {
        id: riskFactorScore.id,
        scoreId: score.id,
        riskFactorId: id,
        scale: 0,
      };
    });
};

const formatQuestions = (score, questions, values) => {
  const { riskFactorScores } = score;
  const impactRiskFactorScores = riskFactorScores.filter((riskFactorScore) => {
    return questions.some(({ id }) => id === riskFactorScore.riskFactorId);
  });
  const scales = values.filter((item) => parseInt(item, 10) == item);
  const observationsList = values.filter(
    (item) => !(parseInt(item, 10) == item)
  );
  if (isEmpty(impactRiskFactorScores)) {
    return questions.map((question, index) => {
      const scale = Number(scales[index]);
      const observationsAttributes = generateObservations(
        {},
        observationsList[index]
      );
      return {
        riskFactorId: question.id,
        scale,
        observationsAttributes,
      };
    });
  }
  return impactRiskFactorScores.map((riskFactorScore, index) => {
    const scale = Number(scales[index]);
    const observationsAttributes = generateObservations(
      riskFactorScore,
      observationsList[index]
    );
    return {
      id: riskFactorScore.id,
      riskFactorId: riskFactorScore.riskFactorId,
      scale,
      observationsAttributes,
    };
  });
};

const formatNewNonEditableQuestions = (nonEditableQuestions) => {
  return nonEditableQuestions.map((question) => {
    const { id } = question;
    return {
      riskFactorId: id,
      scale: 0,
    };
  });
};

const formatNewQuestions = (questions, values) => {
  const scales = values.filter((item) => parseInt(item, 10) == item);
  const observationsList = values.filter(
    (item) => !(parseInt(item, 10) == item)
  );
  return questions.map((question, index) => {
    const scale = Number(scales[index]);
    const observationsAttributes = generateObservations(
      {},
      observationsList[index]
    );
    return {
      riskFactorId: question.id,
      scale,
      observationsAttributes,
    };
  });
};

export const newImpactScore = (values, questions, nonEditableQuestions) => {
  const newQuestions = formatNewQuestions(questions, values);
  const newNonEditableQuestions = formatNewNonEditableQuestions(
    nonEditableQuestions
  );
  const probabilityScale = 5;
  return {
    probabilityScale,
    riskFactorScoresAttributes: [...newQuestions, ...newNonEditableQuestions],
  };
};

export const editImpactScore = (
  values,
  questions,
  nonEditableQuestions,
  score
) => {
  const newQuestions = formatQuestions(score, questions, values);
  const newNonEditableQuestions = formatNonEditableQuestions(
    score,
    nonEditableQuestions
  );
  return {
    ...score,
    riskFactorScoresAttributes: [...newQuestions, ...newNonEditableQuestions],
  };
};
