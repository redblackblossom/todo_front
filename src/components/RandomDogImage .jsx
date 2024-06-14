import { useState, useEffect } from "react";

export default function RandomDogImage() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchRandomDogImage();
  }, []);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch("https://placedog.net/300/200?random");
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } else {
        console.error("Error fetching dog image:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  return (
    <div className="" onClick={fetchRandomDogImage}>
      {imageUrl ? (
        <img src={imageUrl} alt="Random Dog" className="rounded-md shadow-lg" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
