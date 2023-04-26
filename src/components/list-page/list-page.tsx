import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import s from './list.module.css';
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { IListNode, linkedList } from "./LinkedList";
import { IArray } from "./LinkedList";
import { setLinkedList } from "./utils";
import { setDelay } from "../../constants/setDelay";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const linkedListSize = linkedList.getSize();

  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState({ value: '', index: '' });
  const [list, setList] = useState<IListNode<IArray>[]>([]);
  const [currIndex, setCurrIndex] = useState(-1);
  const [isTopCircle, setIsTopCircle] = useState(false);
  const [currElement, setCurrElement] = useState('');
  const [changingIndex, setChangingIndex] = useState(-1);

  useEffect(() => {
    setLinkedList();
    setList(linkedList.toArray());
  }, []);

  console.log(list)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const addToHead = async () => {
    setLoader(true);
    const newNode = { value: inputValue.value, state: ElementStates.Default };
    linkedList.prepend(newNode);
    setCurrIndex(0);
    setIsTopCircle(true);
    setCurrElement(inputValue.value);
    await setDelay(SHORT_DELAY_IN_MS);
    setIsTopCircle(false);
    setInputValue({ value: '', index: '0' });
    setCurrIndex(-1);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const addToTail = async () => {
    setLoader(true);
    const newNode = { value: inputValue.value, state: ElementStates.Default };
    linkedList.append(newNode);
    setCurrIndex(linkedListSize - 1);
    setCurrElement(inputValue.value);
    await setDelay(SHORT_DELAY_IN_MS);
    setInputValue({ value: '', index: '0' });
    setCurrIndex(-1);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const removeFromHead = async () => {
    setLoader(true);
    linkedList.removeHead();
    setCurrIndex(0);
    setIsTopCircle(true);
    // добавить setCurrElement 
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrIndex(-1);
    setIsTopCircle(false);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const removeFromTail = async () => {
    setLoader(true);
    linkedList.removeTail();
    // добавить setCurrElement 
    setCurrIndex(linkedListSize - 1);
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrIndex(-1);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const insertAt = async () => {

    setLoader(true);
    const newNode = { value: inputValue.value, index: inputValue.index, state: ElementStates.Default };

    linkedList.addAtIndex(newNode, Number(newNode.index));

    setInputValue({ value: '', index: '0' });
    await setDelay(SHORT_DELAY_IN_MS);

    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const deleteAt = async () => {
    setLoader(true);

    linkedList.removeAtIndex(Number(inputValue.index));
    await setDelay(SHORT_DELAY_IN_MS);

    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const showHead = (index: number) => {
    return currIndex === index && isTopCircle === true
      ? (<Circle isSmall={true} letter={currElement} state={ElementStates.Changing} />)
      : index === 0
        ? ('head')
        : undefined;
  };

  const showTail = (index: number) => {
    return currIndex === index && isTopCircle === false
    ? (<Circle isSmall={true} letter={currElement} state={ElementStates.Changing} />)
    : index === list.length - 1
      ? ('tail')
      : undefined;
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={s.container} >
        <fieldset className={s.layout} name='tailhead' >
          <Input
            extraClass={s.input}
            type='text'
            name="value"
            value={inputValue.value}
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
          />
          <Button
            text="Добавить в head"
            type="button"
            extraClass={s.smallButton}
            onClick={addToHead}
            isLoader={loader}
            disabled={!inputValue.value}
          />
          <Button
            text="Добавить в tail"
            type="button"
            extraClass={s.smallButton}
            onClick={addToTail}
            isLoader={loader}
            disabled={!inputValue.value}
          />
          <Button
            text="Удалить из head" type="button"
            extraClass={s.smallButton}
            onClick={removeFromHead}
            isLoader={loader}
          />
          <Button
            text="Удалить из tail"
            type="button"
            extraClass={s.smallButton}
            onClick={removeFromTail}
            isLoader={loader}
          />
        </fieldset>
        <fieldset className={s.layout} name='atIndex'>
          <Input extraClass={s.input} type='text' name="index" value={inputValue.index} placeholder="Введите индекс" onChange={handleChange} />
          <Button
            text="Добавить по индексу"
            type="button"
            extraClass={s.button}
            onClick={insertAt}
            disabled={!inputValue.value}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            extraClass={s.button}
            onClick={deleteAt}
            disabled={!inputValue.value}
          />
        </fieldset>
      </form>
      <ul className={s.ul}>
        {list.map((el, index) => {
          return (
            <li key={index} className={s.li} >
              <div className={s.circles} >
                <Circle letter={el.value.value} index={index} head={showHead(index)} tail={showTail(index)} />
              </div>
              {index !== list.length - 1 &&
                <ArrowIcon />
              }
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
