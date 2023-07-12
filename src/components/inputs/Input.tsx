export default function Input({
  type,
  placeHolder,
  required = true,
  label,
  className,
  name,
}: {
  type: string;
  placeHolder: string;
  required?: boolean;
  label: string;
  className?: string;
  name?: string
}) {
  return (
    
    <label className="flex flex-col gap-2 text-sm">
      {label}
      <input
        className="text-base px-4 py-2 block w-full bg-transparent border border-white/10 focus:ring-blue focus:outline-none rounded-md text-white bg-gradient-to-r hover:from-blue/20 hover:to-neon-blue/20 focus:from-blue/60 focus:to-neon-blue/60" 
        placeholder={placeHolder}
        required={required}
        name={name}
      />
    </label>
  );
}
