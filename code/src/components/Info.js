import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';

import { todos } from 'reducers/todos';
import { Button } from 'styling/Button';

const Name = styled.span `
  color:#b83b5e;
`
const Time = styled.div`
  color:#b83b5e;
  font-weight:600;
  margin-left:110px;
  margin-top:50px;
`
const FormName = styled.form`
  text-align:center;
`;
const Input = styled.input`
  padding: 5px 0;
  width: 200px;
  height: 30px;
  font-size: 18px;
  font-style: italic;
  border-radius: 0;
  text-decoration: none;
  margin: 0;
  border: none;
  background-color:#ebebeb;
  border-bottom: 2px solid rgba(0, 0, 0, 0.055);
  text-align: left;
`;

const Text1 = styled.p`
  text-align:center;
  font-size: 25px;
  font-weight:900;
  color: #3f3f3f;
`;
const Wrapper = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
`
const Text2 = styled.p`
  margin-right:20px;
  font-size: 18px;
  font-weight:900;
  color: #3f3f3f;
`;
export const Emoji = styled.span`
  font-size: 20px;
`

export const Info = () => {
  const items = useSelector(state => state.todos.items);
  const selectedItemsCompleted = items.filter((item) => item.isComplete).length
  const selectedItemsNotComplete = items.filter((item) => !item.isComplete).length
  const userName = useSelector(state => state.todos.userName);
  
  const[name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmitName = event => {
    event.preventDefault()
    dispatch(todos.actions.addName(name))
    setName("")
  }

  const date = new Date();
  const invalidName = (value) => value.replace(/\s/g, "").length === 0;
  return (
    <>
    <Time>
      <Moment format="D MMM YYYY">{date}</Moment>
    </Time>
    <FormName className="add-task" onSubmit={handleSubmitName}>
      <Input type="text"
              placeholder="your name"
              onChange={event => setName(event.target.value)}
              className="form-text"
              value={name}>
      </Input>
      <Button type="submit"
              className="form-button"
              value={"Post"} 
              disabled={
                name.length < 1 || invalidName(name)
              }
      >Post
      </Button>
    </FormName>
    <Text1>Hey <Name> {userName} </Name> you have {items.length} thing(s) to do today!</Text1> 
    <Wrapper>
    <Text2>Done
      <Emoji>
        <span role='img' aria-label='checkbox'>☑︎</span>
      </Emoji>: {selectedItemsCompleted}</Text2>
    <Text2>To do 
      <Emoji>
        <span role='img' aria-label='writing hand'>✍︎</span>
      </Emoji>: {selectedItemsNotComplete}</Text2>
    </Wrapper>
    </>
  )
};
