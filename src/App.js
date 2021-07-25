import "./styles.css";
import { useState } from "react";
export default function App() {
  const [visible, setVisible] = useState(false);
  const [billAmount, setBillAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [changeCalculated, setChangeCalculated] = useState(false);
  const [changeGiven, setChangeGiven] = useState({
    2000: 0,
    500: 0,
    100: 0,
    20: 0,
    10: 0,
    5: 0,
    1: 0
  });
  const displayNextInput = (e) => {
    if (billAmount > 0) {
      setVisible(true);
      setError1(false);
    } else {
      setVisible(false);
      setError1("Enter valid bill amount");
    }
  };
  const calculateChange = () => {
    if (paidAmount === 0 || billAmount === 0 || billAmount > paidAmount) {
      setError2("Enter valid bill amount and cash given");
      setChangeCalculated(false);
    } else if (
      paidAmount !== 0 &&
      billAmount !== 0 &&
      paidAmount === billAmount
    ) {
      setError2("No amount should be returned");
      setChangeCalculated(false);
    } else {
      setError2("");
      let change = paidAmount - billAmount;
      const newChangegiven = JSON.parse(JSON.stringify(changeGiven));

      Object.keys(changeGiven)
        .sort((a, b) => b - a)
        .forEach((item) => {
          const numnotes = Math.floor(change / item);
          change = change - numnotes * item;
          newChangegiven[`${item}`] = numnotes;
        });
      setChangeGiven(newChangegiven);
      setChangeCalculated(true);
    }
  };
  return (
    <div className="App">
      <div className="register-container">
        <div className="header">
          <span className="heading">Cash Register</span>
        </div>
        <div className="billinput">
          <label htmlFor="Bill Amount">Bill Amount</label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            min="0"
          />
          {visible ? (
            <>
              <label htmlFor="Paid Amount">Paid Amount</label>
              <input
                type="number"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                min="0"
              />
            </>
          ) : (
            <button onClick={displayNextInput}>Next</button>
          )}
          {error1 ? <span className="error1">{error1}</span> : null}
          {visible ? (
            <button onClick={calculateChange}>Calculate Change</button>
          ) : null}
          {error2 ? <span className="error1">{error2}</span> : null}
        </div>

        <div className="changetable">
          {changeCalculated ? (
            <table>
              <tbody>
                <tr>
                  <th> No. of notes </th>
                  {Object.values(changeGiven).map((item, idx) => (
                    <td key={idx}>{item}</td>
                  ))}
                </tr>
                <tr>
                  <th>Denomination </th>

                  {Object.keys(changeGiven).map((item, idx) => (
                    <td key={idx}> {item}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </div>
  );
}
