import  { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { useAuth } from "../AuthContext";


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await AuthService.login(username, password);
      login();
      navigate('/home');
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
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <label className="w-40 text-sm font-medium">
            Username
          </label>
          <input className="flex-1 rounded-md border border-gray-400 p-2 w-full sm:w-auto"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <label className="w-40 text-sm font-medium">
            Password
          </label>
          <input className="flex-1 rounded-md border border-gray-400 p-2 w-full sm:w-auto"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="self-center rounded-md bg-slate-900 text-white hover:bg-slate-800 px-4 py-2"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <p>New users can register <Link className="font-medium underline" to='/register'>here</Link>!</p>
    </form>
  );
}