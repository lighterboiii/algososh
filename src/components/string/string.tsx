import React, { useState, useRef } from "react";
import s from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {

  const [value, setValue] = useState('');
  const [letters, setLetters] = useState<Array<string>>([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: any) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={s.layout} >
        <Input extraClass={s.input} type="text" name="string" isLimitText={true} maxLength={11} onChange={handleChange} />
        <Button text="Развернуть" type="submit" isLoader={loader} />
      </form>
      <ul>
        {letters.map((letter, index) => {
          <li key={index} >
            <Circle index={index} letter={letter} />
          </li>
        })}
      </ul>
    </SolutionLayout>
  );
};
