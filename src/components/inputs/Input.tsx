export function Input1({
  type,
  placeHolder,
  required = true,
  label,
  className,
}: {
  type: string;
  placeHolder: string;
  required?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <div className={"relative z-0 group mt-6 " + className}>
      <input
        type={type}
        name={"floating_" + type}
        id={"floating_" + type}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-l-0 border-r-0 border border-black/20 appearance-none dark:text-white dark:border-white/20 focus:border-white focus:outline-none focus:ring-0 peer"
        placeholder={placeHolder}
        required={required}
      />
      <label className="absolute duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 text-gray-400 font-light peer-focus:font-light peer-focus:text-gray-400 peer-placeholder-shown:font-normal peer-placeholder-shown:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">
        {label}
      </label>
    </div>
  );
}

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
