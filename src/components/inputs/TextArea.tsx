export default function TextArea({
  name,
  label,
  required = true,
  placeHolder,
}: {
  name?: string;
  label: string;
  required?: boolean;
  placeHolder: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      {label}
      <textarea
        rows={6}
        className=" mt-1 text-base px-4 py-2 block w-full bg-transparent border border-white/10 focus:ring-blue focus:outline-none rounded-md text-white bg-gradient-to-r hover:from-blue/20 hover:to-neon-blue/20 focus:from-blue/60 focus:to-neon-blue/60  resize-none"
        placeholder={placeHolder}
        required={required}
        name={name}
      />
    </label>
  );
}
