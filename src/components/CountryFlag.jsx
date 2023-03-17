import React from "react";

export default function CountryFlag({ countryCode, className }) {
  return (
    <img
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode.toUpperCase()}.svg`}
      className={className ? className : ""}
      alt={countryCode ? countryCode : ""}
    />
  );
}
