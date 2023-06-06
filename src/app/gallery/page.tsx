import Filter from "./Filter";
import Grid from "./Grid";

export default function Gallery() {
  return (
    <div className="w-full min-h-screen p-24 px-48">
      <Filter />
      <Grid />
    </div>
  );
}
