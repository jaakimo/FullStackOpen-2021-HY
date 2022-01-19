const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseCode = (code: unknown): string => {
  if (!code || !isString(code)) {
    throw new Error('invalid or missing code');
  }
  return code;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('invalid or missing name');
  }
  return name;
};
const parseLatin = (latin: unknown): string | undefined => {
  if (!latin) return undefined;
  else if (!isString(latin)) {
    throw new Error('invalid latin name');
  }
  return String(latin);
};

export default { parseName, parseCode, parseLatin };
