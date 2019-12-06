import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [money, setMoney] = useState(0);
  const [denomination, setDenomination] = useState([]);
  const defaultDenominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

  // Set the value of money in state
  const withdrawMoney = () => {
    const elem = document.querySelector('input[name=money]');
    if (elem.value > 0) {
      setMoney(elem.value);
      setDenomination([]);
    } else {
      alert('Money enter a valid amount to withdraw.')
    }
    elem.value = '';
  }

  // Calculate the notes as per the amount
  useEffect(() => {
    let result = [];
    let total = money;
    if (money > 0 && denomination.length === 0) {
      for (let i = 0; i < defaultDenominations.length; i++) {
        if (total > 0) {
          result.push(Math.floor(total / defaultDenominations[i])); // 5000/2000 = 1
          total = total % defaultDenominations[i]; //5000 % 2 = 500
        }
      }
      setDenomination(result);
    }
  }, [defaultDenominations, denomination.length, money]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ATM Money Dispensor</h1>
      </header>
      <main className="App-main">
        <div className="container">
          <section className="App-section">
            <p>MONEY</p>
            <section className="money">
              <input type="text" name="money"></input>
              <button className="withdraw" onClick={() => withdrawMoney()}>Withdraw</button>
            </section>
          </section>
          <section className="App-section">
            <p>DENOMINATION</p>
            {money > 0 &&
              <p>Withdrawn : {money}</p>
            }
            <ul className="denomination">
              {denomination.length ?
                defaultDenominations.map((notes, index) =>
                  <li key={index}>{`${notes} * ${denomination[index] ? denomination[index] : 0}`}</li>
                ) : ''
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="App-footer">
        <p>Developed by : Aafaq Ahmad</p>
      </footer>
    </div>
  );
}

export default App;
