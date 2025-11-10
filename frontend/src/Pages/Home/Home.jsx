import Navbar from "../../Components/Navbar/Navbar";
import "./home.css";
import DocumentGenerator from "../../Components/Document Generator/DocumentGenerator";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home() {
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please log in first!");
      navigate("/");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  // ✅ Compute name only after user is loaded
  const name = user ? user.email.split("@")[0] : "";
 
  if (!user) return <div className="loading">Loading...</div>;

  const handleClick = () => {
    navigate("/chatting");
  };

  

return (
    <div className="home-container">

       <Navbar /> 

       <header>
          {user && (
            <p className="welcome-text">
              Welcome, <strong>{name}</strong> 
            </p>
          )}
       </header>

      {/* Chat section */}
        <section className="chatting-section">
              <button onClick={handleClick} >Start Chat here</button>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis alias ea ex inventore deleniti consectetur dolorum velit. Iusto quae, inventore non quam suscipit voluptatum sunt. Sed vel fugiat perferendis, eos velit delectus expedita obcaecati, voluptatum placeat similique temporibus iure vero enim voluptate recusandae. Eum quaerat vitae voluptatum! Dolorum, eaque mollitia!</p>
        </section>

      {/* Document Generator Section */}
      <section className="document-generator">
          <DocumentGenerator />
      </section>


    </div>
  );
}

export default Home;
