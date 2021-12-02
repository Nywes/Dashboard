import React, { Component, useState } from "react";
import { Wrapper, Container, Item, WidgetManager } from "../style";
import { HeaderHomePage } from "../components/HomeHeader";
import { WidgetInterface } from "../components/WidgetInterface";
import { NBATeamWidget } from "../components/NBATeamWidget";
import { NBAPlayerWidget } from "../components/NBAPlayerWidget";
import { BackgroundWidget } from "../components/BackgroundWidget";
import { CryptoConverterWidget } from "../components/CryptoConverterWidget";
import { HearthstoneWidget } from "../components/HearthstoneWidget";
import { QuoteWidget } from "../components/QuoteWidget";
import styles from "../style/HomePage.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

const initialItemIDs = [uuid(), uuid(), uuid(), uuid(), uuid(), uuid()]

const items1FromBackend = [
  { id: initialItemIDs[0], content: <WidgetInterface item={<NBATeamWidget WidgetID={initialItemIDs[0]} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> },
  { id: initialItemIDs[1], content: <WidgetInterface item={<NBAPlayerWidget WidgetID={initialItemIDs[1]} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> },
];

const items2FromBackend = [
  { id: initialItemIDs[2], content: <WidgetInterface item={<CryptoConverterWidget WidgetID={initialItemIDs[2]} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.CryptoWidgetItem} />} isManager={true}/> },
  { id: initialItemIDs[3], content: <WidgetInterface item={<BackgroundWidget WidgetID={initialItemIDs[3]} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.BackgroundWidgetItem} />} isManager={true}/> },
];

const items3FromBackend = [
  { id: initialItemIDs[4], content: <WidgetInterface item={<HearthstoneWidget WidgetID={initialItemIDs[4]} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.HearthstoneWidgetItem} />} isManager={true}/> },
  { id: initialItemIDs[5], content: <WidgetInterface item={<QuoteWidget WidgetID={initialItemIDs[5]} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.QuoteWidgetItem} />} isManager={true}/> },
];

const columnID_1 = 0;
const columnID_2 = 1;
const columnID_3 = 2;

const columnsFromBackend = {
  [columnID_1]: {
    items: items1FromBackend,
  },
  [columnID_2]: {
    items: items2FromBackend,
  },
  [columnID_3]: {
    items: items3FromBackend,
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    if (SelectedWidgets.includes(destItems[destination.index].id)) {
      ToggleWidgetSelection(destItems[destination.index].id);
    }

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function DeleteWidget(widgetID, columns, setColumns)
{
  var sourceColumn = null;
  var indexToSplice = 0;

  var columnIndex = 0;

  for (let i = 0; i <= columnID_3; i++) {
    const column = columns[i];

    for (let i = 0; i < column.items.length; i++) {
      const item = column.items[i];

      if (item.id === widgetID) {
        indexToSplice = i;
        sourceColumn = column;
        break;
      }
    }
    if (sourceColumn != null) {
      break;
    }
    columnIndex++;
  }

  if (sourceColumn != null) {

    console.log("Found and deleting", widgetID);
    const sourceItems = [...sourceColumn.items];
    sourceItems.splice(indexToSplice, 1);

    columns[columnIndex].items = sourceItems;

    // setColumns({
    //   ...columns,
    //   [columnIndex]: {
    //     ...sourceColumn,
    //     items: sourceItems,
    //   },
    // });
  } else {
    console.log("Did not find nor delete", widgetID);
  }
}

function AddWidget(index, columns, setColumns)
{
  var newID = uuid();
  console.log("Creating new widget with ID:", newID);

  var item = null;

  switch (index) {
    case 0:
        item = { id: newID, content: <WidgetInterface item={<NBATeamWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> };
      break;
    case 1:
        item = { id: newID, content: <WidgetInterface item={<NBAPlayerWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> };
      break;
    case 2:
        item ={ id: newID, content: <WidgetInterface item={<CryptoConverterWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.CryptoWidgetItem} />} isManager={true}/> };
      break;
    case 3:
        item = { id: newID, content: <WidgetInterface item={<BackgroundWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.BackgroundWidgetItem} />} isManager={true}/> };
      break;
    case 4:
        item = { id: newID, content: <WidgetInterface item={<HearthstoneWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.HearthstoneWidgetItem} />} isManager={true}/> };
      break;
    case 5:
        item = { id: newID, content: <WidgetInterface item={<QuoteWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.QuoteWidgetItem} />} isManager={true}/> };
      break;
    default:
      break;
  }

  const destColumn = columns[columnID_1];
  const destItems = [...destColumn.items];
  destItems.splice(0, 0, item);

  setColumns({
    ...columns,
    [columnID_1]: {
      ...destColumn,
      items: destItems,
    },
  });
}

var SelectedWidgets = [];

function ToggleWidgetSelection(WidgetID)
{
  if (SelectedWidgets.includes(WidgetID)) {
    var index = SelectedWidgets.indexOf(WidgetID);
    SelectedWidgets.splice(index, 1);
  } else {
    SelectedWidgets.push(WidgetID);
  }
}

function DeleteSelectedWidgets(columns, setColumns)
{
  console.log("Deleting widgets: ", SelectedWidgets);


  for (let i = 0; i < SelectedWidgets.length; i++) {
      const element = SelectedWidgets[i];
      console.log("Deleting selected widgets: ", element);

      DeleteWidget(element, columns, setColumns);
    }
    SelectedWidgets = [];

    setColumns({
      ...columns,
      [columnID_1]: {
        ...columns[columnID_1],
        items: columns[columnID_1].items,
      },
      [columnID_2]: {
        ...columns[columnID_2],
        items: columns[columnID_2].items,
      },
      [columnID_3]: {
        ...columns[columnID_3],
        items: columns[columnID_3].items,
      },

    });
}

function Home() {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <Wrapper className="App">
      <HeaderHomePage DeleteSelectedWidgets={() => DeleteSelectedWidgets(columns, setColumns)} toggleWidgetsButton={(index) => AddWidget(index, columns, setColumns)} />
      <Container>
        <div className={ styles.columnDesigner }>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: "10%",
                  }}
                  key={columnId}
                >
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {column.items.map((item, index) => {
                              return (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 1,
                                          minHeight: "50px",
                                          color: "black",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Home;
