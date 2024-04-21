import { useState } from 'react';

import { Lotery } from './components/Lotery/Lotery';
import { Result } from './components/Result';

function App() {
    const [result, setResult] = useState<boolean | null>(null);

    const isShowResult = typeof result === 'boolean';

    return (
        <div className="ticket-block">
            {isShowResult ? (
                <Result result={result} />
            ) : (
                <Lotery setResult={setResult} />
            )}
        </div>
    );
}

export default App;
