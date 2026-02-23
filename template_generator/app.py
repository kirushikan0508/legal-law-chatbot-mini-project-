from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from agreement_templates import get_agreement_template, format_agreement
from document_generator import generate_pdf, generate_docx
from google import genai
import os
from dotenv import load_dotenv
import json
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Gemini AI
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'YOUR_GEMINI_API_KEY_HERE')
if GEMINI_API_KEY != 'YOUR_GEMINI_API_KEY_HERE':
    client = genai.Client(api_key=GEMINI_API_KEY)
else:
    client = None
    print("Warning: No Gemini API key found. Using template-only mode.")

@app.route('/generate', methods=['POST'])
def generate_document():
    try:
        data = request.json
        agreement_type = data.get('agreement_type')
        user_details = data.get('user_details', {})
        user_id = data.get('user_id')
        
        if not agreement_type:
            return jsonify({"error": "Agreement type is required"}), 400
        
        # Get base template
        template = get_agreement_template(agreement_type)
        
        if not template:
            return jsonify({"error": f"Template for {agreement_type} not found"}), 404
        
        # Fill template with user details
        filled_template = format_agreement(template, user_details)
        
        # Enhance with AI if Gemini is available
        if client:
            try:
                prompt = f"""
                You are a legal document expert specializing in Sri Lankan law.
                
                Please enhance and complete this {agreement_type} document with the following details:
                {json.dumps(user_details, indent=2)}
                
                Base template:
                {filled_template}
                
                Requirements for Sri Lankan law:
                1. Make it legally sound according to Sri Lankan legal framework
                2. Add all necessary standard clauses
                3. Ensure all placeholders are properly replaced
                4. Add proper header with date, parties, and addresses
                5. Include appropriate Sri Lankan legal terminology
                6. Add signature blocks for all parties
                7. Include applicable Sri Lankan Act references if needed
                8. Add a proper footer with legal disclaimer
                9. Make it professional and ready for use
                
                Generate the complete, ready-to-use document:
                """
                
                response = client.models.generate_content(
                    model="gemini-1.5-pro",
                    contents=prompt
                )
                
                enhanced_content = response.text
            except Exception as ai_error:
                print(f"AI enhancement failed, using template: {ai_error}")
                enhanced_content = filled_template
        else:
            enhanced_content = filled_template
            print("Using template without AI enhancement (no API key)")
        
        # Generate document title
        parties = ""
        if 'employeeName' in user_details and 'employerName' in user_details:
            parties = f"{user_details.get('employeeName', '')} - {user_details.get('employerName', '')}"
        elif 'sellerName' in user_details and 'buyerName' in user_details:
            parties = f"{user_details.get('sellerName', '')} - {user_details.get('buyerName', '')}"
        elif 'serviceProvider' in user_details and 'client' in user_details:
            parties = f"{user_details.get('serviceProvider', '')} - {user_details.get('client', '')}"
        
        document_title = f"{agreement_type}"
        if parties:
            document_title += f" - {parties}"
        
        return jsonify({
            "success": True,
            "document_content": enhanced_content,
            "document_title": document_title,
            "agreement_type": agreement_type,
            "generated_at": datetime.now().isoformat()
        })
        
    except Exception as e:
        print(f"Error in generate_document: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/convert-pdf', methods=['POST'])
def convert_to_pdf():
    try:
        data = request.json
        content = data.get('content')
        agreement_type = data.get('agreement_type', 'Document')
        metadata = data.get('metadata', {})
        
        if not content:
            return jsonify({"error": "Content is required"}), 400
        
        # Generate PDF
        pdf_bytes = generate_pdf(content, agreement_type, metadata)
        
        # Return as file
        return send_file(
            pdf_bytes,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f"{agreement_type.replace(' ', '_')}_{datetime.now().strftime('%Y%m%d')}.pdf"
        )
        
    except Exception as e:
        print(f"Error in convert_to_pdf: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/convert-docx', methods=['POST'])
def convert_to_docx():
    try:
        data = request.json
        content = data.get('content')
        agreement_type = data.get('agreement_type', 'Document')
        
        if not content:
            return jsonify({"error": "Content is required"}), 400
        
        # Generate DOCX
        docx_bytes = generate_docx(content, agreement_type)
        
        # Return as file
        return send_file(
            docx_bytes,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            as_attachment=True,
            download_name=f"{agreement_type.replace(' ', '_')}_{datetime.now().strftime('%Y%m%d')}.docx"
        )
        
    except Exception as e:
        print(f"Error in convert_to_docx: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "template_generator",
        "timestamp": datetime.now().isoformat(),
        "ai_available": GEMINI_API_KEY != 'YOUR_GEMINI_API_KEY_HERE'
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8081))
    app.run(host='0.0.0.0', port=port, debug=True)