const NoResults = () => {
  return (
    <div className="px-2 mt-8 text-center font-mono">
      <h2 className="text-xl uppercase font-bold tracking-wider mb-2">
        No Results
      </h2>
      <p className="text-sm">
        <span className="opacity-60">
          To get results, add valid coordinates and date and then press{" "}
        </span>
        <b>Find Images</b>
      </p>
    </div>
  );
};

export default NoResults;
