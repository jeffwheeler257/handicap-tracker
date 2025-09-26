export interface EntryFormProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function EntryForm({ label, value, onChange }: EntryFormProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <label className="w-40 text-sm font-medium">{label}</label>
      <input className="flex-1 rounded-md border border-gray-400 p-2 w-full sm:w-auto"
        type="text"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}