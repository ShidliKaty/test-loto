export const checkMatchNumbers = (firstArr: number[], secondArr: number[]) => {
    let matchCount = 0;
    const arrSet = new Set(firstArr);

    for (const number of secondArr) {
        if (arrSet.has(number)) {
            matchCount++;
        }
    }
    return matchCount;
};
