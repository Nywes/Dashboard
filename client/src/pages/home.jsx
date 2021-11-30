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

const items1FromBackend = [
  { id: uuid(), content: <WidgetInterface item={<NBATeamWidget widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> },
  { id: uuid(), content: <WidgetInterface item={<NBAPlayerWidget widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> },
  { id: uuid(), content: <WidgetInterface item={<Item />} isManager={true} /> },
];

const items2FromBackend = [
  { id: uuid(), content: <WidgetInterface item={<CryptoConverterWidget widgetStyle={styles.CryptoWidgetItem} />} isManager={true}/> },
  { id: uuid(), content: <WidgetInterface item={<BackgroundWidget widgetStyle={styles.BackgroundWidgetItem} />} isManager={true}/> },
  { id: uuid(), content: <WidgetInterface item={<Item />} isManager={true} /> },
];

const items3FromBackend = [
  { id: uuid(), content: <WidgetInterface item={<HearthstoneWidget widgetStyle={styles.HearthstoneWidgetItem} />} isManager={true}/> },
  { id: uuid(), content: <WidgetInterface item={<QuoteWidget widgetStyle={styles.QuoteWidgetItem} />} isManager={true}/> },
  { id: uuid(), content: <WidgetInterface item={<Item />} isManager={true} /> },
];

const columnsFromBackend = {
  [uuid()]: {
    items: items1FromBackend,
  },
  [uuid()]: {
    items: items2FromBackend,
  },
  [uuid()]: {
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

function Home() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <Wrapper className="App">
      <HeaderHomePage toggleWidgetsButton={() => this.handlechange()} />
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
