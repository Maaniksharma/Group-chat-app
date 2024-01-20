const Metric = ({ title, metricText, metricValue, metricValueText }) => (
  <div className=" mt-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="sm:flex sm:items-center px-8 py-2">
      <div className="text-center sm:text-left">
        <h2 className="text-xl leading-6 font-medium text-gray-900">{title}</h2>
        <p className="mt-2 text-lg text-gray-600">{metricText}</p>
        <div className="mt-3 text-xl font-semibold text-gray-700">
          {metricValue}
        </div>
        <p className="text-normal text-gray-500 mb-2">{metricValueText}</p>
      </div>
    </div>
  </div>
);

export default Metric;
