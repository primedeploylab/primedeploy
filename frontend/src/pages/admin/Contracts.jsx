import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCopy, FaEye, FaTrash, FaSignOutAlt, FaCheck, FaDownload, FaPenNib, FaEraser, FaMoon, FaSun } from 'react-icons/fa';
import { getContracts, createContract, deleteContract, getSiteSettings, updateSiteSettings } from '../../utils/api';
import { generatePDF } from '../../utils/pdfGenerator';
import stampImage from '../../assets/stamp.png';
import SignatureCanvas from 'react-signature-canvas';

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [adminSignature, setAdminSignature] = useState(null);
  const [stampUrl, setStampUrl] = useState(null);
  const [theme, setTheme] = useState('neon');
  const [signatureType, setSignatureType] = useState('upload'); // 'upload' or 'draw'
  const [activeTab, setActiveTab] = useState('signature'); // 'signature' or 'stamp'
  const sigCanvas = useRef({});
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContracts();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getSiteSettings();
      if (res.data) {
        if (res.data.adminSignature) setAdminSignature(res.data.adminSignature);
        if (res.data.stampUrl) setStampUrl(res.data.stampUrl);
        if (res.data.theme) setTheme(res.data.theme);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleSignatureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const signatureData = reader.result;
          await updateSiteSettings({ adminSignature: signatureData });
          setAdminSignature(signatureData);
          alert('Admin signature updated successfully!');
          setShowSignatureModal(false);
        } catch (err) {
          alert('Error updating signature');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStampUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const stampData = reader.result;
          await updateSiteSettings({ stampUrl: stampData });
          setStampUrl(stampData);
          alert('Stamp updated successfully!');
        } catch (err) {
          alert('Error updating stamp');
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleThemeToggle = async () => {
    const newTheme = theme === 'neon' ? 'bw' : 'neon';
    try {
      await updateSiteSettings({ theme: newTheme });
      setTheme(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (err) {
      console.error('Error updating theme:', err);
      alert('Failed to update theme');
    }
  };

  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    totalPrice: '',
    currency: 'USD',
    duration: '',
    durationUnit: 'days',
    paymentSchedule: {
      advance: { percentage: 30 },
      mid: { percentage: 40 },
      final: { percentage: 30 }
    },
    contractTerms: ''
  });

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const res = await getContracts();
      setContracts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate percentages
    const { advance, mid, final } = formData.paymentSchedule;
    if (advance.percentage + mid.percentage + final.percentage !== 100) {
      alert('Payment percentages must add up to 100%');
      return;
    }

    setLoading(true);
    try {
      const res = await createContract(formData);
      alert('Contract created! Link copied to clipboard.');
      navigator.clipboard.writeText(res.data.shareableUrl);
      setShowForm(false);
      fetchContracts();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.error || 'Error creating contract');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      projectName: '',
      projectDescription: '',
      totalPrice: '',
      currency: 'USD',
      duration: '',
      durationUnit: 'days',
      paymentSchedule: {
        advance: { percentage: 30 },
        mid: { percentage: 40 },
        final: { percentage: 30 }
      },
      contractTerms: ''
    });
  };

  const copyLink = (token) => {
    const url = `${window.location.origin}/contract/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(token);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this contract?')) return;
    try {
      await deleteContract(id);
      fetchContracts();
    } catch (err) {
      alert('Error deleting contract');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const [selectedContractForPdf, setSelectedContractForPdf] = useState(null);

  useEffect(() => {
    if (selectedContractForPdf) {
      const generate = async () => {
        // Wait for render
        await new Promise(resolve => setTimeout(resolve, 500));
        await generatePDF('admin-contract-pdf', `contract-${selectedContractForPdf.projectName}.pdf`);
        setSelectedContractForPdf(null);
      };
      generate();
    }
  }, [selectedContractForPdf]);

  const handleDownload = (contract) => {
    setSelectedContractForPdf(contract);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30',
      viewed: 'bg-blue-900/30 text-blue-400 border-blue-500/30',
      signed: 'bg-green-900/30 text-green-400 border-green-500/30',
      expired: 'bg-red-900/30 text-red-400 border-red-500/30'
    };
    return colors[status] || 'bg-white/10 text-softGrey border-white/20';
  };

  // Hidden PDF Template
  const PdfTemplate = ({ contract }) => {
    if (!contract) return null;
    return (
      <div id="admin-contract-pdf" className="fixed top-0 left-0 -z-50 bg-white text-black p-12 w-[210mm] min-h-[297mm]">
        {/* Header */}
        <div className="border-b-2 border-black pb-8 mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">Service Agreement</h1>
            <p className="text-gray-600">Contract #{contract._id.slice(-6).toUpperCase()}</p>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-xl">Prime Deploy</h2>
            <p className="text-sm text-gray-600">Web & Mobile Development</p>
            <p className="text-sm text-gray-600">contact@primedeploy.com</p>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold uppercase text-sm text-gray-500 mb-2">Client Details</h3>
            <p className="font-bold">{contract.clientName || 'Pending'}</p>
            <p>{contract.clientEmail}</p>
            <p>{contract.clientPhone}</p>
          </div>
          <div>
            <h3 className="font-bold uppercase text-sm text-gray-500 mb-2">Project Details</h3>
            <p className="font-bold">{contract.projectName}</p>
            <p>{contract.duration} {contract.durationUnit}</p>
            <p className="font-bold mt-2">Total: {contract.currency} {contract.totalPrice}</p>
          </div>
        </div>

        {/* Terms */}
        <div className="mb-8">
          <h3 className="font-bold uppercase text-sm text-gray-500 mb-4">Terms & Conditions</h3>
          <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed border p-4 rounded bg-gray-50">
            {contract.contractTerms}
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 mt-12 pt-8 border-t-2 border-black">
          <div>
            <p className="font-bold mb-4">Signed by Client:</p>
            {contract.clientSignature ? (
              <img
                src={contract.clientSignature.data}
                alt="Client Signature"
                className="h-16 mb-2 object-contain"
              />
            ) : (
              <p className="text-gray-400 italic mt-8">Pending Signature</p>
            )}
            <p className="border-t border-gray-400 pt-2">{contract.clientName || 'Client Name'}</p>
            <p className="text-xs text-gray-500">Date: {contract.signedAt ? new Date(contract.signedAt).toLocaleDateString() : 'Pending'}</p>
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
            <p className="text-xs text-gray-500">Date: {new Date(contract.createdAt).toLocaleDateString()}</p>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-jetBlack">
      {/* Header */}
      <nav className="bg-charcoal border-b border-white/10 text-pureWhite p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-neonAqua">Contract Management</h1>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <button
              onClick={handleThemeToggle}
              className="flex items-center space-x-2 px-3 py-2 bg-charcoal text-pureWhite border border-neonAqua/30 rounded-lg hover:bg-neonAqua/10 font-semibold text-sm md:text-base transition-colors"
            >
              {theme === 'neon' ? <FaMoon /> : <FaSun />}
              <span>{theme === 'neon' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            <button
              onClick={() => setShowSignatureModal(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-neonAqua text-jetBlack rounded-lg hover:bg-neonAqua/80 font-semibold text-sm md:text-base transition-colors"
            >
              <FaPenNib />
              <span>Signature</span>
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="px-3 py-2 bg-softPurple text-pureWhite rounded-lg hover:bg-softPurple/80 text-sm md:text-base transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 bg-red-600/80 rounded-lg hover:bg-red-600 text-sm md:text-base transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Create Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2 md:px-6 md:py-3 bg-neonAqua text-jetBlack rounded-lg hover:bg-neonAqua/80 text-sm md:text-base font-semibold transition-colors"
          >
            <FaPlus />
            <span>{showForm ? 'Cancel' : 'Create New Contract'}</span>
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="glass-card rounded-2xl p-4 md:p-8 border border-neonAqua/30 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-neonAqua mb-6">New Contract</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite placeholder-softGrey/50"
                    placeholder="E-commerce Website"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Total Price * ({formData.currency})
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.totalPrice}
                    onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                    className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite placeholder-softGrey/50"
                    placeholder="5000"
                  />
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-semibold text-pureWhite mb-2">
                  Project Description *
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite placeholder-softGrey/50"
                  placeholder="Full-stack e-commerce website with payment integration..."
                />
              </div>

              {/* Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Duration *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite placeholder-softGrey/50"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Duration Unit *
                  </label>
                  <select
                    value={formData.durationUnit}
                    onChange={(e) => setFormData({ ...formData, durationUnit: e.target.value })}
                    className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite [&>option]:bg-jetBlack"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              {/* Payment Schedule */}
              <div>
                <label className="block text-sm font-semibold text-pureWhite mb-4">
                  Payment Schedule (must total 100%)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-neonAqua mb-1">Advance %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.paymentSchedule.advance.percentage}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentSchedule: {
                          ...formData.paymentSchedule,
                          advance: { percentage: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neonAqua mb-1">Mid Payment %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.paymentSchedule.mid.percentage}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentSchedule: {
                          ...formData.paymentSchedule,
                          mid: { percentage: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neonAqua mb-1">Final Payment %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.paymentSchedule.final.percentage}
                      onChange={(e) => setFormData({
                        ...formData,
                        paymentSchedule: {
                          ...formData.paymentSchedule,
                          final: { percentage: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite"
                    />
                  </div>
                </div>
                <p className="text-sm text-softGrey mt-2">
                  Total: {formData.paymentSchedule.advance.percentage + formData.paymentSchedule.mid.percentage + formData.paymentSchedule.final.percentage}%
                </p>
              </div>

              {/* Contract Terms (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-pureWhite mb-2">
                  Contract Terms (Optional - default template will be used)
                </label>
                <textarea
                  rows="6"
                  value={formData.contractTerms}
                  onChange={(e) => setFormData({ ...formData, contractTerms: e.target.value })}
                  className="w-full px-4 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua text-pureWhite placeholder-softGrey/50 font-mono text-sm"
                  placeholder="Leave empty to use default template..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Creating...' : 'Create Contract & Generate Link'}
              </button>
            </form>
          </div>
        )}

        {/* Contracts List */}
        <div className="glass-card rounded-2xl overflow-hidden border border-neonAqua/20">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-neonAqua">All Contracts</h2>
          </div>

          <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[800px]">
              <thead className="bg-charcoal border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neonAqua uppercase">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neonAqua uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neonAqua uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neonAqua uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neonAqua uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {contracts.map((contract) => (
                  <tr key={contract._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-pureWhite">{contract.projectName}</p>
                        <p className="text-sm text-softGrey">{contract.duration} {contract.durationUnit}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {contract.clientName ? (
                        <div>
                          <p className="font-medium text-pureWhite">{contract.clientName}</p>
                          <p className="text-sm text-softGrey">{contract.clientEmail}</p>
                        </div>
                      ) : (
                        <span className="text-softGrey italic">Awaiting client</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-pureWhite">
                        {contract.currency} {contract.totalPrice}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyLink(contract.shareableToken)}
                          className="p-2 text-neonAqua hover:bg-neonAqua/10 rounded-lg transition-colors"
                          title="Copy Link"
                        >
                          {copiedId === contract.shareableToken ? <FaCheck /> : <FaCopy />}
                        </button>
                        <button
                          onClick={() => handleDownload(contract)}
                          className="p-2 text-softPurple hover:bg-softPurple/10 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => handleDelete(contract._id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {contracts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-softGrey">No contracts yet. Create your first one!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden PDF Template Render */}
      <PdfTemplate contract={selectedContractForPdf} />

      {/* Signature & Stamp Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Update Contract Assets</h2>

            {/* Main Tabs */}
            <div className="flex space-x-4 mb-6 border-b">
              <button
                className={`pb-2 px-4 font-semibold ${activeTab === 'signature' ? 'text-primary border-b-2 border-primary' : 'text-grey'}`}
                onClick={() => setActiveTab('signature')}
              >
                Signature
              </button>
              <button
                className={`pb-2 px-4 font-semibold ${activeTab === 'stamp' ? 'text-primary border-b-2 border-primary' : 'text-grey'}`}
                onClick={() => setActiveTab('stamp')}
              >
                Stamp
              </button>
            </div>

            {activeTab === 'signature' ? (
              <>
                <p className="text-grey mb-6">Upload or draw the signature that will appear on all contracts.</p>
                {/* Signature Type Tabs */}
                <div className="flex space-x-4 mb-6 border-b">
                  <button
                    className={`pb-2 px-4 font-semibold ${signatureType === 'upload' ? 'text-primary border-b-2 border-primary' : 'text-grey'}`}
                    onClick={() => setSignatureType('upload')}
                  >
                    Upload Image
                  </button>
                  <button
                    className={`pb-2 px-4 font-semibold ${signatureType === 'draw' ? 'text-primary border-b-2 border-primary' : 'text-grey'}`}
                    onClick={() => setSignatureType('draw')}
                  >
                    Draw Signature
                  </button>
                </div>

                <div className="mb-6">
                  {adminSignature && (
                    <div className="border rounded-lg p-4 mb-4 bg-gray-50 text-center">
                      <img src={adminSignature} alt="Current Signature" className="h-20 mx-auto object-contain" />
                      <p className="text-xs text-grey mt-2">Current Signature</p>
                    </div>
                  )}

                  {signatureType === 'upload' ? (
                    <label className="block w-full px-4 py-3 bg-primary text-white text-center rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                      <span>Upload New Signature</span>
                      <input type="file" accept="image/*" onChange={handleSignatureUpload} className="hidden" />
                    </label>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                        <SignatureCanvas
                          ref={sigCanvas}
                          penColor="black"
                          canvasProps={{
                            width: 400,
                            height: 200,
                            className: 'cursor-crosshair w-full h-48'
                          }}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => sigCanvas.current.clear()}
                          className="flex items-center space-x-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                        >
                          <FaEraser />
                          <span>Clear</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (sigCanvas.current.isEmpty()) {
                              alert('Please draw a signature first');
                              return;
                            }
                            const signatureData = sigCanvas.current.toDataURL();
                            try {
                              await updateSiteSettings({ adminSignature: signatureData });
                              setAdminSignature(signatureData);
                              alert('Admin signature updated successfully!');
                            } catch (err) {
                              alert('Error updating signature');
                            }
                          }}
                          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 font-semibold"
                        >
                          Save Drawing
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-grey mb-6">Upload the official company stamp.</p>
                <div className="mb-6">
                  {stampUrl ? (
                    <div className="border rounded-lg p-4 mb-4 bg-gray-50 text-center">
                      <img src={stampUrl} alt="Current Stamp" className="h-24 mx-auto object-contain" />
                      <p className="text-xs text-grey mt-2">Current Stamp</p>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 mb-4 bg-gray-50 text-center text-grey italic">
                      No stamp uploaded yet
                    </div>
                  )}

                  <label className="block w-full px-4 py-3 bg-primary text-white text-center rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                    <span>Upload New Stamp</span>
                    <input type="file" accept="image/*" onChange={handleStampUpload} className="hidden" />
                  </label>
                </div>
              </>
            )}

            <button
              onClick={() => setShowSignatureModal(false)}
              className="w-full px-4 py-2 border border-grey/30 text-grey rounded-lg hover:bg-gray-50 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
