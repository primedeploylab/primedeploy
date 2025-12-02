import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SignatureCanvas from 'react-signature-canvas';
import { FaEraser, FaUpload, FaCheckCircle, FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { generatePDF } from '../utils/pdfGenerator';
import stampImage from '../assets/stamp.png';
import { getSiteSettings } from '../utils/api';

const API_URL = import.meta.env.VITE_API_URL || '/api';

import PageWrapper from '../components/PageWrapper';

const ContractSigning = () => {
  const { token } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Fill details, 2: Review & Sign
  const [signatureType, setSignatureType] = useState('drawn');
  const [uploadedSignature, setUploadedSignature] = useState(null);
  const [capturedSignature, setCapturedSignature] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const sigCanvas = useRef();

  const [clientDetails, setClientDetails] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: ''
  });
  const [adminSignature, setAdminSignature] = useState(null);
  const [stampUrl, setStampUrl] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSiteSettings();
        if (res.data) {
          if (res.data.adminSignature) setAdminSignature(res.data.adminSignature);
          if (res.data.stampUrl) setStampUrl(res.data.stampUrl);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);
  useEffect(() => {
    fetchContract();
  }, [token]);

  const fetchContract = async () => {
    try {
      const res = await axios.get(`${API_URL}/contracts/${token}`);
      setContract(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Contract not found');
      setLoading(false);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSign = async () => {
    setLoading(true);

    try {
      let signatureData;

      if (signatureType === 'drawn') {
        if (sigCanvas.current.isEmpty()) {
          alert('Please provide a signature');
          setLoading(false);
          return;
        }
        signatureData = {
          type: 'drawn',
          data: sigCanvas.current.toDataURL()
        };
      } else {
        if (!uploadedSignature) {
          alert('Please upload a signature');
          setLoading(false);
          return;
        }
        signatureData = {
          type: 'uploaded',
          data: uploadedSignature
        };
      }

      await axios.post(`${API_URL}/contracts/${token}/sign`, {
        ...clientDetails,
        signature: signatureData
      });

      setCapturedSignature(signatureData.data);
      setSuccess(true);
    } catch (err) {
      alert(err.response?.data?.error || 'Error signing contract');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !contract) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jetBlack">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-softGrey">Loading contract...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-jetBlack px-4">
        <div className="max-w-2xl w-full bg-jetBlack/50 rounded-2xl shadow-2xl p-12 text-center border border-neonAqua/30">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-4xl font-bold text-pureWhite mb-4">Contract Not Found</h1>
          <p className="text-xl text-softGrey mb-8">{error}</p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }



  const SignedContractView = ({ contractData }) => (
    <div className="min-h-screen bg-jetBlack py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-pureWhite mb-2">Contract Signed</h1>
          <p className="text-softGrey">You can now download your signed copy.</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => generatePDF('signed-contract', `contract-${contractData.projectName}.pdf`)}
            className="flex items-center space-x-2 px-6 py-3 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80"
          >
            <FaDownload />
            <span>Download PDF</span>
          </button>
          <a
            href="/"
            className="px-6 py-3 bg-white/10 text-pureWhite rounded-lg font-semibold hover:bg-white/20"
          >
            Back to Home
          </a>
        </div>

        {/* Printable Contract Area */}
        <div id="signed-contract" className="bg-white text-black p-6 md:p-12 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="border-b-2 border-black pb-8 mb-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">Service Agreement</h1>
              <p className="text-gray-600">Contract #{contractData._id.slice(-6).toUpperCase()}</p>
            </div>
            <div className="text-center md:text-right">
              <h2 className="font-bold text-xl">Prime Deploy</h2>
              <p className="text-sm text-gray-600">Web & Mobile Development</p>
              <p className="text-sm text-gray-600">contact@primedeploy.com</p>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold uppercase text-sm text-gray-500 mb-2">Client Details</h3>
              <p className="font-bold">{contractData.clientName}</p>
              <p>{contractData.clientEmail}</p>
              <p>{contractData.clientPhone}</p>
            </div>
            <div>
              <h3 className="font-bold uppercase text-sm text-gray-500 mb-2">Project Details</h3>
              <p className="font-bold">{contractData.projectName}</p>
              <p>{contractData.duration} {contractData.durationUnit}</p>
              <p className="font-bold mt-2">Total: {contractData.currency} {contractData.totalPrice}</p>
            </div>
          </div>

          {/* Terms */}
          <div className="mb-8">
            <h3 className="font-bold uppercase text-sm text-gray-500 mb-4">Terms & Conditions</h3>
            <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed border p-4 rounded bg-gray-50">
              {contractData.contractTerms}
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-12 mt-12 pt-8 border-t-2 border-black">
            <div>
              <p className="font-bold mb-4">Signed by Client:</p>
              {contractData.clientSignature && (
                <img
                  src={contractData.clientSignature.data}
                  alt="Client Signature"
                  className="h-auto max-h-24 mb-2 object-contain"
                />
              )}
              <p className="border-t border-gray-400 pt-2">{contractData.clientName}</p>
              <p className="text-xs text-gray-500">Date: {new Date(contractData.signedAt || Date.now()).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-bold mb-4">Authorized Signature:</p>
              <div className="h-24 mb-2 flex items-end relative">
                {/* Stamp */}
                <img
                  src={stampUrl || stampImage}
                  alt="Prime Deploy Stamp"
                  className="h-24 object-contain opacity-90 rotate-[-5deg] absolute left-0 bottom-0 z-10"
                />
                {/* Admin Signature */}
                {adminSignature && (
                  <img src={adminSignature} alt="Authorized Signature" className="h-16 object-contain absolute left-8 bottom-4 z-20" />
                )}
              </div>
              <p className="border-t border-gray-400 pt-2">Prime Deploy Representative</p>
              <p className="text-xs text-gray-500">Date: {new Date(contractData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (success) {
    // Merge current details into contract for preview
    const signedContract = {
      ...contract,
      clientName: clientDetails.clientName,
      clientEmail: clientDetails.clientEmail,
      clientPhone: clientDetails.clientPhone,
      clientSignature: { data: capturedSignature },
      signedAt: new Date()
    };
    return <SignedContractView contractData={signedContract} />;
  }

  if (contract.status === 'signed') {
    return <SignedContractView contractData={contract} />;
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Sign Contract - {contract.projectName}</title>
      </Helmet>

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-neonAqua' : 'text-softGrey'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-neonAqua text-jetBlack' : 'bg-white/10'}`}>
                1
              </div>
              <span className="ml-2 font-semibold">Your Details</span>
            </div>
            <div className="w-16 h-1 bg-white/10"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-neonAqua' : 'text-softGrey'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-neonAqua text-jetBlack' : 'bg-white/10'}`}>
                2
              </div>
              <span className="ml-2 font-semibold">Review & Sign</span>
            </div>
          </div>

          {/* Step 1: Client Details */}
          {step === 1 && (
            <div className="glass-card rounded-2xl shadow-2xl p-8 border border-neonAqua/30">
              <h1 className="text-3xl font-bold text-pureWhite mb-2">Contract for {contract.projectName}</h1>
              <p className="text-softGrey mb-8">Please fill in your details to proceed</p>

              {/* Project Summary */}
              <div className="mb-8 p-6 bg-jetBlack/50 rounded-xl border border-white/10">
                <h2 className="text-xl font-bold text-pureWhite mb-4">Project Summary</h2>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Project:</strong> {contract.projectName}</p>
                  <p><strong>Description:</strong> {contract.projectDescription}</p>
                  <p><strong>Total Price:</strong> {contract.currency} {contract.totalPrice}</p>
                  <p><strong>Duration:</strong> {contract.duration} {contract.durationUnit}</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="font-semibold mb-2 text-pureWhite">Payment Schedule:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Advance: {contract.paymentSchedule.advance.percentage}% ({contract.currency} {(contract.totalPrice * contract.paymentSchedule.advance.percentage / 100).toFixed(2)})</li>
                      <li>• Mid Payment: {contract.paymentSchedule.mid.percentage}% ({contract.currency} {(contract.totalPrice * contract.paymentSchedule.mid.percentage / 100).toFixed(2)})</li>
                      <li>• Final Payment: {contract.paymentSchedule.final.percentage}% ({contract.currency} {(contract.totalPrice * contract.paymentSchedule.final.percentage / 100).toFixed(2)})</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Client Details Form */}
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientDetails.clientName}
                    onChange={(e) => setClientDetails({ ...clientDetails, clientName: e.target.value })}
                    className="w-full px-4 py-3 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientDetails.clientEmail}
                    onChange={(e) => setClientDetails({ ...clientDetails, clientEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Your Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientDetails.clientPhone}
                    onChange={(e) => setClientDetails({ ...clientDetails, clientPhone: e.target.value })}
                    className="w-full px-4 py-3 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80 transition-colors"
                >
                  Continue to Review Contract
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Review & Sign */}
          {step === 2 && (
            <div className="glass-card rounded-2xl shadow-2xl p-8 border border-neonAqua/30">
              <h1 className="text-3xl font-bold text-pureWhite mb-6">Review & Sign Contract</h1>

              {/* Contract Terms */}
              <div className="mb-8 p-6 bg-jetBlack/50 rounded-xl max-h-96 overflow-y-auto border border-white/10">
                <h2 className="text-xl font-bold text-pureWhite mb-4">Contract Terms</h2>
                <pre className="whitespace-pre-wrap font-sans text-gray-300 text-sm">
                  {contract.contractTerms}
                </pre>
              </div>

              {/* Client Info Summary */}
              <div className="mb-8 p-6 bg-jetBlack/50 rounded-xl border border-white/10">
                <h3 className="font-bold text-pureWhite mb-2">Your Information:</h3>
                <p className="text-gray-300">Name: {clientDetails.clientName}</p>
                <p className="text-gray-300">Email: {clientDetails.clientEmail}</p>
                <p className="text-gray-300">Phone: {clientDetails.clientPhone}</p>
                <button
                  onClick={() => setStep(1)}
                  className="mt-2 text-neonAqua text-sm hover:underline"
                >
                  Edit Details
                </button>
              </div>

              {/* Signature Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-pureWhite mb-4">Your Signature</h2>

                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setSignatureType('drawn')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${signatureType === 'drawn'
                      ? 'bg-neonAqua text-jetBlack'
                      : 'bg-white/10 text-pureWhite hover:bg-white/20'
                      }`}
                  >
                    Draw Signature
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignatureType('uploaded')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${signatureType === 'uploaded'
                      ? 'bg-neonAqua text-jetBlack'
                      : 'bg-white/10 text-pureWhite hover:bg-white/20'
                      }`}
                  >
                    Upload Signature
                  </button>
                </div>

                {signatureType === 'drawn' ? (
                  <div>
                    <div className="border-2 border-white/20 rounded-xl overflow-hidden bg-white">
                      <SignatureCanvas
                        ref={sigCanvas}
                        canvasProps={{
                          className: 'w-full h-48',
                          style: { width: '100%', height: '192px' }
                        }}
                        backgroundColor="white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="mt-2 flex items-center space-x-2 px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-700"
                    >
                      <FaEraser />
                      <span>Clear</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                      <div className="flex flex-col items-center">
                        <FaUpload className="text-4xl text-softGrey mb-2" />
                        <p className="text-softGrey">Click to upload signature image</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {uploadedSignature && (
                      <img src={uploadedSignature} alt="Signature" className="mt-4 max-h-32 border rounded-lg" />
                    )}
                  </div>
                )}
              </div>

              {/* Agreement Checkbox */}
              <div className="mb-8">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-5 h-5 accent-neonAqua"
                  />
                  <span className="text-gray-300">
                    I, {clientDetails.clientName}, have read and agree to all the terms and conditions outlined in this contract. I understand the payment schedule and project timeline.
                  </span>
                </label>
              </div>

              {/* Sign Button */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-gray-700 text-white rounded-xl font-bold text-lg hover:bg-gray-600 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSign}
                  disabled={loading}
                  className="flex-1 py-4 bg-neonAqua text-jetBlack rounded-xl font-bold text-lg hover:bg-neonAqua/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Signing...</span>
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      <span>Sign Contract</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContractSigning;
