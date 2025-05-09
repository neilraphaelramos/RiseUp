import React from 'react';
import YouTube from 'react-youtube';

function Video_GC() {
  const videoId = 'lVEddNXclAQ'; // YouTube video ID

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* YouTube Video */}
      <div className="mb-6 flex justify-center">
        <YouTube videoId={videoId} opts={opts} />
      </div>

      {/* Featured Section */}
      <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Featured</h2>
        <img
          src="/path-to-your-featured-image.jpg"
          alt="Featured Scripture"
          className="rounded-lg w-full"
        />
        <p className="mt-2">Scripture for Thursday</p>
      </div>
    </div>
  );
}

export default Video_GC;
