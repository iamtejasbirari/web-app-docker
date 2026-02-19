import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/users");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Data</h1>
      {data.map((user) => (
        <div key={user._id}>
          <h2>{user.name}</h2>
          <h3>{user.email}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
