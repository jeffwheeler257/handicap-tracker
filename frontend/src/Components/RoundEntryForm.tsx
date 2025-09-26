import { useState, type FormEvent } from "react";
import RoundService from "../Services/RoundService";
import { EntryForm, type EntryFormProps } from "./EntryForm";


export default function RoundEntryForm() {
  const [course, setCourse] = useState('');
  const [courseRating, setCourseRating] = useState('');
  const [slopeRating, setSlopeRating] = useState('');
  const [numberOfHoles, setNumberOfHoles] = useState('');
  const [dateString, setDateString] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setCourse('');
    setCourseRating('');
    setSlopeRating('');
    setNumberOfHoles('');
    setDateString('');
    setScore('');
  };

  const RoundInputs: EntryFormProps[] = [
    {label: 'Course', value: course, onChange: e => setCourse(e.target.value)},
    {label: 'Course Rating', value: courseRating, onChange: e => setCourseRating(e.target.value)},
    {label: 'Slope Rating %', value: slopeRating, onChange: e => setSlopeRating(e.target.value)},
    {label: 'Number of Holes', value: numberOfHoles, onChange: e => setNumberOfHoles(e.target.value)},
    {label: 'Date (YYYY-MM-DD)', value: dateString, onChange: e => setDateString(e.target.value)},
    {label: 'Score', value: score, onChange: e => setScore(e.target.value)}
  ]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const parsedNumberOfHoles = parseInt(numberOfHoles);
      if (parsedNumberOfHoles !== 9 && parsedNumberOfHoles !== 18){
        throw new Error('Must enter 9 or 18 holes.')
      }
      const date = new Date(dateString);
      await RoundService.postRound( course, 
                                    parseFloat(courseRating), 
                                    parseFloat(slopeRating) * 113 / 100,
                                    parsedNumberOfHoles,
                                    date,
                                    parseFloat(score));
      alert('Round submitted!');
      resetForm();
    } catch (error) {
      if (error instanceof Error){
        setError(error.message)
      } else {
        setError("Unknown error occurred.")
      }
    }
  }
  
  return (
    <form 
      className="flex flex-col gap-4 max-w-xl mx-auto p-4"
      onSubmit={handleSubmit}
    >
      {RoundInputs.map((input) => (
        <EntryForm
          key={input.label}
          label={input.label}
          value={input.value}
          onChange={input.onChange}
        />
      ))}
      <button
        type="submit"
        className="self-center rounded-md bg-slate-900 text-white hover:bg-slate-800 px-4 py-2"
      >
        Submit
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}