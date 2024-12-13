import React, { useState } from 'react';
import StockList from './components/StockList';
import StockDetails from './components/StockDetails';
import RealTimePrice from './components/RealTimePrice';
import './styles/App.css';

const App: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);

  return (
      <div className="App">
        <header>
          <h1>Real-Time Stock Prices</h1>
        </header>
        <main>
          <StockList onSelect={setSelectedTicker} />
          {selectedTicker && (
              <>
                <StockDetails ticker={selectedTicker} />
                <RealTimePrice ticker={selectedTicker} />
              </>
          )}
        </main>
      </div>
  );
};

export default App;
