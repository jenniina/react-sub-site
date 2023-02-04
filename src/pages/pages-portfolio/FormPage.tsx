import Hero from '../../components/Hero/Hero'
import FormMulti from '../../components/FormMulti/FormMulti';

export default function FormPage({ heading, text, type }: { heading: string; text: string; type: string }) {

    return (
        <div className={`${heading} ${type}`}>
            <Hero heading={heading} text={text} />
            <div className='inner-wrap'>
                <section className="card"><div>
                    <div className="medium">
                        <h2>Features</h2>
                        <ul className='ul'>
                            <li>Multistep</li>
                            <li>The only external library is emailJS, for sending the message</li>
                            <li>Back and Next buttons</li>
                            <li>Slightly customized radio and checkbox inputs (size increase, outline addition)</li>
                            <li>Prompt to fill in the missing required fields, before moving to the next step</li>
                            <li>Fields:
                                <ul>
                                    <li>First Name *</li>
                                    <li>Last Name *</li>
                                    <li>Email *</li>
                                    <li>Message Subject</li>
                                    <li>Message *</li>
                                    <li>Any encouraging words?</li>
                                    <li>A color you like?</li>
                                    <li>Which mode do you prefer?</li>
                                    <li>Do you like my custom selects?</li>
                                    <li>GDPR consent</li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
                </section>
                <section className="card"><div>
                    <h2>Contact Form</h2>
                    <FormMulti />
                </div></section>
            </div>

        </div>
    )
}
