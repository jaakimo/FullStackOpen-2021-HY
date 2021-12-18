export interface Result {
  periodLength: number;
  trainingDays: number;
  rating: number;
  goal: boolean;
  ratingDescription: string;
  target: number;
  average: number;
}
export interface CalculateExercises {
  daily_exercises: Array<number>;
  target: number;
}

const parseArgs = (args: Array<string>): CalculateExercises => {
  const daily_exercises: Array<number> = [];
  args = args.slice(2);
  args.forEach((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error('Provided values were not numbers');
    } else {
      daily_exercises.push(Number(arg));
    }
  });
  const target: number = daily_exercises[0];
  daily_exercises.shift();
  return {
    daily_exercises,
    target,
  };
};

export const calculateExercises = (
  trainingHoursInDays: Array<number>,
  target: number
): Result => {
  const totalHours = trainingHoursInDays.reduce((sum, hours) => sum + hours, 0);
  const trainingDays = trainingHoursInDays.reduce(
    (tDay, hours) => (hours > 0 ? tDay + 1 : tDay),
    0
  );
  const average = totalHours / trainingHoursInDays.length;

  let rating;
  let ratingDescription;
  let goal = false;

  if (average < target / 2) {
    rating = 1;
    ratingDescription = 'you missed your goal by a quite large margin';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'more than halfway to your goal, keep it up!';
  } else {
    rating = 3;
    ratingDescription = "you've met your goals, gratz!";
    goal = true;
  }

  const result = {
    periodLength: trainingHoursInDays.length,
    trainingDays,
    goal,
    rating,
    ratingDescription,
    target,
    average,
  };
  return result;
};

try {
  const { daily_exercises, target } = parseArgs(process.argv);
  calculateExercises(daily_exercises, target);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong. ';
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }
  console.log(errorMessage);
}
