import React from "react";
import numeral from "numeral";

const NumberFormatter = ({ number }) => {
  return <div>{numeral(number).format("0.[0]a").toUpperCase()}</div>;
};

export default NumberFormatter;
