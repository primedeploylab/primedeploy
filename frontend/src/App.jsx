import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import PrivateRoute from './components/PrivateRoute'
import ClientPrivateRoute from './components/ClientPrivateRoute'
import { getSiteSettings } from './utils/api'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Quote = lazy(() => import('./pages/Quote'))
const Contact = lazy(() => import('./pages/Contact'))
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminProjects = lazy(() => import('./pages/admin/Projects'))
const AdminBlogs = lazy(() => import('./pages/admin/Blogs'))
const AdminServices = lazy(() => import('./pages/admin/Services'))
const AdminQuotes = lazy(() => import('./pages/admin/Quotes'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))
const AdminContracts = lazy(() => import('./pages/admin/Contracts'))
const AdminReviews = lazy(() => import('./pages/admin/Reviews'))
const AdminClientUsers = lazy(() => import('./pages/admin/ClientUsers'))
const AdminAbout = lazy(() => import('./pages/admin/About'))
const ClientRegister = lazy(() => import('./pages/client/Register'))
const ClientLogin = lazy(() => import('./pages/client/Login'))
const ClientReview = lazy(() => import('./pages/client/Review'))
const ContractSigning = lazy(() => import('./pages/ContractSigning'))

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen bg-jetBlack flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-neonAqua border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await getSiteSettings();
        if (res.data && res.data.theme) {
          document.documentElement.setAttribute('data-theme', res.data.theme);
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, []);

  return (
    <div className="min-h-screen bg-jetBlack">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
              <FloatingContact />
            </>
          } />
          <Route path="/about-us" element={
            <>
              <Navbar />
              <About />
              <Footer />
              <FloatingContact />
            </>
          } />
          <Route path="/services" element={
            <>
              <Navbar />
              <Services />
              <Footer />
              <FloatingContact />
            </>
          } />
          <Route path="/projects" element={
            <>
              <Navbar />
              <Projects />
              <Footer />
              <FloatingContact />
            </>
          } />
          <Route path="/projects/:slug" element={
            <>
              <Navbar />
              <ProjectDetail />
              <Footer />
              <FloatingContact />
            </>
          } />
          <Route path="/blogs" element={
            <>
              <Navbar />
              <Blogs />
              <Footer />
              <FloatingContact />
            </>
          } />
          <Route path="/blogs/:slug" element={
            <>
              <Navbar />
              <BlogDetail />
              <Footer />
              <FloatingContact />
            </>
          } />
          <Route path="/quote" element={
            <>
              <Navbar />
              <Quote />
              <Footer />
              <FloatingContact />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
              <FloatingContact />
            </>
          } />

          {/* Client Routes */}
          <Route path="/client/register" element={<ClientRegister />} />
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/review" element={<ClientPrivateRoute><ClientReview /></ClientPrivateRoute>} />
          <Route path="/contract/:token" element={<ContractSigning />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/projects" element={<PrivateRoute><AdminProjects /></PrivateRoute>} />
          <Route path="/admin/blogs" element={<PrivateRoute><AdminBlogs /></PrivateRoute>} />
          <Route path="/admin/services" element={<PrivateRoute><AdminServices /></PrivateRoute>} />
          <Route path="/admin/quotes" element={<PrivateRoute><AdminQuotes /></PrivateRoute>} />
          <Route path="/admin/contracts" element={<PrivateRoute><AdminContracts /></PrivateRoute>} />
          <Route path="/admin/reviews" element={<PrivateRoute><AdminReviews /></PrivateRoute>} />
          <Route path="/admin/client-users" element={<PrivateRoute><AdminClientUsers /></PrivateRoute>} />
          <Route path="/admin/about" element={<PrivateRoute><AdminAbout /></PrivateRoute>} />
          <Route path="/admin/settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
