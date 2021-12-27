import { useEffect, useState } from "react";
//Custom hook form json data
const useServiceces = () => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetching api from github page
  useEffect(() => {
    fetch("http://localhost:5000/api/findAllProduct")
      .then((resp) => resp.json())
      .then((data) => {
        setInfo(data);
        setLoading(false);
      });
  }, []);
  return { info, setInfo, loading };
};

export default useServiceces;
