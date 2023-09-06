import React, { useEffect, useState } from 'react';
import { getModerator } from '../../api/rest/restController';

export default function ModeratorPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await getModerator();
        setData(response.data.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && <div>{data}</div>} 
      {!data && <div>Loading</div>} 
    </div>
  );
}
