const getYouTubeEmbedUrl = (url: string) => {
  if (!url) {
    return "";
  }

  let videoId = "";
  // Regular expression to find the video ID from various YouTube URL formats
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);

  if (match && match[1]) {
    videoId = match[1];
  } else if (url.includes("embed")) {
    // If it's already an embed link, we can just return it
    return url;
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}`;
};

export default getYouTubeEmbedUrl;
