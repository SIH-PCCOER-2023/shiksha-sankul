import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const YouTubeCard = ({ videoData }) => {
  return (
    <Container>
      <div className="youtube-grid">
        {videoData.map((video, index) => (
          <Card className="youtube-card" key={index}>
            <Card.Body>
              <Card.Title>{video.title}</Card.Title>
              <div className="video-container">
                <iframe
                  title={video.title}
                  width="320"
                  height="165"
                  src={video.url}
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default YouTubeCard;
