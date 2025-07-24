import { useEffect, useState } from "react"
import axios from "axios"


const History: React.FC = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<string>('http://localhost:4000/health');
                setData(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)){
                    setError(err.message);
                } else {
                    setError('Unexpected error')
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return null;
    
    return (
        <>
            <h1>Round History</h1>
            <p>Health check result: {data}</p>
        </>
    )
};

export default History;