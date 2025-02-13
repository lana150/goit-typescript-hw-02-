import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import s from "./App.module.css";

const ACCESS_KEY = "_n-WbaYYa46dr_uXsPI1IKic8i9afKM0-wnW4vh-ACg";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Використання useCallback для стабілізації функції fetchImages
  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, page, per_page: 12 },
          headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        }
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setError(null);
    } catch (error) {
      setError(`Could not fetch images. Try again later. ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  // Використання fetchImages у useEffect
  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  const handleSearchSubmit = (inputQuery) => {
    if (!inputQuery.trim()) {
      toast.error("Please enter a search term!");
      return;
    }
    setQuery(inputQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const loadMoreImages = () => setPage((prevPage) => prevPage + 1);

  const openModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className={s.box}>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {showModal && <ImageModal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;