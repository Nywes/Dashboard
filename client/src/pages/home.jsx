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

const columnID_1 = uuid();
const columnID_2 = uuid();
const columnID_3 = uuid();

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

    ToggleWidgetSelection(destItems[destination.index].id);

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
  console.log("Deleting widget id ", widgetID);
  var found = false;

  for (let i = 0; i < items1FromBackend.length; i++) {
    const element = items1FromBackend[i];

    if (element.id === widgetID) {
      items1FromBackend.splice(i, 1);
      found = true;
      break;
    }
  }
  for (let i = 0; i < items2FromBackend.length; i++) {
    const element = items2FromBackend[i];

    if (found)
      break;
    if (element.id === widgetID) {
      items2FromBackend.splice(i, 1);
      found = true;
      break;
    }
  }
  for (let i = 0; i < items3FromBackend.length; i++) {
    const element = items3FromBackend[i];

    if (found)
      break;
    if (element.id === widgetID) {
      items3FromBackend.splice(i, 1);
      found = true;
      break;
    }
  }

  // * update all columns
  setColumns({
    ...columns,
    [columnID_1]: {
      ...columns[columnID_1],
      items: items1FromBackend,
    },
    [columnID_2]: {
      ...columns[columnID_2],
      items: items2FromBackend,
    },
    [columnID_3]: {
      ...columns[columnID_3],
      items: items3FromBackend,
    },
  });
}

function AddWidget(index, columns, setColumns)
{
  var newID = uuid();
  switch (index) {
    case 0:
        items1FromBackend.push({ id: newID, content: <WidgetInterface item={<NBATeamWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> });
      break;
    case 1:
        items1FromBackend.push({ id: newID, content: <WidgetInterface item={<NBAPlayerWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> });
      break;
    case 2:
        items1FromBackend.push({ id: newID, content: <WidgetInterface item={<CryptoConverterWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.CryptoWidgetItem} />} isManager={true}/> });
      break;
    case 3:
        items1FromBackend.push({ id: newID, content: <WidgetInterface item={<BackgroundWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.BackgroundWidgetItem} />} isManager={true}/> });
      break;
    case 4:
        items1FromBackend.push({ id: newID, content: <WidgetInterface item={<HearthstoneWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.HearthstoneWidgetItem} />} isManager={true}/> });
      break;
    case 5:
        items1FromBackend.push({ id: newID, content: <WidgetInterface item={<QuoteWidget WidgetID={newID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.QuoteWidgetItem} />} isManager={true}/> });
      break;
    default:
      break;
  }

  setColumns({
    ...columns,
    [columnID_1]: {
      ...columns[columnID_1],
      items: items1FromBackend,
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
  console.log("Deleting widgets");
  for (let i = 0; i < SelectedWidgets.length; i++) {
    const element = SelectedWidgets[i];
    console.log("Deleting selected widgets: ", element);

    DeleteWidget(element, columns, setColumns);
  }
}

function Home() {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <Wrapper className="App">
      <HeaderHomePage DeleteSelectedWidgets={() => DeleteSelectedWidgets(columns, setColumns)} toggleWidgetsButton={(index) => AddWidget(index, columns, setColumns)} />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            overflow: "hidden",
          }}
        >
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
                                          color: "white",
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
