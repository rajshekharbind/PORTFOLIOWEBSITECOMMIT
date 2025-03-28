import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import "./Profile.css";
const Profile = () => {
  return (
    <div className='profile-container'>
      <div className='profile-parent'>
        <div className='profile-details'>
          <div className='colz'>
          
          </div>

          <div className='profile-details-name'>
            <span className='primary-text'>
              {" "}
              Hello, I'M <span className='highlighted-text'>RajShekhar</span>
            </span>
          </div>
          <div className='profile-details-role'>
            <span className='primary-text'>
              {" "}
              <h1>
                <Typewriter 
                  words={[
                    "Raj Dev ",
                    "Full Stack Developer",
                    "MERN Stack Dev",
                    "Cross Platform Dev",
                    "React/React Native Dev",
                  ]}
                  loop={Infinity}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <span className="profile-role-tagline">
  Knack for building applications with front-end and back-end operations.  
  <br />
  Passionate B.Tech student skilled in full-stack development<br />
  and competitive programming. Enthusiastic about web technologies,<br />
    problem-solving, and creating impactful digital experiences..
</span>
            </span>
          </div>
          <div className='profile-option'>
            <button className='btn primary-btn'> 
              {" "}
              Hire Me{" "}
            </button>
            <a href="/myresume.pdf" download='myresume.pdf'>
              <button className='btn highlighted-btn'>
               Get Resume
              </button>
            </a>
          </div>
        </div>
          <div className="profile-picture">
            
            <div className="profile-picture-background">
            <div className="colz-icon">

         <div className='ab'> 
<a href="https://www.linkedin.com/in/raj-shekhar-92012a298/">
  <i className='fa fa-linkedin-square'></i>
</a>
<a href="https://github.com/rajshekharbind">
  <i className='fa fa-github-square'></i>
</a>
<a href="https://www.instagram.com/raju.rajsekhar123/">
  <i className='fa fa-instagram'></i>
</a>
<a href="#">
  <i className='fa fa-youtube-square'></i>
</a>
<a href="#">
  <i className='fa fa-twitter'></i>
</a>
</div> 
</div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Profile;

