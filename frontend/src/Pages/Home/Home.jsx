import Navbar from "../../Components/Navbar/Navbar";
import ChatInput from "../../Components/ChatInput/ChatInput";
import "./home.css";
import { FaBalanceScale } from "react-icons/fa";

function Home() {
  const handleUserQuery = (query) => {
    console.log("User question:", query);
    // later connect this with your chatbot backend
  };

  return (
    <div className="home-container">

       <Navbar /> {/* 👈 add this here */}
       
      {/* Header */}
      <header className="home-header">
        <h1> <FaBalanceScale/> Legal Assistant AI</h1>
        <p>Sri Lanka Law Guidance</p>
      </header>

      {/* Disclaimer */}
      <section className="disclaimer">
        <p>
          <strong>Legal Disclaimer:</strong> This AI provides general legal
          information only. For specific legal advice, consult a qualified Sri
          Lankan attorney.
        </p>
      </section>

      {/* Chat Section */}
      <section className="chat-section">
        <ChatInput onSend={handleUserQuery} />
      </section>

      {/* Document Generator placeholder (we’ll build next) */}
      <section className="document-generator">
        <h2>📄 Legal Document Generator</h2>
        <p>Coming soon...</p>
      </section>
    </div>
  );
}

export default Home;
