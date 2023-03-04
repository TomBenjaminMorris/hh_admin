import React from "react";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
import classes from "./Gallery.css";
// import cuid from "cuid";

let idYo = 5;

class Gallery extends React.Component {
  state = {
    items: this.props.photos.map((val, index) => ({
      title: "Item " + index,
      index: index,
      id: idYo++,
      imageSrc: val,
    })),
  };

  componentDidUpdate(prevProps) {
    if (prevProps.photosLength !== this.props.photosLength) {
      this.setState({
        items: this.props.photos.map((val, index) => ({
          title: "Item " + index,
          index: index,
          id: idYo++,
          imageSrc: val,
        })),
      });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  render() {
    const SortableItem = SortableElement(({ item }) => {
      console.log("yooo actualIndex", item.actualIndex);
      return (
        <div className={classes.item}>
          {item.actualIndex === 0 && (
            <div className={classes.mainImageText}>Main Image</div>
          )}
          <div className={classes.innerItem}>
            <button
              className={classes.removePhoto}
              onClick={() => {
                const photos = this.props.photos;
                photos.splice(item.index, 1);
                this.props.setPhotos(() => [...photos]);
              }}
            >
              x
            </button>
            <img
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
              src={item.imageSrc}
            />
          </div>
        </div>
      );
    });

    const SortableList = SortableContainer(({ items }) => (
      <div className={classes.container}>
        {items.map((item, index) => (
          <SortableItem
            key={`${item.id}`}
            index={index}
            item={{ ...item, actualIndex: index }}
          />
        ))}
      </div>
    ));

    return (
      <SortableList
        items={this.state.items}
        onSortEnd={this.onSortEnd}
        axis="xy"
        helperClass={classes.SortableHelper}
      />
    );
  }
}

export default Gallery;
