import React from 'react';

function Video_GC() {

  return (
    <div className="content-container">
      <div className="video-wrapper">
        <iframe
          width="700"
          height="400"
          src="https://www.youtube.com/embed/tkSQ9abv804"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}
        />
      </div>
    </div>
  );
}

export default Video_GC;
