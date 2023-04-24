import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import s from './sorting-page.module.css';
import { Direction } from "../../types/direction";
import { randomArr } from "./algorithm";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<Array<number>>([]);

  const generateArray = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newArr = randomArr();
    setArray(newArr);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={s.layout} >
        <fieldset name='radios' className={`${s.fieldset} + ${s.radios}`} >
          <RadioInput label="Выбор" checked />
          <RadioInput label="Пузырёк" />
        </fieldset>
        <fieldset name='buttons' className={`${s.fieldset} + ${s.buttons}`} >
          <Button
            text="По возрастанию"
            extraClass={s.button}
            sorting={Direction.Ascending} />
          <Button
            text="По убыванию"
            extraClass={s.button}
            sorting={Direction.Descending} />
        </fieldset>
        <Button
          text="Новый массив"
          type="submit"
          onClick={generateArray}
          extraClass={s.button} />
      </form>
      <ul className={s.ul}>
        {array.map((item, index) => {
          return (
            <Column index={index} />
          )
        })
        }
      </ul>
    </SolutionLayout>
  );
};
