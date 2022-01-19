interface CalculateBmi {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): CalculateBmi => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not nombers');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi > 40) return `Obese (class III)`;
  if (bmi > 35) return `Obese (class II)`;
  if (bmi > 30) return `Obese (class I)`;
  if (bmi > 25) return `Slight overweight`;
  if (bmi > 18.5) return `Normal range`;
  if (bmi > 17) return `Mild thinness`;
  if (bmi > 16) return `Moderate thinness`;
  else return `Severe thinness`;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong. ';
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }
  console.log(errorMessage);
}
