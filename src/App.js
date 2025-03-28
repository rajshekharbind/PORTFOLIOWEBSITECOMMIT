// import "./App.css"

// import Navbar from "./Navbar/Navbar";
// import Home from "./PortfolioContainer/Home/Home";
// import ContactMe from "./PortfolioContainer/ContactMe/ContactMe";
// import ProjectSection from "./PortfolioContainer/ProjectSection/ProjectSection";
// import AboutMe from "./PortfolioContainer/AboutMe/AboutMe";
// import Skills from "./PortfolioContainer/Skills/Skills";
// import Footer from "./PortfolioContainer/Footer/Footer";
// import ProgressBar from "./PortfolioContainer/Experience/ProgressBar";



// function App() {
//   return (
//     <div className="App">
//        <Navbar/>
       
//     <Home/>
//    <ContactMe/>
//    <ProjectSection/>
//    <Skills/>
//    <ProgressBar/>
//    <AboutMe/>
//    <Footer/>

//     </div>
//   );
// }

// export default App;

import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./PortfolioContainer/Home/Home";
import ContactMe from "./PortfolioContainer/ContactMe/ContactMe";
import ProjectSection from "./PortfolioContainer/ProjectSection/ProjectSection";
import AboutMe from "./PortfolioContainer/AboutMe/AboutMe";
import Skills from "./PortfolioContainer/Skills/Skills";
import Footer from "./PortfolioContainer/Footer/Footer";
import ProgressBar from "./PortfolioContainer/Experience/ProgressBar";

function App() {
  return (
    <div className="App">
      <Navbar />

      <section id="home">
        <Home />
      </section>

     

      <section id="projects">
        <ProjectSection />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <ProgressBar />

      <section id="contact">
        <ContactMe />
      </section>

     
      <Footer />
    </div>
  );
}

export default App;
