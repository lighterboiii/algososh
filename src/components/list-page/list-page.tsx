import React, { useState } from "react";
import s from './list.module.css';
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";


export const ListPage: React.FC = () => {

  const [list, setList] = useState([1, 9, 9, 6]);
  const [loader, setLoader] = useState(false);

  return (
    <SolutionLayout title="Связный список">
      <div className={s.container} >
        <form className={s.layout} name='tailhead' >
          <Input extraClass={s.input} type='text' name="list" placeholder="Введите значение" isLimitText={true} maxLength={4} />
          <Button text="Добавить в head" type="submit" extraClass={s.smallButton} />
          <Button text="Добавить в tail" type="submit" extraClass={s.smallButton} />
          <Button text="Удалить из head" type="submit" extraClass={s.smallButton} />
          <Button text="Удалить из tail" type="submit" extraClass={s.smallButton} />
        </form>
        <form className={s.layout} name='index'>
          <Input extraClass={s.input} type='text' name="list" placeholder="Введите индекс" />
          <Button text="Добавить по индексу" type="submit" extraClass={s.button} />
          <Button text="Добавить удалить по индексу" type="submit" extraClass={s.button} />
        </form>
      </div>
      <ul className={s.ul}>
        {list.map((el, index) => {
          return (
            <li key={index}>
              <Circle isSmall={true} letter={'head'} />
              <Circle letter={el.toString()} />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
