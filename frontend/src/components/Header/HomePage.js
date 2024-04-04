import React from 'react';
const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <h1 className="homepage-heading">Welcome to Shiksha Sankul</h1>
        <p className="homepage-paragraph">Our homepage aims to provide comprehensive details about Shiksha Sankul, a platform tailored for student learning. Here, students can take tests, monitor their progress, access learning materials curated by faculty members, and receive personalized support. Faculty members, on the other hand, can manage student performance, update lists categorizing learners based on their pace, distribute educational resources such as notes and videos, and assess student achievements effectively.</p>
        <ul className="homepage-bullets">
          <li className="homepage-bullet-item">Learning Resources: Extensive learning materials including notes, videos, and other resources are available for students to enhance their understanding of subjects</li>
          <li className="homepage-bullet-item">Interactive Testing: Students can take various tests and quizzes to assess their understanding and knowledge.</li>
          <li className="homepage-bullet-item">Performance Tracking: Access to performance analytics allows students to monitor their progress over time and identify areas for improvement.
</li>
        </ul>
      </div>
    </div>
  );
};
export default HomePage;