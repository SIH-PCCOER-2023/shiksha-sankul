import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const YouTubeCard = ({ videoData }) => {
  return (
    <>
      <Row>
        {videoData.map((video, index) => (
          <Col className="youtube-card" key={index}>
            <p>{video.title}</p>
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
          </Col>
        ))}
      </Row>
    </>
  );
};

export default YouTubeCard;
