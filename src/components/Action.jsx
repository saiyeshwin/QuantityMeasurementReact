const Action = ({
    action,
    setAction,
    operator,
    setOperator,
    fromVal,
    setFromVal,
    toVal,
    setToVal,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    units,
    calculate,
    result,
    comparison,
    loading,
}) => {
    const actions = ["Conversion", "Comparison", "Arithmetic"];
    const operators = ["+", "-", "*", "/"];

    return (
        <div className="section">

            <p className="title">CHOOSE ACTION</p>

            <div className="action-row">
                {actions.map((a) => (
                    <button
                        key={a}
                        className={`action-btn ${action === a ? "active" : ""}`}
                        onClick={() => setAction(a)}
                    >
                        {a}
                    </button>
                ))}
            </div>

            {action === "Arithmetic" && (
                <div className="operator-row">
                    {operators.map((op) => (
                        <button
                            key={op}
                            className={`op-btn ${operator === op ? "active" : ""}`}
                            onClick={() => setOperator(op)}
                        >
                            {op}
                        </button>
                    ))}
                </div>
            )}

            <div className="input-grid">

                <div className="input-box">
                    <p>FROM</p>

                    <input
                        type="number"
                        value={fromVal}
                        onChange={(e) => setFromVal(e.target.value)}
                    />

                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                    >
                        {units.map((u) => (
                            <option key={u}>{u}</option>
                        ))}
                    </select>
                </div>

                <div className="input-box">
                    <p>TO</p>

                    {action === "Conversion" ? (
                        // Show result directly in the input box (read-only)
                        <input
                            type="text"
                            value={result !== null ? result : ""}
                            readOnly
                            placeholder="Result"
                        />
                    ) : (
                        // Comparison & Arithmetic: user types the second value
                        <input
                            type="number"
                            value={toVal}
                            onChange={(e) => setToVal(e.target.value)}
                        />
                    )}

                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                    >
                        {units.map((u) => (
                            <option key={u}>{u}</option>
                        ))}
                    </select>
                </div>

            </div>

            <button className="calculate-btn" onClick={calculate}>
                {loading ? "Calculating..." : "Calculate"}
            </button>

            <div className="result-box">
                <p>Result</p>
                <h3>{result || comparison || "--"}</h3>
            </div>
        </div>
    );
};

export default Action;