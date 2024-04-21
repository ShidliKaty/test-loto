export const checkMatchNumbers = (firstArr: number[], secondArr: number[]) => {
    let matchCount = 0;

    firstArr.forEach((n) => {
        if (secondArr.includes(n)) return matchCount++;
    });
    return matchCount;
};
