import React, { useEffect, useState } from 'react'
import Questions from './Questions'

import { moveNextQuestion, movePrevQuestion } from '../hooks/FetchQuestion'
import { pushAnswer } from '../hooks/setResult'

// redux store import

import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz() {

    const [check, setChecked] = useState(undefined);

    const result = useSelector(state => state.result.result);
    //const result = useSelector(state => state.result.result);
    //const trace = useSelector(state => state.questions.trace)
    const { queue, trace } = useSelector(state => state.questions);

    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(result)
    })

    //next button event handler

    function onNext() {
        //console.log(" on next click")


        if (trace < queue.length) {
            // update the trace value by one using move next action

            dispatch(moveNextQuestion())
            // a new result in the array

            if (result.length <= trace) {
                dispatch(pushAnswer(check))
            }
        }

        //reset the value of the checked variable

        setChecked(undefined)
    }

    //previous button event handler



    function onPrev() {
        console.log(" on previous click")
        if (trace > 0) {
            // update the trace value by one using move previous action

            dispatch(movePrevQuestion());

        }

    }
    function onChecked(check) {
        //console.log(check)
        setChecked(check)
    }

    // finished exam after last question 

    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>

    }
    return (
        <div className="container">
            <h1 className="title text-light" >Quiz Application </h1>

            {/*display questions */}
            <Questions onChecked={onChecked}></Questions>

            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Previous</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>

        </div>
    )
}
