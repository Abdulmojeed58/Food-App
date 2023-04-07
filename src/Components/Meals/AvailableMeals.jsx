import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from './AvailableMeals.module.css';
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

  const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=> {
      fetchData()
    }, [])

    const fetchData = async () =>{
      try {
        setError(false)
        const res = await fetch('https://react-http-d5ecc-default-rtdb.firebaseio.com/meals.json')
        if(!res.ok) {
          throw new Error('There was an error');
        }

        let loadedMeal = []

        const data = await res.json()

        for(let key in data) {
          loadedMeal.push({id: key, ...data[key]})
        }

        setMeals(loadedMeal)
        setIsLoading(false)


      } catch(error) {
        console.log(error, error.message)
        setIsLoading(false)
        setError(error.message)
      }
    }

    
    if(isLoading) {
      return <p>Loading...</p>
    }

    if(error) {
      return <p>{error}</p>
    }

    const mealLists = meals.map(meal=>(
        <MealItem 
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ))

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealLists}
                </ul>
            </Card>
        </section>
    )
  }

  export default AvailableMeals