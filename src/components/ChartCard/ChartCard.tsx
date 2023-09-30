import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import StyledChartCard from './ChartCard.styled';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartCard = ({ symbol, data, handleRemoveStock }: any) => {
  const [chartData, setChartData] = useState<any>({
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        labels: `${symbol}`,
        data: data[symbol].slice(-5), // Array of numbers representing stock prices
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'aqua',
      },
    ],
  });
  const [initialData, setInitialData] = useState<any>({
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        labels: `${symbol}`,
        data: [], // Array of numbers representing stock prices
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'aqua',
      },
    ],
  });

  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chartData = {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          labels: `${symbol}`,
          data: data[symbol].slice(-5), // Array of numbers representing stock prices
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'aqua',
        },
      ],
    };
    if (chartRef.current) {
      chartRef.current.data = chartData;
      chartRef.current.update();
    }
  }, [data]);

  useEffect(() => {
    setInitialData({
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          labels: `${symbol}`,
          data: data[symbol].slice(-5), // Array of numbers representing stock prices
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'aqua',
        },
      ],
    });
  }, []);

  // useEffect(() => {
  //   setChartData((prevChartData: any) => ({
  //     ...prevChartData,
  //     datasets: [
  //       {
  //         ...prevChartData.datasets[0], // Access the first dataset in the array
  //         data: data[symbol].slice(-5), // Update the data array
  //       },
  //     ],
  //   }));
  // }, [data, symbol]);

  // const dataForGraph = {
  //   labels: ['day1', 'day2', 'day3'],
  //   datasets: [
  //     {
  //       labels: `${symbol}`,
  //       data: data[symbol], // Array of numbers representing stock prices
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       backgroundColor: 'white',
  //     },
  //   ],
  // };

  const options = {
    animation: {
      duration: 0, // Set the animation duration to 0 to disable it
    },
    responsive: false,
    maintainAspectRatio: false,
  };

  const mostCurrentValue = data[symbol][data[symbol].length - 1];
  const previousValue = data[symbol][data[symbol].length - 2];
  const difference = mostCurrentValue - previousValue;
  const positive = difference > 0;
  let stringifiedDifference = '';
  if (mostCurrentValue !== null && previousValue !== null) {
    const difference = mostCurrentValue - previousValue;
    stringifiedDifference = positive ? '+' + difference.toFixed(4).toString() : difference.toFixed(4).toString();
  }

  return (
    <StyledChartCard positive={positive}>
      <div className="chartBackground">
        <div className="closeChartButton" onClick={() => handleRemoveStock(symbol)}>
          X
        </div>
        <div style={{ width: '240px !important', height: '150px !important' }}>
          <Line data={initialData} ref={chartRef} options={options} />
        </div>
        <div className="stockInformationContainer">
          <div className="symbol">{symbol}</div>
          {!!stringifiedDifference && (
            <div className="priceDifference">
              <div className="priceDifferenceChip">
                <div className="priceDifferenceNumber">{stringifiedDifference}</div>
              </div>
            </div>
          )}
          <div className="stockPrice">{mostCurrentValue !== null && mostCurrentValue.toFixed(4)}</div>
        </div>
      </div>
    </StyledChartCard>
  );
};

export default ChartCard;
