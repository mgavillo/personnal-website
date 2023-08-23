export default function SectionTitle({ text }: { text: string }) {
  return (
    <div className="relative">
      <h2 className="absolute -top-4 left-4 w-full font-outline text-transparent opacity-70 -z-10">{text}</h2>
      <h2>{text}</h2>
    </div>
  );
}
