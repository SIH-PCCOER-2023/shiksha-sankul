import React from 'react';

const AboutPage = () => {
  return (
    <div className="aboutpage-container">
      <div className="aboutpage-card">
        <h1 className="aboutpage-heading">About Shiksha Sankul</h1>
        <p className="aboutpage-paragraph">Shiksha Sankul is a platform tailored for student learning. Our mission is to provide a comprehensive environment where students can excel in their academic journey. We offer a range of features designed to enhance learning experiences and support both students and faculty members.</p>
        <h2 className="aboutpage-subheading">For Students:</h2>
        <ul className="aboutpage-bullets">
          <li className="aboutpage-bullet-item">Take tests and quizzes to assess your knowledge.</li>
          <li className="aboutpage-bullet-item">Monitor your progress and track your performance over time.</li>
          <li className="aboutpage-bullet-item">Access a wide range of learning materials curated by experienced faculty members.</li>
          <li className="aboutpage-bullet-item">Receive personalized support and guidance to achieve your academic goals.</li>
        </ul>
        <h2 className="aboutpage-subheading">For Faculty Members:</h2>
        <ul className="aboutpage-bullets">
          <li className="aboutpage-bullet-item">Manage student performance and track their progress.</li>
          <li className="aboutpage-bullet-item">Update lists categorizing learners based on their pace and performance.</li>
          <li className="aboutpage-bullet-item">Distribute educational resources such as notes, videos, and assignments.</li>
          <li className="aboutpage-bullet-item">Assess student achievements effectively and provide timely feedback.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
