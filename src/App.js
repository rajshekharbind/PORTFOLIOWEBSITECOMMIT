import "./App.css"
import Navbar from "./Navbar/Navbar";
import Home from "./PortfolioContainer/Home/Home";
import ContactMe from "./PortfolioContainer/ContactMe/ContactMe";
import ProjectSection from "./PortfolioContainer/ProjectSection/ProjectSection";
import AboutMe from "./PortfolioContainer/AboutMe/AboutMe";

function App() {
  return (
    <div className="App">
       <Navbar/>
    <Home/>
   <ContactMe/>
   <ProjectSection/>
   <AboutMe/>
    </div>
  );
}

export default App;
