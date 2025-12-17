from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv
from pypdf import PdfReader

import docx
import traceback

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
BACKEND_URL = "http://localhost:4000/api/admin/documents/update-status"

def extract_text_from_pdf(file_path):
    """Extract text from PDF file"""
    try:
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        raise Exception(f"Error reading PDF: {str(e)}")

def extract_text_from_docx(file_path):
    """Extract text from DOCX file"""
    try:
        doc = docx.Document(file_path)
        text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
        return text
    except Exception as e:
        raise Exception(f"Error reading DOCX: {str(e)}")

def extract_text_from_txt(file_path):
    """Extract text from TXT file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
        return text
    except Exception as e:
        raise Exception(f"Error reading TXT: {str(e)}")

def load_document(file_path):
    """Load document based on file type"""
    try:
        if file_path.endswith('.pdf'):
            return extract_text_from_pdf(file_path)
        elif file_path.endswith('.docx'):
            return extract_text_from_docx(file_path)
        elif file_path.endswith('.txt'):
            return extract_text_from_txt(file_path)
        else:
            raise ValueError(f"Unsupported file type: {file_path}")
    except Exception as e:
        raise Exception(f"Error loading document: {str(e)}")

def update_backend_status(document_id, status, vector_id=None, error=None):
    """Update document status in backend"""
    try:
        payload = {
            "documentId": str(document_id),
            "status": status
        }
        
        if vector_id:
            payload["vectorId"] = vector_id
        
        if error:
            payload["error"] = error
        
        response = requests.post(
            BACKEND_URL,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code != 200:
            print(f"Failed to update backend status: {response.text}")
            
    except Exception as e:
        print(f"Error updating backend status: {str(e)}")

def process_document_simple(file_path, title, original_filename, document_id):
    """Simple document processor without Pinecone"""
    try:
        # Update status to processing
        update_backend_status(document_id, "processing")
        
        # Load document text
        text = load_document(file_path)
        
        if not text or len(text.strip()) == 0:
            raise Exception("No content found in document")
        
        # Count words for statistics
        word_count = len(text.split())
        
        # In this simple version, we'll just mark as completed
        # In a full implementation, you would store in Pinecone here
        update_backend_status(document_id, "completed", str(document_id))
        
        print(f"Processed document '{title}': {word_count} words")
        
        return {"success": True, "word_count": word_count}
        
    except Exception as e:
        error_msg = f"Error processing document: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        update_backend_status(document_id, "failed", None, str(e))
        return {"success": False, "error": str(e)}

@app.route('/process-document', methods=['POST'])
def process_document_endpoint():
    """Endpoint to process uploaded documents"""
    try:
        data = request.json
        document_id = data.get('documentId')
        file_path = data.get('filePath')
        title = data.get('title')
        original_filename = data.get('originalFilename')
        
        if not all([document_id, file_path, title]):
            return jsonify({
                "success": False,
                "message": "Missing required fields"
            }), 400
        
        # Check if file exists
        if not os.path.exists(file_path):
            return jsonify({
                "success": False,
                "message": f"File not found: {file_path}"
            }), 404
        
        # Process document asynchronously
        import threading
        thread = threading.Thread(
            target=process_document_simple,
            args=(file_path, title, original_filename, document_id)
        )
        thread.daemon = True
        thread.start()
        
        return jsonify({
            "success": True,
            "message": "Document processing started"
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error: {str(e)}"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "simple_document_processor",
        "version": "1.0"
    })

if __name__ == '__main__':
    print("Starting Simple Document Processor on port 8082")
    app.run(host='0.0.0.0', port=8082, debug=True)