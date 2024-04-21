import { ReactNode } from 'react';

interface HeadingProps {
    ticketNumber: number;
    children?: ReactNode;
}

export const Heading = (props: HeadingProps) => {
    const { ticketNumber, children } = props;
    return (
        <div className="heading">
            <h2>Билет {ticketNumber}</h2>
            {children}
        </div>
    );
};
