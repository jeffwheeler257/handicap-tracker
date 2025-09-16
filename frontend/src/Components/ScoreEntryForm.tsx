interface FormFieldProps {
  id: string;
  label: string;
}

const formFields: FormFieldProps[] = [
  { id: 'course', label: 'Course' },
  { id: 'course-rating', label: 'Course Rating' },
  { id: 'slope-rating', label: 'Slope Rating' },
];

function FormField({ id, label }: FormFieldProps) {
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

export default function ScoreEntryForm() {
  return (
    <form className="flex flex-col gap-4 max-w-xl mx-auto p-4">
      {formFields.map(({ id, label }) => (
        <FormField key={id} id={id} label={label} />
      ))}

      <button
        type="submit"
        className="self-center rounded-md bg-slate-900 text-white hover:bg-slate-800 px-4 py-2"
      >
        Submit
      </button>
    </form>
  );
}