import React, { useState, Fragment } from "react";
import FileDrop from "./FileDrop/FileDrop";
import Gallery from "./Gallery/Gallery";
import classes from "./Photos.css";
import Button from "../UI/Button/Button";

const savePhotos = () => {
  //add route to api to upload images i.e. /api/addImages
  //this route will add the images to cloud storage
  //add route to api to get images from cloud storage i.e.
  //add image urls to db i.e. imgUrls: ["/api/images/:place_id/name"]
};

const Photos = ({ locationDetails }) => {
  const [photos, setPhotos] = useState(locationDetails.imgUrls);
  return (
    <div className={classes.photosPage}>
      <FileDrop setPhotos={setPhotos} photos={photos} />
      {photos.length > 0 && (
        <Fragment>
          <Gallery
            setPhotos={setPhotos}
            photos={photos}
            photosLength={photos.length}
          />
          <div className={classes.saveButton}>
            <Button btnType={"Success"} clicked={() => savePhotos(photos)}>
              Save
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Photos;
