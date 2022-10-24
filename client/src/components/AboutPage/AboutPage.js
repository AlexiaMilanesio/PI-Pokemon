import React from "react";
import NavBar from "../Header/NavBar/NavBar";
import "./AboutPage.css";

const AboutPage = (props) => {
  return (
    <div className="about-component-container">
      <NavBar />

      <div className="about-container">
        <div className="about-app-container">
          <h3 className="about-title">About the app</h3>
          <div className="about-app-content-container">
            <p className="about-app-content">
              This is a Pokemon App, design by Zarina Alexía Milanesio - Henry
              Student 2022.
            </p>
            <br />
            <p className="about-app-content">
              You can use it to search for the pokemon you like the most, filter
              the pokemons by type and origin, or sort them by name or attack.
            </p>
            <br />
            <br />
            <div className="about-app-content">
              <p>Technology used:</p>

              <div className="technology-container">
                <div className="technology">
                  <ion-icon name="logo-html5"></ion-icon>
                  <span>HTML5</span>
                </div>
                <div className="technology">
                  <ion-icon name="logo-css3"></ion-icon>
                  <span>CSS3</span>
                </div>
                <div className="technology">
                  <ion-icon name="logo-javascript"></ion-icon>
                  <span>JavaScript</span>
                </div>
                <div className="technology">
                  <ion-icon name="aperture"></ion-icon>
                  <span>React</span>
                </div>
                <div className="technology">
                  <ion-icon name="nuclear"></ion-icon>
                  <span>Redux</span>
                </div>
                <div className="technology">
                  <ion-icon name="grid"></ion-icon>
                  <span>Sequelize - PostgresSQL</span>
                </div>
                <div className="technology">
                  <ion-icon name="flask"></ion-icon>
                  <span>Express</span>
                </div>
                <div className="technology">
                  <ion-icon name="paw"></ion-icon>
                  <span>Pokeapi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-myself-container">
          <h3 className="about-title smaller-title">Get to know the creator</h3>

          <ul className="contact-social-container">
            <div className="social-icons-container">
              <li className="contact-li">
                <a
                  href="https://github.com/AlexiaMilanesio"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  <ion-icon name="logo-github"></ion-icon> 
                  <p>AlexiaMilanesio</p>
                </a>
              </li>
              <li className="contact-li">
                <a
                  href="https://www.linkedin.com/in/zarina-alexia-milanesio/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  <ion-icon name="logo-linkedin"></ion-icon>
                  <p>zarina-alexia-milanesio</p>
                </a>
              </li>
              <li className="contact-li">
                <a
                  href="https://www.instagram.com/alemilanesio/"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  <ion-icon name="logo-instagram"></ion-icon>
                  <p>alemilanesio</p>
                </a>
              </li>
              <li className="contact-li contact-text">
                <a
                  href="mailto:alexiamilanesio9@gmail.com"
                  className="contact-social-link"
                >
                  <ion-icon name="mail"></ion-icon>
                  <p>alexiamilanesio9@gmail.com</p>
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
