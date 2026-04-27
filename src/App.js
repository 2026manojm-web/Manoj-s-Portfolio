import React, { useEffect } from 'react';
import './App.css';
import ThreeScene from './components/ThreeScene';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaCode, FaLaptopCode, FaBrain, 
  FaPhoneAlt, FaGraduationCap, FaChartLine, 
  FaPython, FaReact, FaJs, FaCss3Alt, FaHtml5 
} from 'react-icons/fa';
import { SiC, SiCplusplus, SiLeetcode } from 'react-icons/si';
import { DiJava } from 'react-icons/di';

function App() {

  useEffect(() => {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  }, []);

  return (
    <div className="App">
      <ThreeScene />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <CodingStats />
      <Academics />
      <Internship />
      <Footer />
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">✨ MANOJ KUMAR M</div>
      <ul className="nav-links">
        <li><a href="#home">🏠 Home</a></li>
        <li><a href="#about">👤 About</a></li>
        <li><a href="#skills">⚡ Skills</a></li>
        <li><a href="#coding">💻 Coding</a></li>
        <li><a href="#academics">📚 Academics</a></li>
        <li><a href="#contact">📞 Contact</a></li>
      </ul>
    </nav>
  );
};

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        
        <h1 className="glitch-text">Manoj Kumar M</h1>
        <h2>Aspiring Software Developer</h2>
        <p className="typed-text">✨ CSE Student | Problem Solver | Tech Enthusiast ✨</p>
        <div className="hero-buttons">
          <button onClick={scrollToContact} className="btn-primary">
            <FaPhoneAlt style={{ marginRight: '8px' }} /> Contact Me
          </button>
          <a href="#coding" className="btn-secondary">View Coding Stats</a>
        </div>
        <div className="social-links">
          <a href="https://github.com/2026manojm-web" className="social-link-item" target="_blank" rel="noopener noreferrer">
            <FaGithub /> <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/manoj-kumar-m77" className="social-link-item" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> <span>LinkedIn</span>
          </a>
          <a href="mailto:2026manojm@gmail.com" className="social-link-item">
            <FaEnvelope /> <span>Email</span>
          </a>
          <a href="https://leetcode.com/u/MANOJ_KUMAR_008/" className="social-link-item" target="_blank" rel="noopener noreferrer">
            <SiLeetcode /> <span>LeetCode</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">📖 About Me</h2>
        <div className="about-content">
          <div className="about-card">
            <p>I am a Computer Science engineering student with a strong interest in problem-solving and programming. I continuously work on improving my skills through coding practice and projects. I am consistent and resilient in overcoming challenges and learning new technologies. I enjoy exploring concepts beyond academics and building practical solutions. My goal is to grow as a skilled and impactful developer.</p>
            <p className="about-highlight">"Code. Create. Innovate."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const programmingLanguages = [
    { name: 'C', icon: <SiC />, color: '#00599C' },
    { name: 'C++', icon: <SiCplusplus />, color: '#00599C' },
    { name: 'Python', icon: <FaPython />, color: '#3776AB' }
  ];
  
  const webTechnologies = [
    { name: 'HTML', icon: <FaHtml5 />, color: '#E34F26' },
    { name: 'CSS', icon: <FaCss3Alt />, color: '#1572B6' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
    { name: 'React', icon: <FaReact />, color: '#61DAFB' }
  ];
  
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">⚡ Technical Skills</h2>
        
        <div className="skills-category">
          <h3 className="category-title">💻 Programming Languages</h3>
          <div className="skills-grid programming-grid">
            {programmingLanguages.map((skill, index) => (
              <div key={index} className="skill-card" style={{ '--skill-color': skill.color }}>
                <div className="skill-icon">{skill.icon}</div>
                <span>{skill.name}</span>
                <div className="skill-glow"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3 className="category-title">🌐 Web Technologies</h3>
          <div className="skills-grid web-grid">
            {webTechnologies.map((skill, index) => (
              <div key={index} className="skill-card" style={{ '--skill-color': skill.color }}>
                <div className="skill-icon">{skill.icon}</div>
                <span>{skill.name}</span>
                <div className="skill-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CodingStats = () => {
  return (
    <section id="coding" className="coding-stats">
      <div className="container">
        <h2 className="section-title">📊 Coding Journey</h2>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <h3>20+ Problems</h3>
            <p>Solved on LeetCode</p>
            <a href="https://leetcode.com/u/MANOJ_KUMAR_008/" className="stat-link" target="_blank" rel="noopener noreferrer">View Profile →</a>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <h3>4 Levels</h3>
            <p>Completed in C - PS Portal</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <h3>Learning React</h3>
            <p>Building this portfolio!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Academics = () => {
  return (
    <section id="academics" className="academics">
      <div className="container">
        <h2 className="section-title">📚 Academic Excellence</h2>
        <div className="academic-stats">
          <div className="academic-card">
            <div className="academic-icon">🎓</div>
            <h3>SSLC</h3>
            <div className="percentage">
              <span className="number">88.6%</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '88.6%' }}></div>
              </div>
            </div>
           
          </div>
          
          <div className="academic-card">
            <div className="academic-icon">📖</div>
            <h3>HSC (12th)</h3>
            <div className="percentage">
              <span className="number">84.5%</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '84.5%' }}></div>
              </div>
            </div>
           
          </div>
          
          <div className="academic-card">
            <div className="academic-icon">💎</div>
            <h3>Current CGPA</h3>
            <div className="percentage">
              <span className="number">8.345</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '83.45%' }}></div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
};

const Internship = () => {
  return (
    <section id="internship" className="internship">
      <div className="container">
        <h2 className="section-title">🌟 Open to Opportunities</h2>
        <div className="internship-card">
          <div className="pulse-ring"></div>
          <p>🔍 I'm actively seeking internship opportunities in <strong>Software Development</strong> or <strong>Web Development</strong>.</p>
          <p>💡 If you're looking for a passionate, quick-learning first-year student who's eager to contribute and grow, let's connect!</p>
          <a href="mailto:2026manojm@gmail.com" className="btn-primary">📧 Email Me Now</a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const callNow = () => {
    window.location.href = 'tel:6380894412';
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <h3>✨ Let's Connect ✨</h3>
        <div className="contact-cards">
          <div className="contact-card" onClick={callNow}>
            <div className="contact-icon">📞</div>
            <h4>Call Me</h4>
            <p>+91 6380894412</p>
            <span className="click-hint">Click to call →</span>
          </div>
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <h4>Email Me</h4>
            <p>2026manojm@gmail.com</p>
            <a href="mailto:2026manojm@gmail.com" className="contact-link">Send Email →</a>
          </div>
        </div>
        <div className="footer-links">
          <a href="https://github.com/2026manojm-web" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
          <a href="https://linkedin.com/in/manoj-kumar-m77" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
          <a href="https://leetcode.com/u/MANOJ_KUMAR_008/" target="_blank" rel="noopener noreferrer">⚡ LeetCode</a>
        </div>
        <p style={{ marginTop: '2rem', opacity: 0.7 }}>© 2024 Manoj Kumar M | Crafted with 💻 passion</p>
      </div>
    </footer>
  );
};

export default App;