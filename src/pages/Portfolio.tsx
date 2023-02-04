import React, { useState, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import { RefObject } from '../interfaces'
import styles from './css/portfolio.module.css'
import Hero from '../components/Hero/Hero'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com';
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from '../components/FormMulti/keys'

import { AiOutlineForm } from 'react-icons/ai'
import { BiSelectMultiple } from 'react-icons/bi'
import { RiTodoLine, RiDragDropLine, RiDragMove2Fill } from 'react-icons/ri'



const options = [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
    { label: "Fifth", value: 5 },
]
const options2 = [
    { label: "Please choose an option", value: "No Selection" },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
    { label: "Fifth", value: 5 },
]

export default function Portfolio({ heading, text, type }: { heading: string; text: string; type: string }) {

    const form = useRef() as RefObject<HTMLFormElement>

    function useEmail(e: React.FormEvent<HTMLFormElement>, ref: HTMLFormElement | null) {
        e.preventDefault();



        if (ref)
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, ref, PUBLIC_KEY)
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
        ref?.current.reset()
    };


    const lightTheme = useTheme()


    //const [count, setCount] = useState(0) //runs every render
    const [count, setCount] = useState(() => {
        return 0
    }) // function version runs only once

    function decrementCount() {
        setCount(prevCount => prevCount - 1)
        setCount(prevCount => prevCount - 1) //may be run again, this decreases by 2
    }
    function incrementCount() {
        setCount(prevCount => prevCount + 1)
    }

    //example use: 
    //<button onClick={decrementCount}> - </button>
    //<span>{count}</span> //increases or decreases this
    //<button onClick={incrementCount}> + </button>





    return (

        <div className={`${heading} ${type} ${lightTheme ? styles.light : ''}`}>

            <Hero heading={heading} text={text} />
            <div className='inner-wrap'>
                <section className={`card`}>
                    <div>
                        <div className={styles.notes}>
                            <p>This site focuses on React applications. Non-React porfolio items may be found at the <a href="https://jenniina.fi/#portfolio">portfolio section</a> of the main site </p>
                            <h2>React Apps</h2>

                            <p>React-specific apps made with Vite and Typescript. Each app is designed to be both pointer- and keyboard-accessible. </p>
                            <label htmlFor='list-libraries'>Dependencies:</label>
                            <ul id='list-libraries'>
                                <li>react-icons</li>
                                <li>react-dom</li>
                                <li>react-router-dom</li>
                                <li>uuid</li>
                                <li>emailjs-com</li>
                            </ul>
                        </div>
                        <ul className={`${styles.list}`}>
                            <li>
                                <Link to="/react/portfolio/blob"><RiDragMove2Fill />
                                    <span>Draggable Blobs</span>
                                </Link>
                                <p>My custom draggables app heavily modified to work in the React environment</p>
                            </li>
                            <li>
                                <Link to="/react/portfolio/draganddrop"><RiDragDropLine />
                                    <span>Drag and Drop</span>
                                </Link>
                                <p>A custom drag-and-drop</p>
                            </li>
                            <li>
                                <Link to="/react/portfolio/todo"><RiTodoLine />
                                    <span>Todo App</span>
                                </Link>
                                <p>A todo-app using localStorage</p>
                            </li>
                            <li>
                                <Link to="/react/portfolio/select"><BiSelectMultiple />
                                    <span>Custom Select</span>
                                </Link>
                                <p>Single- and multiple-select alternatives</p>
                            </li>
                            <li className={styles.multistep}>
                                <Link to="/react/portfolio/form"><AiOutlineForm />
                                    <span>Multistep Form</span>
                                </Link>
                                <p>Three-step fully functional contact form</p>
                            </li>
                        </ul>
                    </div>
                </section>


                {/* <section className={`card ${selectStyles.selectscard}`}>
                <div>
                    <div className={selectStyles['selects-container']}>
                        <h2>Custom Select</h2>
                        <form ref={form} onSubmit={e => useEmail(e, form.current)}>
                            <FormWrapper title='Some title' description='Some description' className='flex'>
                                <Select
                                    id='multiple'
                                    className={`full ${selectStyles.prev}`}
                                    instructions='Select one or more options'
                                    multiple
                                    options={options}
                                    value={value1}
                                    onChange={o => setValue1(o)}
                                />
                                <Select
                                    id='single'
                                    className={`half`}
                                    instructions='Select an option'
                                    options={options2}
                                    value={value2}
                                    onChange={o => setValue2(o)} />
                                <button type="submit">Send</button>
                            </FormWrapper>
                        </form>
                    </div>
                </div>
            </section>
            <section className='card'><div>
                <h2>Contact Form</h2>
                <FormMulti />
            </div></section>
            <section className="card">
                <div>
                    <h2>Drag and Drop</h2>
                    <DragAndDrop />
                </div></section>
            <section className="fullwidth">
                <div>
                    <h2>Draggable Blobs</h2>
                    <BlobJS />
                </div></section>
            <section className="card">
                <div>
                    <h2>Task List</h2>
                    <TodoApp />
                </div>
            </section> */}

            </div>
        </div>
    )
}
