import * as React from 'react';
import { motion } from 'motion/react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Security, Analytics, Code, AutoAwesome, School, Verified } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

export const experiences = [
  {
    period: "Jan 2026 - Present",
    company: "Warmo",
    role: "Full-Stack Developer",
    icon: <AutoAwesome fontSize="small" sx={{ color: '#ffdf00' }} />,
    color: '#ffdf00',
    description: "Architected TargetSense AI to autonomously extract and qualify client leads using custom GenAI pipelines. Built multi-step automated email outreach with Redis job queues, SMTP connection pooling, and reply-detection auto-pause. Engineered a centralized multi-account unified inbox and completed an end-to-end cloud migration from AWS to GCP with MongoDB.",
    skills: ["Generative AI", "LLMs", "Node.js", "Redis", "MongoDB", "GCP / AWS", "Stripe", "SMTP/IMAP"]
  },
  {
    period: "Jan 2025 - Oct 2025",
    company: "Data Resolve Technologies",
    role: "Cyber Security Intern",
    icon: <Security fontSize="small" sx={{ color: '#ffdf00' }} />,
    color: '#ffdf00',
    description: "Engineered a Python ML logging tool (Pandas, Scikit-Learn) for anomaly detection in audit logs. Managed Linux CLI and PostgreSQL administration for enterprise & government DLP deployments. Implemented Watchdog for real-time log ingestion and orchestrated multi-platform agent rollouts across ASEAN and MEA clients.",
    skills: ["Cybersecurity", "Python", "Scikit-Learn", "PostgreSQL", "Linux", "SIEM", "DLP Protocols"]
  },
  {
    period: "Aug 2023 - Mar 2024",
    company: "Mu Sigma Business Solutions",
    role: "Decision Scientist",
    icon: <Analytics fontSize="small" sx={{ color: '#ffdf00' }} />,
    color: '#ffdf00',
    description: "Developed a Python ARIMA time-series sales forecasting model for Microsoft. Built an automated Tableau analytics dashboard monitoring clinical trials in real-time for a major U.S. pharmaceutical firm, and analyzed Nike's supply chain bottlenecks to optimize inventory management.",
    skills: ["ARIMA Modeling", "Python", "SQL", "Tableau", "Data Analytics", "Client Strategy"]
  },
  {
    period: "Feb 2023 - Apr 2023",
    company: "Webixy Technologies",
    role: "Web Developer Intern",
    icon: <Code fontSize="small" sx={{ color: '#ffdf00' }} />,
    color: '#ffdf00',
    description: "Engineered responsive, accessible frontend web interfaces and reusable UI components. Collaborated on cross-browser optimization, REST API integration, and modern JavaScript development.",
    skills: ["React", "JavaScript", "Tailwind CSS", "REST APIs", "HTML/CSS"]
  }
];

export const credentials = [
  {
    title: "B.Tech in Computer Science",
    institution: "SRM Institute of Science and Technology",
    period: "2019 – 2023",
    badge: "CGPA: 9.0",
    icon: <School fontSize="small" sx={{ color: '#ffdf00' }} />
  },
  {
    title: "Meta Certified Frontend Developer",
    institution: "Meta (Coursera)",
    period: "Credentials",
    badge: "3 Certifications",
    details: "Intro to Front-End Dev • Programming with JavaScript • Version Control",
    icon: <Verified fontSize="small" sx={{ color: '#ffdf00' }} />
  }
];

export default function TimelineComponent() {
  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-bat-400/80">
              {"// 01. TIMELINE & EXPERIENCE"}
            </span>
            <span className="h-px flex-1 bg-cyber-border" />
          </div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold text-white tracking-wider text-balance">
              Work Experience
            </h2>
            <span className="hidden sm:block font-orbitron font-bold text-6xl lg:text-7xl leading-none text-white/[0.05] select-none" aria-hidden="true">01</span>
          </div>
          <p className="mt-3 text-sm sm:text-base text-gray-400 font-sans max-w-lg text-pretty">
            Full-stack engineering, generative AI systems, enterprise cybersecurity, and data science consulting.
          </p>
        </motion.div>

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
                    bgcolor: '#121622',
                    border: `2px solid ${exp.color}`,
                    p: 1.2,
                    m: 0,
                  }}
                >
                  {exp.icon}
                </TimelineDot>
                {index < experiences.length - 1 && (
                  <TimelineConnector
                    sx={{
                      bgcolor: '#1e2436',
                      width: '2px',
                      my: 1,
                    }}
                  />
                )}
              </TimelineSeparator>

              <TimelineContent sx={{ py: 0, px: { xs: 2, sm: 3 } }}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
                  className="relative group rounded-xl border border-cyber-border bg-cyber-card p-5 sm:p-6 hover:border-bat-500/40 hover:-translate-y-0.5 transition duration-200"
                >
                  <span className="absolute inset-x-6 top-0 h-px bg-bat-400/0 group-hover:bg-bat-400/70 transition-colors duration-300 pointer-events-none" />

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
                        }}
                        className="text-white group-hover:text-bat-300 transition-colors"
                      >
                        {exp.company}
                      </Typography>
                      <span className="text-xs sm:text-sm font-mono text-bat-400 font-medium">
                        {exp.role}
                      </span>
                    </div>

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide tabular-nums bg-white/5 border border-white/10 text-gray-300 self-start sm:self-auto">
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
                </motion.div>
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
            {credentials.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
                className="relative group rounded-xl border border-cyber-border bg-cyber-card p-5 flex items-start gap-3.5 hover:border-bat-500/40 hover:-translate-y-0.5 transition duration-200"
              >
                <span className="absolute inset-x-6 top-0 h-px bg-bat-400/0 group-hover:bg-bat-400/70 transition-colors duration-300 pointer-events-none" />
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white font-orbitron truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-bat-950/60 border border-bat-500/30 text-bat-300 shrink-0">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
