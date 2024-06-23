import React, { useState } from "react";
import "./home.css";

function Home() {
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedBack] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!input){
        setError("Please enter a prompt")
        setPrompt('')
        setResult('')
        setFeedBack("")
        return;
    }

    try{
        const response= await fetch("/api/chatgpt",{
            method: "Post",
            headers: {
                "Content-Type": "application/json"
                
            },
            body: JSON.stringify({text: input})
        })

        if(response.ok){
            const data= await response.json();
            console.log(data)
        }else{
            throw new Error("An error occured")
        }

    }catch(e){
        console.log('error')
        setResult("")
        setError("An error occured while submitting the form")
    }
  };

  return (
    <div className="container">
      <div className="floating-form-container">
        <form className="floating-form" onSubmit={handleSubmit}>
          <h2>Enter Your Name</h2>
          <textarea
            placeholder="Enter a prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
      {prompt && <div className="prompt">{prompt}</div>}
      {error && <div className="alert">{error}</div>}
      {result && <div className="result">{result}</div>}
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}

export default Home;
