import React, { useState, useRef, FormEvent, ChangeEvent } from "react";
import s from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ISort, sort } from "./algorithm";
import { setDelay } from "../../constants/setDelay";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [letters, setLetters] = useState<Array<ISort>>([]);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const wordArray = inputValue.split('').map((letter) => {
      return { letter, state: ElementStates.Default };
    });

    setLoader(true);
    setLetters(wordArray);

    const end = wordArray.length - 1;
    const mid = Math.floor(wordArray.length / 2);
    for (let i = 0; i <= mid; i++) {
      let j = end - i;
      if (i !== j) {
        [wordArray[i].state, wordArray[j].state] = [ElementStates.Changing, ElementStates.Changing];

        setLetters([...wordArray]);
        await setDelay(DELAY_IN_MS);
      }

      sort(wordArray, i, j);
      [wordArray[i].state, wordArray[j].state] = [ElementStates.Modified, ElementStates.Modified];

      setLetters([...wordArray]);
    };
    setLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={s.layout} onSubmit={handleSubmit} >
        <Input
          extraClass={s.input}
          type="text"
          name="string"
          isLimitText={true}
          maxLength={11}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} />
        <Button text="Развернуть" type="submit" isLoader={loader} />
      </form>
      <ul className={s.list}>
        {letters.map((letter, index) => {
          return (
            <li key={index} >
              <Circle letter={letter.letter} state={letter.state} />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
