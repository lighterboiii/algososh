import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import s from './sorting-page.module.css';
import { Direction } from "../../types/direction";
import { randomArr, ISort, sort } from "./algorithm";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../constants/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<Array<ISort>>([]);
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

  const selectionSort = async (array: Array<ISort>, direction: Direction) => {
    setLoader(true);
    const length = array.length;
    for (let i = 0; i <= length - 1; i++) {
      let minIndex = i;
      array[minIndex].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        array[j].state = ElementStates.Changing;
        setArray([...array]);

        await setDelay(SHORT_DELAY_IN_MS);

        if (direction === Direction.Descending ? array[j].value > array[minIndex].value : array[j].value < array[minIndex].value) {
          minIndex = j;
          array[j].state = ElementStates.Changing;
          array[minIndex].state = i === minIndex ? ElementStates.Changing : ElementStates.Default;
        }
        if (minIndex !== i) {
          array[j].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      sort(array, minIndex, i);
      array[minIndex].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
    setLoader(false);
  };

  const bubbleSort = async (array: Array<ISort>, direction: Direction) => {
    setLoader(true);
    const length = array.length;
    for (let i = 0; i <= length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;

        await setDelay(SHORT_DELAY_IN_MS);

        if (direction === Direction.Descending ? array[j].value < array[j + 1].value : array[j].value > array[j + 1].value) {
          sort(array, j, j + 1);
          array[j].state = ElementStates.Default;
          setArray([...array]);
        }
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }
    setLoader(false);
  }; 

  const handleSort = (direction: Direction) => {
    if (radio === 'selectionSort') {
      selectionSort(array, direction);
  } 
    else if (radio === 'bubbleSort') {
      bubbleSort(array, direction);
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
            <li key={index}>
              <Column index={item.value} state={item.state} />
            </li>
          )})
        }
      </ul>
    </SolutionLayout>
  );
};
