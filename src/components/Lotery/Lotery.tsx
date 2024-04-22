import { useState } from 'react';
import { BsMagic } from 'react-icons/bs';
import { sendResult } from '../../api/sendResult';
import {
    FIRST_FIELD_MAX_PICKS,
    FIRST_MATCH_COUNT,
    SECOND_FIELD_MAX_PICKS,
    SECOND_MATCH_COUNT,
} from '../../const/fieldsNumbers';
import { checkMatchNumbers } from '../../utils/matchNumbersChecker';
import {
    generateUniqueRandomNumbers,
    getFieldNumbers,
} from '../../utils/numbersGenerator';
import { Heading } from '../Heading';
import { NumbersBlock } from './NumbersBlock/NumbersBlock';

interface LoteryProps {
    setResult: (value: boolean) => void;
}

export const Lotery = (props: LoteryProps) => {
    const { setResult } = props;
    const [firstPickedNums, setFirstPickedNums] = useState<number[]>([]);
    const [secondPickedNums, setSecondPickedNums] = useState<number[]>([]);

    const isButtonDisabled =
        firstPickedNums.length < 8 || secondPickedNums.length < 1;

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

    const handleSubmit = async () => {
        const isTicketWon = onCheckResult();
        const url = 'https://example';
        const payload = {
            selectedNumber: {
                firstField: firstPickedNums,
                secondField: secondPickedNums,
            },
            isTicketWon,
        };

        setResult(isTicketWon);

        sendResult(url, payload);
    };

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

        return (
            firstMatchCount >= FIRST_MATCH_COUNT &&
            secondMatchCount >= SECOND_MATCH_COUNT
        );
    };

    return (
        <>
            <Heading ticketNumber={1}>
                <button className="generate-btn" onClick={onPickRandomNumbers}>
                    <BsMagic />
                </button>
            </Heading>
            <>
                <NumbersBlock
                    numbers={getFieldNumbers(19)}
                    pickedNumbers={firstPickedNums}
                    onPickNumber={(num) => onPickNumber(num, 'first')}
                    maxPicks={FIRST_FIELD_MAX_PICKS}
                    fieldNumber={1}
                />
                <NumbersBlock
                    numbers={getFieldNumbers(2)}
                    pickedNumbers={secondPickedNums}
                    onPickNumber={(num) => onPickNumber(num, 'second')}
                    maxPicks={SECOND_FIELD_MAX_PICKS}
                    fieldNumber={2}
                />
                <button
                    className="result-btn"
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                >
                    Показать результат
                </button>
            </>
        </>
    );
};
