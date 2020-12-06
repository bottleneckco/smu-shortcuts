import React, { useEffect } from 'react';
import logo from '../images/logo-nobg.png';
import './styles.scss';
import ReactGA from 'react-ga';

export const About: React.FC = () => {
  useEffect(() => {
    document.title = 'SMU Shortcuts | About';
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div>
      <header className="header">
        <h1>About</h1>
      </header>

      <main className="mainView">
        <img src={logo} className="shortcutsLogo" alt="shortcut-logo" />
        <p>
          Providing students a quick one-click bookmarks to commonly used sites
          in SMU.
        </p>
        <p> Designed by SMU students for SMU students </p>
        <p>This site is non-affliated with SMU.</p>

        <div className="contribute">
          <div className="aboutHeader">Contribute</div>
          <p>Want to add more sites or offer suggestions?</p>
          <ul className="listView">
            <li>
              SMU Student? Make a suggestion&nbsp;
              <a href="https://bit.ly/30SRyIo">here</a>
            </li>
            <li>
              Developer? Add an issue or make a pull request on&nbsp;
              <a href="https://github.com/bottleneckco/smu-shortcuts">Github</a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default About;