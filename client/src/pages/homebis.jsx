import React, { Component, useState } from 'react'
import { Wrapper, Container, Item, WidgetManager } from "../style";
import { HeaderHomePage } from '../components/HomeHeader';
import { WidgetInterface } from '../components/WidgetInterface';
import { NBATeamWidget } from '../components/NBATeamWidget';
import { NBAPlayerWidget } from '../components/NBAPlayerWidget';
import { BackgroundWidget } from '../components/BackgroundWidget';
import { CryptoConverterWidget } from '../components/CryptoConverterWidget';
import { HearthstoneWidget } from '../components/HearthstoneWidget';
import { QuoteWidget } from '../components/QuoteWidget';
import styles from "../style/HomePage.module.css";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,

  // change background colour if dragging
  //background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = () => ({
    padding: grid,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        divcont: true,
        items1: [
            {
                id: `item-1`,
                content: <WidgetInterface item={<NBATeamWidget widgetStyle={styles.NBAWidgetItem}/>} isManager={this.divcont}/>,
            },
            {
            
                id: `item-2`,
                content: <WidgetInterface item={<NBAPlayerWidget widgetStyle={styles.NBAWidgetItem}/>} isManager={this.divcont}/>,
            },
            {
                id: `item-3`,
                content: <WidgetInterface item={<Item/>} isManager={this.divcont}/>,
            },
        ],
        items2: [
            {
                id: `item-4`,
                content: <WidgetInterface item={<CryptoConverterWidget widgetStyle={styles.CryptoWidgetItem}/>} isManager={this.divcont}/>,
            },
            {
                id: `item-5`,
                content: <WidgetInterface item={<BackgroundWidget widgetStyle={styles.BackgroundWidgetItem}/>} isManager={this.divcont}/>,
            },
            {
                id: `item-6`,
                content: <WidgetInterface item={<Item/>} isManager={this.divcont}/>,
            },
        ],
        /*
        {
            id: `item-7`,
            content: <WidgetInterface item={<HearthstoneWidget widgetStyle={styles.HearthstoneWidgetItem}/>} isManager={this.divcont}/>,
        },
        {
            id: `item-8`,
            content: <WidgetInterface item={<QuoteWidget widgetStyle={styles.QuoteWidgetItem}/>} isManager={this.divcont}/>,
        },
        {
            id: `item-9`,
            content: <WidgetInterface item={<Item/>} isManager={this.divcont}/>,
        },
        {
            id: `item-10`,
            content: <WidgetInterface item={<Item/>} isManager={this.divcont}/>,
        }
        */
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items1 = reorder(
      this.state.items1,
      result.source.index,
      result.destination.index
    );

    const items2 = reorder(
        this.state.items2,
        result.source.index,
        result.destination.index
      );

    this.setState({
      items1,
      items2,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
        <Wrapper className="App">
            <HeaderHomePage toggleWidgetsButton={() => this.handlechange()}/>
            <Container>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {this.state.items1.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}
                                        >
                                        {item.content}
                                    </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {this.state.items2.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}
                                        >
                                        {item.content}
                                    </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Container>
      </Wrapper>
    );
  }
}

export default Home