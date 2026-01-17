const ForecastList = ({ forecast }) => {
 if (!forecast.length) {
  return <p className="text-gray-600 mt-6">No forecast available</p>;
}


  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
      {forecast.map((day, index) => (
        <div key={index} className="bg-[#f5f5f5] shadow-sm py-4 px-5 rounded-lg text-center text-black">
          <p className="font-semibold">{day.date}</p>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt="icon"
            className="mx-auto"
          />
          <p>{day.temp}°C</p>
          <p className="capitalize">{day.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;