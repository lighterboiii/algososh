import React, { FormEvent, useRef, useState, useEffect, ChangeEvent } from "react";
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
  const ref = useRef(new Stack());
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState({
    add: false,
    remove: false
  });
  const [res, setRes] = useState<Array<string>>([]);
  const [topIndex, setTopIndex] = useState(-1);

  const showCircles = () => {
    const stack = ref.current.array();
    setRes(stack.length > 0 ? stack.map((el) => String(el)) : []);
  };

  const addElement = async () => {
    setLoader({ ...loader, add: true });
    setValue('');
    ref.current.push(value);
    showCircles();
    setTopIndex(ref.current.index);
    await setDelay(SHORT_DELAY_IN_MS);
    setTopIndex(-1);
    setLoader({ ...loader, add: false });
  };

  const removeElement = async () => {
    setLoader({ ...loader, remove: true });
    setTopIndex(ref.current.index);
    ref.current.pop();
    await setDelay(SHORT_DELAY_IN_MS);
    setTopIndex(-1);
    setLoader({ ...loader, remove: false });
    showCircles();
  };

  const handleClear = async () => {
    setValue('');
    ref.current.clear();
    showCircles();
  };

  return (
    <SolutionLayout title="Стек">
      <form className={s.wrapper} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <div className={s.inner}>
          <Input extraClass={s.input}
            maxLength={4}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            isLimitText={true} />
          <Button text='Добавить' type='submit' disabled={!value || loader.remove} onClick={addElement} isLoader={loader.add} />
          <Button text='Удалить' type='button' disabled={res.length === 0 || loader.add} onClick={removeElement} isLoader={loader.remove} />
        </div>
        <Button text='Очистить' type='reset' disabled={res.length === 0 || loader.add || loader.remove} onClick={handleClear} />
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
