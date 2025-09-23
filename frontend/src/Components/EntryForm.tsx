export interface EntryFormProps {
  id: string;
  label: string;
};

export function EntryForm({ id, label }: EntryFormProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <label htmlFor={id} className="w-40 text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        placeholder={`Enter ${label}`}
        className="flex-1 rounded-md border border-gray-400 p-2 w-full sm:w-auto"
      />
    </div>
  );
}