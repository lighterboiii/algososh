import React, { FormEvent, useEffect, useState } from "react";
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
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../hooks/useForm";

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
  const [list, setList] = useState<IListNode<IArray>[]>([]);
  const [currIndex, setCurrIndex] = useState(-1);
  const [isTopCircle, setIsTopCircle] = useState(false);
  const [currElement, setCurrElement] = useState('');
  const [changingIndex, setChangingIndex] = useState(-1);
  const [modIndex, setModIndex] = useState(-1);
  const { values, handleChange, setValues } = useForm({
    index: '',
    value: ''
  });

  useEffect(() => {
    setLinkedList();
    setList(linkedList.toArray());
  }, []);

  const addToHead = async () => {
    setLoader({ ...loader, addHead: true, disabled: true });
    const newNode = { value: values.value, state: ElementStates.Default };
    linkedList.prepend(newNode);
    setCurrIndex(0);
    setIsTopCircle(true);
    setCurrElement(values.value);
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrElement('');
    setIsTopCircle(false);
    setValues({ value: '', index: '' });
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
    const newNode = { value: values.value, state: ElementStates.Default };
    linkedList.append(newNode);
    setCurrIndex(linkedListSize - 1);
    setCurrElement(values.value);
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrElement('');
    setValues({ value: '', index: '' });
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
    setCurrElement(values.value);
    let start = 0;
    while (start <= Number(values.index)) {
      setChangingIndex(start);
      setCurrIndex(start);
      await setDelay(SHORT_DELAY_IN_MS);
      start++;
    }
    setCurrIndex(Number(values.index));
    const newNode = { value: values.value, index: values.index, state: ElementStates.Default };
    linkedList.addAtIndex(newNode, Number(newNode.index));
    setValues({ value: '', index: '' });
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrIndex(-1);
    setCurrElement('');
    setChangingIndex(-1);
    setList([...linkedList.toArray()]);
    setModIndex(Number(values.index));
    await setDelay(SHORT_DELAY_IN_MS);
    setModIndex(-1);
    setList([...linkedList.toArray()]);
    setIsTopCircle(false);
    setLoader({ ...loader, addAt: false, disabled: false });
  };

  const deleteAt = async () => {
    setLoader({ ...loader, deleteAt: true, disabled: true });
    let start = 0;
    while (start <= Number(values.index)) {
      setChangingIndex(start);
      await setDelay(SHORT_DELAY_IN_MS);
      start++;
    }
    setCurrIndex(Number(values.index));
    setCurrElement(list[Number(values.index)].value.value);
    linkedList.getNodeAtIndex(Number(values.index))!.value.value = '';
    linkedList.removeAtIndex(Number(values.index));
    setValues({ value: '', index: '' });
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
        ? (HEAD)
        : undefined;
  };

  const showTail = (index: number) => {
    return currIndex === index && isTopCircle === false
      ? (<Circle isSmall={true} letter={currElement} state={ElementStates.Changing} />)
      : index === list.length - 1
        ? (TAIL)
        : undefined;
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={s.container} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} >
        <fieldset className={s.layout} name='tailhead' >
          <Input
            extraClass={s.input}
            type='text'
            name="value"
            data="input-value"
            value={values.value}
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
          />
          <Button
            text="Добавить в head"
            type="button"
            data="add-at-head-button"
            extraClass={s.smallButton}
            onClick={addToHead}
            isLoader={loader.addHead}
            disabled={!values.value || loader.disabled}
          />
          <Button
            text="Добавить в tail"
            type="button"
            data="add-at-tail-button"
            extraClass={s.smallButton}
            onClick={addToTail}
            isLoader={loader.addTail}
            disabled={!values.value || loader.disabled}
          />
          <Button
            text="Удалить из head" 
            type="button"
            data="delete-at-head-button"
            extraClass={s.smallButton}
            onClick={removeFromHead}
            isLoader={loader.deleteHead}
            disabled={list.length === 0 || loader.disabled}
          />
          <Button
            text="Удалить из tail"
            type="button"
            data="delete-at-tail-button"
            extraClass={s.smallButton}
            onClick={removeFromTail}
            isLoader={loader.deleteTail}
            disabled={list.length === 0 || loader.disabled}
          />
        </fieldset>
        <fieldset className={s.layout} name='atIndex'>
          <Input 
          extraClass={s.input} 
          type='number' 
          name="index" 
          data="index-value"
          value={values.index} 
          placeholder="Введите индекс" 
          onChange={handleChange} 
          />
          <Button
            text="Добавить по индексу"
            type="button"
            data="add-at-index-button"
            extraClass={s.button}
            onClick={insertAt}
            disabled={!values.index || loader.disabled || Number(values.index) > list.length - 1}
            isLoader={loader.addAt}
          />
          <Button
            text="Удалить по индексу"
            type="button"
            data="delete-at-index-button"
            extraClass={s.button}
            onClick={deleteAt}
            disabled={!values.index || loader.disabled || Number(values.index) > list.length - 1}
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
