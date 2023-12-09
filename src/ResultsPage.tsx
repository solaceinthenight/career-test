import React from "react";
import { useLocation } from "react-router-dom";
import descSummary from "./data/descSummary.json";
import Footer from "./Footer";

const ResultsPage: React.FC = () => {
  const RIASCE = [
    "Realistic",
    "Investigative",
    "Artistic",
    "Social",
    "Conventional",
    "Enterprising",
  ];
  const OCCUPATION_WEBSITE = "https://www.onetonline.org/explore/interests/";
  const location = useLocation();
  const state = location.state as {
    selectedCounts: Record<string, number>;
    counts: Record<string, number>;
  };
  console.log(state);

  const calculateResult = () => {
    // Ensure the structure of the `state` matches the expected with a default fallback
    const selectCounts = state?.selectedCounts || {};
    const totalCounts = state?.counts || {};
    console.log("selectCounts");
    console.log(selectCounts);
    console.log("totalCounts");
    console.log(totalCounts);

    const calcs: Record<number, string[]> = {};

    for (const desc of RIASCE) {
      console.log("desc " + desc);
      // Provide default values in case the property doesn't exist
      const selectCount = selectCounts["count" + desc] || 0;
      const totalCount = totalCounts["count" + desc] || 0;
      console.log("selectCount " + selectCount);
      console.log("totalCount " + totalCount);

      // Ensure totalCount is not zero to avoid dividing by zero
      if (totalCount > 0) {
        const calc = selectCount / totalCount;
        if (!(calc in calcs)) {
          calcs[calc] = [];
        }
        calcs[calc].push(desc);
      }
    }
    console.log("calcs");
    for (const v in calcs) {
      console.log(v);
    }
    return findThree(calcs);
  };

  const findThree = (calcs: Record<number, string[]>) => {
    const res: string[] = [];
    let count = 3;

    // Convert object keys to numbers and sort in descending order
    const keys = Object.keys(calcs)
      .map(Number)
      .sort((a, b) => b - a);

    for (const key of keys) {
      const descs = calcs[key];
      for (const desc of descs) {
        if (count === 0) return res;
        count -= 1;
        res.push(desc);
      }
    }
    return res;
  };

  const getAcronym = (descs: Array<string>) => {
    let a: string = "";
    for (const desc of descs) {
      a += desc.charAt(0);
    }
    return a;
  };

  const renderDescriptions = (descs: Array<string>) => {
    const elements = [];
    for (const desc of descs) {
      elements.push(
        <>
          <h3 className="description-name"> {desc} </h3>
          <p className="description-summary"> {descSummary[desc]}</p>
        </>
      );
    }
    return elements;
  };

  const seeOccupations = (descs: Array<string>) => {
    let redirectToWebsite: string = OCCUPATION_WEBSITE;
    for (const desc of descs) {
      redirectToWebsite += desc + "/";
    }
    window.location.href = redirectToWebsite;
  };

  const backToStart = () => {
    window.location.href = "/";
  };

  const descriptions: Array<string> = calculateResult();
  const acronym: string = getAcronym(descriptions);
  console.log(descriptions);
  console.log(acronym);

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
          <h1 className="limit-h1">You</h1>
          <h2 className="result limit-h2">{acronym}</h2>
        </header>
        {renderDescriptions(descriptions)}
        <button
          className="start-button"
          onClick={seeOccupations.bind(null, descriptions)}
        >
          See Occupations
        </button>
        <button className="back-start-button" onClick={backToStart}>
          Back To Start
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ResultsPage;
