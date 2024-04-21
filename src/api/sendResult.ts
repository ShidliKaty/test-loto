interface ticketResult {
    selectedNumber: {
        firstField: number[];
        secondField: number[];
    };
    isTicketWon: boolean | undefined;
}

export const sendResult = async (
    url: string,
    payload: ticketResult,
    attempt = 1,
) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload }),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Server Response:', jsonResponse);
        } else if (attempt < 3) {
            console.log(`Attempt ${attempt}: Failed - retrying in 2 seconds`);
            setTimeout(() => sendResult(url, payload, attempt + 1), 2000);
        } else {
            throw new Error('Something went wrong on server side!');
        }
    } catch (error) {
        console.error('Failed to send data:', error);
    }
};
