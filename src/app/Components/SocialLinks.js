import { BsLinkedin, BsTwitterX, BsGithub } from 'react-icons/bs';
import { SiGmail } from "react-icons/si";

const socialLinks = [
  { Icon: BsTwitterX, href: "https://twitter.com/mehrotrapranav1", label: "Twitter" },
  { Icon: BsLinkedin, href: "https://www.linkedin.com/in/pranav-mehrotra-879025194/", label: "LinkedIn" },
  { Icon: BsGithub, href: "https://github.com/kamikaazeyy?tab=overview&from=2024-03-01&to=2024-03-26", label: "GitHub" },
  { Icon: SiGmail, href: "mailto:mehrotrapranav240@gmail.com", label: "Email" }
];

export default function SocialLinks() {
  return (
    <div className="text-3xl sm:text-5xl flex justify-center flex-wrap gap-8 sm:gap-16 py-3 text-gray-600 dark:text-gray-400">
      {socialLinks.map(({ Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-200">
          <Icon aria-label={label} />
        </a>
      ))}
    </div>
  );
}