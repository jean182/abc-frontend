export const getVoteTypeValue = (voteType) => {
  switch (voteType) {
    case "qualified_majority":
      return 1;
    default:
      return 10;
  }
};

export const getProcedureTypeValue = (procedureType) => {
  switch (procedureType) {
    case "ordinary_before":
      return 1;
    case "ordinary_after":
      return 3;
    case "two_hundred_eight":
      return 7;
    default:
      return 10;
  }
};
