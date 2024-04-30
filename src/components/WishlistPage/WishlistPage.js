import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, Image, Tooltip } from "@mantine/core";
import { IconHeart, IconHeartFilled, IconBrandSpotifyFilled } from "@tabler/icons-react";
import { removeFromWishlist } from "../../store/slices/albumsSlice";
import { useTranslation } from "react-i18next";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.albums.wishlist);
  const { t } = useTranslation("wishlist");

  const handleRemoveFromWishlist = (albumId) => {
    dispatch(removeFromWishlist({ albumId }));
  };

  const logAlbumsInfo = () => {
    console.log("Albums in wishlist array", wishlist.length);
    console.log("Albums details:", wishlist);
  };
  
  useEffect(() => {
    logAlbumsInfo();
  }, [wishlist]);

  return (
    <div>
      <h1>{t("wishlist-title")}</h1>
      {wishlist.length === 0 ? (
        <p>{t("wishlist-text")}</p>
      ) : (
        <div className="albums-container">
          {wishlist.map(album => (
            <div key={album.id} className="album-card">
              <Image src={album.picture} alt={album.title} />
              <div>
                <Tooltip 
                  label={album.title}
                  color="violet"
                  position="top-start" 
                  offset={0}
                  transitionProps={{ transition: "skew-up", duration: 300 }}> 
                  <h2>{album.title}</h2>
                </Tooltip>
                <p>{album.artist}</p>
              </div>
              <a href={album.albumLink} target="_blank">Listen on Spotify <IconBrandSpotifyFilled /></a>
              <div className="buttons-container">
                <ActionIcon 
                  onClick={() => handleRemoveFromWishlist(album.id)} 
                  variant={album.wishlistVariant} 
                  size="lg" 
                  color="violet" 
                  aria-label="Remove from Wishlist">
                    {album.wishlistVariant === "default" ? <IconHeart stroke={2} /> : <IconHeartFilled stroke={2} />}
                </ActionIcon>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
