# 📝 Contract System - Complete Guide

## Overview

Simple, professional contract system where admin creates contracts and clients sign them online - no registration needed!

---

## How It Works

### For Admin (You):

**Step 1: Create Contract**
1. Go to `/admin/contracts`
2. Click "Create New Contract"
3. Fill in:
   - Project name (e.g., "E-commerce Website")
   - Project description
   - Total price (e.g., 5000)
   - Duration (e.g., 30 days)
   - Payment schedule:
     - Advance: 30%
     - Mid: 40%
     - Final: 30%
   - Contract terms (optional - default template provided)

**Step 2: Share Link**
1. Contract link is automatically generated
2. Copy the link (e.g., `yoursite.com/contract/abc123xyz`)
3. Send to client via email, WhatsApp, etc.

**Step 3: Track Status**
- **Pending**: Link sent, waiting for client
- **Viewed**: Client opened the link
- **Signed**: Client signed the contract ✅
- **Expired**: Link expired (30 days)

---

### For Client:

**Step 1: Open Link**
- Client receives link from you
- Clicks to open contract page

**Step 2: Fill Details**
- Name
- Email
- Phone number

**Step 3: Review Contract**
- See project details
- See payment schedule
- Read terms and conditions

**Step 4: Sign**
- Draw signature with mouse/finger
- OR upload signature image
- Check agreement box
- Click "Sign Contract"

**Done!** ✅

---

## Features

### Payment Schedule
Automatically calculates amounts:
- **Advance 30%**: $1,500 (before project starts)
- **Mid 40%**: $2,000 (at 50% completion)
- **Final 30%**: $1,500 (upon delivery)

### Default Contract Template
Professional template included with:
- Project scope
- Payment terms
- Timeline
- Revisions policy
- Cancellation policy
- IP rights
- Confidentiality
- Agreement clause

### Security
- ✅ Unique secure tokens
- ✅ 30-day expiration
- ✅ IP address tracking
- ✅ Timestamp on signature
- ✅ Cannot sign twice

---

## Admin Panel Features

### Create Contract Form:
```
Project Name: [E-commerce Website]
Description: [Full-stack e-commerce with payment integration...]
Total Price: [5000] Currency: [USD]
Duration: [30] Unit: [days/weeks/months]

Payment Schedule:
Advance: [30]%
Mid: [40]%
Final: [30]%
Total: 100% ✓

Contract Terms: [Optional - uses default if empty]
```

### Contracts List:
| Project | Client | Price | Status | Actions |
|---------|--------|-------|--------|---------|
| E-commerce | John Doe | $5000 | Signed | Copy Link, Delete |
| Mobile App | Awaiting | $8000 | Pending | Copy Link, Delete |

---

## Client Experience

### Step 1: Details Form
```
Contract for E-commerce Website

Project Summary:
- Project: E-commerce Website
- Description: Full-stack e-commerce...
- Total Price: USD 5000
- Duration: 30 days

Payment Schedule:
• Advance: 30% (USD 1500.00)
• Mid Payment: 40% (USD 2000.00)
• Final Payment: 30% (USD 1500.00)

Your Full Name: [_____________]
Your Email: [_____________]
Your Phone: [_____________]

[Continue to Review Contract]
```

### Step 2: Review & Sign
```
Contract Terms:
[Full terms displayed here...]

Your Information:
Name: John Doe
Email: john@example.com
Phone: +1 234 567 8900
[Edit Details]

Your Signature:
[Draw Signature] [Upload Signature]

[Signature Canvas or Upload Area]

☑ I, John Doe, have read and agree to all terms...

[Sign Contract]
```

### Step 3: Success
```
✅ Contract Signed Successfully!

Thank you, John Doe! We've received your signed 
contract and will be in touch soon.

[Back to Home]
```

---

## API Endpoints

### Admin Endpoints:
```javascript
// Create contract
POST /api/contracts
Body: {
  projectName, projectDescription, totalPrice,
  duration, durationUnit, paymentSchedule, contractTerms
}
Response: { contract, shareableUrl }

// Get all contracts
GET /api/contracts/admin?status=signed

// Update contract
PUT /api/contracts/:id

// Delete contract
DELETE /api/contracts/:id
```

### Public Endpoints:
```javascript
// Get contract by token
GET /api/contracts/:token

// Sign contract
POST /api/contracts/:token/sign
Body: {
  clientName, clientEmail, clientPhone,
  signature: { type, data }
}
```

---

## Database Schema

```javascript
{
  // Admin fills when creating
  projectName: "E-commerce Website",
  projectDescription: "Full-stack e-commerce...",
  totalPrice: 5000,
  currency: "USD",
  duration: 30,
  durationUnit: "days",
  paymentSchedule: {
    advance: { percentage: 30, amount: 1500 },
    mid: { percentage: 40, amount: 2000 },
    final: { percentage: 30, amount: 1500 }
  },
  contractTerms: "TERMS AND CONDITIONS...",
  
  // Client fills when signing
  clientName: "John Doe",
  clientEmail: "john@example.com",
  clientPhone: "+1234567890",
  
  // System generated
  shareableToken: "abc123xyz...",
  status: "signed",
  signature: {
    type: "drawn",
    data: "data:image/png;base64...",
    signedAt: "2025-11-28T10:30:00Z",
    ipAddress: "192.168.1.1"
  },
  expiresAt: "2025-12-28T10:30:00Z",
  viewedAt: "2025-11-28T09:15:00Z",
  createdAt: "2025-11-28T08:00:00Z"
}
```

---

## Customization

### Change Payment Schedule:
Default is 30-40-30, but you can use any split:
- 50-25-25 (half upfront)
- 20-30-50 (more at end)
- 33-33-34 (equal thirds)

Just make sure it adds up to 100%!

### Edit Contract Terms:
You can customize the default template or write your own for each contract.

### Change Expiry:
Default is 30 days. Edit in `contracts.js`:
```javascript
expiresAt.setDate(expiresAt.getDate() + 30); // Change 30 to your days
```

---

## Benefits

### For You:
- ✅ Professional appearance
- ✅ No paper contracts
- ✅ Instant signatures
- ✅ Automatic tracking
- ✅ Legal documentation
- ✅ Payment clarity

### For Clients:
- ✅ Easy to understand
- ✅ Sign from anywhere
- ✅ No registration needed
- ✅ Clear payment terms
- ✅ Professional experience

---

## Tips

### Best Practices:
1. **Be specific** in project description
2. **Clear timeline** - use realistic durations
3. **Fair payment split** - 30-40-30 works well
4. **Send promptly** - while project is fresh
5. **Follow up** - if not signed in 3 days

### Email Template:
```
Subject: Contract for [Project Name]

Hi [Client Name],

Thank you for choosing us for your [Project Name]!

Please review and sign the contract here:
[Contract Link]

The contract includes:
- Project details and timeline
- Total cost: $[Amount]
- Payment schedule
- Terms and conditions

The link expires in 30 days.

Questions? Just reply to this email!

Best regards,
[Your Name]
```

---

## Troubleshooting

### "Contract not found"
- Link expired (30 days)
- Wrong token in URL
- Contract was deleted

### "Already signed"
- Contract can only be signed once
- Check admin panel for signed copy

### Signature not working
- Install: `npm install react-signature-canvas`
- Clear browser cache
- Try different browser

---

## Next Steps

1. ✅ System is ready to use
2. Create your first contract
3. Test with a friend/colleague
4. Send to real clients
5. Track signatures in admin panel

**Ready to go! 🚀**
