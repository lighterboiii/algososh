import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from './queue.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { generateArray } from "./utils";

export const QueuePage: React.FC = () => {

  // useEffect(() => {
  //   return q = setQueue(generateArray());
  // });

  const [queue, setQueue] = useState<Array<number>>([]);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    loader: false
  });


  return (
    <SolutionLayout title="Очередь">
      <form className={s.form}>
        <fieldset className={s.fieldset} >
          <Input extraClass={s.input} />
          <Button text="Добавить" />
          <Button text="Удалить" />
        </fieldset>
        <Button text="Очистить" extraClass={s.formButton} /> 
      </form>
      <ul className={s.ul}>
          <Circle />
          <Circle />
          <Circle />
          <Circle />
      </ul>
    </SolutionLayout>
  );
};
