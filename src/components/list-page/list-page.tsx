import React, { useEffect, useRef, useState } from "react";
import s from './list.module.css';
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./algorithm";
import { generateArray, IArray } from "./utils";
import { setDelay } from "../../constants/setDelay";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {

  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState('');
  const [list, setList] = useState<Array<IArray>>([]);
  const [index, setIndex] = useState(-1);

  const showCircles = () => {
    setList(generateArray);
  };

  // const addToHead = async () => {
  //   setLoader(true);
  //   linkedList.current.prepend(value);
  // }

  useEffect(() => {
    showCircles();
  }, []);


  return (
    <SolutionLayout title="Связный список">
      <form className={s.container} >
        <fieldset className={s.layout} name='tailhead' >
          <Input extraClass={s.input} type='text' name="list" placeholder="Введите значение" isLimitText={true} maxLength={4} />
          <Button text="Добавить в head" type="submit" extraClass={s.smallButton} />
          <Button text="Добавить в tail" type="submit" extraClass={s.smallButton} />
          <Button text="Удалить из head" type="submit" extraClass={s.smallButton} />
          <Button text="Удалить из tail" type="submit" extraClass={s.smallButton} />
        </fieldset>
        <fieldset className={s.layout} name='index'>
          <Input extraClass={s.input} type='text' name="list" placeholder="Введите индекс" />
          <Button text="Добавить по индексу" type="submit" extraClass={s.button} />
          <Button text="Добавить удалить по индексу" type="submit" extraClass={s.button} />
        </fieldset>
      </form>
      <ul className={s.ul}>
          {list.map((el, index) => {
            return (
              <li key={index} className={s.li} >
                <Circle letter={el.value} index={index} />
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
