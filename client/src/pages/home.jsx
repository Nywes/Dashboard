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
import neon from "../style/NeonStartButton.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import api from '../api';

var initialItemIDs = [];

var allItemsArray = [[], [], []];

function GetNewWidget(name, widgetID)
{
  switch (name) {
    case "NBA_Team":
      return({ id: widgetID, name: "NBA_Team", content: <WidgetInterface item={<NBATeamWidget WidgetID={widgetID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> });
    case "NBA_Players":
      return({ id: widgetID, name: "NBA_Players", content: <WidgetInterface item={<NBAPlayerWidget WidgetID={widgetID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.NBAWidgetItem} />} isManager={true}/> });
    case "Crypto":
      return({ id: widgetID, name: "Crypto", content: <WidgetInterface item={<CryptoConverterWidget WidgetID={widgetID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.CryptoWidgetItem} />} isManager={true}/> });
    case "Background":
      return({ id: widgetID, name: "Background", content: <WidgetInterface item={<BackgroundWidget WidgetID={widgetID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.BackgroundWidgetItem} />} isManager={true}/> });
    case "Hearthstone":
      return({ id: widgetID, name: "Hearthstone", content: <WidgetInterface item={<HearthstoneWidget WidgetID={widgetID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.HearthstoneWidgetItem} />} isManager={true}/> });
    case "Quotes":
      return ({ id: widgetID, name: "Quotes", content: <WidgetInterface item={<QuoteWidget WidgetID={widgetID} SelectWidget={(index) => ToggleWidgetSelection(index)} widgetStyle={styles.QuoteWidgetItem} />} isManager={true}/> });
    default:
      return (null);
  }
}

const columnID_1 = 0;
const columnID_2 = 1;
const columnID_3 = 2;

// * keep track of widget names
var widgetNames = [];
// * keep track of widgetInfo (may not be used)
var widgetInfo = [];

// * keep track of widget index within column
var widgetIndexes = [];
// * keep track of widget column index
var columnIndexes = [];

var prefsSaved = false;

async function SaveWidgetLayout()
{
  // ! if not logged in, scram
  var jwt = localStorage.getItem("dashboard_jwt");

  if (jwt === undefined) {
    return;
  }

  var payload = {token: jwt, widgetNames: widgetNames, widgetIndexes: widgetIndexes, widgetInfo: widgetInfo, columnIndexes: columnIndexes}

  if (prefsSaved === false) {

    // * create them,
    console.log("Saving widgetLayout in database: ", payload);

    await api.setUserPrefs(payload)
    .then(res => {
      if (res.status === 200) {
        console.log("Successfully saved prefs", res);
      }
    })
    .catch(err => {
      console.log("Error saving prefs", err);
    })
    prefsSaved = true;
  } else {
    // * patch 'em
    console.log("Updating widgetLayout in database: ", payload);

    await api.updateUserPrefs(payload)
    .then(res => {
      if (res.status === 200) {
        console.log("Successfully updated prefs", res);
      }
    })
    .catch(err => {
      console.log("Error updating prefs", err);
    })
  }
}

function UpdateWidgetInfo(columns)
{
  widgetNames = [];
  widgetInfo = [];
  widgetIndexes = [];
  columnIndexes = [];

  for (let i = 0; i <= columnID_3; i++) {
    const column = columns[i];

    for (let j = 0; j < column.items.length; j++) {
      const item = column.items[j];

      widgetNames.push(item.name);
      widgetIndexes.push(j);
      columnIndexes.push(i);
    }
  }
  SaveWidgetLayout();
}

function LoadDefaultWidgets(columns, setColumns)
{
    // #region DefaultWidgets
    initialItemIDs = [uuid(), uuid(), uuid(), uuid(), uuid(), uuid()];
    allItemsArray[0] = new Array(2);
    allItemsArray[0][0] =  GetNewWidget("NBA_Team", initialItemIDs[0]);
    widgetNames.push("NBA_Team");
    widgetIndexes.push(0);
    columnIndexes.push(0);
    allItemsArray[0][1] = GetNewWidget("NBA_Players", initialItemIDs[1]);
    widgetNames.push("NBA_Players");
    widgetIndexes.push(1);
    columnIndexes.push(0);

    allItemsArray[1] = new Array(2);
    allItemsArray[1][0] = GetNewWidget("Crypto", initialItemIDs[2]);
    widgetNames.push("Crypto");
    widgetIndexes.push(0);
    columnIndexes.push(1);
    allItemsArray[1][1] = GetNewWidget("Background", initialItemIDs[3]);
    widgetNames.push("Background");
    widgetIndexes.push(1);
    columnIndexes.push(1);

    allItemsArray[2] = new Array(2);
    allItemsArray[2][0] = GetNewWidget("Hearthstone", initialItemIDs[4]);
    widgetNames.push("Hearthstone");
    widgetIndexes.push(0);
    columnIndexes.push(2);
    allItemsArray[2][1] = GetNewWidget("Quotes", initialItemIDs[5]);
    widgetNames.push("Quotes");
    widgetIndexes.push(1);
    columnIndexes.push(2);
    //#endregion

    SetInitialColumnData(columns, setColumns);
}

function LoadWidgetsFromPrefs(prefs, columns, setColumns)
{
  columns[columnID_1] = [];
  columns[columnID_2] = [];
  columns[columnID_3] = [];

  allItemsArray[0] = [];
  allItemsArray[1] = [];
  allItemsArray[2] = [];

  for (let i = 0; i < prefs.widgetNames.length; i++) {
    const widgetName = prefs.widgetNames[i];
    const widgetIndex = prefs.widgetIndexes[i];
    const widgetColumnIndex = prefs.columnIndexes[i];

    var widgetID = uuid();
    widgetIndexes.push(widgetIndex);
    columnIndexes.push(widgetColumnIndex);

    // ! here's to hoping splice works on empty arrays
    switch (widgetName) {
      case "NBA_Team":
        allItemsArray[widgetColumnIndex].splice(widgetIndex, 0, GetNewWidget("NBA_Team", widgetID));
        widgetNames.push("NBA_Team");
        break;
      case "NBA_Players":
        allItemsArray[widgetColumnIndex].splice(widgetIndex, 0, GetNewWidget("NBA_Players", widgetID));
        widgetNames.push("NBA_Players");
        break;
      case "Crypto":
        allItemsArray[widgetColumnIndex].splice(widgetIndex, 0, GetNewWidget("Crypto", widgetID));
        widgetNames.push("Crypto");
        break;
      case "Background":
        allItemsArray[widgetColumnIndex].splice(widgetIndex, 0, GetNewWidget("Background", widgetID));
        widgetNames.push("Background");
        break;
      case "Hearthstone":
        allItemsArray[widgetColumnIndex].splice(widgetIndex, 0, GetNewWidget("Hearthstone", widgetID));
        widgetNames.push("Hearthstone");
        break;
      case "Quotes":
        allItemsArray[widgetColumnIndex].splice(widgetIndex, 0, GetNewWidget("Quotes", widgetID));
        widgetNames.push("Quotes");
        break;
      default:
        break;
    }
  }
  SetInitialColumnData(columns, setColumns);
}

// * initialize itemsFromBackend by requesting the API
async function InitWidgets(columns, setColumns)
{
  // * if no prefs are found, or not logged in
  var jwt = localStorage.getItem("dashboard_jwt");

  if (jwt !== undefined) {
    // * try/load
    await api.getUserPrefs(jwt)
    .then(res => {
      if (res.status === 200) {
        console.log("Found widgets prefs", res.data.data);
        LoadWidgetsFromPrefs(res.data.data[0], columns, setColumns);
      }
    })
    .catch(err => {
      console.log("Either server error or you didn't have any widgets", err);
      LoadDefaultWidgets(columns, setColumns);
    });
  } else {
    LoadDefaultWidgets(columns, setColumns);
  }
}


var columnsFromBackend = {
  [columnID_1]: {
    items: allItemsArray[0],
  },
  [columnID_2]: {
    items: allItemsArray[1],
  },
  [columnID_3]: {
    items: allItemsArray[2],
  },
};

function SetInitialColumnData(columns, setColumns)
{

  if (columns === null && setColumns === null) {
    return;
  }
  console.log("Setting columns (2): ", allItemsArray[1]);

  for (let i = 0; i <= columnID_3; i++) {
    columns[i].items = allItemsArray[i];
  }

  console.log("columns[1] values: ", columns[1]);

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
        item = GetNewWidget("NBA_Team", newID);
      break;
    case 1:
        item = GetNewWidget("NBA_Players", newID);
      break;
    case 2:
        item = GetNewWidget("Crypto", newID);
      break;
    case 3:
        item = GetNewWidget("Background", newID);
      break;
    case 4:
        item = GetNewWidget("Hearthstone", newID);
      break;
    case 5:
        item = GetNewWidget("Quotes", newID);
      break;
    default:
      break;
  }

  const destColumn = columns[columnID_1];
  const destItems = [...destColumn.items];
  destItems.splice(0, 0, item);

  console.log("Columns before set; ", columns);
  setColumns({
    ...columns,
    [columnID_1]: {
      ...destColumn,
      items: destItems,
    },
  });
  console.log("Columns after set; ", columns);
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

function RefreshWidgetColumns(columns, setColumns)
{
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

var initialColumnsSet = false;

class StartButton extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      display: true,
    }
  }

  ClickAction = () => {
    this.setState({
      display: false
    });
    this.props.Refresh();
  }

  render()
  {
    if (this.state.display) {

      return (
        <button onClick={() => this.ClickAction()} className={neon.text}>
          Welcome to your doucheboard
        </button>
      );
    } else {
      return (<div/>);
    }
  }
}

function Home() {

  console.log("Home starting");
  var [columns, setColumns] = useState(columnsFromBackend);

  if (initialColumnsSet === false) {
    initialColumnsSet = true;
    console.log("Initializing widgets");
    InitWidgets(columns, setColumns);
  } else {
    // * most likely reloaded from using setColumns: hence
    UpdateWidgetInfo(columns);

    console.log("Columns already set: ", columns);
  }

  return (
    <Wrapper className="App">
      <HeaderHomePage DeleteSelectedWidgets={() => DeleteSelectedWidgets(columns, setColumns)} toggleWidgetsButton={(index) => AddWidget(index, columns, setColumns)} />
      <Container>

        <StartButton Refresh={() => RefreshWidgetColumns(columns, setColumns)}/>

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
