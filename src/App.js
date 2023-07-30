import { useState } from "react";
import axios from "axios";
import ReactJson from 'react-json-view'

function App() {
  const [URL, setURL] = useState("");
  const [src, setSrc] = useState({});

  const ENDPOINT =
    "https://us-central1-phonic-jetty-356702.cloudfunctions.net/scrappingURL";

  const handleScrapping = async () => {
    try {
      const response = await axios.post(ENDPOINT, { site_url: URL });
      setSrc(response.data)
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <div style={{
      padding : '100px'
    }}>
      <div style={{
        paddingBottom: '30px',
        display: 'flex',
        gap: '20px'
      }}>
        <input
          id="url"
          label="URL"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          variant="outlined"
          size={100}
        />
        <button onClick={handleScrapping}>
          Scrapping
        </button>
      </div>
      <div style={{
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '20px'
      }}>
        <ReactJson src={src} />
      </div>
    </div>
  );
}

export default App;
