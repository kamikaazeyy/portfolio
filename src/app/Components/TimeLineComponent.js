import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Security, Analytics, Code, AutoAwesome, School, Verified } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const experiences = [
  {
    period: "Jan 2026 - Present",
    company: "Warmo",
    role: "Full-Stack Developer",
    icon: <AutoAwesome fontSize="small" sx={{ color: '#00e5ff' }} />,
    color: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    description: "Architected TargetSense AI to autonomously extract and qualify client leads using custom GenAI pipelines. Built multi-step automated email outreach with Redis job queues, SMTP connection pooling, and reply-detection auto-pause. Engineered a centralized multi-account unified inbox and completed an end-to-end cloud migration from AWS to GCP with MongoDB.",
    skills: ["Generative AI", "LLMs", "Node.js", "Redis", "MongoDB", "GCP / AWS", "Stripe", "SMTP/IMAP"]
  },
  {
    period: "Jan 2025 - Oct 2025",
    company: "Data Resolve Technologies",
    role: "Cyber Security Intern",
    icon: <Security fontSize="small" sx={{ color: '#ff3355' }} />,
    color: '#ff3355',
    glowColor: 'rgba(255, 51, 85, 0.4)',
    description: "Engineered a Python ML logging tool (Pandas, Scikit-Learn) for anomaly detection in audit logs. Managed Linux CLI and PostgreSQL administration for enterprise & government DLP deployments. Implemented Watchdog for real-time log ingestion and orchestrated multi-platform agent rollouts across ASEAN and MEA clients.",
    skills: ["Cybersecurity", "Python", "Scikit-Learn", "PostgreSQL", "Linux", "SIEM", "DLP Protocols"]
  },
  {
    period: "Aug 2023 - Mar 2024",
    company: "Mu Sigma Business Solutions",
    role: "Decision Scientist",
    icon: <Analytics fontSize="small" sx={{ color: '#00e5ff' }} />,
    color: '#00e5ff',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    description: "Developed a Python ARIMA time-series sales forecasting model for Microsoft. Built an automated Tableau analytics dashboard monitoring clinical trials in real-time for a major U.S. pharmaceutical firm, and analyzed Nike's supply chain bottlenecks to optimize inventory management.",
    skills: ["ARIMA Modeling", "Python", "SQL", "Tableau", "Data Analytics", "Client Strategy"]
  },
  {
    period: "Feb 2023 - Apr 2023",
    company: "Webixy Technologies",
    role: "Web Developer Intern",
    icon: <Code fontSize="small" sx={{ color: '#ff3355' }} />,
    color: '#ff3355',
    glowColor: 'rgba(255, 51, 85, 0.4)',
    description: "Engineered responsive, accessible frontend web interfaces and reusable UI components. Collaborated on cross-browser optimization, REST API integration, and modern JavaScript development.",
    skills: ["React", "JavaScript", "Tailwind CSS", "REST APIs", "HTML/CSS"]
  }
];

const credentials = [
  {
    title: "B.Tech in Computer Science",
    institution: "SRM Institute of Science and Technology",
    period: "2019 – 2023",
    badge: "CGPA: 9.0",
    icon: <School fontSize="small" sx={{ color: '#00e5ff' }} />
  },
  {
    title: "Meta Certified Frontend Developer",
    institution: "Meta (Coursera)",
    period: "Credentials",
    badge: "3 Certifications",
    details: "Intro to Front-End Dev • Programming with JavaScript • Version Control",
    icon: <Verified fontSize="small" sx={{ color: '#ff3355' }} />
  }
];

export default function TimelineComponent() {
  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Cyber Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 font-mono text-xs tracking-wider">
            <span>{"// 01. TIMELINE & EXPERIENCE"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-white tracking-wider">
            Work Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-sans max-w-lg mx-auto">
            Full-stack engineering, generative AI systems, enterprise cybersecurity, and data science consulting.
          </p>
        </div>

        {/* MUI Timeline styled with Cyber aesthetics */}
        <Timeline 
          position="right"
          sx={{
            p: 0,
            m: 0,
            '& .MuiTimelineItem-root:before': {
              flex: 0,
              padding: 0,
            }
          }}
        >
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.company} className="pb-8">
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    bgcolor: '#0a0d17',
                    border: `2px solid ${exp.color}`,
                    boxShadow: `0 0 16px ${exp.glowColor}`,
                    p: 1.2,
                    m: 0,
                  }}
                >
                  {exp.icon}
                </TimelineDot>
                {index < experiences.length - 1 && (
                  <TimelineConnector 
                    sx={{ 
                      bgcolor: 'transparent',
                      width: '2px',
                      backgroundImage: `linear-gradient(to bottom, ${exp.color}, rgba(255,255,255,0.1))`,
                      my: 1,
                    }} 
                  />
                )}
              </TimelineSeparator>

              <TimelineContent sx={{ py: 0, px: { xs: 2, sm: 3 } }}>
                <div className="relative group rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-5 sm:p-6 backdrop-blur-md shadow-xl hover:border-cyan-500/40 transition-all duration-300">
                  {/* Subtle hover corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-2xl pointer-events-none">
                    <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl from-cyan-400/60 to-transparent" />
                  </div>

                  {/* Header: Company, Role, Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontFamily: 'var(--font-orbitron), sans-serif',
                          fontSize: { xs: '1.05rem', sm: '1.2rem' },
                          fontWeight: 700,
                          color: '#ffffff'
                        }}
                      >
                        {exp.company}
                      </Typography>
                      <span className="text-xs sm:text-sm font-mono text-cyan-400 font-medium">
                        {exp.role}
                      </span>
                    </div>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-white/5 border border-white/10 text-gray-300 self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans mb-4">
                    {exp.description}
                  </p>

                  {/* Tech stack badge pills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-gray-400 group-hover:text-gray-200 group-hover:border-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        {/* Education & Credentials Cards */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
              {"// EDUCATION & CERTIFICATIONS"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.map((item) => (
              <div 
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-5 backdrop-blur-md shadow-lg flex items-start gap-3.5 hover:border-cyan-500/40 transition-colors"
              >
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white font-orbitron truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 shrink-0">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 font-sans">
                    {item.institution}
                  </div>
                  <div className="text-[11px] font-mono text-gray-400 mt-1">
                    {item.period}
                  </div>
                  {item.details && (
                    <div className="text-[11px] text-gray-400 mt-2 font-mono border-t border-white/5 pt-1.5">
                      {item.details}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
