const History = ({ history }) => {
  return (
    <div className="section">
      <p className="title">History</p>

      <div className="history-box">
        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          history.map((h, i) => (
            <p key={i}>
              {h.operation}:
              {h.fromValue} {h.fromUnit} , {h.toValue} {h.toUnit}
              {h.isError
                ? ` | Error: ${h.errorMessage}`
                : ` | Result: ${h.resultValue} ${h.resultUnit || ""}`
              }
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
