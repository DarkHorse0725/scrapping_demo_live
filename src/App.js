import { useState } from "react"
import axios from "axios"
import ReactJson from "react-json-view"
import "./App.css"
import ReactLoading from 'react-loading'

function App() {
  const [URL, setURL] = useState("")
  const [src, setSrc] = useState({})
  const [loading, setLoading] = useState(false)

  const ENDPOINT = "https://us-central1-phonic-jetty-356702.cloudfunctions.net/scrappingURL"

  const handleScrapping = async () => {
    try {
      setLoading(true)
      const response = await axios.post(ENDPOINT, { site_url: URL })
      setSrc(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="px-[100px] py-[50px]">
      <div className="font-bold text-[45px]
      uppercase
      text-center">News GPT Scrapping Demo</div>
      <div className="py-[30px] flex gap-x-[20px]">
        <input
          id="url"
          label="URL"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          size={70}
          className="border-[1px] border-[black]
          h-[50px] px-[10px]"
        />
        <button onClick={loading ? () => {} : handleScrapping}
        className={`${loading ? 'bg-[gray] cursor-not-allowed' : 'bg-[green]'} px-4
        rounded-[10px] text-white`}>{loading ? "Scapping...." : "Scrapp"}</button>
      </div>
      <div
        className={`border-[1px] border-[black]
        rounded-[5px] p-[20px] overflow-y-auto 
        flex ${loading ? "justify-center" : "justify-start"}`}
      >
        {loading ? <ReactLoading type={'spin'} color={'green'} height={'100px'} width={'100px'} /> : <ReactJson src={src} />}
      </div>
    </div>
  )
}

export default App
