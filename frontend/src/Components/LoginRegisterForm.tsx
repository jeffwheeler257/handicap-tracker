import { type EntryFormProps, EntryForm } from "./EntryForm";

const formFields: EntryFormProps[] = [
  { id: 'username', label: 'Username' },
  { id: 'password', label: 'Password' },
];

export default function LoginRegisterForm() {
  return (
    <form className="flex flex-col gap-4 max-w-xl mx-auto p-4">
      {formFields.map(({ id, label }) => (
        <EntryForm key={id} id={id} label={label} />
      ))}

      <button
        type="submit"
        className="self-center rounded-md bg-slate-900 text-white hover:bg-slate-800 px-4 py-2"
      >
        Login
      </button>
      <button
        type="submit"
        className="self-center rounded-md bg-slate-900 text-white hover:bg-slate-800 px-4 py-2"
      >
        Register
      </button>
    </form>
  );
}