import logo from "./logo.svg";
import "./App.css";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("");
  const [topic, setTopic] = useState("");
  const [createDate, setCreatedDate] = useState("");
  const [context, setContext] = useState([]);
  const ENDPOINT =
    "https://us-central1-phonic-jetty-356702.cloudfunctions.net/scrappingURL";

  const handleScrapping = async () => {
    const result = await axios.post(ENDPOINT, { site_url: URL });
    if (result.data.status == "success") {
      setTopic(result.data.title);
      setCreatedDate(result.data.createdDate);
      setContext(result.data.article);
    } else {
      alert("server error");
    }
  };

  return (
    <div className="App">
      <Box m={`50px`}>
        <Box display={`flex`} gap={`20px`}>
          <TextField
            id="url"
            label="URL"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
            variant="outlined"
          />
          <Button variant="outlined" onClick={handleScrapping}>
            Scrapping
          </Button>
        </Box>
        <Box>
          <Box
            display={`flex`}
            justifyContent={`space-between`}
            alignItems={`center`}
          >
            <h1>{topic}</h1>
            <h5>{createDate}</h5>
          </Box>
          <Box textAlign={`left`}>
            {context.map((row) => {
              return <Box mt={`20px`}>{row}</Box>;
            })}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
