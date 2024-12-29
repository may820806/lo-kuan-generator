import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { titles, months, ups, downs, xun1, xun2, xun3 } from "./data";

import { Lunar } from "lunar-typescript";

function App() {
  const [date, setDate] = useState<string>();
  const [lunalDateData, setLunalDateData] = useState<{
    lunalDate: Lunar | null;
    year: string;
    month: string;
    day: string;
  }>({
    lunalDate: null,
    year: "",
    month: "",
    day: "",
  });

  const [result, setResult] = useState<{
    title: string;
    ganZhi: string; // 干支
    month: string;
    xun: string; // 旬
    name: string;
    kuan: string;
  }>({
    title: "",
    ganZhi: "",
    month: "",
    xun: "",
    name: "",
    kuan: "",
  });

  const getLunalDate = (newDate: string) => {
    const dateToday = new Date(newDate);
    setDate(date);

    const lunalDate = Lunar.fromDate(dateToday);

    const lunalYear = lunalDate.getYear().toString();
    const lunalMonth = lunalDate.getMonth().toString();
    const lunalDay = lunalDate.getDay().toString();

    setLunalDateData({
      lunalDate,
      year: lunalYear,
      month: lunalMonth,
      day: lunalDay,
    });
  };

  const getRandomIndex = (arr: string[]) => {
    return Math.floor(Math.random() * arr.length);
  };

  const generate = () => {
    const title = titles[getRandomIndex(titles)];

    const ganZhi = lunalDateData.lunalDate?.getYearInGanZhi() || "";

    const monthIndex = Number(lunalDateData.month) - 1;
    const monthLength = months[monthIndex].length;

    const month =
      months[Number(lunalDateData.month) - 1][
        Math.floor(Math.random() * monthLength)
      ];

    let xun;
    if (Number(lunalDateData.day) <= 10) {
      xun = xun1[getRandomIndex(xun1)];
    } else if (Number(lunalDateData.day) <= 20) {
      xun = xun2[getRandomIndex(xun2)];
    } else {
      xun = xun3[getRandomIndex(xun3)];
    }

    const upsDowns = [...ups, ...downs];
    const kuan = upsDowns[getRandomIndex(upsDowns)];

    setResult({
      ...result,
      title,
      ganZhi,
      month,
      xun,
      kuan,
    });
  };

  return (
    <>
      <h2>選擇國曆日期</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => getLunalDate(e.target.value)}
      />
      {lunalDateData.year && (
        <>
          <h2>農曆日期為</h2>
          <h3>{`${lunalDateData.year}年${lunalDateData.month}月${lunalDateData.day}日`}</h3>
        </>
      )}
      {lunalDateData.year && (
        <>
          <h2>你的名字</h2>
          <input
            type="text"
            placeholder="例: 翁韻婷"
            value={result.name}
            onChange={(e) => setResult({ ...result, name: e.target.value })}
          />
          <div>
            <button onClick={generate}>產生</button>
          </div>
        </>
      )}
      {result?.title && (
        <>
          <h1 className="result">{`${result.title}${result.ganZhi} ${
            result.month
          } ${result.xun} ${result.name || "某某某"} \n ${result.kuan}`}</h1>
        </>
      )}
      <footer>© 2024 by may.w.</footer>
    </>
  );
}

export default App;
