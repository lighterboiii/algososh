import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from './queue.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { q } from "./queue";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../constants/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [queue, setQueue] = useState<Array<string>>([]);
  const [currIndex, setCurrIndex] = useState(-1);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false
  });

  useEffect(() => {
    setQueue(q.toArray().fill(''));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addItem = async () => {
    setLoader({ ...loader, add: true });
    setCurrIndex(q.getTail());
    await setDelay(SHORT_DELAY_IN_MS);
    q.enqueue(inputValue);
    setQueue([...q.toArray()]);
    setCurrIndex(-1);
    setInputValue('');
    setLoader({ ...loader, add: false });
  };

  const delItem = async () => {
    setLoader({ ...loader, delete: true });
    setCurrIndex(q.getHead());
    await setDelay(SHORT_DELAY_IN_MS);
    q.dequeue();
    setQueue([...q.toArray()]);
    setCurrIndex(-1);
    setLoader({ ...loader, delete: false });
  };

  const clearQueue = async () => {
    setLoader({ ...loader, clear: true });
    await setDelay(SHORT_DELAY_IN_MS);
    q.clear();
    setQueue([...q.toArray().fill('')]);
    setLoader({ ...loader, clear: false });
  };

  const isHead = (index: number) => {
    return index === q.getHead() && !q.isEmpty() ? HEAD : '';
  };

  const isTail = (index: number) => {
    return index === q.getTail() && !q.isEmpty() ? TAIL : '';
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={s.form} onSubmit={e => e.preventDefault}>
        <fieldset className={s.fieldset} >
          <Input
            disabled={q.isFull()}
            extraClass={s.input}
            value={inputValue}
            onChange={handleChange}
            maxLength={4}
            isLimitText={true} />
          <Button text="Добавить" isLoader={loader.add} disabled={loader.delete || !inputValue} onClick={addItem} />
          <Button text="Удалить" isLoader={loader.delete} disabled={loader.add || q.isEmpty()} onClick={delItem} />
        </fieldset>
        <Button text="Очистить" extraClass={s.formButton} isLoader={loader.clear} disabled={q.isEmpty()} onClick={clearQueue} />
      </form>
      <ul className={s.ul}>
        {queue.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                letter={item}
                index={index}
                state={
                  index === currIndex
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
                tail={isTail(index) ? TAIL : ''}
                head={isHead(index) ? HEAD : ''}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
