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
  const [inputValue, setInputValue] = useState({ value: '', index: 0 });
  const [list, setList] = useState<IListNode<IArray>[]>([]);
  const [topCircle, setTopCircle] = useState(false);
  const [bottomCircle, setBottomCircle] = useState(false);
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
    if (!inputValue.value || inputValue.value.trim() === '') {
      throw new Error('Enter a value');
    }
    setLoader(true);
    const newNode = { value: inputValue.value, state: ElementStates.Default };
    linkedList.prepend(newNode);
    setTopCircle(true);
    setInputValue({ value: '', index: 0 });
    await setDelay(SHORT_DELAY_IN_MS);
    setTopCircle(false);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const addToTail = async () => {
    if (!inputValue.value || inputValue.value.trim() === '') {
      throw new Error('Enter a value');
    }
    setLoader(true);
    const newNode = { value: inputValue.value, state: ElementStates.Default };
    linkedList.append(newNode);
    setBottomCircle(true);
    setInputValue({ value: '', index: 0 });
    await setDelay(SHORT_DELAY_IN_MS);
    setBottomCircle(false);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const removeFromHead = async () => {
    setLoader(true);
    linkedList.removeHead();
    setTopCircle(true);
    await setDelay(SHORT_DELAY_IN_MS);
    setTopCircle(false);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const removeFromTail = async () => {
    setLoader(true);
    linkedList.removeTail();
    setBottomCircle(true);
    await setDelay(SHORT_DELAY_IN_MS);
    setBottomCircle(false);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const insertAt = async () => {
    if (!inputValue.value || inputValue.value.trim() === '') {
      throw new Error('Enter a value');
    }
    setLoader(true);
    const newNode = { value: inputValue.value, index: inputValue.index, state: ElementStates.Default };
    if (newNode.index > linkedListSize) {
      throw new Error('Index is bigger then list size. Enter valid index')
    }
    linkedList.addAtIndex(newNode, newNode.index);
    setInputValue({ value: '', index: 0 });
    await setDelay(SHORT_DELAY_IN_MS);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const deleteAt = async () => {
    setLoader(true);
    if (inputValue.index > linkedListSize) {
      throw new Error('Index is bigger then list size. Enter valid index')
    }
    linkedList.removeAtIndex(inputValue.index);
    await setDelay(SHORT_DELAY_IN_MS);
    setList([...linkedList.toArray()]);
    setLoader(false);
  };
  console.log(linkedListSize)
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
            onChange={handleChange} />
          <Button text="Добавить в head" type="button" extraClass={s.smallButton} onClick={addToHead} isLoader={loader} />
          <Button text="Добавить в tail" type="button" extraClass={s.smallButton} onClick={addToTail} isLoader={loader} />
          <Button text="Удалить из head" type="button" extraClass={s.smallButton} onClick={removeFromHead} isLoader={loader} />
          <Button text="Удалить из tail" type="button" extraClass={s.smallButton} onClick={removeFromTail} isLoader={loader} />
        </fieldset>
        <fieldset className={s.layout} name='atIndex'>
          <Input extraClass={s.input} type='text' name="index" value={inputValue.index} placeholder="Введите индекс" onChange={handleChange} />
          <Button text="Добавить по индексу" type="button" extraClass={s.button} onClick={insertAt} />
          <Button text="Удалить по индексу" type="button" extraClass={s.button} onClick={deleteAt} />
        </fieldset>
      </form>
      <ul className={s.ul}>
        {list.map((el, index) => {
          return (
            <li key={index} className={s.li} >
              <div className={s.circles} >
                {topCircle && index === 0 &&
                  <Circle letter={'head'} isSmall={true} state={ElementStates.Changing} extraClass={s.topCircle}
                  />
                }
                <Circle letter={el.value.value} index={index} />
                {bottomCircle && index === list.length - 1 &&
                  <Circle letter={'tail'} isSmall={true} state={ElementStates.Changing} extraClass={s.bottomCircle}
                  />
                }
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
