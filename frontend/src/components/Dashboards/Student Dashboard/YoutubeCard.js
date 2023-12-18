const YouTubeCard = ({ videoData }) => {
  return (
    <>
      <div className="youtube-card">
        <p>{videoData.title}</p>
        <div className="video-container">
          <iframe
            title={videoData.title}
            width="336"
            height="189"
            src={videoData.embedUrl}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default YouTubeCard;
