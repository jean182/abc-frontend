/* eslint-disable eqeqeq */
import { isEmpty } from "lodash";

const generateNewObservations = (submittedObservations) => {
  return submittedObservations.map((observation) => {
    return {
      name: observation,
    };
  });
};

const generateObservations = (impactRiskFactorScore, submittedObservations) => {
  const { observations } = impactRiskFactorScore;
  if (isEmpty(submittedObservations)) {
    observations.map((observation) => {
      return {
        id: observation.id,
        name: observation.name,
        _destroy: true,
      };
    });
  }

  if (isEmpty(observations)) {
    submittedObservations.map((name) => {
      return { name };
    });
  }

  // All the results that are already in the database and were selected again
  const matchingItems = observations.filter((observation) => {
    return submittedObservations.some((name) => name === observation.name);
  });

  // All the results that are already in the database and were not selected again
  const discardedItems = observations.filter((observation) => {
    return submittedObservations.every((name) => name !== observation.name);
  });

  // Results that are not in the database but were selected
  const newItems = submittedObservations
    .filter((name) => {
      return observations.every((observation) => name !== observation.name);
    })
    .map((name) => {
      return { name };
    });

  if (isEmpty(discardedItems)) return [...matchingItems, ...newItems];

  const deleteDiscardedItems = discardedItems.map((discardedItem) => {
    return {
      id: discardedItem.id,
      name: discardedItem.name,
      _destroy: true,
    };
  });

  return [...matchingItems, ...newItems, ...deleteDiscardedItems];
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
  const { observationsList, scales, notes } = values;
  if (isEmpty(impactRiskFactorScores)) {
    return questions
      .sort((a, b) => a.id - b.id)
      .map((question, index) => {
        const scale = Number(scales[index]);
        const observationsAttributes = generateNewObservations(
          observationsList[index]
        );
        const note = notes[index];
        return {
          riskFactorId: question.id,
          scale,
          notes: isEmpty(note) ? null : note,
          observationsAttributes,
        };
      });
  }
  return impactRiskFactorScores
    .sort((a, b) => a.riskFactorId - b.riskFactorId)
    .map((riskFactorScore, index) => {
      const scale = Number(scales[index]);
      const observationsAttributes = generateObservations(
        riskFactorScore,
        observationsList[index]
      );
      const note = notes[index];
      return {
        id: riskFactorScore.id,
        riskFactorId: riskFactorScore.riskFactorId,
        scale,
        notes: isEmpty(note) ? null : note,
        observationsAttributes,
      };
    });
};

const formatNewNonEditableQuestions = (nonEditableQuestions) => {
  return nonEditableQuestions.map((question) => {
    const { id } = question;
    return {
      riskFactorId: id,
      riskType: "probability",
      scale: 0,
    };
  });
};

const formatNewQuestions = (questions, values) => {
  const { scales, notes, observationsList } = values;
  return questions
    .sort((a, b) => a.id - b.id)
    .map((question, index) => {
      const scale = Number(scales[index]);
      const observationsAttributes = generateNewObservations(
        observationsList[index]
      );
      const note = notes[index];
      return {
        riskFactorId: question.id,
        riskType: "probability",
        scale,
        notes: isEmpty(note) ? null : note,
        observationsAttributes,
      };
    });
};

const impactScaleTotal = (values) => {
  const { scales } = values;
  const valueList = scales.map((n) => Number(n));
  const total = valueList.reduce((a, b) => a + b, 0);
  switch (true) {
    case total < 11:
      return 1;
    case total < 15:
      return 3;
    case total < 20:
      return 5;
    case total < 24:
      return 7;
    case total < 28:
      return 8;
    case total < 33:
      return 9;
    case total < 41:
      return 10;
    default:
      return 1;
  }
};

export const newImpactScore = (values, questions, nonEditableQuestions) => {
  const newQuestions = formatNewQuestions(questions, values);
  const newNonEditableQuestions = formatNewNonEditableQuestions(
    nonEditableQuestions
  );
  const impactScale = impactScaleTotal(values);
  return {
    impactScale,
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
  const impactScale = impactScaleTotal(values);
  return {
    ...score,
    impactScale,
    riskFactorScoresAttributes: [...newQuestions, ...newNonEditableQuestions],
  };
};
