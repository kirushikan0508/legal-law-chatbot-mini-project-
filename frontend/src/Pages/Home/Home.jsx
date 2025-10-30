import Navbar from "../../Components/Navbar/Navbar";
import "./home.css";
import ChatWindow from "../../Components/Chat/ChatWindow";
import DocumentGenerator from "../../Components/Document Generator/DocumentGenerator";

function Home() {

  
  return (
    <div className="home-container">

       <Navbar /> 

      {/* Disclaimer */}
      <div className="disclaimer-box">
        <section className="disclaimer">
          <p>
            <strong>Legal Disclaimer:</strong> This AI provides general legal
            information only. For specific legal advice, consult a qualified Sri
            Lankan attorney.
          </p>
        </section>
      </div>

      {/* Chat Section */}
      <section className="chat-section">
         <ChatWindow />
      </section>

      {/* Document Generator Section */}
      <section className="document-generator">
          <DocumentGenerator />
      </section>

    </div>
  );
}

export default Home;
