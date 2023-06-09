import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import s from './sorting-page.module.css';
import { Direction } from "../../types/direction";
import { randomArr, ISort, sort } from "./utils";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../constants/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../hooks/useForm";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<Array<ISort>>([]);
  const { values, handleChange } = useForm( {
    select: 'selectionSort',
    bubble: 'bubbleSort'
  });
  const [loader, setLoader] = useState({
    asc: false,
    desc: false,
    loader: false
  });

  useEffect(() => {
    setArray(randomArr());
  }, []);

  const generateArray = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newArr = randomArr();
    setArray(newArr);
  };

  const selectionSort = async (array: Array<ISort>, direction: Direction) => {
    if (direction === Direction.Ascending) {
      setLoader({ ...loader, loader: true, asc: true });
    } else {
      setLoader({ ...loader, loader: true, desc: true });
    }
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
    setLoader({ asc: false, desc: false, loader: false });
  };

  const bubbleSort = async (array: Array<ISort>, direction: Direction) => {
    if (direction === Direction.Ascending) {
      setLoader({ ...loader, loader: true, asc: true });
    } else {
      setLoader({ ...loader, loader: true, desc: true });
    }
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
    setLoader({ asc: false, desc: false, loader: false });
  }; 

  const handleSort = (direction: Direction) => {
    if (values.select === 'selectionSort') {
      selectionSort(array, direction);
  } 
    else if (values.bubble === 'bubbleSort') {
      bubbleSort(array, direction);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={s.layout} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} >
        <fieldset name='radios' className={`${s.fieldset} + ${s.radios}`} >
          <RadioInput 
          name='select'
          disabled={loader.loader} 
          label="Выбор" 
          value='selectionSort' 
          onChange={handleChange} 
          checked={values.select === 'selectionSort'} />
          <RadioInput 
          name='bubble'
          disabled={loader.loader} 
          label="Пузырёк" 
          value='bubbleSort' 
          onChange={handleChange} 
          checked={values.bubble === 'bubbleSort'} />
        </fieldset>
        <fieldset name='buttons' className={`${s.fieldset} + ${s.buttons}`} >
          <Button
            text="По возрастанию"
            extraClass={s.button}
            sorting={Direction.Ascending}
            onClick={() => handleSort(Direction.Ascending)}
            isLoader={loader.asc}
            disabled={loader.desc}
          />
          <Button
            text="По убыванию"
            extraClass={s.button}
            sorting={Direction.Descending}
            onClick={() => handleSort(Direction.Descending)}
            isLoader={loader.desc}
            disabled={loader.asc}
          />
        </fieldset>
        <Button
          text="Новый массив"
          type="submit"
          onClick={generateArray}
          extraClass={s.button}
          disabled={loader.loader}
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
