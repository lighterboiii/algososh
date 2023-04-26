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

  const [loader, setLoader] = useState({
    addHead: false,
    addTail: false,
    addAt: false,
    deleteAt: false,
    deleteTail: false,
    deleteHead: false,
    disabled: false
  });
  const [inputValue, setInputValue] = useState({ value: '', index: '' });
  const [list, setList] = useState<IListNode<IArray>[]>([]);
  const [currIndex, setCurrIndex] = useState(-1);
  const [isTopCircle, setIsTopCircle] = useState(false);
  const [currElement, setCurrElement] = useState('');
  const [changingIndex, setChangingIndex] = useState(-1);
  const [modIndex, setModIndex] = useState(-1);
  const pok = linkedList.getNodeAtIndex(Number(inputValue.index));
  console.log(pok)
  useEffect(() => {
    setLinkedList();
    setList(linkedList.toArray());
  }, []);

  console.log(list)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const addToHead = async () => {
    setLoader({ ...loader, addHead: true, disabled: true });
    const newNode = { value: inputValue.value, state: ElementStates.Default };
    linkedList.prepend(newNode);
    setCurrIndex(0);
    setIsTopCircle(true);
    setCurrElement(inputValue.value);
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrElement('');
    setIsTopCircle(false);
    setInputValue({ value: '', index: '' });
    setCurrIndex(-1);
    setList([...linkedList.toArray()]);
    setModIndex(0);
    await setDelay(SHORT_DELAY_IN_MS);
    setModIndex(-1);
    setList([...linkedList.toArray()]);
    setLoader({ ...loader, addHead: false, disabled: false });
  };

  const addToTail = async () => {
    setLoader({ ...loader, addTail: true, disabled: true });
    const newNode = { value: inputValue.value, state: ElementStates.Default };
    linkedList.append(newNode);
    setCurrIndex(linkedListSize - 1);
    setCurrElement(inputValue.value);
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrElement('');
    setInputValue({ value: '', index: '' });
    setCurrIndex(-1);
    setList([...linkedList.toArray()]);
    setModIndex(linkedListSize);
    await setDelay(SHORT_DELAY_IN_MS);
    setModIndex(-1);
    setList([...linkedList.toArray()]);
    setLoader({ ...loader, addTail: false, disabled: false });
  };

  const removeFromHead = async () => {
    setLoader({ ...loader, deleteHead: true, disabled: true });
    setCurrElement(list[0].value.value);
    linkedList.getFirstNode()!.value.value = '';
    linkedList.removeHead();
    setCurrIndex(0);
    setIsTopCircle(true);
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrIndex(-1);
    setIsTopCircle(false);
    setCurrElement('');
    setList([...linkedList.toArray()]);
    setLoader({ ...loader, deleteHead: false, disabled: false });
  };

  const removeFromTail = async () => {
    setLoader({ ...loader, deleteTail: true, disabled: true });
    setCurrElement(list[list.length - 1].value.value);
    linkedList.getLastNode()!.value.value = '';
    linkedList.removeTail();
    setCurrIndex(linkedListSize - 1);
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrIndex(-1);
    setList([...linkedList.toArray()]);
    setLoader({ ...loader, deleteTail: false, disabled: false});
  };

  const insertAt = async () => {
    setLoader({ ...loader, addAt: true, disabled: true });
    setIsTopCircle(true);
    setCurrElement(inputValue.value);
    let start = 0;
    while (start <= Number(inputValue.index)) {
      setChangingIndex(start);
      setCurrIndex(start);
      await setDelay(SHORT_DELAY_IN_MS);
      start++;
    }
    setCurrIndex(Number(inputValue.index));
    const newNode = { value: inputValue.value, index: inputValue.index, state: ElementStates.Default };
    linkedList.addAtIndex(newNode, Number(newNode.index));
    setInputValue({ value: '', index: '' });
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrIndex(-1);
    setCurrElement('');
    setChangingIndex(-1);
    setList([...linkedList.toArray()]);
    setModIndex(Number(inputValue.index));
    await setDelay(SHORT_DELAY_IN_MS);
    setModIndex(-1);
    setList([...linkedList.toArray()]);
    setIsTopCircle(false);
    setLoader({ ...loader, addAt: false, disabled: false });
  };

  const deleteAt = async () => {
    setLoader({ ...loader, deleteAt: true, disabled: true });
    let start = 0;
    while (start <= Number(inputValue.index)) {
      setChangingIndex(start);
      await setDelay(SHORT_DELAY_IN_MS);
      start++;
    }
    setCurrIndex(Number(inputValue.index));
    setCurrElement(list[Number(inputValue.index)].value.value);
    linkedList.getNodeAtIndex(Number(inputValue.index))!.value.value = '';
    linkedList.removeAtIndex(Number(inputValue.index));
    setInputValue({ value: '', index: '' });
    await setDelay(SHORT_DELAY_IN_MS);
    setChangingIndex(-1);
    setCurrIndex(-1);
    setList([...linkedList.toArray()]);
    setLoader({ ...loader, deleteAt: false, disabled: false });
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
      <form className={s.container} onSubmit={e => e.preventDefault()} >
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
            isLoader={loader.addHead}
            disabled={!inputValue.value || loader.disabled}
          />
          <Button
            text="Добавить в tail"
            type="button"
            extraClass={s.smallButton}
            onClick={addToTail}
            isLoader={loader.addTail}
            disabled={!inputValue.value || loader.disabled}
          />
          <Button
            text="Удалить из head" type="button"
            extraClass={s.smallButton}
            onClick={removeFromHead}
            isLoader={loader.deleteHead}
            disabled={list.length === 0 || loader.disabled}
          />
          <Button
            text="Удалить из tail"
            type="button"
            extraClass={s.smallButton}
            onClick={removeFromTail}
            isLoader={loader.deleteTail}
            disabled={list.length === 0 || loader.disabled}
          />
        </fieldset>
        <fieldset className={s.layout} name='atIndex'>
          <Input extraClass={s.input} type='text' name="index" value={inputValue.index} placeholder="Введите индекс" onChange={handleChange} />
          <Button
            text="Добавить по индексу"
            type="button"
            extraClass={s.button}
            onClick={insertAt}
            disabled={!inputValue.value || loader.disabled}
            isLoader={loader.addAt}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            extraClass={s.button}
            onClick={deleteAt}
            disabled={!inputValue.index || loader.disabled }
            isLoader={loader.deleteAt}
          />
        </fieldset>
      </form>
      <ul className={s.ul}>
        {list.map((el, index) => {
          return (
            <li key={index} className={s.li} >
              <div className={s.circles} >
                <Circle
                  letter={el.value.value}
                  index={index}
                  head={showHead(index)}
                  tail={showTail(index)}
                  state={index === changingIndex
                    ? ElementStates.Changing
                    : index === modIndex
                      ? ElementStates.Modified
                      : ElementStates.Default} />
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
