const YouTubeCard = ({ videoData }) => {
  return (
    <>
      {videoData.map((video, index) => (
        <div className="youtube-card" key={index}>
          <p>{video.title}</p>
          <div className="video-container">
            <iframe
              title={video.title}
              width="336"
              height="189"
              src={video.url}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      ))}
    </>
  );
};

export default YouTubeCard;
