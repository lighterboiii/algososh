import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import s from './sorting-page.module.css';
import { Direction } from "../../types/direction";
import { randomArr, selectionSort, bubbleSort } from "./algorithm";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<Array<number>>([]);
  const [radio, setRadio] = useState('selectionSort');
  const [loader, setLoader] = useState(false);

  const generateArray = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newArr = randomArr();
    setArray(newArr);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.value);
  };

  const handleBubbleSort = (array: Array<number>, direction: Direction) => {
    bubbleSort(array);
    setLoader(true);
    if (direction === Direction.Ascending) {
      setArray(array);
    } else if (direction === Direction.Descending) {
      setArray(array.reverse())
    }
    setLoader(false);
  };

  const handleSelectionSort = (array: Array<number>, direction: Direction) => {
    selectionSort(array);
    setLoader(true);
    if (direction === Direction.Ascending) {
      setArray(array);
    } else if (direction === Direction.Descending) {
      setArray(array.reverse())
    }
    setLoader(false);
  };

  const handleSort = (direction: Direction) => {
    if (radio === 'selectionSort') {
      handleSelectionSort([...array], direction);
    } else if (radio === 'bubbleSort') {
      handleBubbleSort([...array], direction);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={s.layout} >
        <fieldset name='radios' className={`${s.fieldset} + ${s.radios}`} >
          <RadioInput label="Выбор" value='selectionSort' onChange={handleChange} checked={radio === 'selectionSort'} />
          <RadioInput label="Пузырёк" value='bubbleSort' onChange={handleChange} checked={radio === 'bubbleSort'} />
        </fieldset>
        <fieldset name='buttons' className={`${s.fieldset} + ${s.buttons}`} >
          <Button
            text="По возрастанию"
            extraClass={s.button}
            sorting={Direction.Ascending}
            onClick={() => handleSort(Direction.Ascending)}
            isLoader={loader}
          />
          <Button
            text="По убыванию"
            extraClass={s.button}
            sorting={Direction.Descending} 
            onClick={() => handleSort(Direction.Descending)}
            isLoader={loader}
            />
        </fieldset>
        <Button
          text="Новый массив"
          type="submit"
          onClick={generateArray}
          extraClass={s.button} 
          isLoader={loader}
          />
      </form>
      <ul className={s.ul}>
        {array.map((item, index) => {
          return (
            <Column index={item} />
          )
        })
        }
      </ul>
    </SolutionLayout>
  );
};
