import React, { Component } from "react";
import DragItem from "./DragItem";
import $ from "jquery";
import "./index.scss";

class GridDrag extends Component {
  static defaultProps = {
    prefix: "grid-drag",
    columnsNum: 4,
    list: [
      { name: "app1" },
      { name: "app2" },
      { name: "app3" },
      { name: "app4" },
      { name: "app5" }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      rearrangingDuration: 350,
      rearranging: false,
      draggedEl: undefined,
      draggedElIndex: undefined
    };
    this.dragItem = React.createRef();
    this.contentDom = React.createRef();
    this.rearranging = false;
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const { prefix } = this.props;
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

  handleOnDrop = (e) => {
    e.preventDefault();
    this.state.rearranging = false;
  };

  render() {
    const { prefix, list } = this.props;

    return (
      <div className="content clearfix">
        {list.map((item, index) => {
          return (
            <DragItem
              prefix={prefix}
              list={list}
              {...item}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}

export default GridDrag;
