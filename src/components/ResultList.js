import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import './ResultList.css';

function ResultList(props) {
    const [wordArray, setWordArray] = useState(["Word1", "Word2", "Word3", "Word4"]);
    const [definitionArray, setDefinitionArray] = useState(["Definition1", "Definition2", "Definition3", "Definition4"]);

    return (props.showResult) ? (
        <div className='resultList'>
            <ListGroup as="ol" numbered>
                {wordArray.map((word, index) => {
                    return (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key = {index}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{word}</div>
                                {definitionArray[index]}
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    ) : "";
}

export default ResultList