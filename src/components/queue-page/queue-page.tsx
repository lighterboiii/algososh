import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import s from './queue.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { generateArray } from "./utils";
import { q } from "./queue";

export const QueuePage: React.FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [queue, setQueue] = useState<Array<string>>([]);
  console.log(queue);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    loader: false
  });

  useEffect(() => {
    setQueue(q.toArray().fill(''));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={s.form}>
        <fieldset className={s.fieldset} >
          <Input extraClass={s.input} value={inputValue} onChange={handleChange} />
          <Button text="Добавить" />
          <Button text="Удалить" />
        </fieldset>
        <Button text="Очистить" extraClass={s.formButton} />
      </form>
      <ul className={s.ul}>
        {queue.map((item, index) => {
          return (
            <li key={index}>
              <Circle letter={item} index={index} />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
