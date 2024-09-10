import React from "react";
import Layout from "../../components/Layout/Layout";
import "./LandingPage.css";
import LandingCardInfo from "../../components/LandingCardInfo/LandingCardInfo";
import { cardsLandingPage } from "../../data/tabsData";

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <div className="landing-container">
        <div className="primary-att">
          <h1>Get more done with Taskly</h1>
          <p>
            Prioritize and manage your tasks in a way that's best for you. You
            can add due dates, labels, and checklists to your tasks.
          </p>
          <button className="landing-started-btn">Get Started</button>
        </div>
        <div className="landing-info">
          <h1>How Task Tracker helps you</h1>
          <p>
            Task Tracker is perfect for individuals or teams. It allows you to
            manage your workload, keep track of your tasks, and prioritize what
            needs to be done. It also integrates with other tools so you can
            keep everything in one place.
          </p>
        </div>
        <div className="landing-cards-container">
          {cardsLandingPage.map(({ title, description, card }, index) => (
            <LandingCardInfo
              key={index}
              title={title}
              image={card}
              description={description}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
