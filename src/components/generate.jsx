import React, { useEffect, useState } from 'react';
import '../styles/generate.css'; // Import your CSS file

function BarGraph({ data }) {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const mockApiResponse = [
      { score: 'Readability', percentage: data.readability_score },
      { score: 'Gender-Neutrality', percentage: data.bias_score },
      { score: 'Word-Structure', percentage: data.formation_score },
    ];

    setBarData(mockApiResponse);
  }, []);

  return (
    <section className="bar-graph bar-graph-horizontal bar-graph-one">
      {barData.map((data, index) => (
        <div key={index} className={`bar-${index + 1}`}>
          <span className="score">{data.score}</span>
          <div
            className="bar"
            style={{ width: `${data.percentage}%` }}
            data-percentage={`${data.percentage}%`}
          ></div>
        </div>
      ))}
    </section>
  );
}

export default BarGraph;
