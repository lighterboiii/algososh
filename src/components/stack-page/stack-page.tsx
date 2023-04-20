import React, { useState } from "react";
import s from './stack.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./algorithm";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const container: any = [];

  const pushItem = (item: any) => {
    container.push(item);
  };

  const popItem = () => {
    if (container.length > 0) {
      container.pop();
    }
  };

  const handleSubmit = () => {
    
  }

  return (
    <SolutionLayout title="Стек">
      <div className={s.wrapper} >
        <div className={s.inner} >
          <Input extraClass={s.input}
            maxLength={4}
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            isLimitText={true} />
          <Button text='Добавить' type='submit' disabled={!value} />
          <Button text='Удалить' type='button' disabled />
        </div>
        <Button text='Очистить' type='reset' disabled />
      </div>
    </SolutionLayout>
  );
};
