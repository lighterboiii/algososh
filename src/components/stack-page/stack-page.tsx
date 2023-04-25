import React, { FormEvent, useRef, useState, useEffect } from "react";
import s from './stack.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../constants/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {

  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [res, setRes] = useState<Array<string>>([]);
  const [topIndex, setTopIndex] = useState(-1);
  const ref = useRef(new Stack());

  const showCircles = () => {
    const stack = ref.current.array();
    setRes(stack.length > 0 ? stack.map((el) => String(el)) : []);
  };

  const addElement = async () => {
    setLoader(true);
    setValue('');
    ref.current.push(value);
    showCircles();
    setTopIndex(ref.current.index);
    await setDelay(SHORT_DELAY_IN_MS);
    setTopIndex(-1);
    setLoader(false);
  };

  const removeElement =  async () => {
    setLoader(true);
    setTopIndex(ref.current.index);
    ref.current.pop();
    await setDelay(SHORT_DELAY_IN_MS);
    setTopIndex(-1);
    setLoader(false);
    showCircles();
  };

  const handleClear = async () => {
    setLoader(true);
    setValue('');
    ref.current.clear();
    setLoader(false);
    showCircles();
  };

  return (
    <SolutionLayout title="Стек">
      <form className={s.wrapper} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <div className={s.inner}>
          <Input extraClass={s.input}
            maxLength={4}
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            isLimitText={true} />
          <Button text='Добавить' type='submit' disabled={!value} onClick={addElement} isLoader={loader} />
          <Button text='Удалить' type='button' disabled={res.length === 0} onClick={removeElement} isLoader={loader} />
        </div>
        <Button text='Очистить' type='reset' disabled={res.length === 0} onClick={handleClear} isLoader={loader} />
      </form>
      <ul className={s.ul} >
        {res.map((el, index) => {
          return (
            <li key={index} >
              <Circle 
              index={index} 
              letter={el} 
              head={index === res!.length - 1 ? "top" : undefined} 
              state={index === topIndex ? ElementStates.Changing : ElementStates.Default} />
            </li>
          )
        }
        )}
      </ul>
    </SolutionLayout>
  );
};
