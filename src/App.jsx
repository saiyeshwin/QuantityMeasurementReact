import { useState, useEffect } from "react";
import Type from "./components/Type";
import Action from "./components/Action";
import History from "./components/History";
import "./style.scss";

function App() {
  const [type, setType] = useState("LENGTH");
  const [action, setAction] = useState("Conversion");
  const [operator, setOperator] = useState("+");

  const [fromVal, setFromVal] = useState(1);
  const [toVal, setToVal] = useState("");

  const [fromUnit, setFromUnit] = useState("METER");
  const [toUnit, setToUnit] = useState("METER");

  const [result, setResult] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const BASE = "http://localhost:8081/api";

  const UNITS = {
    LENGTH: ["METER", "KILOMETER", "CENTIMETER"],
    WEIGHT: ["GRAM", "KILOGRAM"],
    TEMPERATURE: ["CELSIUS", "FAHRENHEIT"],
    VOLUME: ["LITER", "MILLILITER"],
  };

  const units = UNITS[type];

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    setFromUnit(units[0]);
    setToUnit(units[0]);
  }, [type]);

  async function loadHistory() {
    try {
      const res = await fetch(BASE + "/history");
      const data = await res.json();
      setHistory(data.reverse());
    } catch (e) {
      console.log(e);
    }
  }

  function buildBody(fv, fu, tv, tu, target) {
    return {
      thisQuantityDTO: { value: Number(fv) || 0, unit: fu },
      thatQuantityDTO: { value: Number(tv) || 0, unit: tu },
      targetUnit: target || null,
    };
  }

  async function calculate() {
    setLoading(true);

    try {
      let res, data;

      if (action === "Conversion") {
        res = await fetch(BASE + "/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            buildBody(fromVal, fromUnit, 0, toUnit, toUnit)
          ),
        });

        data = await res.json();
        setResult(data.resultValue);
        setComparison(null);
      }

      else if (action === "Comparison") {
        res = await fetch(BASE + "/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            buildBody(fromVal, fromUnit, toVal, toUnit)
          ),
        });

        data = await res.json();
        setComparison(data.comparisonResult);
        setResult(null);
      }

      else {
        const map = {
          "+": "/add",
          "-": "/subtract",
          "*": "/multiply",
          "/": "/divide",
        };

        res = await fetch(BASE + map[operator], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            buildBody(fromVal, fromUnit, toVal, toUnit)
          ),
        });

        data = await res.json();
        setResult(data.resultValue);
        setComparison(null);
      }

      loadHistory();

    } catch (e) {
      console.log("API ERROR:", e);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="header">
        Welcome To Quantity Measurement
      </div>

      <div className="container">

        <Type type={type} setType={setType} />

        <Action
          action={action}
          setAction={setAction}
          operator={operator}
          setOperator={setOperator}
          fromVal={fromVal}
          setFromVal={setFromVal}
          toVal={toVal}
          setToVal={setToVal}
          fromUnit={fromUnit}
          setFromUnit={setFromUnit}
          toUnit={toUnit}
          setToUnit={setToUnit}
          units={units}
          calculate={calculate}
          result={result}
          comparison={comparison}
          loading={loading}
        />

        <History history={history} />

      </div>
    </>
  );
}

export default App;