# Complete templates for all 13 agreement types - PARAGRAPH FORMAT

AGREEMENT_TEMPLATES = {
    # 1. EMPLOYMENT CONTRACT - Paragraph format
    "Employment Contract": """
EMPLOYMENT CONTRACT

This Employment Contract ("Contract") is made and entered into this {date} day of {month}, {year}, by and between:

{employerName}, with registered address at {employerAddress}, hereinafter referred to as the "Employer";

AND

{employeeName}, residing at {employeeAddress}, hereinafter referred to as the "Employee";

Collectively referred to as the "Parties".

1. APPOINTMENT AND POSITION
The Employer hereby employs the Employee as a {jobTitle}, and the Employee accepts such employment. The Employee shall perform all duties and responsibilities associated with this position as described in the attached Job Description and as reasonably assigned by the Employer from time to time.

2. TERM OF EMPLOYMENT
This Contract shall commence on {startDate} and shall continue until terminated by either party in accordance with the terms herein. During the initial {probationPeriod} months, the Employee shall serve a probationary period.

3. COMPENSATION AND BENEFITS
The Employee shall receive a monthly salary of Sri Lankan Rupees {salary} (LKR {salary_words}), payable on the {paymentDate} of each month. The salary shall be subject to statutory deductions including Employees' Provident Fund, Employees' Trust Fund, and income tax as required by Sri Lankan law.

The Employee shall be entitled to {annualLeave} days of annual leave and {sickLeave} days of sick leave per calendar year, accrued monthly in accordance with company policy and Sri Lankan labor laws.

4. WORKING HOURS
The normal working hours shall be {workHours} hours per week, typically from Monday to Friday, 9:00 AM to 5:00 PM, with appropriate breaks. The Employee may be required to work reasonable overtime as necessary for business operations.

5. CONFIDENTIALITY
The Employee agrees to maintain strict confidentiality regarding all proprietary information, trade secrets, business plans, customer lists, financial information, and any other confidential information belonging to the Employer, both during and after employment.

6. TERMINATION
Either party may terminate this Contract by giving {noticePeriod} days written notice. The Employer reserves the right to terminate immediately for cause, including but not limited to misconduct, negligence, breach of confidentiality, or violation of company policies.

7. GOVERNING LAW
This Contract shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising from this Contract shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.

IN WITNESS WHEREOF, the Parties have executed this Contract on the date first above written.

___________________________
{employerName}
For and on behalf of the Employer

___________________________
{employeeName}
Employee

WITNESSES:

1. ___________________________
   Name: 
   Address: 

2. ___________________________
   Name: 
   Address: 

Date: {date}
""",

    # 2. TERMINATION LETTER - Paragraph format
    "Termination Letter": """
TERMINATION OF EMPLOYMENT

{companyName}
{companyAddress}
{date}

{employeeName}
{employeeAddress}

Dear {employeeName},

SUBJECT: NOTICE OF TERMINATION OF EMPLOYMENT

This letter serves as formal notice of the termination of your employment with {companyName}, effective {terminationDate}.

After careful consideration, we regret to inform you that your employment will be terminated due to {reason}. Your last working day will be {lastWorkingDay}.

You are required to complete the following before your departure:
1. Return all company property including identification card, laptop, keys, and any other equipment
2. Complete the handover of all pending work to {handoverPerson}
3. Attend an exit interview with the Human Resources Department
4. Submit the company property clearance form

Your final settlement, including salary for days worked, accrued annual leave, and any other statutory payments, will be processed and paid to you on or before {settlementDate}. The total amount due will be LKR {finalSettlement}.

We remind you of your continuing obligations regarding confidentiality of company information as per your employment contract and the Non-Disclosure Agreement you signed.

We appreciate your contributions during your tenure with {companyName} and wish you success in your future endeavors.

Should you have any questions regarding this termination or your final settlement, please contact the Human Resources Department.

Yours sincerely,

___________________________
{authorizedSignatory}
{designation}
{companyName}
""",

    # 3. NON-DISCLOSURE AGREEMENT - Paragraph format
    "Non-Disclosure Agreement": """
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on {date} between:

{disclosingParty}, with principal place of business at {disclosingAddress} ("Discloser");

AND

{receivingParty}, with principal place of business at {receivingAddress} ("Recipient");

WHEREAS, the Discloser possesses certain confidential information relating to {purpose}; and
WHEREAS, the Recipient desires to receive such confidential information for evaluation purposes;

NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein, the parties agree as follows:

1. CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information, technical data, or know-how disclosed by the Discloser to the Recipient, including but not limited to business plans, financial information, customer lists, technical specifications, software, marketing plans, and any information marked "Confidential."

2. OBLIGATIONS
The Recipient agrees to hold all Confidential Information in strict confidence and not to disclose it to any third party without prior written consent from the Discloser. The Recipient shall use the Confidential Information solely for the Purpose and shall implement reasonable security measures to protect it.

3. EXCEPTIONS
The obligations of confidentiality shall not apply to information that: (a) was already known to the Recipient; (b) becomes publicly available through no fault of the Recipient; (c) is rightfully received from a third party without obligation of confidentiality; or (d) is independently developed by the Recipient.

4. TERM
This Agreement shall remain in effect for {duration} years from the effective date. Upon termination or upon request, the Recipient shall return or destroy all Confidential Information.

5. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of Sri Lanka.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

___________________________
{disclosingParty}
Discloser

___________________________
{receivingParty}
Recipient

WITNESSES:

1. ___________________________
2. ___________________________

Date: {date}
""",

    # 4. BILL OF SALE - Paragraph format
    "Bill Of Sale": """
BILL OF SALE

KNOW ALL MEN BY THESE PRESENTS:

That I, {sellerName} of {sellerAddress}, holder of National Identity Card No. {sellerID} (hereinafter called the "Seller"),

for and in consideration of the sum of Sri Lankan Rupees {purchasePrice} (LKR {purchasePrice_words}) to me in hand paid by {buyerName} of {buyerAddress}, holder of National Identity Card No. {buyerID} (hereinafter called the "Buyer"),

the receipt whereof is hereby acknowledged, have bargained, sold, transferred, and delivered, and by these presents do bargain, sell, transfer, and deliver unto the said Buyer,

the following described property: {itemDescription}

together with all accessories and appurtenances thereunto belonging.

TO HAVE AND TO HOLD the said property unto the Buyer, his heirs, executors, administrators, and assigns forever.

And I, the Seller, do hereby covenant with the Buyer that I am the lawful owner of said property; that it is free from all encumbrances; that I have good right to sell the same; and that I will warrant and defend the same against the lawful claims and demands of all persons.

IN WITNESS WHEREOF, I have hereunto set my hand and seal this {dateOfSale}.

___________________________
{sellerName}
Seller

___________________________
{buyerName}
Buyer

WITNESSES:

1. ___________________________
2. ___________________________

Date: {dateOfSale}
""",

    # 5. SERVICE AGREEMENT - Paragraph format
    "Service Agreement": """
SERVICE AGREEMENT

This Service Agreement ("Agreement") is made and entered into as of {startDate} by and between:

{serviceProvider}, a service provider with registered address at {providerAddress} and Business Registration Number {providerRegNumber} ("Service Provider");

AND

{client}, with registered address at {clientAddress} and Business Registration Number {clientRegNumber} ("Client");

WHEREAS, the Service Provider has the expertise and capability to provide {serviceDescription}; and
WHEREAS, the Client desires to engage the Service Provider to provide such services;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. SERVICES
The Service Provider shall provide the services described above in a professional and workmanlike manner, in accordance with industry standards and all applicable Sri Lankan laws and regulations.

2. TERM
This Agreement shall commence on {startDate} and continue until {endDate}, unless terminated earlier in accordance with this Agreement.

3. COMPENSATION
In consideration for the services rendered, the Client shall pay the Service Provider a fee of Sri Lankan Rupees {serviceFee} (LKR {serviceFee_words}), payable as follows: {paymentTerms}. Payment shall be made within {paymentDays} days of receipt of invoice.

4. CONFIDENTIALITY
Both parties agree to maintain the confidentiality of any proprietary information shared during the term of this Agreement and for {confidentialityPeriod} years thereafter.

5. TERMINATION
Either party may terminate this Agreement with {noticePeriod} days written notice. In the event of termination, the Service Provider shall be compensated for all services rendered up to the date of termination.

6. GOVERNING LAW
This Agreement shall be governed by the laws of Sri Lanka.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

___________________________
{serviceProvider}
Service Provider

___________________________
{client}
Client

Date: {startDate}
""",

    # 6. ASSET PURCHASE AGREEMENT - Paragraph format
    "Asset Purchase Agreement": """
ASSET PURCHASE AGREEMENT

THIS ASSET PURCHASE AGREEMENT ("Agreement") is made as of {date} by and between:

{sellerCompany}, a company incorporated in Sri Lanka with registration number {sellerRegNumber} and registered office at {sellerAddress} ("Seller");

AND

{buyerCompany}, a company incorporated in Sri Lanka with registration number {buyerRegNumber} and registered office at {buyerAddress} ("Buyer");

RECITALS:
A. Seller owns certain assets used in its business as described in Schedule A attached hereto.
B. Buyer desires to purchase, and Seller desires to sell, such assets on the terms and conditions set forth herein.

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. PURCHASE AND SALE
Subject to the terms and conditions of this Agreement, Seller agrees to sell, transfer, and deliver to Buyer, and Buyer agrees to purchase from Seller, all of the assets listed in Schedule A.

2. PURCHASE PRICE
The total purchase price for the Assets shall be Sri Lankan Rupees {purchasePrice} (LKR {purchasePrice_words}), payable as follows:
- Deposit of LKR {depositAmount} upon signing this Agreement
- Balance of LKR {balanceAmount} on the closing date

3. CLOSING
The closing of the purchase and sale shall take place on {closingDate} at {closingLocation}. At closing, Seller shall deliver bills of sale and other transfer documents necessary to transfer title to the Assets to Buyer.

4. REPRESENTATIONS AND WARRANTIES
Seller represents and warrants that it has good and marketable title to the Assets, free and clear of all liens, encumbrances, and security interests. Buyer represents that it has the financial capacity to complete the purchase.

5. EMPLOYEES
Buyer {employeeOffer} offer employment to Seller's employees currently engaged in the business relating to the Assets.

6. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of Sri Lanka.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

___________________________
{sellerCompany}
Seller

By: ___________________________
Title: Director

___________________________
{buyerCompany}
Buyer

By: ___________________________
Title: Director

Date: {date}
""",

    # 7. BUSINESS CONTRACT - Paragraph format
    "Business Contract": """
BUSINESS CONTRACT

This Business Contract ("Contract") is entered into as of {startDate} by and between:

{partyAName}, with registered address at {partyAAddress} and Business Registration Number {partyARegNumber} ("Party A");

AND

{partyBName}, with registered address at {partyBAddress} and Business Registration Number {partyBRegNumber} ("Party B");

BACKGROUND:
{contractBackground}

NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein, the parties agree as follows:

1. PURPOSE
The purpose of this Contract is to establish the terms and conditions under which {contractPurpose}.

2. TERM
This Contract shall commence on {startDate} and continue for a period of {contractTerm} months, unless terminated earlier in accordance with its terms.

3. OBLIGATIONS
Party A shall: {partyAObligations}

Party B shall: {partyBObligations}

4. COMPENSATION
Party B shall pay Party A the sum of Sri Lankan Rupees {contractValue} (LKR {contractValue_words}) as consideration for the services/goods provided. Payment shall be made according to the following schedule: {paymentSchedule}

5. CONFIDENTIALITY
Both parties agree to keep confidential all information exchanged under this Contract and not to disclose it to any third party without prior written consent.

6. TERMINATION
Either party may terminate this Contract with {terminationNotice} days written notice. Either party may terminate immediately for material breach by the other party.

7. GOVERNING LAW
This Contract shall be governed by the laws of Sri Lanka.

IN WITNESS WHEREOF, the parties have executed this Contract as of the date first above written.

___________________________
{partyAName}
Party A

___________________________
{partyBName}
Party B

Date: {startDate}
""",

    # 8. CAR RENTAL AGREEMENT - Paragraph format
    "Car Rental Agreement": """
CAR RENTAL AGREEMENT

This Car Rental Agreement ("Agreement") is made on {startDate} between:

{ownerName}, residing at {ownerAddress}, contact number {ownerPhone} ("Owner");

AND

{renterName}, residing at {renterAddress}, contact number {renterPhone}, holder of Driving License No. {licenseNumber} ("Renter");

VEHICLE DETAILS:
- Make: {vehicleMake}
- Model: {vehicleModel}
- Year: {vehicleYear}
- Registration No: {regNumber}
- Color: {vehicleColor}
- Odometer at commencement: {odometerStart} km

TERMS AND CONDITIONS:

1. RENTAL PERIOD
The vehicle is rented for the period commencing {startDate} at {startTime} and ending {endDate} at {endTime}.

2. RENTAL CHARGES
The rental rate is LKR {dailyRate} per day. A security deposit of LKR {securityDeposit} is required, which will be refunded within {refundDays} days after return of the vehicle in satisfactory condition, minus any deductions for damage, traffic violations, or additional charges.

3. RENTER'S OBLIGATIONS
The Renter agrees to:
   a) Use the vehicle only in Sri Lanka
   b) Not sub-rent or allow any other person to drive the vehicle
   c) Not use the vehicle for any illegal purpose
   d) Return the vehicle to {returnLocation} on the specified date and time
   e) Pay for all traffic violations during the rental period
   f) Not operate the vehicle under the influence of alcohol or drugs

4. INSURANCE
The vehicle is insured for third-party liability as required by Sri Lankan law. The Renter is responsible for the first LKR {deductible} of any damage to the vehicle.

5. MAINTENANCE
The Owner shall deliver the vehicle in good working condition. The Renter shall check oil, water, and tire pressure regularly and report any mechanical problems immediately.

6. LATE RETURN
Late return will incur additional charges at one and a half times the daily rate.

IN WITNESS WHEREOF, the parties have executed this Agreement.

___________________________
{ownerName}
Owner

___________________________
{renterName}
Renter

WITNESSES:

1. ___________________________
2. ___________________________

Date: {startDate}
""",

    # 9. COLLABORATION AGREEMENT - Paragraph format
    "Collaboration Agreement": """
COLLABORATION AGREEMENT

This Collaboration Agreement ("Agreement") is made as of {startDate} by and between:

{partyAName}, with address at {partyAAddress} ("Party A");

AND

{partyBName}, with address at {partyBAddress} ("Party B");

WHEREAS, the parties wish to collaborate on {projectName} for the purpose of {collaborationPurpose};

NOW, THEREFORE, the parties agree as follows:

1. COLLABORATION
The parties agree to collaborate on the Project, with each party contributing their respective expertise, resources, and efforts as described below.

2. RESPONSIBILITIES
Party A shall be responsible for: {partyAResponsibilities}

Party B shall be responsible for: {partyBResponsibilities}

3. RESOURCES
Each party shall contribute the following resources to the collaboration: {resourcesContributed}

4. DECISION MAKING
Major decisions regarding the Project shall be made jointly by both parties. Day-to-day operational decisions may be made by the party responsible for the relevant area.

5. INTELLECTUAL PROPERTY
Each party shall retain ownership of its pre-existing intellectual property. Intellectual property jointly created during the collaboration shall be owned jointly by both parties, unless otherwise agreed in writing.

6. CONFIDENTIALITY
Both parties agree to keep confidential all information shared during the collaboration and not to disclose it to any third party without prior written consent.

7. TERM AND TERMINATION
This Agreement shall commence on {startDate} and continue until {endDate}, unless terminated earlier by mutual agreement or with {terminationNotice} days written notice by either party.

8. GOVERNING LAW
This Agreement shall be governed by the laws of Sri Lanka.

IN WITNESS WHEREOF, the parties have executed this Agreement.

___________________________
{partyAName}
Party A

___________________________
{partyBName}
Party B

Date: {startDate}
""",

    # 10. COMMISSION AGREEMENT - Paragraph format
    "Commission Agreement": """
COMMISSION AGREEMENT

This Commission Agreement ("Agreement") is made as of {startDate} by and between:

{companyName}, with registered address at {companyAddress} ("Company");

AND

{agentName}, residing at {agentAddress}, holder of NIC No. {agentNIC} ("Agent");

WHEREAS, the Company wishes to appoint the Agent to promote and sell its products/services; and
WHEREAS, the Agent wishes to accept such appointment;

NOW, THEREFORE, the parties agree as follows:

1. APPOINTMENT
The Company appoints the Agent as a non-exclusive sales agent for its {productsServices} within the territory of {territory}.

2. COMMISSION
The Agent shall receive a commission of {commissionRate}% on all sales generated by the Agent. Commission shall be calculated on the net sale price after taxes and discounts, and shall be payable within {paymentDays} days of receipt of payment from the customer.

3. AGENT'S OBLIGATIONS
The Agent shall:
   a) Promote the Company's products/services professionally and ethically
   b) Provide regular sales reports as requested by the Company
   c) Not make any representations or warranties beyond those authorized by the Company
   d) Not engage in any activities that may damage the Company's reputation

4. COMPANY'S OBLIGATIONS
The Company shall:
   a) Provide the Agent with necessary product information and marketing materials
   b) Process orders generated by the Agent promptly
   c) Pay commissions in a timely manner

5. TERM
This Agreement shall commence on {startDate} and continue for {termMonths} months, unless terminated earlier by either party with {terminationNotice} days written notice.

6. INDEPENDENT CONTRACTOR
The Agent is an independent contractor and not an employee of the Company. The Agent is responsible for all taxes, insurance, and other obligations related to their business.

7. GOVERNING LAW
This Agreement shall be governed by the laws of Sri Lanka.

IN WITNESS WHEREOF, the parties have executed this Agreement.

___________________________
{companyName}
Company

By: ___________________________

___________________________
{agentName}
Agent

Date: {startDate}
""",

    # 11. CONFIDENTIALITY STATEMENT - Paragraph format
    "Confidentiality Statement": """
CONFIDENTIALITY STATEMENT

I, {employeeName}, employed as {employeePosition} at {companyName}, hereby acknowledge and agree as follows:

1. CONFIDENTIAL INFORMATION
During my employment, I have access to and will continue to have access to confidential and proprietary information belonging to the Company. This includes, but is not limited to, business plans, financial information, customer and supplier lists, technical data, marketing strategies, trade secrets, and any information marked as "Confidential."

2. OBLIGATIONS OF CONFIDENTIALITY
I agree to:
   a) Keep all Confidential Information strictly confidential
   b) Use Confidential Information only for Company business and purposes
   c) Not disclose Confidential Information to anyone without proper authorization
   d) Take all reasonable precautions to prevent unauthorized disclosure
   e) Return all Confidential Information upon termination of employment
   f) Continue to maintain confidentiality even after employment ends

3. COMPANY PROPERTY
I acknowledge that all documents, records, files, notes, drawings, specifications, equipment, and other materials relating to the Company's business, whether prepared by me or others, are the sole property of the Company.

4. INTELLECTUAL PROPERTY
I agree that all inventions, discoveries, improvements, and creations made by me during my employment, using Company resources or relating to Company business, shall be the sole property of the Company.

5. RETURN OF MATERIALS
Upon termination of my employment for any reason, I will immediately return to the Company all property, documents, and materials containing Confidential Information.

6. ACKNOWLEDGMENT
I understand that breach of this Confidentiality Statement may result in disciplinary action, including termination of employment and legal proceedings.

SIGNED this {effectiveDate}.

___________________________
{employeeName}
{employeePosition}

WITNESS:

___________________________
{witnessName}
Address: {witnessAddress}

Date: {effectiveDate}
""",

    # 12. CONTRACT (GENERAL) - Paragraph format
    "Contract": """
CONTRACT

This Contract ("Agreement") is made and entered into as of {startDate} by and between:

{partyAName}, with address at {partyAAddress} ("Party A");

AND

{partyBName}, with address at {partyBAddress} ("Party B");

BACKGROUND:
{contractBackground}

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. PURPOSE
The purpose of this Agreement is to define the terms and conditions under which the parties will {contractPurpose}.

2. TERM
This Agreement shall commence on {startDate} and continue until {endDate}, unless terminated earlier in accordance with its terms.

3. OBLIGATIONS
Party A shall: {partyAObligations}

Party B shall: {partyBObligations}

4. COMPENSATION
{paymentTerms}

5. REPRESENTATIONS AND WARRANTIES
Each party represents and warrants that it has the full power and authority to enter into this Agreement and to perform its obligations hereunder.

6. CONFIDENTIALITY
Both parties agree to maintain the confidentiality of all information exchanged under this Agreement and not to disclose it to any third party without prior written consent.

7. TERMINATION
Either party may terminate this Agreement with {noticePeriod} days written notice. Either party may terminate immediately for material breach by the other party.

8. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of Sri Lanka.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

___________________________
{partyAName}
Party A

___________________________
{partyBName}
Party B

Date: {startDate}
""",

    # 13. CONSIGNMENT AGREEMENT - Paragraph format
    "Consignment Agreement": """
CONSIGNMENT AGREEMENT

This Consignment Agreement ("Agreement") is made as of {startDate} by and between:

{consignorName}, with address at {consignorAddress} ("Consignor");

AND

{consigneeName}, with address at {consigneeAddress} ("Consignee");

WHEREAS, the Consignor wishes to consign certain goods to the Consignee for sale; and
WHEREAS, the Consignee wishes to accept such goods on consignment;

NOW, THEREFORE, the parties agree as follows:

1. CONSIGNMENT GOODS
The Consignor consigns to the Consignee the following goods for sale: {goodsDescription}

2. TERM
This Agreement shall commence on {startDate} and continue for {termMonths} months, unless terminated earlier in accordance with its terms.

3. CONSIGNEE'S OBLIGATIONS
The Consignee shall:
   a) Display and promote the Goods in a professional manner
   b) Use best efforts to sell the Goods at the recommended price of LKR {sellingPrice}
   c) Maintain accurate records of all sales
   d) Provide sales reports to the Consignor {salesReports}
   e) Keep the Goods insured against loss or damage

4. COMMISSION
The Consignee shall receive a commission of {commissionRate}% on each sale. Commission shall be deducted from the sale proceeds before remittance to the Consignor.

5. PAYMENT
The Consignee shall remit the sale proceeds, less commission, to the Consignor within {paymentDays} days of each sale.

6. OWNERSHIP AND RISK
The Goods remain the property of the Consignor until sold. Risk of loss or damage to the Goods shall be borne by the {riskBearer}.

7. UNSOLD GOODS
Unsold Goods may be returned to the Consignor at the Consignor's expense upon termination of this Agreement.

8. TERMINATION
Either party may terminate this Agreement with {terminationNotice} days written notice.

9. GOVERNING LAW
This Agreement shall be governed by the laws of Sri Lanka.

IN WITNESS WHEREOF, the parties have executed this Agreement.

___________________________
{consignorName}
Consignor

___________________________
{consigneeName}
Consignee

Date: {startDate}
""",
}

def get_agreement_template(agreement_type):
    """Get base template for agreement type"""
    return AGREEMENT_TEMPLATES.get(agreement_type)

def format_agreement(template, user_details):
    """Format template with user details - Enhanced for paragraph format"""
    try:
        # Import datetime for date formatting
        from datetime import datetime
        
        # Enhance user details with formatted dates and additional fields
        enhanced_details = user_details.copy()
        
        # Parse dates and add formatted versions
        date_fields = ['date', 'startDate', 'endDate', 'terminationDate', 'lastWorkingDay', 
                      'settlementDate', 'dateOfSale', 'effectiveDate', 'closingDate']
        
        for field in date_fields:
            if field in enhanced_details and enhanced_details[field]:
                try:
                    date_obj = datetime.strptime(enhanced_details[field], '%Y-%m-%d')
                    enhanced_details[field] = date_obj.strftime('%d %B %Y')
                    
                    # Add separate components
                    enhanced_details[f'{field}_day'] = date_obj.strftime('%d')
                    enhanced_details[f'{field}_month'] = date_obj.strftime('%B')
                    enhanced_details[f'{field}_year'] = date_obj.strftime('%Y')
                except:
                    pass
        
        # Add current date if not provided
        if 'date' not in enhanced_details:
            current_date = datetime.now()
            enhanced_details['date'] = current_date.strftime('%d %B %Y')
            enhanced_details['month'] = current_date.strftime('%B')
            enhanced_details['year'] = current_date.strftime('%Y')
        
        # Format numbers with words
        number_fields = ['salary', 'purchasePrice', 'serviceFee', 'contractValue', 
                        'finalSettlement', 'securityDeposit', 'dailyRate', 'sellingPrice']
        
        for field in number_fields:
            if field in enhanced_details and enhanced_details[field]:
                try:
                    num = float(enhanced_details[field])
                    enhanced_details[f'{field}_words'] = number_to_words(int(num))
                except:
                    enhanced_details[f'{field}_words'] = enhanced_details[field]
        
        # Format the template with enhanced details
        formatted = template
        for key, value in enhanced_details.items():
            placeholder = "{" + key + "}"
            if placeholder in formatted:
                formatted = formatted.replace(placeholder, str(value))
        
        # Replace any remaining placeholders with reasonable defaults
        import re
        placeholders = re.findall(r'\{(\w+)\}', formatted)
        
        default_values = {
            'date': datetime.now().strftime('%d %B %Y'),
            'month': datetime.now().strftime('%B'),
            'year': datetime.now().strftime('%Y'),
            'paymentDate': '25th',
            'confidentialityPeriod': '2',
            'salesReports': 'monthly',
            'riskBearer': 'Consignee',
            'employeeOffer': 'may, at its discretion,',
            'deductible': '25,000',
            'refundDays': '7',
            'returnLocation': 'the same location where the vehicle was collected'
        }
        
        for placeholder in placeholders:
            if placeholder not in enhanced_details:
                default_value = default_values.get(placeholder, '___________________')
                formatted = formatted.replace(f'{{{placeholder}}}', default_value)
        
        # Clean up any double replacements
        formatted = re.sub(r'\{\w+\}', '___________________', formatted)
        
        return formatted
        
    except Exception as e:
        print(f"Error formatting agreement: {e}")
        # Fallback to simple replacement
        formatted = template
        for key, value in user_details.items():
            placeholder = "{" + key + "}"
            formatted = formatted.replace(placeholder, str(value))
        
        import re
        formatted = re.sub(r'\{.*?\}', '___________________', formatted)
        return formatted

def number_to_words(num):
    """Convert a number to words for Sri Lankan format"""
    if num == 0:
        return "Zero"
    
    # For simplicity, return the number for now
    # In a production system, you would implement proper number-to-words conversion
    return str(num)