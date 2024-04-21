import { Heading } from './Heading';

interface ResultProps {
    result: boolean;
}

export const Result = (props: ResultProps) => {
    const { result } = props;
    return (
        <>
            <Heading ticketNumber={1} />
            <p className="numbers-heading">
                {result ? 'Ого! Вы выиграли! Поздравляем!' : 'Ой! Не повезло!'}
            </p>
        </>
    );
};
