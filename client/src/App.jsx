import React, { useState } from 'react';

const App = () => {
  const [url, setUrl] = useState("");
  const [res, setRes] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  function handleChange(e) {
    setUrl(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const response = await fetch('http://localhost:3000/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (response.ok) {
        const data = await response.json();
        setRes(data.shortId);
        setCopySuccess(""); // Reset copy message on new submit
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(res).then(() => {
      setCopySuccess("Copied to clipboard!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: "linear-gradient(to bottom right, #3b82f6, #6366f1)",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      <h1
        className="text-3xl font-extrabold text-white mb-8"
        style={{ animation: "fadeIn 1s ease-in-out" }}
      >
        Tiny Trail
      </h1>

      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        style={{ animation: "slideUp 0.8s ease-out" }}
      >
        <label className="text-lg font-semibold text-gray-700">Enter URL</label>
        <input
          type="text"
          placeholder="http://www.google.com"
          value={url}
          onChange={handleChange}
          className="p-3 mt-2 border rounded-md w-full focus:ring-2 focus:ring-indigo-400 transition duration-300"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 w-full p-3 rounded-md bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
        >
          Submit
        </button>

        {res && (
          <div
            className="mt-4 p-4 border rounded-md text-center bg-indigo-50"
            style={{ animation: isSubmitted ? "fadeIn 1s ease-in-out" : "none" }}
          >
            <h2 className="font-semibold text-indigo-700">Shortened URL</h2>
            <a
              href={`http://localhost:3000/${res}`} // The URL redirection
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-900 font-mono mt-2 break-words cursor-pointer hover:underline"
              onClick={handleCopy}
              title="Click to visit the URL or copy"
            >
              {res}
            </a>
            {copySuccess && <span className="text-green-600 mt-2 block">{copySuccess}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
