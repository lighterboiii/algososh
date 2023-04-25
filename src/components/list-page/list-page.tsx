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

  const [loader, setLoader] = useState(false);
  const [inputValue, setInputValue] = useState({ value: '', index: 0 });
  const [list, setList] = useState<IArray[]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    setLinkedList();
    // @ts-ignore
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
    console.log(newNode)
    await setDelay(SHORT_DELAY_IN_MS);
    // @ts-ignore
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const addToTail = async () => {
    setLoader(true);
    const newNode = { value: inputValue.value, state: ElementStates.Default };
    linkedList.append(newNode);
    await setDelay(SHORT_DELAY_IN_MS);
    // @ts-ignore
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const removeFromHead = async () => {
    setLoader(true);
    linkedList.removeHead();
    await setDelay(SHORT_DELAY_IN_MS);
    // @ts-ignore
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  const removeFromTail = async () => {
    setLoader(true);
    linkedList.removeTail();

    await setDelay(SHORT_DELAY_IN_MS);
    // @ts-ignore
    setList([...linkedList.toArray()]);
    setLoader(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={s.container} >
        <fieldset className={s.layout} name='tailhead' >
          <Input 
          extraClass={s.input} 
          type='text' 
          name="value" 
          placeholder="Введите значение" 
          isLimitText={true} 
          maxLength={4} 
          onChange={handleChange} />
          <Button text="Добавить в head" type="button" extraClass={s.smallButton} onClick={addToHead} isLoader={loader} />
          <Button text="Добавить в tail" type="button" extraClass={s.smallButton} onClick={addToTail} isLoader={loader} />
          <Button text="Удалить из head" type="button" extraClass={s.smallButton} onClick={removeFromHead} isLoader={loader} />
          <Button text="Удалить из tail" type="button" extraClass={s.smallButton} onClick={removeFromTail} isLoader={loader} />
        </fieldset>
        <fieldset className={s.layout} name='index'>
          <Input extraClass={s.input} type='text' name="list" placeholder="Введите индекс" />
          <Button text="Добавить по индексу" type="submit" extraClass={s.button} />
          <Button text="Добавить удалить по индексу" type="submit" extraClass={s.button} />
        </fieldset>
      </form>
      <ul className={s.ul}>
          { list.map((el, index) => {
            return (
              <li key={index} className={s.li} >
   {/* @ts-ignore */}
                <Circle letter={el.value.value} index={index} />
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
