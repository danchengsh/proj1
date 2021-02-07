import React from 'react';
import './card-list.styles.css';
import { Card } from '../card/card.component'

export const CardList = (props) => {
    return (<div className="card-list">
        { props.monsters.map(monster => (
            <Card key={monster.id} monster={monster}></Card>)    /* CardList is responsible for creating and rendering Cards, BUT NOT for deciding how the Component will look, that will be smth for a Card Component to do. */
        )}
    </div>);
}