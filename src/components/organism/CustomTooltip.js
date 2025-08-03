"use client"
import React from 'react'

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 rounded-md border border-gray-700 shadow-lg">
        <p className="text-gray-300 text-sm mb-1">{label}</p>
        <p className="text-white font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
            minimumFractionDigits: payload[0].value < 1 ? 6 : 2,
          }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};
export default CustomTooltip