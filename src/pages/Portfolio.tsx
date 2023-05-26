import React, { useState, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'
import { RefObject } from '../interfaces'
import styles from './css/portfolio.module.css'
import Hero from '../components/Hero/Hero'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com'
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from '../components/FormMulti/keys'
import { AiOutlineForm } from 'react-icons/ai'
import { BiSelectMultiple } from 'react-icons/bi'
import { RiTodoLine, RiDragDropLine, RiDragMove2Fill } from 'react-icons/ri'

export default function Portfolio({
  heading,
  text,
  type,
}: {
  heading: string
  text: string
  type: string
}) {
  const form = useRef() as RefObject<HTMLFormElement>

  function useEmail(e: React.FormEvent<HTMLFormElement>, ref: HTMLFormElement | null) {
    e.preventDefault()

    if (ref)
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, ref, PUBLIC_KEY).then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
    ref?.current.reset()
  }

  const lightTheme = useTheme()

  return (
    <div className={`${heading} ${type} ${lightTheme ? styles.light : ''}`}>
      <Hero heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className={`card`}>
          <div>
            <div className={styles.notes}>
              <p className={styles.introparagraph}>
                This site focuses on React applications. Non-React porfolio items may be
                found at the{' '}
                <a href='https://jenniina.fi/#portfolio'>portfolio section</a> of the main
                site{' '}
              </p>
              <h2>React Apps</h2>

              <p>
                React-specific apps made with Vite and Typescript. Each app is designed to
                be both pointer- and keyboard-accessible.{' '}
              </p>
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
                <Link to='/portfolio/blob'>
                  <RiDragMove2Fill />
                  <span>Draggable Blobs</span>
                </Link>
                <p>
                  My custom draggables app heavily modified to work in the React
                  environment
                </p>
              </li>
              <li>
                <Link to='/portfolio/draganddrop'>
                  <RiDragDropLine />
                  <span>Drag and Drop</span>
                </Link>
                <p>A custom drag-and-drop</p>
              </li>
              <li>
                <Link to='/portfolio/todo'>
                  <RiTodoLine />
                  <span>Todo App</span>
                </Link>
                <p>A todo-app using localStorage</p>
              </li>
              <li>
                <Link to='/portfolio/select'>
                  <BiSelectMultiple />
                  <span>Custom Select</span>
                </Link>
                <p>Single- and multiple-select alternatives</p>
              </li>
              <li className={styles.multistep}>
                <Link to='/portfolio/form'>
                  <AiOutlineForm />
                  <span>Multistep Form</span>
                </Link>
                <p>Three-step fully functional contact form</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
