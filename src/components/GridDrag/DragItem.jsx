import React, { Component } from "react";
import $ from "jquery";

class DragItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rearrangingDuration: 350,
      rearranging: false,
      draggedEl: undefined,
      draggedElIndex: undefined,
      draggableElArr: []
    };
  }
  handleOnDrop = (e) => {};
  init() {
    const { prefix } = this.props;
    // let draggedEl;
    // let draggedElIndex;
    // let rearranging = false;
    // let rearrangingDuration = 350;
    let {
      draggedEl,
      draggedElIndex,
      rearranging,
      rearrangingDuration
    } = this.state;
    let dragItemName = `.${prefix}-draggable`;
    let draggableElArr = $(dragItemName);

    // Update the CSS for each item to be in its correct location based on the order in the array passed
    // @param itemEls: the DOM elements, in order, from top left, row by row
    // @containerEl: the DOM element of the container for the arranged elements.
    function arrangeItems(itemEls, columnsCount, containerEl, elHeight) {
      let $containerEl = $(containerEl);

      // Set height of elements
      let elWidth = $containerEl.width() / columnsCount;
      elHeight = elHeight || elWidth;

      for (let i = 0; i < itemEls.length; i++) {
        let $item = $(itemEls[i]);
        $item.data("index", i);
        let pos = {
          x: i % columnsCount,
          y: Math.floor(i / columnsCount)
        };

        $item.css({
          top: pos.y * elHeight + "px",
          left: pos.x * elWidth + "px",
          width: "calc(" + 100 / columnsCount + "% - 10px)",
          height: "calc(" + elHeight + "px - 10px)",
          boxSizing: "border-box"
        });
      }
    }

    // Rearrange the items in an array, returning a the modified array.
    // @param movedItemIndex: the index of the element being moved to a
    //   new position in the array
    // @param destinationIndex: the new index being given to the moved element
    function rearrangeItems(arr, movedItemIndex, destinationIndex) {
      let movedEl = arr.splice(movedItemIndex, 1)[0];
      arr.splice(destinationIndex, 0, movedEl);
      return arr;
    }

    arrangeItems(draggableElArr, this.props.columnsNum, $(".content"));

    $(dragItemName).on("dragstart", function (e) {
      draggedEl = $(this);
      let sortedArr = [];
      for (let i = 0; i < draggableElArr.length; i++) {
        let elIndex = $(draggableElArr[i]).data("index");
        sortedArr[elIndex] = draggableElArr[i];
      }
      draggableElArr = sortedArr;
      draggedElIndex = $(this).data("index");
      console.log("dragging element at position ", draggedElIndex);
      $(this).css({ opacity: 0, transition: "all 100ms ease" });
    });

    $(dragItemName).on("dragend", function (e) {
      e.preventDefault();
      console.log("end", $(this));
      $(this).css({ opacity: 1, transition: "all 600ms ease" });
    });

    $(dragItemName).on("dragover", function (e) {
      e.preventDefault();
      if (rearranging) {
        return;
      }
      let dragDestIndex = $(this).data("index");
      console.log("dragging over position ", dragDestIndex);
      draggedElIndex = draggedEl.data("index");
      if (draggedElIndex !== dragDestIndex) {
        rearranging = true;
        console.log(
          "dragging element at position ",
          draggedElIndex,
          " to new dest at position ",
          dragDestIndex
        );
        let rearrangedEls = rearrangeItems(
          draggableElArr,
          draggedElIndex,
          dragDestIndex
        );
        arrangeItems(rearrangedEls, 4, $(".content"));
        setTimeout(function () {
          rearranging = false;
        }, rearrangingDuration);
      }
    });
  }
  handleDragStart = (e, item) => {
    const { list } = this.props;
    console.log("handleDragStart!", e.target);
    this.state.draggedEl = e.target;
    let sortedArr = [];
    for (let i = 0; i < list.length; i++) {
      // let elIndex = $(draggableElArr[i]).data("index");
      let elIndex = list.findIndex((it) => it == list[i]);
      sortedArr[elIndex] = list[i];
    }
    this.state.draggableElArr = sortedArr;
    this.state.draggedElIndex = list.findIndex((it) => it == item);
    console.log("dragging element at position ", this.state.draggedElIndex);
    $(this).css({ opacity: 0, transition: "all 100ms ease" });
  };
  render() {
    const { prefix, name } = this.props;

    const styles = {
      container: {
        height: "110px",
        width: "80px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      },
      image: {
        display: "block",
        height: "60px",
        width: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        background: "orange",
        borderRadius: "50%"
      }
    };
    const Item = (p) => {
      const { name } = p;
      return (
        <div style={styles.container}>
          <div style={styles.image}>Logo</div>
          <p>{name}</p>
        </div>
      );
    };
    return (
      <div
        // onDragStart={(e) => this.handleDragStart(e, this.props)}
        // onDragEnter={this.handleDragEnter}
        // onDragLeave={this.handleDragLeave}
        // onDragOver={this.handleDragEnter}
        // onDrop={this.handleDrop}

        className={prefix + `-draggable`}
        draggable="true"
      >
        <Item {...this.props} />
      </div>
    );
  }
}
export default DragItem;
