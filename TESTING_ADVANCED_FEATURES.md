# Testing Advanced Features Guide

This guide will help you test all the newly implemented advanced features.

## Prerequisites

1. MongoDB Atlas connection configured (check `.env` files)
2. Backend and frontend servers running
3. Admin account created

## Testing Checklist

### 1. Client User Registration & Approval

**Steps:**
1. Navigate to `http://localhost:5173/client/register`
2. Fill in the registration form:
   - Name: Test Client
   - Email: testclient@example.com
   - Phone: +1234567890
   - Password: TestPass123!
3. Submit the form
4. You should see "Registration successful! Awaiting admin approval."

**Admin Approval:**
1. Login to admin panel at `http://localhost:5173/admin/login`
2. Navigate to "Client Users" from dashboard
3. Find the pending registration
4. Click "Approve" button
5. Status should change to "Approved"

### 2. Client Login

**Steps:**
1. Navigate to `http://localhost:5173/client/login`
2. Login with:
   - Email: testclient@example.com
   - Password: TestPass123!
3. Should receive success message and token

### 3. Contract Creation & Signing

**Admin Creates Contract:**
1. Go to `http://localhost:5173/admin/contracts`
2. Click "Create New Contract"
3. Fill in contract details:
   - Client Name: Test Client
   - Client Email: testclient@example.com
   - Project Title: Website Development
   - Price Range: $5000 - $10000
   - Timeline: 4-6 weeks
   - Terms: Custom terms and conditions
4. Click "Create Contract"
5. Copy the shareable link

**Client Signs Contract:**
1. Open the shareable link (e.g., `http://localhost:5173/contract/abc123token`)
2. Review contract details
3. Choose signature method:
   - **Draw**: Use mouse/touch to draw signature
   - **Upload**: Upload signature image file
4. Click "Sign Contract"
5. Should see success message

**Verify in Admin:**
1. Go back to admin contracts page
2. Contract status should be "Signed"
3. View contract to see signature

### 4. Review Submission & Approval

**Client Submits Review:**
1. Login as client at `http://localhost:5173/client/login`
2. Navigate to home page
3. Click "Leave a Review" button
4. Fill in review form:
   - Select project (if any)
   - Rating: 5 stars
   - Review text: "Excellent service! Highly recommended."
5. Submit review
6. Should see "Review submitted successfully"

**Admin Approves Review:**
1. Login to admin panel
2. Navigate to "Reviews" from dashboard
3. Find pending review
4. Click "Approve" button
5. Review should move to approved list

**Verify on Home Page:**
1. Go to `http://localhost:5173/`
2. Scroll to "What Our Clients Say" section
3. Should see the approved review in the carousel
4. Carousel should auto-slide every 5 seconds
5. Test pause/play controls

### 5. Reviews Carousel Features

**Test Auto-Sliding:**
1. Go to home page reviews section
2. Wait 5 seconds - should auto-advance to next review
3. Should loop back to first review after last one

**Test Manual Controls:**
1. Click pause button - auto-sliding should stop
2. Click play button - auto-sliding should resume
3. Click left/right arrows - should navigate manually
4. Click dot indicators - should jump to specific review

**Test Statistics:**
1. Should display total number of reviews
2. Should display average rating (e.g., "4.8 / 5.0")
3. Should show star icons for average rating

## API Testing with Postman

Import the `DeployPrime-API.postman_collection.json` file and test:

### Contract Endpoints:
- `POST /api/contracts` - Create contract (requires admin token)
- `GET /api/contracts/admin` - List contracts (requires admin token)
- `GET /api/contracts/:contractId` - View contract (public)
- `POST /api/contracts/:contractId/sign` - Sign contract (public)

### Review Endpoints:
- `GET /api/reviews` - Get approved reviews (public)
- `POST /api/reviews` - Submit review (requires client token)
- `GET /api/reviews/admin` - Get all reviews (requires admin token)
- `PATCH /api/reviews/:id/approve` - Approve review (requires admin token)

### Client Auth Endpoints:
- `POST /api/client-auth/register` - Register client
- `POST /api/client-auth/login` - Login client
- `GET /api/client-auth/admin/users` - List users (requires admin token)
- `PATCH /api/client-auth/admin/users/:id/approve` - Approve user (requires admin token)

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:** Check `.env` file has correct `MONGO_URI` with your MongoDB Atlas credentials

### Issue: "Unauthorized" errors
**Solution:** Make sure you're logged in and token is stored in localStorage

### Issue: Contract link not working
**Solution:** Check that the token in URL matches the contract's `shareableToken` in database

### Issue: Reviews not showing on home page
**Solution:** Make sure reviews are approved by admin first

### Issue: Signature canvas not working
**Solution:** Clear browser cache and ensure `react-signature-canvas` is installed

### Issue: Client can't login after registration
**Solution:** Admin must approve the client user first

## Database Verification

Use MongoDB Compass or Atlas UI to verify:

1. **contracts collection**: Should have contract documents with signatures
2. **reviews collection**: Should have review documents with ratings
3. **clientusers collection**: Should have client user documents with hashed passwords

## Security Checks

1. ✅ Passwords are hashed (bcrypt)
2. ✅ JWT tokens expire after 7 days
3. ✅ Admin routes protected with auth middleware
4. ✅ Client routes protected with clientAuth middleware
5. ✅ Contract tokens expire after 30 days
6. ✅ Password history prevents reuse of last 3 passwords

## Performance Checks

1. ✅ Reviews carousel smooth animation
2. ✅ Signature canvas responsive
3. ✅ API responses under 500ms
4. ✅ Image uploads optimized
5. ✅ Pagination for large datasets

---

**Happy Testing! 🚀**

If you encounter any issues, check the browser console and backend logs for error messages.
