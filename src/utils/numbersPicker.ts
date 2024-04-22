export const pickRandomNumbers = (arr: number[], num: number) => {
    if (num > arr.length) {
        throw new Error(
            'Запрашиваемое количество превышает количество элементов в массиве',
        );
    }
    const result = [];
    const arrCopy = arr.slice();

    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * arrCopy.length);
        result.push(arrCopy[randomIndex]);
        arrCopy.splice(randomIndex, 1);
    }
    return result;
};
