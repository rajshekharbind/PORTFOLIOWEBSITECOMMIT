import React from "react";
import "./ProgressBar.css";

const skills = [
  {
    category: "Frontend Technologies",
    items: [
      { name: "HTML", percentage: 95 },
      { name: "CSS", percentage: 90 },
      { name: "JavaScript", percentage: 85 },
      { name: "React.js", percentage: 80 },
      { name: "Tailwind css", percentage: 75 },
      { name: "Bootstrap", percentage: 70 },
    ],
  },
  {
    category: "Backend Technologies",
    items: [
      { name: "Node.js", percentage: 80 },
      { name: "Express.js", percentage: 75 },
      { name: "MongoDB", percentage: 70 },
      { name: "Postman Api", percentage: 45 },
    ],
  },
  {
    category: "Programing Language",
    items: [
      { name: "C-Programing", percentage: 80 },
      { name: "C++ Programing", percentage: 75 },
      { name: "Python", percentage: 70 },
      { name: "DSA", percentage: 45 },
    ],
  },
];

const ProgressBar = () => {
  return (
    <div className="progress-container">
      <div className="progress-left">
        {skills.map((section, index) => (
          <div key={index} className="skill-section">
            <h3 className="skill-category">{section.category}</h3>
            {section.items.map((skill, i) => (
              <div key={i} className="skill-wrapper">
                <div className="skill-info">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="progress-right">
        <h2>Project Overview</h2>
        <p>This project showcases my experience with modern web technologies.</p>
        {/* <ul>
          <li>Built using HTML, CSS, JavaScript, React.js for the frontend.</li>
          <li>Implemented backend using Node.js, Express.js, MongoDB, and Mongoose.</li>
          <li>Designed a fully responsive and interactive UI.</li>
        </ul> */}
       
        <h2 className="h1">Food Delivery Website</h2>
        <p>Our Food Delivery Website simplifies online food ordering by connecting customers with restaurants seamlessly. The process includes:</p>
        <ul>
          <li>User Registration & Login: Secure authentication for safe transactions.</li>
          <li>Browsing & Ordering: Explore menus, filter by cuisine, and add items to the cart.</li>
          <li>Cart & Checkout: Review orders, apply promo codes, and use secure payment options.</li>
          <li>Order Processing & Confirmation: Restaurants confirm orders, and customers get updates.</li>
        </ul>
        
        <h2 className="h1">Hospital Bed Management System Website..</h2>
        <p>The Hospital Bed Management System is a web-based platform:</p>
        <ul>
          <li>Real-Time Bed Availability: Displays updated information on occupied and vacant beds..</li>
          <li>Patient Admission & Discharge Management: Simplifies patient intake and discharge processes.</li>
          <li>Automated Booking System: Allows hospital staff to reserve beds quickly for emergency cases.</li>
          <li>Enhanced Hospital Efficiency: Reduces manual work, improves patient care, and minimizes wait times..</li>
        </ul>
      </div>
     
    </div>
  );
};

export default ProgressBar;