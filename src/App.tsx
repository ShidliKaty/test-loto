import { NumbersBlock } from './components/NumbersBlock';
import { useCallback, useEffect, useState } from 'react';
import { BsMagic } from 'react-icons/bs';

function App() {
    const firstArray = Array.from({ length: 19 }, (_, index) => index + 1);
    const secondArray = Array.from({ length: 2 }, (_, index) => index + 1);

    const [firstPickedNums, setFirstPickedNums] = useState<number[]>([]);
    const [secondPickedNums, setSecondPickedNums] = useState<number[]>([]);
    const [isTicketWon, setIsTicketWon] = useState<boolean>();
    const [showResult, setShowResult] = useState(false);

    const onPickNumber = (num: number, arrayType: 'first' | 'second') => {
        const setter =
            arrayType === 'first' ? setFirstPickedNums : setSecondPickedNums;
        const pickedNums =
            arrayType === 'first' ? firstPickedNums : secondPickedNums;

        if (pickedNums.includes(num)) {
            setter(pickedNums.filter((n) => n !== num));
        } else {
            setter([...pickedNums, num]);
        }
    };

    function generateUniqueRandomNumbers(count: number, number: number) {
        const array = Array.from({ length: count }, (_, index) => index + 1);

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, number);
    }

    function checkMatchNumbers(firstArr: number[], secondArr: number[]) {
        let matchCount = 0;

        firstArr.forEach((n) => {
            if (secondArr.includes(n)) return matchCount++;
        });
        return matchCount;
    }

    const handleSubmit = useCallback(
        async (attempt = 1) => {
            const url = 'https://example';
            const payload = {
                selectedNumber: {
                    firstField: firstPickedNums,
                    secondField: secondPickedNums,
                },
                isTicketWon: isTicketWon,
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log('Server Response:', jsonResponse);
                } else if (attempt < 3) {
                    console.log(
                        `Attempt ${attempt}: Failed - retrying in 2 seconds`,
                    );
                    setTimeout(() => handleSubmit(attempt + 1), 2000);
                } else {
                    throw new Error('Something went wrong on server side!');
                }
            } catch (error) {
                console.error('Failed to send data:', error);
            }
        },
        [firstPickedNums, secondPickedNums, isTicketWon],
    );

    useEffect(() => {
        if (showResult && isTicketWon !== undefined) {
            handleSubmit();
        }
    }, [showResult, isTicketWon, handleSubmit]);

    const onPickRandomNumbers = () => {
        const firstRandomNumbers = generateUniqueRandomNumbers(19, 8);
        const secondRandomNumbers = generateUniqueRandomNumbers(2, 1);
        setFirstPickedNums(firstRandomNumbers);
        setSecondPickedNums(secondRandomNumbers);
    };

    const onCheckResult = () => {
        const firstRandomNumbers = generateUniqueRandomNumbers(19, 8);
        const secondRandomNumbers = generateUniqueRandomNumbers(2, 1);

        // оставляю console.log для упрощения проверки задания
        console.log('random numbers', firstRandomNumbers, secondRandomNumbers);
        console.log('picked numbers', firstPickedNums, secondPickedNums);

        const firstMatchCount = checkMatchNumbers(
            firstRandomNumbers,
            firstPickedNums,
        );

        const secondMatchCount = checkMatchNumbers(
            secondRandomNumbers,
            secondPickedNums,
        );

        // оставляю console.log для упрощения проверки задания
        console.log('matches', firstMatchCount, secondMatchCount);

        setIsTicketWon(firstMatchCount >= 4 && secondMatchCount > 0);
        setShowResult(true);
    };

    return (
        <div className="ticket-block">
            <div className="heading">
                <h2>Билет 1</h2>
                {!showResult && (
                    <button
                        className="generate-btn"
                        onClick={onPickRandomNumbers}
                    >
                        <BsMagic />
                    </button>
                )}
            </div>
            {showResult ? (
                <p className="numbers-heading">
                    {isTicketWon
                        ? 'Ого! Вы выиграли! Поздравляем!'
                        : 'Ой! Не повезло!'}
                </p>
            ) : (
                <>
                    <NumbersBlock
                        numbers={firstArray}
                        pickedNumbers={firstPickedNums}
                        onPickNumber={(num) => onPickNumber(num, 'first')}
                        maxPicks={8}
                        fieldNumber={1}
                    />
                    <NumbersBlock
                        numbers={secondArray}
                        maxPicks={1}
                        pickedNumbers={secondPickedNums}
                        onPickNumber={(num) => onPickNumber(num, 'second')}
                        fieldNumber={2}
                    />
                    <button
                        className="result-btn"
                        onClick={onCheckResult}
                        disabled={
                            firstPickedNums.length < 8 ||
                            secondPickedNums.length < 1
                        }
                    >
                        Показать результат
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
