import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from './queue.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
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
