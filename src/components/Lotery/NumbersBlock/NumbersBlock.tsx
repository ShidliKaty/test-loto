interface NumbersBlockProps {
    numbers: number[];
    pickedNumbers: number[];
    onPickNumber: (num: number) => void;
    maxPicks: number;
    fieldNumber: number;
}

export const NumbersBlock = (props: NumbersBlockProps) => {
    const { numbers, maxPicks, pickedNumbers, onPickNumber, fieldNumber } =
        props;

    function getNumberWord(number: number) {
        if (number === 1) {
            return 'число';
        } else if ([2, 3, 4].includes(number)) {
            return 'числа';
        } else {
            return 'чисел';
        }
    }

    return (
        <>
            <div className="numbers-heading">
                <h3>Поле {fieldNumber} </h3>
                <p>
                    Отметьте {maxPicks} {getNumberWord(maxPicks)}
                </p>
            </div>

            <div className="numbers-block">
                {numbers.map((number) => (
                    <button
                        disabled={
                            pickedNumbers.length >= maxPicks &&
                            !pickedNumbers.includes(number)
                        }
                        className={
                            pickedNumbers.includes(number)
                                ? 'number-btn active'
                                : 'number-btn'
                        }
                        key={number}
                        onClick={() => onPickNumber(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </>
    );
};
