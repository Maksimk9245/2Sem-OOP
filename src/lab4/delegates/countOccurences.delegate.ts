export type CountOccurrencesDelegate = (text: string, ch: string) => number;

export const countAnonymous: CountOccurrencesDelegate = function (text, ch) {
    let count = 0;
    for (const c of text) if (c === ch) count++;
    return count;
};

export const countLambda: CountOccurrencesDelegate = (text, ch) =>
    [...text].filter(c => c === ch).length;
