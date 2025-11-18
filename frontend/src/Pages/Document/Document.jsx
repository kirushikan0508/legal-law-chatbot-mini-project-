import DocumentGenerator from "../../Components/Document Generator/SelectTemplate/DocumentGenerator";
import Navbar from "../../Components/Navbar/Navbar";
import "./document.css";

function Document(){

    return(
        <div className="document-container">

            <Navbar />
            <DocumentGenerator/>
        </div>
    );
}

export default Document;