import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Custom hook to fetch hero images from the API
 */
export const useHeroImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/gallery?category=hero&active_only=true`);

        if (!response.ok) {
          throw new Error('Failed to fetch hero images');
        }

        const data = await response.json();

        if (data.success && data.data) {
          // Transform database images to match carousel format
          const transformedImages = data.data.map((img, index) => ({
            id: img.id,
            image: img.image_url, // Use image_url from database
            title: img.title,
            subtitle: img.description || 'Capturing your precious moments',
            alt: img.description || `Hero image ${index + 1}`,
            description: img.description
          }));

          setImages(transformedImages);
        } else {
          setImages([]);
        }
      } catch (err) {
        console.error('Error fetching hero images:', err);
        setError(err.message);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  return { images, loading, error };
};





