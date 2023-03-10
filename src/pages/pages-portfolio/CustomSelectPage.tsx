import { useState, useRef } from 'react'
import Hero from '../../components/Hero/Hero'
import { Select, SelectOption } from '../../components/Select/Select'
import FormWrapper from '../../components/FormWrapper/FormWrapper'
import selectStyles from '../../components/Select/select.module.css'
import { RefObject } from '../../interfaces'
import emailjs from 'emailjs-com';
import { SERVICE_ID, TEMPLATE_ID_SELECT, PUBLIC_KEY } from '../../components/FormMulti/keys'

//Keep options outside the export function!
const options1: SelectOption[] = [
    { label: "Accessibility", value: "Accessibility" },
    { label: "Appearance", value: "Appearance" },
    { label: "Text content", value: "Text" },
    { label: "Animation", value: "Animation" },
    { label: "Light mode", value: "Light mode" },
    { label: "Navigation", value: "Navigation" },
    { label: "Buttons", value: "Buttons" },
    { label: "Blob App", value: "Blob App" },
    { label: "Drag and Drop App", value: "Drag and Drop" },
    { label: "Todo App", value: "Todo App" },
    { label: "Custom Select", value: "Custom Select" },
    { label: "Multistep Contact Form", value: "Contact Form" },
    { label: "Other, clarified below", value: "Other" },
    { label: "No issues", value: "None" },
]
const options2: SelectOption[] = [
    { label: "Please select an option", value: 'None' },
    { label: "Blobs", value: 'Blobs' },
    { label: "Bubbles", value: 'Bubbles' },
    { label: "Alien eyes", value: 'Alien eyes' },
    { label: "Diamond shapes", value: 'Diamond shapes' },
]



export default function CustomSelectPage({ heading, text, type }: { heading: string; text: string; type: string }) {


    const [value1, setValue1] = useState<SelectOption[]>([])
    const [value2, setValue2] = useState<SelectOption | undefined>(options2[0])
    const [input, setInput] = useState<string>('')


    const [showMessage, setShowMessage] = useState(false)

    const form = useRef() as RefObject<HTMLFormElement>

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (form.current) {
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_SELECT, form.current, PUBLIC_KEY)
                .then((result) => {
                    console.log(result.text);
                    form.current?.reset()
                    setShowMessage(true)
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 30000)
                }, (error) => {
                    console.log(error.text);
                    alert("There was an error sending the message!");
                });
        }
    }

    return (
        <div className={`${heading} ${type}`}>
            <Hero heading={heading} text={text} />
            <div className='inner-wrap'>
                <section className="card">
                    <div>
                        <div className="medium">

                            <h2>Features</h2>
                            <ul className='ul'>
                                <li>Single select or multiple select</li>
                                <li>Move to item with keyboard keys (up or down, or by writing the first few letters of the option: reset time of 0.6 seconds)</li>
                                <li>label can be hidden from view, but is still accessible to screen readers</li>
                            </ul>
                            <h3>Keyboard Use</h3>
                            <ul className='ul'>
                                <li>Tab to Select, Enter or Space to open</li>
                                <li>Use up and down arrow keys to move to an option</li>
                                <li>Alternatively move to an item on the list by writing the first few letters </li>
                                <li>Select option with Enter or Space</li>
                                <li>Press Tab to move to the selected buttons or to the clear button</li>
                                <li>Press Escape to close dropdown without selecting</li>
                            </ul>
                            <div className={selectStyles['selects-container']}>
                                <h3>Custom Select</h3>
                                <form ref={form} onSubmit={handleSubmit}>
                                    <FormWrapper
                                        className='flex'
                                        title='Survey'
                                        description='Please offer some feedback'>
                                        <h4 className="left small margin0 regular">Did you find any issues on this site?</h4>
                                        <Select
                                            multiple
                                            id='multipleselectdropdown'
                                            className={selectStyles.prev2}
                                            instructions='Please select one or more options'
                                            options={options1}
                                            value={value1}
                                            onChange={o => {
                                                setValue1(o)
                                            }}
                                        />
                                        <h4 className="left small margin0 regular">Which Hero Section element was your favourite?</h4>
                                        <Select
                                            id='single'
                                            className={`full ${selectStyles.prev}`}
                                            instructions='Keyboard use: move to option with arrow keys and select by pressing Enter or Space'
                                            hide
                                            options={options2}
                                            value={value2}
                                            onChange={o => setValue2(o)}
                                        />
                                        <h4 className="left small margin0 regular">Clarification or Feedback</h4>
                                        <div className='full'>
                                            <label><input
                                                type='text'
                                                name='clarification'
                                                value={input}
                                                onChange={e => setInput(e.target.value)}
                                                className='bg' />
                                                <span className='screen-reader-text' >Clarification or Feedback </span></label>
                                        </div>
                                        <div>
                                            <input id='form-gdpr'
                                                required
                                                type='checkbox'
                                                name='gdpr'
                                            /><label htmlFor='form-gdpr'><span className='required' aria-hidden='true' >*</span> It is alright to send the entered information to Jenniina </label>
                                        </div>
                                        <button type="submit" className={`${selectStyles.half} `}>Send</button>
                                        {showMessage && (
                                            <div
                                                aria-live='assertive'
                                                style={{ fontWeight: "bold", color: "inherit", letterSpacing: '0.04em' }}>Thank you for your message!</div>
                                        )}
                                    </FormWrapper>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div>
                        <h2>Codesandbox</h2>
                        <iframe src="https://codesandbox.io/embed/custom-select-multi-and-single-n5nhwo?fontsize=14&hidenavigation=1&theme=dark"
                            style={{ width: '100%', height: '400px', border: '0', borderRadius: '4px', overflow: 'hidden' }}
                            title="Custom Select Multi and Single"
                            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                        ></iframe>
                    </div>
                </section>
            </div>
        </div>
    )
}
