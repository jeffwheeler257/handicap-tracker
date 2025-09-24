export interface EntryFormProps {
  type: string;
  label: string;
  value: string;
};

export function EntryForm({ type, label, value }: EntryFormProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <label htmlFor={type} className="w-40 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        placeholder={`Enter ${label}`}
        value={value}
        className="flex-1 rounded-md border border-gray-400 p-2 w-full sm:w-auto"
      />
    </div>
  );
}