const questions = require("./course-match-questions");
const taxonomy = require("./course-taxonomy");

const factorWeights = Object.freeze({
  interests: 0.35,
  skills: 0.25,
  careerGoals: 0.25,
  personalPreferences: 0.15,
});

function getCompatibilityStrength(score) {
  if (score >= 75) return "Strong Match";
  if (score >= 50) return "Good Match";
  return "Possible Match";
}

function calculateCourseMatches(answers, courses) {
  if (questions.some((question) => !Object.hasOwn(factorWeights, question.factor))) {
    throw new TypeError("Every Course Match question must be assigned to a weighted scoring factor.");
  }
  if (!Array.isArray(answers) || answers.length !== questions.length ||
      answers.some((answer, index) =>
        !Number.isInteger(answer) ||
        answer < 0 ||
        answer >= questions[index].options.length
      )) {
    throw new TypeError("Course Match scoring requires one valid answer for every question.");
  }
  if (!Array.isArray(courses)) {
    throw new TypeError("Course Match scoring requires a course catalog.");
  }

  const scoredCourses = courses.map((course) => {
    const matchedQuestionIndices = [];
    const factorPoints = Object.fromEntries(
      Object.keys(factorWeights).map((factor) => [factor, 0]),
    );
    const factorQuestionCounts = Object.fromEntries(
      Object.keys(factorWeights).map((factor) => [factor, 0]),
    );
    let points = 0;
    answers.forEach((answer, questionIndex) => {
      const question = questions[questionIndex];
      const option = question.options[answer];
      const categoryId = course.categoryId || taxonomy.getDetailedCategoryId(course.category);
      factorQuestionCounts[question.factor] += 1;
      if (option.matches.includes(course.id)) {
        matchedQuestionIndices.push(questionIndex);
        points += 1;
        factorPoints[question.factor] += 1;
      } else if (option.matchesCategories?.includes(categoryId)) {
        matchedQuestionIndices.push(questionIndex);
        points += 0.5;
        factorPoints[question.factor] += 0.5;
      }
    });
    const factorScores = Object.fromEntries(
      Object.keys(factorWeights).map((factor) => [
        factor,
        Math.round((factorPoints[factor] / factorQuestionCounts[factor]) * 100),
      ]),
    );
    const weightedScore = Object.keys(factorWeights).reduce(
      (total, factor) => total + factorWeights[factor] * factorPoints[factor] / factorQuestionCounts[factor],
      0,
    );
    const score = Math.round(weightedScore * 100 + Number.EPSILON * 100);
    return {
      course,
      points,
      score,
      compatibilityStrength: getCompatibilityStrength(score),
      factorScores,
      matchedQuestionIndices,
    };
  });

  return scoredCourses
    .filter((match) => match.score > 0)
    .sort((left, right) =>
      right.score - left.score ||
      left.course.name.localeCompare(right.course.name) ||
      left.course.id.localeCompare(right.course.id)
    )
    .slice(0, 3);
}

module.exports = { calculateCourseMatches, factorWeights, getCompatibilityStrength };
