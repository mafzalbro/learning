const pricingData = [
  {
    label: "presale price",
    value: 0.00485,
    gradient: "orange-gradient",
  },
  {
    label: "launch price",
    value: 0.01,
    gradient: "yellow-gradient",
  },
];

const NigachuPrices = () => {
  return (
    <div className="flex flex-col p-4 pt-0">
      {pricingData.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between ${
            index > 0 ? "mt-2" : ""
          }`}
        >
          <div className="text-left text-white">
            <span
              className={`${item.gradient} text-2xl font-normal font-['Covered By Your Grace']`}
            >
              {item.label}
            </span>
          </div>
          <div className={`${item.gradient} text-right text-white`}>
            <span className="text-right text-[#fff8f8] text-2xl font-normal font-['Covered By Your Grace']">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NigachuPrices;
