// import "./chat.css";
import "./AiDoc.css";
import Navbar from "../Navbar/NavBar";
import { useState } from "react";
import axios from "axios";
import { marked } from "marked";
const waitingMessages = [
  "Hang tight! I'm fetching the perfect response for you.",
  "Just a moment while I gather some insights for you.",
  "Sit tight! I'm working on finding the best answer for you.",
  "Thanks for your patience! I'm on it.",
  "I'm here, just processing your request. Won't be long!",
  "Getting your answer ready. Thanks for waiting!",
  "Almost there! I appreciate your patience.",
  "Just a moment while I consult my virtual brain.",
  "Hold on tight! I'm diving into the data for you.",
  "I'm on the case! Thanks for giving me a moment.",
];

const AiDoc = () => {
  let [value, setValue] = useState("");
  let [data, setData] = useState({});
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let [customValue, setCustomValue] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [formattedResponse, setFormattedResponse] = useState("");
  let handlePrompt = async () => {
    try {
      let promptValue =
        "I have these symptoms: " +
        selectedSymptoms.join(", ") + customValue +
        ". Give me a possible Diagnosis and Treatment Plan";
      setValue(promptValue);
      console.log(promptValue);
      setCount((p) => p + 1);
      setLoading((p) => !p);
      setData({ user: promptValue, response: "..." });
      const response = await axios.post(
        "https://alpine-backend-hackiniiitp.vercel.app/api/chat/bot1",
        {
          prompt: promptValue,
        }
      );
      setValue("");
      setData(response.data);
      const htmlResponse = marked(response.data.response);
      setFormattedResponse(htmlResponse);
      setLoading((p) => !p);
    } catch (err) {
      console.log(err);
      let newObj = {
        user: value,
        response: "Network Error 😢",
      };
      setData({ ...newObj });
      setLoading((p) => !p);
    }
  };
  const handleClick = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  return (
    <>
    <Navbar/>
    <div className="Complete">
      <h1>Enter Symptoms</h1>
      <button
          className={selectedSymptoms.includes("Sore Throat") ? "btn_selected" : "btn"}
          onClick={() => handleClick("Sore Throat")}
        >
          Sore Throat
      </button>
      <button
          className={selectedSymptoms.includes("Fever") ? "btn_selected" : "btn"}
          onClick={() => handleClick("Fever")}
        >
          Fever
        </button>
        <button
          className={selectedSymptoms.includes("Fatigue") ? "btn_selected" : "btn"}
          onClick={() => handleClick("Fatigue")}
        >
          Fatigue
        </button>
        <button
          className={selectedSymptoms.includes("Cough") ? "btn_selected" : "btn"}
          onClick={() => handleClick("Cough")}
        >
          Cough
        </button>
        <br />
        <button
          className={selectedSymptoms.includes("HeadAche") ? "btn_selected" : "btn"}
          onClick={() => handleClick("HeadAche")}
        >
          HeadAche
        </button>
        <button
          className={selectedSymptoms.includes("BodyAches") ? "btn_selected" : "btn"}
          onClick={() => handleClick("BodyAches")}
        >
          BodyAches
        </button>
        <button
          className={selectedSymptoms.includes("Shortness of Breath") ? "btn_selected" : "btn"}
          onClick={() => handleClick("Shortness of Breath")}
        >
          Shortness of Breath
        </button>
      
      <br />
      <input className="TxT"
        type="text"
        onChange={(e) => setCustomValue(e.target.value)}
        value={customValue}
        placeholder="Add Symptom"
      />
      <button className='SubmitBtn' onClick={handlePrompt}>Submit</button>
      <br />
      <br />
      <p
       className="Answer"
        style={{
          color: "#0c0c0c",
          margin: 0,
          fontWeight: "bold",
          paddingLeft: "20px",
        }}
        dangerouslySetInnerHTML={{ __html: formattedResponse }}
      />
    </div>
    </>
  );
};

export default AiDoc;
