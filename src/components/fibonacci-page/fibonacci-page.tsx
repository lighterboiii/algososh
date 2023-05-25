import React, { FormEvent, useEffect, useRef, useState } from "react";
import s from "./fib.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { getFibonacciNumbers } from "./algorithm";
import { useForm } from "../hooks/useForm";

export const FibonacciPage: React.FC = () => {

  const [num, setNum] = useState(0);
  const [loader, setLoader] = useState(false);
  const { values, setValues, handleChange } = useForm({ fib: '' as string });

  const fibonacci = useRef<Array<number>>([]);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, []);

  const showCircles = () => {
    if (!fibonacci.current) {
      setLoader(false);
      return;
    };
    timer.current = setInterval(() => {
      setNum((prevNum) => {
        const nextNum = prevNum + 1;

        if (timer.current && nextNum >= fibonacci.current.length) {
          setLoader(false);
          clearInterval(timer.current);
        }

        return nextNum;
      })
    }, 500);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.fib) {
      return null;
    }
    fibonacci.current = getFibonacciNumbers(Number(values.fib))!;
    setLoader(true);
    setNum(0);
    showCircles();
    setValues({ fib: '' });
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={s.layout} onSubmit={handleSubmit}>
        <Input 
        extraClass={s.input} 
        type="number" 
        name="fib" 
        value={values.fib} 
        isLimitText={true} 
        max={19} 
        onChange={handleChange} 
        />
        <Button text="Рассчитать" type="submit" isLoader={loader} disabled={!values.fib || Number(values.fib) > 19} />
      </form>
      {fibonacci.current &&
      <ul className={s.ul}>
        {fibonacci.current.slice(0, num).map((letter, index) => {
          return (
            <li key={index}>
              <Circle letter={letter.toString()} index={index} />
            </li>
          )
        })}
      </ul>
}
    </SolutionLayout>
  );
};
