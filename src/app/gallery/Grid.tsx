import Element from "./Element";

export default function Grid() {
  const data = new Array(30).fill("a");
  return (
    <div className="mt-4 gap-4 columns-xs w-full">
      {data.map((e, i) => (
        <div className="flex flex-col mb-4 gap-2">
          <Element />
        </div>
      ))}
    </div>
  );
}
