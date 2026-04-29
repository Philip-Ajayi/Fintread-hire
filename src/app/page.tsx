"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Globe, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Mail, 
  ShieldCheck, 
  Zap, 
  FileText,
  Trash2,
  Plus
} from 'lucide-react';

type Job = {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  description: string;
};

// --- Mock Data ---
const JOBS = [
  {
    id: 'aml-officer',
    title: 'Anti Money Laundering Officer',
    slug: 'anti-money-laundering-officer',
    tags: ['Remote', 'Part-time', '2% Profit Share'],
    description: `
       <p><strong>About Purside Ltd</strong></p>
       <p>We are a mission-driven fintech startup currently in a pre-operational, pre-revenue stage. Registered in the United Kingdom, we are preparing to expand into the Philippine market by securing an Operator of Payment System (OPS) license. Our immediate mission is to build and deploy a high-speed, technologically advanced payment infrastructure tailored for the Philippines, with a long-term vision to scale across Asia. We are building a remote-first culture that prioritizes user experience, strong engineering standards, and lean, automated growth.</p>
       <p><strong>The Opportunity – AML Lead</strong></p>
       <p>We are looking for an Anti-Money Laundering (AML) expert to join us as a founding team member. This is a unique opportunity to help shape the compliance and risk foundation of the company from inception. The role is initially remote and part-time, with a clear path toward a full-time leadership position as we scale operations and secure regulatory approvals. As a founding member, you will be deeply integrated into our regulatory and product strategy before launch.</p>
       <p><strong>Compensation and Leadership Potential</strong></p>
       <p>Initial compensation is profit-based, set at 2% of company profit (calculated after tax but before shareholder deductions) with a strict cap of £30,000. As the startup reaches key milestones, a fixed base salary will be negotiated. Based on performance and strategic fit, there is potential to transition into a senior executive role, including leadership of compliance or broader risk functions during our launch and growth phase.</p>
       <p><strong>Your Impact</strong></p>
       <p>You will be responsible for building and safeguarding the company’s financial crime prevention framework. While initial compliance policies are already being drafted, your role will focus on reviewing, strengthening, and operationalizing them to meet both international standards and Philippine regulatory requirements. You will work closely with our engineers to ensure a “compliance by design” approach, embedding AML/KYC controls directly into our systems while maintaining a seamless user experience. This role requires balancing regulatory rigor with the speed and adaptability of a startup environment.</p>
       <p><strong>Requirements</strong></p>
       <p><strong>Minimum of a BSc in Finance, Law, Criminology, or a related field.</strong></p>
       <p><strong>Strong experience within fintech or payment systems, specifically in AML/KYC and financial crime compliance.</strong></p>
       <p><strong>Solid understanding of international AML regulations and readiness to align with Philippine OPS requirements.</strong></p>
       <p><strong>Technical literacy with the ability to collaborate effectively with engineers and product teams.</strong></p>
       <p><strong>Entrepreneurial mindset and comfort working in a remote-first, high-growth environment.</strong></p>
       <p><strong>Strong analytical skills with a disciplined approach to documentation and decision-making.</strong></p>
       <p>We aim to begin interviews and team integration shortly to ensure readiness ahead of our regulatory and product launch milestones. If you are interested in shaping the compliance backbone of a next-generation payment company in Asia, we would like to hear from you.</p>
    `
  },
  {
    id: 'product-management',
    title: 'Head of Product',
    slug: 'product-management',
    tags: ['Remote', 'Part-time', '2% Profit Share'],
    description: `
      <p><strong>The Vision at Purside Ltd</strong></p>
      <p>We are a mission-driven fintech startup currently in a pre-operational, pre-revenue stage. Registered in the United Kingdom, we are preparing to expand into the Philippine market by securing an Operator of Payment System (OPS) license. Our goal is to build a high-speed, technologically advanced payment infrastructure tailored for the Philippines, with a long-term roadmap for scaling across Asia. We are building a lean, remote-first culture that prioritizes automation, engineering excellence, and a deep obsession with user experience.</p>
      <p><strong>The Opportunity – Head of Product</strong></p>
      <p>We are seeking a visionary Head of Product to join us as a founding team member. This is an opportunity to build from the ground up and define the product vision, strategy, and execution. To ensure flexibility for both parties, this initial engagement is remote and part-time, with a clear trajectory toward a full-time leadership role as we scale. You will be integrated into the team immediately, helping us prepare for a successful launch and ensuring our product strategy aligns with our mission-driven goals.</p>
      <p><strong>Compensation and Executive Path</strong></p>
      <p>As a founding member, your initial compensation is profit-based, structured at 2% of company profit (post-tax, pre-shareholder deduction) with a strict cap of £35,000. Once the startup reaches established milestones, we will move toward a negotiated fixed base salary. Exceptional candidates may also be considered for an executive leadership role or board-level involvement as we approach our final product launch phase.</p>
      <p><strong>Your Impact and Responsibilities</strong></p>
      <p>You will lead the translation of our vision into a scalable product strategy and execution roadmap. Working closely with our software builders, you will define product requirements, establish engineering standards, and ensure efficient delivery without compromising quality. You will champion a user-first approach, leverage automation to maintain operational efficiency, and refine internal policies to support a world-class product experience.</p>
      <p><strong>Requirements</strong></p>
      <p><strong>BSc in Computer Science, Business Administration, Engineering, or a related field.</strong></p>
      <p><strong>Extensive experience in product management, preferably within fintech or payment systems.</strong></p>
      <p><strong>Proven ability to lead product teams and collaborate with engineers to deliver complex technical products.</strong></p>
      <p><strong>Strong expertise in product strategy, technical documentation, and structured decision-making.</strong></p>
      <p><strong>An entrepreneurial mindset with comfort in remote-first, high-growth startup environments.</strong></p>
      <p><strong>Excellent analytical skills with a strong focus on execution and user-centric design.</strong></p>
      <p>We intend to conduct interviews and begin team integration shortly to ensure our founding team is ready for launch. If you are ready to shape the future of payments in the Philippines and beyond, we want to hear from you.</p>
    `
  }
];

const LANGUAGES = ['English', 'Spanish', 'Tagalog', 'Mandarin', 'French', 'German', 'Japanese', 'Arabic', 'Hindi', 'Portuguese'];
const FLUENCY_LEVELS = ['Conversational', 'Professional', 'Native'];

// --- Components ---

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

const GlassCard = ({ children, className = "", hover = true }: GlassCardProps) => (
  <motion.div 
    whileHover={hover ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" } : {}}
    className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

const BackgroundEffect = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden">
      <motion.div 
        animate={{
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50, mass: 0.5 }}
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]"
      />
      <motion.div 
        animate={{
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
        }}
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[100px]"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, jobs, apply
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
  email: string;
  cv: File | null;
  languages: { name: string; level: string }[];
  yearsExperience: number;
  readyToHire: boolean | null;
  remoteReady: boolean | null;
  currentJobStatus: string;
  commitmentCheck: boolean;
}>({
    email: '',
    cv: null,
    languages: [{ name: 'English', level: 'Native' }],
    yearsExperience: 5,
    readyToHire: null,
    remoteReady: null,
    currentJobStatus: '',
    commitmentCheck: false
  });

  // Handle Hash Routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#job-')) {
        const jobId = hash.replace('#job-', '');
        const job = JOBS.find(j => j.id === jobId);
        if (job) {
          setSelectedJob(job);
          setActiveTab('jobs');
        }
      } else if (hash === '#jobs') {
        setActiveTab('home');
        document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setActiveTab('apply');
    setStep(1);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    const form = new FormData();

    form.append("email", formData.email);
    form.append("cv", formData.cv!);
    form.append("yearsExperience", String(formData.yearsExperience));
    form.append("remoteReady", String(formData.remoteReady));
    form.append("readyToHire", String(formData.readyToHire));
    form.append("currentJobStatus", formData.currentJobStatus);
    form.append("languages", JSON.stringify(formData.languages));

    const res = await fetch("/api/send-application", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      nextStep(); // go to success screen
    } else {
      alert("Failed to submit");
    }
  };

  // Form Step Validation
  const isStepValid = () => {
    switch(step) {
      case 1: return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 2: return formData.cv !== null;
      case 3: return formData.languages.length > 0;
      case 4: return true; // Slider always valid
      case 5: return formData.readyToHire !== null;
      case 6: return formData.remoteReady !== null;
      case 7: return formData.currentJobStatus.length > 10 && formData.commitmentCheck;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      <BackgroundEffect />
      
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-24"
            >
              {/* Hero Section */}
              <section className="min-h-[80vh] flex flex-col justify-center items-center text-center space-y-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wider uppercase"
                >
                  Innovating Payment
                </motion.div>
                <motion.h1 
                  className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 leading-tight"
                >
                  PURSIDE LTD.
                </motion.h1>
                <motion.p className="text-sm text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-xl max-w-xl">
                  ⚠️ This page is for recruitment purposes only. This domain is not the official product platform of Purside Ltd.
                </motion.p>
                <motion.p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                  A mission-driven, remote-first fintech culture that prioritizes speed and growth. We are building the future of cross-border payments in the Philippines.
                </motion.p>
                
                <motion.div className="flex gap-4 pt-8">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('jobs-section');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-slate-200 transition-colors flex items-center gap-2"
                  >
                    View Open Roles <ChevronRight size={20} />
                  </button>
                  <a 
                    href="https://linkedin.com/company/purside" 
                    target="_blank"
                    className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    LinkedIn
                  </a>
                </motion.div>
              </section>

              {/* Culture Section */}
              <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold tracking-tight">Our Culture</h2>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    We leverage automation to stay lean, obsess over user experience, and enable fast, structured decision-making through clear documentation, strong engineering standards, and customer-driven market execution.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <Zap size={20}/>, title: "Speed", desc: "Fast execution" },
                      { icon: <Globe size={20}/>, title: "Remote", desc: "Work anywhere" },
                      { icon: <ShieldCheck size={20}/>, title: "Trust", desc: "Compliant by design" },
                      { icon: <Briefcase size={20}/>, title: "Equity", desc: "Profit sharing" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-blue-400 mb-2">{item.icon}</div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <GlassCard className="p-8 space-y-4">
                  <div className="h-64 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-white/5">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border-2 border-dashed border-blue-500/30 rounded-full flex items-center justify-center"
                    >
                      <div className="w-24 h-24 border-2 border-blue-500/50 rounded-full animate-pulse" />
                    </motion.div>
                  </div>
                  <p className="italic text-slate-400 text-sm">"At Purside, we don't just move money; we move families forward. Our systems are built for reliability and global scale."</p>
                </GlassCard>
              </section>

              {/* Jobs Section */}
              <section id="jobs-section" className="space-y-12 pb-24">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold">Open Positions</h2>
                  <p className="text-slate-400">Join our pioneering team remotely.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {JOBS.map((job) => (
                    <GlassCard key={job.id} className="p-8 flex flex-col">
                      <div className="flex-1 space-y-4">
                        <h3 className="text-2xl font-bold leading-tight">{job.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => { setSelectedJob(job); setActiveTab('jobs'); }}
                        className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors"
                      >
                        View Details
                      </button>
                    </GlassCard>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'jobs' && selectedJob && (
            <motion.div
              key="job-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <button 
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} /> Back to roles
              </button>

              <GlassCard hover={false} className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-black">{selectedJob.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-blue-400 font-medium">
                    <span className="flex items-center gap-1"><Globe size={16}/> Remote</span>
                    <span className="flex items-center gap-1"><Clock size={16}/> Part-time (2% Profit Share)</span>
                  </div>
                </div>

                <div 
                  className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300"
                  dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                />

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Max Annual Reward: <span className="text-white font-bold">£35,000 GBP</span>
                  </div>
                  <button 
                    onClick={() => handleApply(selectedJob)}
                    className="w-full md:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all"
                  >
                    Apply for this position
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'apply' && (
            <motion.div
              key="apply-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Applying for {selectedJob?.title}</h2>
                  <p className="text-slate-400 text-sm">Step {step} of 9</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 w-6 rounded-full transition-colors ${i + 1 <= step ? 'bg-blue-500' : 'bg-white/10'}`} 
                    />
                  ))}
                </div>
              </div>

              <GlassCard hover={false} className="p-8 md:p-10 min-h-[500px] flex flex-col">
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-4">
                          <Mail size={32} />
                        </div>
                        <h3 className="text-3xl font-bold">What's your email?</h3>
                        <p className="text-slate-400">We'll use this to keep you updated on your application status.</p>
                        <input 
                          type="email"
                          placeholder="name@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xl outline-none focus:border-blue-500 transition-colors"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          autoFocus
                        />
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-4">
                          <Upload size={32} />
                        </div>
                        <h3 className="text-3xl font-bold">Upload your CV</h3>
                        <p className="text-slate-400">PDF preferred. Show us your impact.</p>
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-3xl hover:border-blue-500/50 hover:bg-white/5 cursor-pointer transition-all">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-slate-500" />
                            <p className="text-sm text-slate-400">
                              {formData.cv ? <span className="text-blue-400 font-bold">{formData.cv.name}</span> : "Click to upload or drag and drop"}
                            </p>
                          </div>
                          <input type="file" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFormData({ ...formData, cv: file });
                          }} />
                        </label>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-4">
                          <Globe size={32} />
                        </div>
                        <h3 className="text-3xl font-bold">Languages</h3>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {formData.languages.map((lang, idx) => (
                            <div key={idx} className="flex flex-col p-4 bg-white/5 border border-white/10 rounded-2xl gap-3">
                              <div className="flex justify-between items-center">
                                <select 
                                  value={lang.name}
                                  onChange={(e) => {
                                    const newLangs = [...formData.languages];
                                    newLangs[idx].name = e.target.value;
                                    setFormData({...formData, languages: newLangs});
                                  }}
                                  className="bg-transparent font-bold outline-none"
                                >
                                  {LANGUAGES.map(l => <option key={l} value={l} className="bg-[#111]">{l}</option>)}
                                </select>
                                <button onClick={() => {
                                  const newLangs = formData.languages.filter((_, i) => i !== idx);
                                  setFormData({...formData, languages: newLangs});
                                }} className="text-slate-500 hover:text-red-400">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                              <div className="flex gap-2">
                                {FLUENCY_LEVELS.map(level => (
                                  <button
                                    key={level}
                                    onClick={() => {
                                      const newLangs = [...formData.languages];
                                      newLangs[idx].level = level;
                                      setFormData({...formData, languages: newLangs});
                                    }}
                                    className={`flex-1 py-2 text-xs rounded-lg border transition-all ${lang.level === level ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-white/10 text-slate-400'}`}
                                  >
                                    {level}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => setFormData({...formData, languages: [...formData.languages, { name: 'Spanish', level: 'Professional' }]})}
                            className="w-full py-3 border border-dashed border-white/20 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors"
                          >
                            <Plus size={18} /> Add Language
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-4">
                          <Briefcase size={32} />
                        </div>
                        <h3 className="text-3xl font-bold">Years of expertise</h3>
                        <p className="text-slate-400">How many years in the financial service industry?</p>
                        <div className="pt-12 pb-6">
                          <input 
                            type="range" min="0" max="20" step="1"
                            value={formData.yearsExperience}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                yearsExperience: Number(e.target.value)
                              })
                            }
                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                          <div className="flex justify-between mt-4 text-2xl font-black text-blue-400">
                            <span>{formData.yearsExperience} Years</span>
                            <span className="text-sm font-medium text-slate-500">Expertise Level: {formData.yearsExperience > 10 ? 'Elite' : formData.yearsExperience > 5 ? 'Senior' : 'Professional'}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 5 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                         <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-4">
                          <Clock size={32} />
                        </div>
                        <h3 className="text-3xl font-bold">Ready to hire now?</h3>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          {[
                            { val: true, label: "Yes, immediately", icon: <CheckCircle2 /> },
                            { val: false, label: "In a few weeks", icon: <Clock /> }
                          ].map(opt => (
                            <button
                              key={opt.label}
                              onClick={() => setFormData({...formData, readyToHire: opt.val})}
                              className={`p-8 rounded-3xl border transition-all flex flex-col items-center gap-4 ${formData.readyToHire === opt.val ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                            >
                              {opt.icon}
                              <span className="font-bold">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 6 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-4">
                          <Globe size={32} />
                        </div>
                        <h3 className="text-3xl font-bold">Can you work remotely?</h3>
                        <p className="text-slate-400">Purside is a remote-first organization with hubs in the US and PH.</p>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                          {[
                            { val: true, label: "Yes, I'm remote-ready" },
                            { val: false, label: "No, I prefer office" }
                          ].map(opt => (
                            <button
                              key={opt.label}
                              onClick={() => setFormData({...formData, remoteReady: opt.val})}
                              className={`p-8 rounded-3xl border transition-all ${formData.remoteReady === opt.val ? 'bg-blue-600/20 border-blue-500' : 'bg-white/5 border-white/10'}`}
                            >
                              <span className="font-bold">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 7 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-4">
                          <FileText size={32} />
                        </div>
                        <h3 className="text-3xl font-bold">Your current Job status</h3>
                        <textarea 
                          placeholder="Tell us about your current role, and if you plan to stay or leave. Can you commit 3hrs/day and be responsive when called?"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[150px] outline-none focus:border-blue-500 transition-colors"
                          value={formData.currentJobStatus}
                          onChange={(e) => setFormData({...formData, currentJobStatus: e.target.value})}
                        />
                        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-2xl bg-white/5 border border-white/10">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-5 h-5 accent-blue-500"
                            checked={formData.commitmentCheck}
                            onChange={(e) => setFormData({...formData, commitmentCheck: e.target.checked})}
                          />
                          <span className="text-sm text-slate-300">I confirm I can dedicate at least 3 hours daily and remain responsive during agreed hours.</span>
                        </label>
                      </motion.div>
                    )}

                    {step === 8 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <h3 className="text-3xl font-bold">Review Application</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-white/5 py-2"><span className="text-slate-500">Email</span> <span>{formData.email}</span></div>
                          <div className="flex justify-between border-b border-white/5 py-2"><span className="text-slate-500">CV</span> <span>{formData.cv?.name}</span></div>
                          <div className="flex justify-between border-b border-white/5 py-2"><span className="text-slate-500">Exp</span> <span>{formData.yearsExperience} Years</span></div>
                          <div className="flex justify-between border-b border-white/5 py-2"><span className="text-slate-500">Remote</span> <span>{formData.remoteReady ? 'Yes' : 'No'}</span></div>
                          <div className="py-2"><span className="text-slate-500 block mb-1">Languages</span> 
                            <div className="flex flex-wrap gap-2">
                              {formData.languages.map(l => <span key={l.name} className="px-2 py-1 bg-white/10 rounded">{l.name} ({l.level})</span>)}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 bg-white/5 p-4 rounded-xl">By submitting, you agree to send your data to Purside's hiring team. We process applications within 48 hours.</p>
                      </motion.div>
                    )}

                    {step === 9 && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-12">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mx-auto mb-4">
                          <CheckCircle2 size={64} />
                        </div>
                        <h3 className="text-4xl font-black">Success!</h3>
                        <p className="text-slate-400 text-lg">Your application for the {selectedJob?.title} position has been successfully submitted. We'll be in touch soon.</p>
                        <button 
                          onClick={() => { setActiveTab('home'); setStep(1); }}
                          className="px-8 py-3 bg-white text-black font-bold rounded-xl"
                        >
                          Return Home 
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {step < 9 && (
                  <div className="pt-10 flex gap-4">
                    {step > 1 && (
                      <button 
                        onClick={prevStep}
                        className="px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button 
                      disabled={!isStepValid()}
                      onClick={step === 8 ? handleSubmit : nextStep}
                      className={`flex-1 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${isStepValid() ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/5 text-slate-600 cursor-not-allowed'}`}
                    >
                      {step === 8 ? "Submit Application" : "Continue"} <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Styles for scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
