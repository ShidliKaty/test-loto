export const getFieldNumbers = (number: number) => {
    return Array.from({ length: number }, (_, index) => index + 1);
};

export const generateUniqueRandomNumbers = (count: number, number: number) => {
    const array = Array.from({ length: count }, (_, index) => index + 1);

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, number);
};
